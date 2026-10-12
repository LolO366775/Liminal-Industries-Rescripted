ServerEvents.recipes(event => {
	event.shaped(
		'kubejs:compound_sponge',
		[ 
		' B ', 
		' A ',
		'   '  
		],{
		  A: 'kubejs:unstable_compound',
		  B: 'minecraft:sponge'
	}).replaceIngredient({item: 'kubejs:unstable_compound'}, 'minecraft:glass_bottle')
	event.shaped(
		'kubejs:unstable_compound',
		[ 
		' A ', 
		' B ',
		'   '  
		],{
		  A: 'kubejs:compound_sponge', 
		  B: 'minecraft:glass_bottle'
	}).replaceIngredient({item: 'kubejs:compound_sponge'}, 'minecraft:sponge')

	event.recipes.create.filling('kubejs:compound_sponge',['minecraft:sponge',Fluid.of('kubejs:unstable_compound')])
	event.recipes.create.emptying(['minecraft:sponge',Fluid.of('kubejs:unstable_compound')],'kubejs:compound_sponge')
})