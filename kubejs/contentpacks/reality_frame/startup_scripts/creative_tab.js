StartupEvents.registry('creative_mode_tab', event => {
	event.create('reality_frame').icon(() => 'kubejs:reality_controller').content(() => [
		'kubejs:reality_frame',
		'kubejs:reality_charge',
		'kubejs:reality_charge_empty',
		'kubejs:reality_chest',
		'kubejs:reality_controller',
		'kubejs:reality_controller_running',
		'kubejs:reality_spawner',
		'kubejs:reality_alloy',
		'kubejs:reality_storage_empty',
		'kubejs:reality_storage_cell1',
		'kubejs:data_chip1',
		'kubejs:data_chip2',
		'kubejs:data_chip3',
		'kubejs:data_chip4',
		'kubejs:data_chip5',
		'kubejs:data_chip6',
		'kubejs:data_chip7',
		'kubejs:data_chip8',
		'kubejs:data_chip9',
		'kubejs:data_chip10',
		'kubejs:data_chip_infinity',
		'kubejs:data_chip_error'
	])
})
StartupEvents.modifyCreativeTab('kubejs:reality_frame', event => {
	event.displayName = 'Reality Frame'
})
StartupEvents.modifyCreativeTab('kubejs:tab', event => {
	event.remove('kubejs:reality_frame')
	event.remove('kubejs:reality_charge')
	event.remove('kubejs:reality_charge_empty')
	event.remove('kubejs:reality_chest')
	event.remove('kubejs:reality_controller')
	event.remove('kubejs:reality_controller_running')
	event.remove('kubejs:reality_spawner')
	event.remove('kubejs:reality_alloy')
	event.remove('kubejs:reality_storage_empty')
	event.remove('kubejs:reality_storage_cell1')
	event.remove('kubejs:data_chip1')
	event.remove('kubejs:data_chip2')
	event.remove('kubejs:data_chip3')
	event.remove('kubejs:data_chip4')
	event.remove('kubejs:data_chip5')
	event.remove('kubejs:data_chip6')
	event.remove('kubejs:data_chip7')
	event.remove('kubejs:data_chip8')
	event.remove('kubejs:data_chip9')
	event.remove('kubejs:data_chip10')
	event.remove('kubejs:data_chip_infinity')
	event.remove('kubejs:data_chip_error')
})