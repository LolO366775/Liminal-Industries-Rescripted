ServerEvents.recipes(event => {

	event.recipes.create.item_application('create:mechanical_pump', ['create:fluid_pipe','create:cogwheel'])

	event.shapeless(
 		 Item.of('create:item_vault', 1), // arg 1: output
		['create_vibrant_vaults:vertical_item_vault']
  	)


	
	//kubejs:empty_almond_water_can
	//neapolitan:mint_leaves
	//beachparty:coconut_open
	//'neapolitan:strawberries'
	//'neapolitan:dried_vanilla_pods', 'neapolitan:strawberries'])
	// event.recipes.create.filling('kubejs:red_almond_water_can',[Fluid.of('kubejs:red_almond_water'), 'kubejs:empty_almond_water_can'])
	// event.recipes.create.emptying([Fluid.of('kubejs:red_almond_water'), 'kubejs:empty_almond_water_can'], 'kubejs:red_almond_water_can')
	// event.recipes.create.mixing('kubejs:red_almond_water', [Fluid.of('kubejs:carpet_fluid'), 'neapolitan:dried_vanilla_pods', 'neapolitan:strawberries'])
})