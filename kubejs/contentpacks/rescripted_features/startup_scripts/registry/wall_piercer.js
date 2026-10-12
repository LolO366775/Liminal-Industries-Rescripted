/**
* @param {Registry.Block} event
*/
function block_registry_wall_piercer(event) {
	let blockstate = {
		"variants": {
			"facing=up": {
				"model": `kubejs:block/wall_destroyer`,
				"x": 180
			},
			"facing=down": {
				"model": `kubejs:block/wall_destroyer`,
				"x": 0
			},
			"facing=north": {
				"model": `kubejs:block/wall_destroyer`,
				"x": 90,
				"y": 180
			},
			"facing=east": {
				"model": `kubejs:block/wall_destroyer`,
				"x": 90,
				"y": 270
			},
			"facing=south": {
				"model": `kubejs:block/wall_destroyer`,
				"x": 90,
				"y": 0
			},
			"facing=west": {
				"model": `kubejs:block/wall_destroyer`,
				"x": 90,
				"y": 90
			}
		}
	}
	event.create('wall_destroyer').displayName('Wall Piercer')
	.fullBlock(true)
	.mapColor("none")
	.soundType("lantern")
	.tagBlock('minecraft:mineable/pickaxe')
	.property(BlockProperties.FACING)
	.placementState(c =>{c.set(BlockProperties.FACING, c.nearestLookingDirection.opposite)})
	.blockstateJson = blockstate
}