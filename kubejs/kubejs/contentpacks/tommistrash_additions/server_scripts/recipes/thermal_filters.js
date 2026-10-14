ServerEvents.recipes(event => {
	event.remove({ id: 'thermal:augments/item_filter_augment' })
	event.shaped('thermal:item_filter_augment', [
		' A ', 
		'ABA',
		' A '  
		],{
		  A: '#forge:nuggets/tin', 
		  B: 'create:filter',
	})
	event.remove({ id: 'thermal:augments/fluid_filter_augment' })
	event.shaped('thermal:fluid_filter_augment', [
		' A ', 
		'ABA',
		' A '  
		],{
		  A: '#forge:nuggets/copper', 
		  B: 'create:filter',
	})
})