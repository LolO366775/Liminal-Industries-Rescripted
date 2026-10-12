// priority: 0

StartupEvents.registry('block', event => {

	event.create('structure_foam_expanding')
		.fullBlock(true)
		.material("wood")
		.soundType("cherry_wood")
		.unbreakable()
		.tagBlock('wither_immune')
		.blockEntity(entityInfo => {
			entityInfo.serverTick(5, 0, entity => {
				global.tick_expanding_structure_foam(entity)
			})
		})
		.displayName('Expanding Structure Foam')

	event.create('structure_foam_placeholder')
		.fullBlock(true)
		.material("stone")
		.soundType("stone")
		.unbreakable()
		.tagBlock('wither_immune')
		.displayName('Placeholder Structure Foam')
})
/**
* @param {Internal.BlockEntityJS} entity
*/
global.tick_expanding_structure_foam = entity => {
	let foam = entity.getBlock()
	let dimension = foam.getLevel().getDimension()
	if (dimension == "backrooms:room_forge") {
		if (is_in_empty_room(foam)) {
			expand_structure_foam(foam)
		}
	}
	foam.set("kubejs:structure_foam_placeholder")
}


/**
* @param {Internal.BlockContainerJS} foam
*/
function is_in_empty_room(foam){
	let [pos_x,pos_y,pos_z] = [foam.getX(),foam.getY(),foam.getZ()]
	if (pos_x >= 70 && 114 >= pos_x) {
		if (pos_z >= -22 && 22 >= pos_z) {
			if (pos_y >= 0 && 47 >= pos_y) {
				return true
			}
		}
	}
    return false
}
/**
* @param {Internal.BlockContainerJS} foam
*/
function expand_structure_foam(foam){
	expand_structure_foam_side(foam.getUp())
	expand_structure_foam_side(foam.getDown())
	expand_structure_foam_side(foam.getNorth())
	expand_structure_foam_side(foam.getSouth())
	expand_structure_foam_side(foam.getEast())
	expand_structure_foam_side(foam.getWest())
}
/**
* @param {Internal.BlockContainerJS} foam
*/
function expand_structure_foam_side(foam){
	if (foam.getId() == "minecraft:air") {
		foam.set("kubejs:structure_foam_expanding")
	}
}