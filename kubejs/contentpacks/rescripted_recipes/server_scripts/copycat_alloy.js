ServerEvents.recipes(event => {
	try {
		if (is_recipes_copycat_alloy_enabled()) {recipes_copycat_alloy(event)}
	} catch (error) {
		console.log(`Error loading recipe config!`)
		console.log(`§c${error}`)
	}
})
function is_recipes_copycat_alloy_enabled(){
	let file_data = JsonIO.readJson("kubejs/config/recipes.json").asJsonObject
	let enabled = file_data.get("copycat_alloy").asBoolean
	return enabled
}
/**
* @param {Internal.RecipesEventJS} event
*/
function recipes_copycat_alloy(event){
	event.shaped('minecraft:stonecutter', [
		' S ',
		'CCC'  
		],{
		S: 'kubejs:scrap',
		C: 'immersiveengineering:concrete'
  		}
	)

	event.recipes.create.mixing('1x kubejs:copycat_alloy', [
		'kubejs:concrete_piece',
		'minecraft:clay_ball'
	]).heatLevel("LOWHEATED2")
	event.recipes.create.mixing('2x kubejs:copycat_alloy', [
		'create:zinc_ingot',
		'minecraft:iron_ingot'
	]).heatLevel("LOWHEATED2")
	
	let alloying = (output, Input1, Input2, count, time) => {
    event.custom({
		"type": "immersiveengineering:alloy",
		"input0": {
		  "item": Input1
		},
		"input1": {
		  "base_ingredient": {
			"item": Input2
		  }
		},
		"result": {
		  "item": output,
		  "count": count
		},
		"time": time
	  })
	}

	alloying(
		'kubejs:copycat_alloy',
		'minecraft:clay_ball', 
		'kubejs:concrete_piece',
		1, 200
	)
	alloying(
		'kubejs:copycat_alloy',
		'create:zinc_ingot', 
		'minecraft:iron_ingot', 
		2, 200
	)

	event.replaceInput(
		{id:"copycats:crafting/copycat_block"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_trapdoor"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_slope_layer"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_slope_byte"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_slope"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_vertical_stairs"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_vertical_half_layer"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_wooden_button"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_folding_door"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_slab"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_stairs"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_vertical_step"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_byte"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_iron_trapdoor"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_heavy_weighted_pressure_plate"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_half_panel"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_sliding_door"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_vertical_slice"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_vertical_slope"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_flat_pane"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_light_weighted_pressure_plate"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_wooden_pressure_plate"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_stone_pressure_plate"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_stone_button"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_board"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_ladder"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_corner_slice"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_door"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_beam"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_stacked_half_layer"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_layer"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_half_layer"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_slice"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_fence"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_pane"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_wall"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_ghost_block"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_layer"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_fence_gate"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_byte_panel"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_shaft"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"create:copycat_panel_from_ingots_zinc_stonecutting"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"create:copycat_step_from_ingots_zinc_stonecutting"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_iron_door"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_cogwheel"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_large_cogwheel"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
	event.replaceInput(
		{id:"copycats:crafting/copycat_fluid_pipe"},
  		"create:zinc_ingot",
  		"kubejs:copycat_alloy"
	)
}