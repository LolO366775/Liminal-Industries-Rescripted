/**
* @param {Registry.Block} event
*/
function block_registry_shop_terminal(event) {
	event.create('shop_terminal','cardinal')
	.fullBlock(true)
	.material("wood")
	.soundType("wood")
    .tagBlock('minecraft:mineable/pickaxe')
	.tagBlock('minecraft:mineable/axe')
	.blockEntity(entityInfo => {})
}
/**
* @param {Registry.Item} event
*/
function item_registery_furniture_catologue(event) {
	event.create('furniture_catalogue').displayName('Furniture Catalogue')
}