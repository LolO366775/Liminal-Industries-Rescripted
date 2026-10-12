BlockEvents.modification(event => {
	let unbreakable = (block_id) => {
		event.modify(block_id, block => {
			block.explosionResistance = 10000.0
			block.destroySpeed = -1.0
		})
	}
	unbreakable("minecraft:sculk")
	unbreakable("minecraft:spawner")
	unbreakable("waystones:waystone")
	unbreakable("waystones:mossy_waystone")
	unbreakable("waystones:sandy_waystone")
	unbreakable("waystones:deepslate_waystone")
	unbreakable("waystones:blackstone_waystone")
	unbreakable("waystones:end_stone_waystone")
  })