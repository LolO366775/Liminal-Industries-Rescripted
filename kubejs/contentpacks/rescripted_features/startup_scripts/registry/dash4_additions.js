/**
* @param {Registry.Block} event
*/
function block_registry_dash4_additions(event) {
	event.create('carpet_dust_block')
	.fullBlock(true)
	.mapColor("sand")
	.soundType("sand")
	.tagBlock('minecraft:mineable/shovel')
	.displayName('Block of Carpet Dust')

	event.create('plywood_block')
	.fullBlock(true)
	.mapColor("wood")
	.soundType("cherry_wood")
	.tagBlock('minecraft:mineable/axe')
	.displayName('Plywood Block')
}