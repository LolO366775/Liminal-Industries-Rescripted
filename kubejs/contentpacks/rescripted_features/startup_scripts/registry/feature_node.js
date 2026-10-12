/**
* @param {Registry.Block} event
*/
function block_registry_feature_node(event) {
	event.create('feature_node')
	.material("stone")
	.soundType("stone")
	.unbreakable()
	.fullBlock(true)
	.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_feature_node(entity)
		})
	})
}