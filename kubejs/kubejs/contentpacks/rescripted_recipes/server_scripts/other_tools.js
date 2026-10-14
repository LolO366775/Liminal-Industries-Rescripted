ServerEvents.recipes(event => {

  	event.shaped('refurbished_furniture:spatula', [
		'  B', 
		' A ',
		'A  '  
		],{
		A: '#forge:rods/wooden',
		B: '#forge:plates/iron'
  	})
	event.recipes.create.splashing([
		Item.of('thermal:compost'),
        Item.of('thermal:compost').withChance(0.5)
    ],
    	'farmersdelight:organic_compost'
	)
})


