/**
* @param {Internal.BasicBlockJS$Builder} floor
*/
function modify_floor_tiles_add_random_tick(floor) {
	floor.property(BlockProperties.AGE_3)
	floor.randomTick(tick => {
    	let block = tick.block
		let properties = block.properties
		let age = Number(properties.age)
	    if (age == 3) {
      		block.set('kubejs:carpet')
		} else {
        	block.set(block.getId(), {
          		age: `${age+1}`
        	})
		}
	})
}
/**
* @param {Registry.Block} event
* @param {String} id
*/
function create_generic_floor_tiles(event,id) {
	let floor_tiles = event.create(id)
	floor_tiles.model('kubejs:block/floor_tiles')
	floor_tiles.item(item => 
		item.modelJson({
			"parent": `kubejs:block/floor_tiles`
		})
	)
	floor_tiles.fullBlock(false)
	floor_tiles.mapColor("color_light_gray")
	floor_tiles.soundType("stone")
	floor_tiles.unbreakable()
	floor_tiles.noDrops()
	floor_tiles.tagBlock('wither_immune')
	floor_tiles.fullBlock(false)
	floor_tiles.box(0, 0, 0, 16, 15, 16)
	return floor_tiles
}	
/**
* @param {Registry.Block} event
*/
function block_registry_floors(event) {
	let unbreakable = (id,display_name,map_colour,sound_type) => {
		event.create(id)
		.fullBlock(true)
		.mapColor(map_colour)
		.soundType(sound_type)
		.unbreakable()
		.tagBlock('wither_immune')
		.noDrops()
		.displayName(display_name)
	}
	let unbreakable_slab = (id,display_name,map_colour,sound_type) => {
		event.create(id, 'slab')
		.mapColor(map_colour)
		.soundType(sound_type)
		.unbreakable()
		.tagBlock('wither_immune')
		.waterlogged()
		.noDrops()
		.displayName(display_name)
	}
	let unbreakable_stairs = (id,display_name,map_colour,sound_type) => {
		event.create(id, 'stairs')
		.mapColor(map_colour)
		.soundType(sound_type)
		.unbreakable()
		.tagBlock('wither_immune')
		.waterlogged()
		.noDrops()
		.exploded(callback => { //this should fix the issue of stairs being explodable //it did not //make it a global function?
			log("exploded stairs!")
			let block = callback.getBlock()
			let block_id = block.getId()
			let block_properties = block.getProperties()
			log("exploded stairs2!")
			block.set(block_id,block_properties)
			log("exploded stairs3!")
		})
		.displayName(display_name)
	}
	unbreakable("polished_wood_floor","Polished Wood Floor","color_brown","wood")
	unbreakable_slab("polished_wood_floor_slab","Polished Wood Floor Slab","color_brown","wood")
	unbreakable_stairs("polished_wood_floor_stairs","Polished Wood Floor Stairs","color_brown","wood")
		//normal floor tiles
	let floor_tiles = create_generic_floor_tiles(event,"floor_tiles")
	floor_tiles.displayName('Floor Tiles')
	modify_floor_tiles_add_random_tick(floor_tiles)
		//infinite floor tiles
	let floor_tiles_infinite = create_generic_floor_tiles(event,"floor_tiles_infinite")
	floor_tiles_infinite.displayName('Floor Tiles (Permanent)')
		//full floor tiles
	event.create('floor_tiles_full').displayName('Floor Tiles (Full)')
		.fullBlock(false)
		.mapColor("color_light_gray")
		.soundType("stone")
		.unbreakable()
		.tagBlock('wither_immune')
		.noDrops()
}