/**
* @param {Registry.Block} event
*/
function block_registry_loot_blocks(event) {
	event.create('batteries').displayName('Batteries')
		.mapColor("none")
		.soundType("lantern")
		.renderType("translucent")
		.fullBlock(false)
		.waterlogged() //Poolrooms ADDITION
	    .hardness(0.0)
    	.resistance(0.0)
		.box(2, 0, 2, 14, 6, 14)

	event.create('lithium_ion_batteries').displayName('Lithium-Ion Batteries')
		.mapColor("none")
		.soundType("lantern")
		.renderType("translucent")
		.fullBlock(false)
		.waterlogged() //Poolrooms ADDITION
	    .hardness(0.0)
    	.resistance(0.0)
		.box(2, 0, 2, 14, 6, 14)
}