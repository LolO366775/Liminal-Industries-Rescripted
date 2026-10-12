StartupEvents.registry('creative_mode_tab', event => {
	event.create('liminal_beverages').icon(() => 'kubejs:carpet_kvass').content(() => [
		'kubejs:bootleg_vodka',
		'kubejs:wallpaper_kombucha',
		'kubejs:carpet_kvass',
		'kubejs:carpet_dough',
		'kubejs:carpet_loaf',
		'kubejs:almond_beer',
		'kubejs:flaming_ale'
	])
	
})
StartupEvents.modifyCreativeTab('kubejs:liminal_decor', event => {
	event.displayName = 'Liminal Beverages'
})
StartupEvents.modifyCreativeTab('kubejs:tab', event => {
	event.remove('kubejs:bootleg_vodka')
	event.remove('kubejs:wallpaper_kombucha')
	event.remove('kubejs:carpet_kvass')
	event.remove('kubejs:carpet_dough')
	event.remove('kubejs:carpet_loaf')
	event.remove('kubejs:almond_beer')
	event.remove('kubejs:flaming_ale')
})