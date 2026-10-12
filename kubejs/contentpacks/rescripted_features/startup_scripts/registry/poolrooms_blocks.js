/**
* @param {Registry.Block} event
*/
function block_registry_poolrooms_blocks(event) {
	let soft_block = (id,display_name,model,map_colour,sound_type) => {
		event.create(id).displayName(display_name)
		.model(model)
		.fullBlock(true)
		.mapColor(map_colour)
		.soundType(sound_type)
		.waterlogged() //Poolrooms ADDITION
		.noDrops()
		.noCollision()
	}
	let unbreakable = (id,display_name) => {
	event.create(id)
		.fullBlock(true)
		.material("stone")
		.soundType("stone")
		.unbreakable()
		.tagBlock('wither_immune')
		.displayName(display_name)
	}
	let unbreakable_slab = (id,display_name) => {
	event.create(id, 'slab')
		.fullBlock(true)
		.material("stone")
		.soundType("stone")
		.unbreakable()
		.tagBlock('wither_immune')
		.displayName(display_name)
	}
	let unbreakable_stairs = (id,display_name) => {
	event.create(id, 'stairs')
		.fullBlock(true)
		.material("stone")
		.soundType("stone")
		.unbreakable()
		.tagBlock('wither_immune')
		.displayName(display_name)
	}
	soft_block("pool_tiles_soft","Pool Tiles","kubejs:block/pool_tiles","quartz","deepslate")
	soft_block("long_pool_tiles_soft","Pool Tiles (Long)","kubejs:block/pool_tiles","quartz","deepslate")
	unbreakable("pool_tiles","Pool Tiles","quartz","deepslate")
	unbreakable_slab("pool_tiles_slab","Pool Tiles Slab","quartz","deepslate")
	unbreakable_stairs("pool_tiles_stairs","Pool Tiles Stairs","quartz","deepslate")
	unbreakable("long_pool_tiles","Pool Tiles (Long)","quartz","deepslate")
	unbreakable_slab("long_pool_tiles_slab","Pool Tiles Slab (Long)","quartz","deepslate")
	unbreakable_stairs("long_pool_tiles_stairs","Pool Tiles Stairs (Long)","quartz","deepslate")

	event.create('missing_tiles_half_perm').displayName('Missing Pool Tiles (Permanent)')
		.fullBlock(true)
		.material("stone")
		.soundType("deepslate")
		.unbreakable()
		.tagBlock('wither_immune')
		.item(item => item.modelJson({"parent": 'kubejs:block/missing_tiles1'}))

	/*event.create('sky_morning_block').displayName('Morning Sky Block')
		.fullBlock(true)
		.material("stone")
		.soundType("deepslate")
		.unbreakable()
		.tagBlock('wither_immune')
		.transparent(true)
		.defaultCutout()

	event.create('sky_day_block').displayName('Day Sky Block')
		.fullBlock(true)
		.material("stone")
		.soundType("deepslate")
		.unbreakable()
		.tagBlock('wither_immune')
		.transparent(true)
		.defaultCutout()

	event.create('sky_sunset_block').displayName('Sunset Sky Block')
		.fullBlock(true)
		.material("stone")
		.soundType("deepslate")
		.unbreakable()
		.tagBlock('wither_immune')
		.transparent(true)
		.defaultCutout()

	event.create('sky_night_block').displayName('Night Sky Block')
		.fullBlock(true)
		.material("stone")
		.soundType("deepslate")
		.unbreakable()
		.tagBlock('wither_immune')
		.transparent(true)
		.defaultCutout()*/

	event.create('poolrooms_portal').displayName('Poolrooms Entrance')
		.material("lantern")
		.soundType("lantern")
		.unbreakable()
		.tagBlock('wither_immune')
		.fullBlock(true)
		.box(0, 0, 0, 16, 15, 16)
		.lightLevel(1.0)

	event.create('liminalstone_poolrooms').displayName('Liminalstone')
		.fullBlock(true)
		.material("stone")
		.soundType("stone")
        .unbreakable()
		.tagBlock('wither_immune')
}