/**
* @param {Internal.RecipesEventJS} event
*/
function rescripted_recipes_metal_furniture(event){
	event.remove({ mod: 'chimes'})
	event.remove({ mod: 'refurbished_furniture'})
	event.remove({ mod: 'refurbished_furniture', type: 'crafting_shaped' })
	event.remove({ mod: 'refurbished_furniture', type: 'crafting_shapeless' })
	event.remove({ mod: 'refurbished_furniture', type: 'refurbished_furniture:constructing' })
	event.remove({ output: 'supplementaries:safe' })
	event.remove({ output: 'mekanism:basic_chemical_tank' })
	event.remove({ output: 	'minecraft:jukebox' })
	event.remove({ id: 'dustrial_decor:ingot_from_rusty_sheet'})
	event.remove({ id: 'dustrial_decor:ingot_from_sheet'})
	event.shaped('refurbished_furniture:wrench', [
		' A ', 
		' BA',
		'B  '  
		],{
		  A: 'minecraft:iron_ingot', 
		  B: 'minecraft:stick'
	})
	event.shaped('refurbished_furniture:knife', [
		'  A', 
		' B ',
		'   '  
		],{
		  A: 'minecraft:iron_ingot', 
		  B: 'minecraft:stick'
	})
	let melting = (Input, Output, Amount) => {
		event.custom({"type": "tconstruct:melting",

			"ingredient": {
			"item": Input
			},
			"result": {
			"amount": Amount,
			"tag": Output
			},
			"temperature": 800,
			"time": 100
		})
	}

	melting(
		'dustrial_decor:rusty_sheet_metal', 
		'tconstruct:molten_iron', 
		900
	)
	melting(
		'dustrial_decor:sheet_metal', 
		'tconstruct:molten_iron', 
		900
	)

	event.remove({ id: 'refurbished_furniture:constructing/light_fridge' })
	event.remove({ id: 'refurbished_furniture:constructing/dark_fridge' })
	melting(
		'refurbished_furniture:light_fridge', 
		'tconstruct:molten_iron', 
		2160
	)

	melting(
		'refurbished_furniture:light_stove', 
		'tconstruct:molten_iron', 
		900
	)

	melting(
		'kubejs:scrap', 
		'tconstruct:molten_iron', 
		90
	)

	melting(
		'supplementaries:wind_vane', 
		'tconstruct:molten_iron', 
		270
	)

	melting(
		'supplementaries:faucet', 
		'tconstruct:molten_iron', 
		270
	)

	melting(
		'immersiveengineering:fluid_pipe', 
		'tconstruct:molten_iron', 
		45
	)

	melting(
		'chimes:iron_chimes', 
		'tconstruct:molten_iron', 
		270
	)

	melting(
		'supplementaries:candle_holder', 
		'tconstruct:molten_iron', 
		90
	)

	melting(
		'decorative_blocks:brazier', 
		'tconstruct:molten_iron', 
		90
	)

	event.remove({output:'mekanism:radioactive_waste_barrel'})
	melting(
		'mekanism:radioactive_waste_barrel', 
		'tconstruct:molten_lead', 
		630
	)

	event.remove({output:'supplementaries:cannonball'})
	melting(
		'supplementaries:cannonball', 
		'tconstruct:molten_lead', 
		270
	)

	melting(
		'kubejs:battery', 
		'tconstruct:molten_zinc', 
		270
	)

	melting(
		'miners_delight:copper_pot', 
		'tconstruct:molten_copper', 
		450
	)

	melting(
		'create:fluid_pipe', 
		'tconstruct:molten_copper', 
		60
	)

	melting(
		'create:fluid_tank', 
		'tconstruct:molten_copper', 
		90
	)

	melting(
		'chimes:copper_chimes', 
		'tconstruct:molten_copper', 
		270
	)

	event.remove({output:'minecraft:amethyst_cluster'})
	melting(
		'chimes:amethyst_chimes', 
		'tconstruct:molten_amethyst', 
		300
	)

	melting(
		'refurbished_furniture:light_microwave', 
		'tconstruct:molten_tin', 
		900
	)

	melting(
		'refurbished_furniture:red_cooler', 
		'tconstruct:molten_aluminum', 
		450
	)

	melting(
		'refurbished_furniture:recycle_bin', 
		'tconstruct:molten_aluminum', 
		450
	)

	event.custom({"type": "tconstruct:melting",

		"ingredient": {
		"tag": "refurbished_furniture:trampolines"
		},
		"result": {
		"amount": 45,
		"tag": "tconstruct:molten_aluminum"
		},
		"temperature": 800,
		"time": 100
	})

	melting(
		'refurbished_furniture:doorbell', 
		'tconstruct:molten_tin', 
		450
	)

	melting(
		'refurbished_furniture:light_lightswitch', 
		'tconstruct:molten_tin', 
		900
	)

	melting(
		'refurbished_furniture:light_toaster', 
		'tconstruct:molten_nickel', 
		900
	)

	melting(
		'kubejs:pool_tile_golden', 
		'tconstruct:molten_gold', 
		90
	)

	melting(
		'refurbished_furniture:light_electricity_generator', 
		'tconstruct:molten_gold', 
		900
	)

	melting(
		'cfm_wap:light_circuit_breaker', 
		'tconstruct:molten_gold', 
		2250
	)
	melting(
		'cfm_wap:dark_circuit_breaker', 
		'tconstruct:molten_gold', 
		2250
	)

	event.remove({ mod: 'tconstruct', input: 'minecraft:jukebox' })
	melting(
		'minecraft:jukebox', 
		'tconstruct:molten_diamond', 
		100
	)

	melting(
		'refurbished_furniture:computer', 
		'tconstruct:molten_diamond', 
		500
	)

	melting(
		'refurbished_furniture:television', 
		'tconstruct:molten_silver', 
		900
	)

	let iron_melting = (Input) => {
		melting(
			Input, 
			'tconstruct:molten_iron', 
			90
		)
	}
	let signs = [
		'kubejs:arrow1_sign_item',
		'kubejs:arrow2_sign_item',
		'kubejs:liminal_warning_sign_item',
		'kubejs:liminal_warning2_sign_item',
		'kubejs:box_sign_item',
		'kubejs:infinity_sign_item',
		'kubejs:skull_sign_item',
		'kubejs:stop_sign_item',
		'kubejs:explantion1_sign_item',
		'kubejs:explantion2_sign_item',
		'kubejs:unknown1_sign_item',
		'kubejs:cross_sign_item',
		'kubejs:exit_sign_item',
		'kubejs:exit_sign2_item',
		'kubejs:left_arrow_sign_item',
		'kubejs:right_arrow_sign_item',
		'kubejs:nowhere_sign_item',
		'kubejs:monolith_sign_item',
		'kubejs:witahdigroi_sign_item',
		'kubejs:tripple_sign_item',
		'kubejs:turn_back_sign_item',
		'kubejs:inkblod_sign_item'
	]
	for (let index = 0; index < signs.length; index++) {
		let sign = signs[index]
		iron_melting(sign)
		//event.shapeless('kubejs:scrap', [sign]) //removed due to duplicate recipe elsewhere?
		event.recipes.create.milling([Item.of('kubejs:scrap')],sign)
	}
}