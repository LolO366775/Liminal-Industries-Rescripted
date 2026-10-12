/**
* @param {String} id
* @param {String} map_colour
* @param {String} sound_type
* @param {String} display_name
* @param {Registry.Block} event
*/
function register_unbreakable_block_set(event,block_id,map_colour,sound_type,display_name){
	let slab_id = block_id + "_slab"
    let stairs_id = block_id + "_stairs"
	let slab_display = display_name + " Slab"
	let stairs_display = display_name + " Stairs"
    register_unbreakable_block(event,block_id,display_name,map_colour,sound_type)
    register_unbreakable_slab(event,slab_id,slab_display,map_colour,sound_type)
    register_unbreakable_stairs(event,stairs_id,stairs_display,map_colour,sound_type)
}
/**
* @param {String} id
* @param {String} map_colour
* @param {String} sound_type
* @param {String} display_name
* @param {Registry.Block} event
*/
function register_unbreakable_block(event,id,map_colour,sound_type,display_name){
	event.create(id)
	.fullBlock(true)
	.mapColor(map_colour)
	.soundType(sound_type)
	.unbreakable()
	.tagBlock('wither_immune')
	.noDrops()
	.displayName(display_name)
}
/**
* @param {String} id
* @param {String} map_colour
* @param {String} sound_type
* @param {String} display_name
* @param {Registry.Block} event
*/
function register_unbreakable_slab(event,id,map_colour,sound_type,display_name){
	event.create(id, 'slab')
	.mapColor(map_colour)
	.soundType(sound_type)
	.unbreakable()
	.tagBlock('wither_immune')
	.waterlogged()
	.noDrops()
	.displayName(display_name)
}
/**
* @param {String} id
* @param {String} map_colour
* @param {String} sound_type
* @param {String} display_name
* @param {Registry.Block} event
*/
function register_unbreakable_stairs(event,id,map_colour,sound_type,display_name){
	event.create(id, 'stairs')
	.mapColor(map_colour)
	.soundType(sound_type)
	.unbreakable()
	.tagBlock('wither_immune')
	.waterlogged()
	.noDrops()
	.exploded(callback => { //this should fix the issue of stairs being explodable
		global.stairs_exploded(callback)
	})
	.displayName(display_name)
}
/**
* @param {Internal.BlockExplodedCallbackJS} callback
*/
global.stairs_exploded = (callback) => {
	let block = callback.getBlock()
	let block_id = block.getId()
	let block_properties = block.getProperties()
	block.set(block_id,block_properties)
}
/**
* @param {String} id
* @param {String} model
* @param {String} map_colour
* @param {String} sound_type
* @param {String} display_name
* @param {Registry.Block} event
*/
function register_soft_block(event,id,model,map_colour,sound_type,display_name){
	event.create(id).displayName(display_name)
	.model(model)
	.fullBlock(true)
	.mapColor(map_colour)
	.soundType(sound_type)
	.waterlogged() //Poolrooms ADDITION
	.noDrops()
	.noCollision()
}
/**
* @param {String} id
* @param {String} model
* @param {String} map_colour
* @param {String} sound_type
* @param {String} display_name
* @param {Registry.Block} event
*/
function register_fake_block(event,id,model,map_colour,sound_type,display_name){
	event.create(id).displayName(display_name)
	.model(model)
	.fullBlock(true)
	.mapColor(map_colour)
	.soundType(sound_type)
	.waterlogged() //Poolrooms ADDITION
	.noDrops()
	.noCollision()
}