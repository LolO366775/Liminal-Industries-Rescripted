StartupEvents.registry('creative_mode_tab', event => {
	event.create('silverfish_cages').icon(() => 'kubejs:empty_wooden_silverfish_cage').content(() => [
		'kubejs:empty_wooden_silverfish_cage',
		'kubejs:wooden_silverfish_cage'
	])
})
StartupEvents.modifyCreativeTab('kubejs:silverfish_cages', event => {
	event.displayName = 'Silverfish Cages'
})
StartupEvents.modifyCreativeTab('kubejs:tab', event => {
	event.remove('kubejs:empty_wooden_silverfish_cage')
	event.remove('kubejs:wooden_silverfish_cage')
})