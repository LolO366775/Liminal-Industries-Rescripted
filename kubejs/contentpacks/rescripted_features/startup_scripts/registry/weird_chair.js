/**
* @param {Registry.Block} event
*/
function block_registry_weird_chairs(event) {
	let create_weird_chair = (block_id, model, personality, display_name, ticks) => {
		event.create(block_id,'cardinal')
		.mapColor("fire")
		.soundType("wood")
		.tag("kubejs:weird_chairs")
		.hardness(2)
    	.waterlogged()
		.fullBlock(false)
		.model(model)
		.box(2, 0, 12, 4, 8, 14)
		.box(2, 10, 2, 14, 20, 4)
		.box(2, 8, 2, 14, 10, 14)
		.box(12, 0, 12, 14, 8, 14)
		.box(12, 0, 2, 14, 8, 4)
		.box(2, 0, 2, 4, 8, 4)
		.displayName(display_name)
		.blockEntity(entityInfo => {
			entityInfo.serverTick(ticks, 0, entity => {
				global.tick_weird_chair(entity, personality)
			})
		})
	}
	create_weird_chair("weird_chair","refurbished_furniture:block/oak_chair","scared","Weird Chair (Oak)", 100)
	create_weird_chair("weird_chair_spruce","refurbished_furniture:block/spruce_chair","drunk","Weird Chair (Spruce)", 20)
	create_weird_chair("weird_chair_birch","refurbished_furniture:block/birch_chair","aggressive","Weird Chair (Birch)", 100)
	create_weird_chair("weird_chair_jungle","refurbished_furniture:block/jungle_chair","stalker","Weird Chair (Jungle)", 100)
	create_weird_chair("weird_chair_acacia","refurbished_furniture:block/acacia_chair","none","Weird Chair (Acacia)", 100)
	create_weird_chair("weird_chair_dark_oak","refurbished_furniture:block/dark_oak_chair","none","Weird Chair (Dark Oak)", 20)
	create_weird_chair("weird_chair_mangrove","refurbished_furniture:block/mangrove_chair","none","Weird Chair (Mangrove)", 100)
	create_weird_chair("weird_chair_cherry","refurbished_furniture:block/cherry_chair","none","Weird Chair (Cherry)", 100)
	create_weird_chair("weird_chair_crimson","refurbished_furniture:block/crimson_chair","none","Weird Chair (Crimson)", 100)
	create_weird_chair("weird_chair_warped","refurbished_furniture:block/warped_chair","none","Weird Chair (Warped)", 20)
}