/**
* @param {Registry.Block} event
*/
function block_registry_grid_blocks(event) {
	event.create('metal_frame')
	.fullBlock(true)
	.mapColor("color_black")
	.soundType("stone")
    .unbreakable()
	.tagBlock('wither_immune')

	event.create('holographic_bedrock')
	.fullBlock(true)
	.material("stone")
	.soundType("deepslate")
	.unbreakable()
	.tagBlock('wither_immune')
	.transparent(true)
	.noCollision()
	.defaultCutout()
	.defaultTranslucent()

	event.create('holographic_wallpaper')
	.fullBlock(true)
	.material("stone")
	.soundType("deepslate")
	.unbreakable()
	.tagBlock('wither_immune')
	.transparent(true)
	.noCollision()
	.defaultCutout()
	.defaultTranslucent()
	.modelJson = {
  		"parent": "minecraft:block/cube_bottom_top",
  		"textures": {
    		"top": "kubejs:block/carpet",
    		"bottom": "kubejs:block/ceilling",
    		"side": "kubejs:block/holographic_wallpaper"
  		}
	}

	event.create('room_node_block')
	.fullBlock(true)
	.mapColor("color_black")
	.soundType("stone")
    .unbreakable()
	.tagBlock('wither_immune')
	.tagBlock('kubejs:room_nodes')
	.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_room_node(entity)
		})
	})

	event.create('event_room_node_block')
	.fullBlock(true)
	.mapColor("color_black")
	.soundType("stone")
    .unbreakable()
	.tagBlock('wither_immune')
	.tagBlock('kubejs:room_nodes')
	.blockEntity(entityInfo => {
		entityInfo.serverTick(100, 0, entity => {
			global.tick_event_room_node(entity)
		})
	})

	event.create('redstone_room_node_block')
	.fullBlock(true)
	.mapColor("color_black")
	.soundType("stone")
    .unbreakable()
	.tagBlock('wither_immune')
	.tagBlock('kubejs:room_nodes')
	.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_redstone_node(entity)
		})
	})

	event.create('unstable_room_node_block')
	.fullBlock(true)
	.mapColor("color_black")
	.soundType("stone")
    .unbreakable()
	.tagBlock('wither_immune')
	.tagBlock('kubejs:room_nodes')
	.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_unstable_node(entity)
		})
	})

	event.create('layered_room_node_block')
	.fullBlock(true)
	.mapColor("color_black")
	.soundType("stone")
    .unbreakable()
	.tagBlock('wither_immune')
	.tagBlock('kubejs:room_nodes')
	.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_layered_node(entity)
		})
	})

	event.create('room_node_block_spawn')
	.fullBlock(true)
	.mapColor("color_black")
	.soundType("stone")
    .unbreakable()
	.tagBlock('wither_immune')
	.tagBlock('kubejs:room_nodes')
	.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_spawn_node(entity)
		})
	})

	event.create('dead_room_node_block')
	.fullBlock(true)
	.mapColor("color_black")
	.soundType("stone")
    .unbreakable()
	.tagBlock('wither_immune')
	.tagBlock('kubejs:room_nodes')
	.blockEntity(entityInfo => {
	})

	event.create('errored_room_node_block')
	.fullBlock(true)
	.mapColor("color_black")
	.soundType("stone")
    .unbreakable()
	.tagBlock('wither_immune')
	.tagBlock('kubejs:room_nodes')
	.blockEntity(entityInfo => {
	})

	event.create('room_node_connector','cardinal')
	.fullBlock(true)
	.mapColor("color_black")
	.soundType("stone")
    .unbreakable()
	.tagBlock('wither_immune')

	event.create('dead_room_node_connector','cardinal')
	.fullBlock(true)
	.mapColor("color_black")
	.soundType("stone")
    .unbreakable()
	.tagBlock('wither_immune')

	event.create('liminalstone')
	.fullBlock(true)
	.mapColor("stone")
	.soundType("stone")
    .unbreakable()
	.tagBlock('wither_immune')
}