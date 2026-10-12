ServerEvents.recipes(event => {
	recipes_soulcoal(event)
})
/**
* @param {Internal.RecipesEventJS} event
*/
function recipes_soulcoal(event){
	event.remove({id: 'tconstruct:smeltery/casting/soul/glass'})
	event.remove({id: 'tconstruct:smeltery/casting/soul/pane'})

	event.smelting('tconstruct:soul_glass', 'minecraft:soul_sand')
	event.replaceInput({id: 'create:smelting/scoria'}, 'minecraft:soul_sand', 'minecraft:soul_soil')
	event.shapeless('9x kubejs:soulcoal', ['kubejs:soulcoal_block'])
	event.shaped('kubejs:soulcoal_block', [
    	'SSS', 
    	'SSS',
    	'SSS'  
    ],{
      S: 'kubejs:soulcoal'
  	})
	event.shaped('16x tconstruct:soul_glass_pane', [
    	'SSS',
    	'SSS'  
    ],{
      S: 'tconstruct:soul_glass'
  	})

	event.recipes.create.crushing([
		Item.of('immersiveengineering:dust_saltpeter').withChance(0.4),
		Item.of('thermal:sulfur_dust').withChance(0.1),
		Item.of('actuallyadditions:tiny_charcoal').withChance(0.1)
	],
		'kubejs:soulcoal'
	)
	event.recipes.create.crushing([
		Item.of('kubejs:soulcoal').withCount(9)
	],
		'kubejs:soulcoal_block'
	)
	event.recipes.create.haunting(Item.of('eidolon:soul_shard').withChance(0.25), 'kubejs:soulcoal')

	event.custom({
  		"type": "tconstruct:casting_basin",
  		"cooling_time": 195,
  		"fluid": {
    		"amount": 1000,
    		"tag": "tconstruct:liquid_soul"
  		},
  		"result": "kubejs:soulcoal_block"
	})
	event.custom({
  		"type": "tconstruct:casting_table",
  		"cooling_time": 98,
  		"fluid": {
    		"amount": 250,
    		"tag": "tconstruct:liquid_soul"
  		},
  		"result": "kubejs:soulcoal"
	})
	event.remove({output: 'tconstruct:seared_fuel_gauge'})
	event.remove({output: 'tconstruct:scorched_fuel_gauge'})
	event.recipes.minecraft.stonecutting("tconstruct:seared_fuel_gauge", "tconstruct:seared_fuel_tank")
	event.recipes.minecraft.stonecutting("tconstruct:scorched_fuel_gauge", "tconstruct:scorched_fuel_tank")
	event.recipes.minecraft.stonecutting("tconstruct:seared_fuel_tank", "tconstruct:seared_fuel_gauge")
	event.recipes.minecraft.stonecutting("tconstruct:scorched_fuel_tank", "tconstruct:scorched_fuel_gauge")
}

