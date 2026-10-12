StartupEvents.registry('block', event => {
	event.create('reality_frame').displayName('Reality Frame')
		.fullBlock(true)
		.material("stone")
		.soundType("netherite_block")
		.tagBlock('minecraft:mineable/pickaxe')

	event.create('reality_charge').displayName('Reality Charge')
		.fullBlock(true)
		.material("stone")
		.soundType("netherite_block")
		.lightLevel(1.0)
		.tagBlock('minecraft:mineable/pickaxe')

	event.create('reality_charge_empty').displayName('Empty Reality Charge')
		.fullBlock(true)
		.material("stone")
		.soundType("netherite_block")
		.tagBlock('minecraft:mineable/pickaxe')

	event.create('reality_chest','cardinal')
		.material("stone")
		.soundType("stone")
		.hardness(2)
		.noDrops()
		.fullBlock(true)
		.blockEntity(entityInfo => {
		})
})

StartupEvents.registry('item', event => {
	event.create('reality_alloy').displayName('Reality Alloy')
	event.create('reality_storage_empty').displayName('Empty Reality Storage Cell')
	event.create('reality_storage_cell1').displayName('Reality Storage Cell')
})
	