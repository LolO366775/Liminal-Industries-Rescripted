StartupEvents.registry('creative_mode_tab', event => {
	event.create('rescripted_agriculture').icon(() => 'kubejs:uncanny_shroom').content(() => [
		'kubejs:rotten_wallpaper_block',
		'kubejs:strange_bricks',
		'kubejs:infected_strange_bricks',
		'kubejs:uncanny_shroom',
		'kubejs:uncanny_shroom_seeds',
		'kubejs:corrosive_fungi',
		'kubejs:rotten_wallpaper'

	])
})
StartupEvents.modifyCreativeTab('kubejs:rescripted_agriculture', event => {
	event.displayName = 'Rescripted Agriculture'
})
StartupEvents.modifyCreativeTab('kubejs:tab', event => {
	event.remove('kubejs:rotten_wallpaper_block')
	event.remove('kubejs:strange_bricks')
	event.remove('kubejs:infected_strange_bricks')
	event.remove('kubejs:uncanny_shroom')
	event.remove('kubejs:uncanny_shroom_seeds')
	event.remove('kubejs:corrosive_fungi')
	event.remove('kubejs:rotten_wallpaper')
})