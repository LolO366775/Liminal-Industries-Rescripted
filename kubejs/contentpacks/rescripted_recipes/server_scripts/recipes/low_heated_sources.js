ServerEvents.recipes(event => {
	event.remove({ output: 'farmersdelight:stove'})
	event.shaped('farmersdelight:stove', [
		'SSS', 
		'BCB',
		'BNB'
		],{
		  S: 'immersiveengineering:ingot_steel', 
		  B: 'minecraft:bricks',
		  C: 'minecraft:campfire',
		  N: 'minecraft:netherrack'
	})
	event.remove({ output: 'mekanism:fuelwood_heater'})
	event.shaped('mekanism:fuelwood_heater', [
		'SES', 
		'LCL',
		'SSS'
		],{
		  S: 'immersiveengineering:ingot_steel', 
		  E: 'create:electron_tube',
		  C: 'kubejs:concrete_burner',
		  L: 'immersiveengineering:component_electronic'
	})
	event.shaped('kubejs:concrete_burner', [
		'AAA', 
		'BCB',
		'BBB'
		],{
		  A: 'create:andesite_alloy', 
		  B: 'immersiveengineering:concrete_brick',
		  C: 'createlowheated:basic_burner'
	})
})