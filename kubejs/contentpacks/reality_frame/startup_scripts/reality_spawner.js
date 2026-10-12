StartupEvents.registry('block', event => {
	event.create('reality_spawner')
	.material("stone")
	.soundType("stone")
	.hardness(2)
	.transparent(true)
	.defaultCutout()
	.fullBlock(true)
})