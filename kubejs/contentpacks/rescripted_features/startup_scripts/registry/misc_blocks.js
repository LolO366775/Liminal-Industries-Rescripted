/**
* @param {Registry.Block} event
*/
function block_registry_misc_blocks(event) {
	event.create('cryptic_block').displayName('Cryptic Block')
	.mapColor("color_light_green")
	.soundType("stone")
	.lightLevel(15)
    .unbreakable()
	.tagBlock('wither_immune')
	.fullBlock(true)
	.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
		})
	})

	event.create('oil_sponge')
	.fullBlock(true)
	.mapColor("color_yellow")
	.soundType("wet_grass")
	.displayName('Oil Soaked Sponge')

	event.create("soulcoal_block").displayName("Soulcoal Block")
	.fullBlock(true)
	.mapColor("color_black")
	.soundType("stone")
	.tagBlock('minecraft:mineable/pickaxe')
	.item(item => {
		item.burnTime(2400)
		item.modelJson({
			"parent": "kubejs:block/soulcoal"
		})
	})

	event.create('half_frame_bottom').displayName('Bottom of a Machine Frame')
		.mapColor('none').hardness(1.5)
		.tagBlock('minecraft:mineable/pickaxe')
		.soundType("lantern")
		.box(11, 5, 11, 16, 8, 16, true)
		.box(0, 5, 11, 5, 8, 16, true)
		.box(11, 5, 0, 16, 8, 5, true)
		.box(0, 5, 0, 5, 8, 5, true)
		.box(5, 0, 11, 11, 5, 16, true)
		.box(5, 0, 0, 11, 5, 5, true)
		.box(11, 0, 0, 16, 5, 16, true)
		.box(0, 0, 0, 5, 5, 16, true)

	event.create('half_frame_top').displayName('Top of a Machine Frame')
		.mapColor('none').hardness(1.5)
		.tagBlock('minecraft:mineable/pickaxe')
		.soundType("lantern")
		.box(11, 0, 0, 16, 5, 5, true)
		.box(0, 0, 0, 5, 5, 5, true)
		.box(11, 0, 11, 16, 5, 16, true)
		.box(0, 0, 11, 5, 5, 16, true)
		.box(5, 5, 0, 11, 10, 5, true)
		.box(5, 5, 11, 11, 10, 16, true)
		.box(11, 5, 0, 16, 10, 16, true)
		.box(0, 5, 0, 5, 10, 16, true)

	event.create('red_tape').displayName('Red Tape')
		.mapColor("color_red")
		.soundType("wool")
		.renderType("translucent")
		.fullBlock(false)
		.box(0, 0, 0, 16, 1, 16)
	    .hardness(0.0)
    	.resistance(0.0)
		.noCollision()
		.item(item => 
			item.modelJson({
			  parent: 'minecraft:item/generated',
			  textures: {
				layer0: `kubejs:item/red_tape_roll`,
			  },
			})
		)
		.placementState(c =>{
		  c.set(BlockProperties.FACING, c.nearestLookingDirection.opposite)}
		)
        .blockstateJson = {
            "variants": {
				"facing=up": {
					"model": `kubejs:block/red_tape_north`,
				},
				"facing=down": {
					"model": `kubejs:block/red_tape_north`,
				},
                "facing=north": {
                    "model": `kubejs:block/red_tape_north`,
                },
                "facing=east": {
                    "model": `kubejs:block/red_tape_east`,
                },
                "facing=south": {
                    "model": `kubejs:block/red_tape_north`,
                },
				"facing=west": {
                    "model": `kubejs:block/red_tape_east`,
                }
        }}
}