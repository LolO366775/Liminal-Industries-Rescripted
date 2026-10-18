ServerEvents.recipes(event => {

	let colorItem = {
		red: 'neapolitan:strawberries',
		green: 'neapolitan:mint_leaves',
		blue: 'beachparty:coconut_open',
	}
	const almond_setup = (color) => {
		const curr_fluid_water=`kubejs:${color}_almond_water`
		const curr_can=`kubejs:${color}_almond_water_can`
		const empty_can='kubejs:empty_almond_water_can'
		const third_ingrident=colorItem[color] 
		const fillValue=250
//		console.info(curr_can)
		event.recipes.create.filling(curr_can, [Fluid.of(curr_fluid_water, fillValue), empty_can])
		event.recipes.create.emptying([Fluid.of(curr_fluid_water, fillValue),empty_can], curr_can)
		event.recipes.create.mixing(Fluid.of(curr_fluid_water, fillValue),
		 	[Fluid.of('kubejs:carpet_fluid',fillValue),
				 'neapolitan:dried_vanilla_pods',
				  third_ingrident])
		event.recipes.create.mixing(Fluid.of(curr_fluid_water, fillValue), 
			[Fluid.of('kubejs:almond_water',fillValue), third_ingrident]
			)
	}

	almond_setup('blue')
	almond_setup('red')
	almond_setup('green')
})