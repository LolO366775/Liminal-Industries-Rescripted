/**
* @param {Internal.RecipesEventJS} event
*/
function rescripted_recipes_cooking(event){
  //powder_snow
  event.recipes.create.mixing(Fluid.of("tconstruct:powdered_snow"),["4x neapolitan:ice_cubes",Fluid.of("minecraft:water")])
  event.recipes.create.mixing(["kubejs:ice_cold_almond_water_can",Fluid.of("tconstruct:powdered_snow")],["kubejs:almond_water_can","4x neapolitan:ice_cubes",Fluid.of("minecraft:water")])
  event.recipes.create.mixing(["kubejs:ice_cold_blue_almond_water_can",Fluid.of("tconstruct:powdered_snow")],["kubejs:blue_almond_water_can","4x neapolitan:ice_cubes",Fluid.of("minecraft:water")])
  event.recipes.create.mixing(["kubejs:ice_cold_red_almond_water_can",Fluid.of("tconstruct:powdered_snow")],["kubejs:red_almond_water_can","4x neapolitan:ice_cubes",Fluid.of("minecraft:water")])
  event.recipes.create.mixing(["kubejs:ice_cold_green_almond_water_can",Fluid.of("tconstruct:powdered_snow")],["kubejs:green_almond_water_can","4x neapolitan:ice_cubes",Fluid.of("minecraft:water")])
  event.recipes.create.mixing(["kubejs:ice_cold_almond_water_can",Fluid.of("tconstruct:powdered_snow")],["kubejs:almond_water_can",Fluid.of("tconstruct:powdered_snow")])
  event.recipes.create.mixing(["kubejs:ice_cold_blue_almond_water_can",Fluid.of("tconstruct:powdered_snow")],["kubejs:blue_almond_water_can",Fluid.of("tconstruct:powdered_snow")])
  event.recipes.create.mixing(["kubejs:ice_cold_red_almond_water_can",Fluid.of("tconstruct:powdered_snow")],["kubejs:red_almond_water_can",Fluid.of("tconstruct:powdered_snow")])
  event.recipes.create.mixing(["kubejs:ice_cold_green_almond_water_can",Fluid.of("tconstruct:powdered_snow")],["kubejs:green_almond_water_can",Fluid.of("tconstruct:powdered_snow")])
  //almond water
  let pot_cooking = (container, ingredients, output) => {
    event.custom({
      "type": "farmersdelight:cooking",
      "container": {
        "item": container
      },
      "cookingtime": 200,
      "experience": 1.0,
      "ingredients": ingredients,
      "recipe_book_tab": "misc",
      "result": {
        "count": 1,
        "item": output
      }
    })
  }
  let mini_fridge = (input,output) => {
    event.custom({
		"type": "beachparty:mini_fridge_freezing",
		"ingredients": [{
     		"item": input
  		}],
		"result": {
    		"item": output
  		},
		"crafting_time": 600
	  })
  }

  event.shapeless("kubejs:scrap", ["kubejs:empty_almond_water_can"])
  event.custom({
		"type":"createaddition:rolling",
		"input": {
	      	"item": "kubejs:scrap"
		},
		"result": {
			"item": "kubejs:empty_almond_water_can",
			"count": 1
		}
	})
  pot_cooking("minecraft:glass_bottle",[{"item": "kubejs:cut_carpet"}],"kubejs:carpet_fluid")
  pot_cooking("kubejs:empty_almond_water_can",[{"item": "kubejs:cut_carpet"},{"item": "neapolitan:dried_vanilla_pods"}],"kubejs:almond_water_can")
  pot_cooking("kubejs:empty_almond_water_can",[{"item": "kubejs:cut_carpet"},{"item": "neapolitan:dried_vanilla_pods"},{"item": "beachparty:coconut_open"}],"kubejs:blue_almond_water_can")
  pot_cooking("kubejs:empty_almond_water_can",[{"item": "kubejs:cut_carpet"},{"item": "neapolitan:dried_vanilla_pods"},{"item": "neapolitan:mint_leaves"}],"kubejs:green_almond_water_can")
  pot_cooking("kubejs:empty_almond_water_can",[{"item": "kubejs:cut_carpet"},{"item": "neapolitan:dried_vanilla_pods"},{"tag": "forge:fruits/strawberry"}],"kubejs:red_almond_water_can")
  mini_fridge("kubejs:almond_water_can","kubejs:ice_cold_almond_water_can")
  mini_fridge("kubejs:blue_almond_water_can","kubejs:ice_cold_blue_almond_water_can")
  mini_fridge("kubejs:green_almond_water_can","kubejs:ice_cold_green_almond_water_can")
  mini_fridge("kubejs:red_almond_water_can","kubejs:ice_cold_red_almond_water_can")
  event.recipes.thermal.chiller("kubejs:ice_cold_almond_water_can",[Fluid.of("minecraft:water",250),"kubejs:almond_water_can"])
  event.recipes.thermal.chiller("kubejs:ice_cold_blue_almond_water_can",[Fluid.of("minecraft:water",250),"kubejs:blue_almond_water_can"])
  event.recipes.thermal.chiller("kubejs:ice_cold_green_almond_water_can",[Fluid.of("minecraft:water",250),"kubejs:green_almond_water_can"])
  event.recipes.thermal.chiller("kubejs:ice_cold_red_almond_water_can",[Fluid.of("minecraft:water",250),"kubejs:red_almond_water_can"])
  event.remove({id: 'minecraft:campfire'})
  event.remove({id: 'minecraft:soul_campfire'})
  event.shaped('minecraft:campfire', [
    ' C ', 
    'CBC',
    'AAA'  
    ],{
      A: '#minecraft:planks', 
      B: 'minecraft:charcoal',
      C: 'minecraft:stick'
  })
  event.remove({output: 'miners_delight:weird_caviar'})
	event.shapeless('2x miners_delight:weird_caviar', ['minecraft:bowl','minecraft:bowl','miners_delight:silverfish_eggs'])
  //pot_cooking("minecraft:glass_bottle",[{"item": "minecraft:sweet_berries"},{"tag": "forge:fruits/strawberry"},{"item": "miners_delight:silverfish_eggs"},{"item": "minecraft:sugar"}],"kubejs:liminal_jam")
  pot_cooking("refurbished_furniture:toast",[{"item": "minecraft:sweet_berries"},{"item": "minecraft:sweet_berries"},{"item": "minecraft:sugar"}],"refurbished_furniture:sweet_berry_jam_toast")
  pot_cooking("refurbished_furniture:toast",[{"item": "minecraft:glow_berries"},{"item": "minecraft:glow_berries"},{"item": "minecraft:sugar"}],"refurbished_furniture:glow_berry_jam_toast")
  pot_cooking("minecraft:sugar",[{"item": "minecraft:sweet_berries"},{"item": "minecraft:sweet_berries"},{"item": "minecraft:sweet_berries"}],"refurbished_furniture:sweet_berry_jam")
  pot_cooking("minecraft:sugar",[{"item": "minecraft:glow_berries"},{"item": "minecraft:glow_berries"},{"item": "minecraft:glow_berries"}],"refurbished_furniture:glow_berry_jam")
  event.shapeless('brewinandchewin:sweet_berry_jam', ['minecraft:glass_bottle','refurbished_furniture:sweet_berry_jam'])
  event.shapeless('brewinandchewin:glow_berry_marmalade', ['minecraft:glass_bottle','refurbished_furniture:glow_berry_jam'])
  event.shapeless('refurbished_furniture:sweet_berry_jam_toast', ['refurbished_furniture:toast','refurbished_furniture:sweet_berry_jam'])
  event.shapeless('refurbished_furniture:glow_berry_jam_toast', ['refurbished_furniture:toast','refurbished_furniture:glow_berry_jam'])
  event.recipes.create.milling([
		Item.of('minecraft:sugar').withChance(0.5)
	],
	'minecraft:sweet_berries'
	)
  event.recipes.farmersdelight.cutting(
    "3x minecraft:bread",
    "#forge:tools/knives", [
      Item.of("refurbished_furniture:bread_slice")
    ]
	)
  event.smelting('refurbished_furniture:toast', 'refurbished_furniture:bread_slice')
  try {
    event.recipes.create.mixing(Fluid.of('kubejs:carpet_fluid', 250), [Fluid.of('minecraft:water', 250), 'kubejs:cut_carpet'])
    event.recipes.create.mixing(Fluid.of('kubejs:almond_water', 250), [Fluid.of('kubejs:carpet_fluid', 250), 'neapolitan:dried_vanilla_pods'])
    event.recipes.create.mixing(Fluid.of('kubejs:unstable_compound', 250), [Fluid.of('kubejs:carpet_fluid', 250), 'thermal:redstone_mushroom_spores'])
    event.recipes.create.mixing(Fluid.of('kubejs:liquid_pain', 250), [Fluid.of('kubejs:almond_water', 250), Fluid.of('kubejs:unstable_compound', 250)])
    event.recipes.create.mixing('minecraft:gunpowder', [Fluid.of('kubejs:liquid_pain', 250), 'minecraft:flint'])
	  event.recipes.create.filling('kubejs:carpet_fluid',['minecraft:glass_bottle',Fluid.of('kubejs:carpet_fluid', 250)])
	  event.recipes.create.emptying(['minecraft:glass_bottle',Fluid.of('kubejs:carpet_fluid', 250)],'kubejs:carpet_fluid')
	  event.recipes.create.filling('kubejs:unstable_compound',['minecraft:glass_bottle',Fluid.of('kubejs:unstable_compound', 250)])
	  event.recipes.create.emptying(['minecraft:glass_bottle',Fluid.of('kubejs:unstable_compound', 250)],'kubejs:unstable_compound')
	  event.recipes.create.filling('kubejs:almond_water_can',['kubejs:empty_almond_water_can',Fluid.of('kubejs:almond_water', 250)])
	  event.recipes.create.emptying(['kubejs:empty_almond_water_can',Fluid.of('kubejs:almond_water', 250)],'kubejs:almond_water_can')
	  event.recipes.create.filling('kubejs:liquid_pain_can_hidden',['kubejs:empty_almond_water_can',Fluid.of('kubejs:liquid_pain', 250)])
	  event.recipes.create.emptying(['kubejs:empty_almond_water_can',Fluid.of('kubejs:liquid_pain', 250)],'kubejs:liquid_pain_can_hidden')
	  event.shapeless("kubejs:unstable_compound", ["thermal:redstone_mushroom_spores","kubejs:carpet_fluid"])		
	} catch (error) {} //this would cut off the module if it failed. maybe displaying the reason in the config?
}