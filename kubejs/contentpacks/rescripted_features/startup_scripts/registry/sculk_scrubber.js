/**
* @param {Registry.Block} event
*/
function block_registry_sculk_scrubbers(event) {
	event.create('sculk_scrubber')
	.fullBlock(true)
	.material("stone")
	.soundType("lantern")
	.tagBlock('minecraft:mineable/pickaxe')
	.property(BlockProperties.FACING)
	//.displayName('Sculk Scrubber')
	.placementState(c =>{
		c.set(BlockProperties.FACING, c.nearestLookingDirection)}
	)
	.blockstateJson = {
		"variants": {
			"facing=up": {
				"model": `kubejs:block/sculk_scrubber`,
				"x": 180
			},
			"facing=down": {
				"model": `kubejs:block/sculk_scrubber`,
				"x": 0
			},
			"facing=north": {
				"model": `kubejs:block/sculk_scrubber`,
				"x": 90,
				"y": 180
			},
			"facing=east": {
				"model": `kubejs:block/sculk_scrubber`,
				"x": 90,
				"y": 270
			},
			"facing=south": {
				"model": `kubejs:block/sculk_scrubber`,
				"x": 90,
				"y": 0
			},
			"facing=west": {
				"model": `kubejs:block/sculk_scrubber`,
				"x": 90,
				"y": 90
			}
		}
	}
	event.create('sculked_sculk_scrubber')
	.fullBlock(true)
	.material("stone")
	.soundType("lantern")
	.tagBlock('minecraft:mineable/pickaxe')
	.displayName('Sculked Sculk Scrubber')
	.blockEntity(entityInfo => {
		entityInfo.serverTick(10, 0, entity => {
			global.tick_sculk_scrubber(entity)
		})
	})
	.property(BlockProperties.FACING)
	.placementState(c =>{
		c.set(BlockProperties.FACING, c.nearestLookingDirection)}
	)
	.blockstateJson = {
		"variants": {
			"facing=up": {
				"model": `kubejs:block/sculked_sculk_scrubber`,
				"x": 180
			},
			"facing=down": {
				"model": `kubejs:block/sculked_sculk_scrubber`,
				"x": 0
			},
			"facing=north": {
				"model": `kubejs:block/sculked_sculk_scrubber`,
				"x": 90,
				"y": 180
			},
			"facing=east": {
				"model": `kubejs:block/sculked_sculk_scrubber`,
				"x": 90,
				"y": 270
			},
			"facing=south": {
				"model": `kubejs:block/sculked_sculk_scrubber`,
				"x": 90,
				"y": 0
			},
			"facing=west": {
				"model": `kubejs:block/sculked_sculk_scrubber`,
				"x": 90,
				"y": 90
			}
		}
	}
}