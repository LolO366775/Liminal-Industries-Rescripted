/**
* @param {Registry.Block} event
*/
function block_registry_sculk_spawner(event) {
	event.create("sculk_spawner")
	.mapColor("fire")
	.soundType("lantern")
	.unbreakable()
	.tagBlock('wither_immune')
	.fullBlock(true)
	.item(item => 
		item.modelJson({
    		"parent": "kubejs:block/sculk_spawner/off"
		})
	)
	.displayName("Sculk Spawner")
	.property(BlockProperties.POWERED)
	.placementState(c =>{
		c.set(BlockProperties.POWERED, false)}
	)
	.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_sculk_spawner(entity)
		})
	})
	.blockstateJson = {
		"variants": {
			"powered=true": {
				"model": `kubejs:block/sculk_spawner/on`
			},
			"powered=false": {
				"model": `kubejs:block/sculk_spawner/off`
			}
		}
	}
}