ServerEvents.recipes(event => {
	let dirty_output = "tconstruct:debris_nugget"
	event.remove({id: 'tconstruct:smeltery/melting/metal/netherite/lodestone'})
	event.remove({id:"mekanism:processing/netherite/scrap_to_dust"})
	event.remove({id:"thermal:machines/smelter/smelter_alloy_netherite"})
	event.remove({id:"mekanism:processing/netherite/dirty_scrap_to_scrap"})
	event.recipes.mekanism.enriching(dirty_output,"mekanism:dirty_netherite_scrap")
	event.recipes.thermal.smelter("minecraft:netherite_ingot",["4x minecraft:netherite_scrap","4x eidolon:arcane_gold_ingot"])
	event.recipes.create.compacting('mekanism:dirty_netherite_scrap', ['2x #minecraft:decorated_pot_sherds','eidolon:pewter_ingot','eidolon:enchanted_ash']).heatLevel("LOWHEATED2")
	event.custom({
		"type": "immersiveengineering:blast_furnace",
		"input": {
			"item": "mekanism:dirty_netherite_scrap"
		},
		"result": {
			"item": dirty_output
		},
		"slag": {
			"tag": "forge:slag"
		},
		"time": 1200
	})
	//lodestone
	event.remove({id:"minecraft:lodestone"})
	event.replaceInput({id:"minecraft:netherite_ingot"},"minecraft:gold_ingot","eidolon:arcane_gold_ingot")
	event.shapeless('kubejs:makeshift_lodestone_chunk',['kubejs:concrete_piece','2x immersiveengineering:wirecoil_copper','kubejs:battery'])
	event.recipes.create.item_application('minecraft:lodestone', ['minecraft:chiseled_stone_bricks', 'kubejs:makeshift_lodestone_chunk'])
	event.recipes.create.compacting(Fluid.of("tconstruct:molten_brass",180), 'minecraft:lodestone').heated()
	//bedrock knife
	event.custom({
  		"type": "minecraft:smithing_transform",
  		"addition": {
   			"item": "enderio:grains_of_infinity"
  		},
  		"base": {
   			"item": "farmersdelight:netherite_knife"
  		},
  		"result": {
    		"item": "kubejs:infinity_knife"
  		},
  		"template": {
    		"item": "minecraft:netherite_upgrade_smithing_template"
  		}
	})
})


