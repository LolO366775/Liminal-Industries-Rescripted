ServerEvents.recipes(event => {
	try {
		let enabled = is_recipes_dark_additions_enabled()
		if (enabled) {
			recipes_empowering(event)
		}
	} catch (error) {
		console.log(`Error loading recipe config!`)
		console.log(`§c${error}`)
	}
})
function is_recipes_dark_additions_enabled(){
	let file_data = JsonIO.readJson("kubejs/config/recipes.json").asJsonObject
	let enabled = file_data.get("dark_additions").asBoolean
	return enabled
}
/**
* @param {Internal.RecipesEventJS} event
*/
function recipes_empowering(event){
	let empowering = (output, Input, Input1, Input2, Input3, Input4, time, energy, colour) => {
    event.custom({
		"type": "actuallyadditions:empowering",
		"base": {
		  "item": Input
		},
		"color": colour,
		"energy": energy,
		"modifiers": [
		  {
			"item": Input1
		  },
		  {
			"item": Input2
		  },
		  {
			"item": Input3
		  },
		  {
			"item": Input4
		  }
		],
		"result": {
		  "item": output
		},
		"time": time
	  })
	}
	empowering(
		'kubejs:sculked_sculk_scrubber',
		'kubejs:sculk_scrubber',
		'actuallyadditions:solidified_experience',
		'actuallyadditions:solidified_experience',
		'actuallyadditions:solidified_experience',
		'actuallyadditions:solidified_experience',
		500, 50000, 0
	)

	event.custom({
		"type":"mekanism:metallurgic_infusing",
		"chemicalInput":{"amount":100,"tag":"mekanism:carbon"},
		"itemInput":{"ingredient":{"item":"ae2:charged_certus_quartz_crystal"}},
		"output":{"item":"actuallyadditions:black_quartz"}
	})

	event.recipes.createCrushing([
		'tconstruct:husk_head',
		Item.of('minecraft:rotten_flesh').withChance(0.06),
		Item.of('actuallyadditions:solidified_experience').withChance(0.01)
	],	'tconstruct:husk_head')
	event.recipes.createCrushing([
		'tconstruct:stray_head',
		Item.of('minecraft:bone_meal').withChance(0.06),
		Item.of('eidolon:tattered_cloth').withChance(0.01)
	],	'tconstruct:stray_head')
	event.recipes.createCrushing([
		'minecraft:wither_skeleton_skull',
		Item.of('minecraft:bone_meal').withChance(0.06),
		Item.of('actuallyadditions:tiny_coal').withChance(0.06),
		Item.of('tconstruct:necrotic_bone').withChance(0.01)
	],	'minecraft:wither_skeleton_skull')
	event.recipes.createCrushing([
		'minecraft:skeleton_skull',
		Item.of('minecraft:bone_meal').withChance(0.06),
		Item.of('minecraft:arrow').withChance(0.01)
	],	'minecraft:skeleton_skull')
	event.recipes.createCrushing([
		'minecraft:creeper_head',
		Item.of('minecraft:gunpowder').withChance(0.06),
		Item.of('thermal:sulfur').withChance(0.01)
	],	'minecraft:creeper_head')
	event.recipes.createCrushing([
		'neapolitan:chimpanzee_head',
		Item.of('neapolitan:banana').withChance(0.06)
	],	'neapolitan:chimpanzee_head')

	event.custom({
		"type": "immersiveengineering:coke_oven",
		"creosote": 250,
		"input": {
			"item": "thermal:slag"
		},
		"result": {
			"item": "thermal:rich_slag"
		},
		"time": 100
	})
	event.smelting("thermal:rich_slag", "immersiveengineering:slag_gravel")

	event.custom({
		"type": "create:item_application",
		"ingredients":[
			{"tag": "minecraft:planks"},
			{"item": "eidolon:tattered_cloth"}
		],
		"results": [
			{"item": "kubejs:dark_casing"}
		]
	})
	event.custom({
		"type": "create:item_application",
		"ingredients":[
			{"tag": "minecraft:planks"},
			{"item": "create:rose_quartz"}
		],
		"results": [
			{"item": "kubejs:pink_casing"}
		]
	})
	event.custom({
		"type": "create:item_application",
		"ingredients":[
			{"tag": "minecraft:planks"},
			{"item": "thermal:rich_slag"}
		],
		"results": [
			{"item": "kubejs:rich_casing"}
		]
	})
	event.custom({
		"type": "create:item_application",
		"ingredients":[
			{"item": "kubejs:dark_casing"},
			{"item": "create:shadow_steel"}
		],
		"results": [
			{"item": "create:shadow_steel_casing"}
		]
	})
	event.custom({
		"type": "create:item_application",
		"ingredients":[
			{"item": "kubejs:dark_casing"},
			{"item": "waystones:warp_stone"}
		],
		"results": [
			{"item": "kubejs:dark_dimensional_package_depot"}
		]
	})
	event.custom({
		"type": "create:item_application",
		"ingredients":[
			{"item": "kubejs:pink_casing"},
			{"item": "ae2:fluix_dust"}
		],
		"results": [
			{"item": "kubejs:pink_dimensional_package_depot"}
		]
	})
	event.custom({
		"type": "create:item_application",
		"ingredients":[
			{"item": "kubejs:rich_casing"},
			{"item": "kubejs:unstable_compound"}
		],
		"results": [
			{"item": "kubejs:rich_dimensional_package_depot"}
		]
	})
	let melting_with_byproduct = (Input, Output, Amount, Byproduct, ByAmount) => {
		event.custom({"type": "tconstruct:melting",
			"byproducts": [
    			{
      				"amount": ByAmount,
      				"fluid": Byproduct
    			}
  			],
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
	melting_with_byproduct(
		'minecraft:echo_shard', 
		'tconstruct:molten_amethyst', 
		110,
		'create_enchantment_industry:experience',
		240
	)
	let insolator_growing_sculk = (Input, Output) => {
		event.custom({
       	 	"type": "thermal:insolator",
        	"ingredient": {
            	"item": Input
        	},
        	"result": [
            	{
                	"item": Output,
                	"count": 3
            	}
        	],
        	"experience": 0.15
    	})
	}
	let cloche_growing_sculk = (Input, Output) => {
		event.custom({
        	"type":"immersiveengineering:cloche",
        	"input":{
            	"item":Input
        	},
        	"render":{
            	"type":"generic",
            	"block":Input
        	},
        	"results":[
           	 	{
                	"item":Output,
                	"count": 2
            	}
        	],
        	"soil":{
            	"item":"corrosive_sculk:woven_sculk"
        	},
        	"time":240
    	})
	}
	cloche_growing_sculk("kubejs:sculk_tendrils","kubejs:sculk_tendrils")
	cloche_growing_sculk("kubejs:sculk_shroom","kubejs:sculk_shroom")
	insolator_growing_sculk("kubejs:sculk_tendrils","kubejs:sculk_tendrils")
	insolator_growing_sculk("kubejs:sculk_shroom","kubejs:sculk_shroom")
	event.recipes.create.compacting('actuallyadditions:solidified_experience', ['kubejs:sculk_shroom'])
	event.recipes.create.compacting('actuallyadditions:solidified_experience', ['kubejs:sculk_tendrils'])
}
BlockEvents.rightClicked("kubejs:dark_casing",event => {
	let block = event.getBlock()
	if (block.getId() == "kubejs:dark_casing") {
		let item = event.getItem()
		if (item.getId() == "kubejs:soulcoal") {
			let [pos_x,pos_y,pos_z] = [block.getX() + 0.5,block.getY() + 0.5,block.getZ() + 0.5]
			let level = event.getLevel()
			let chosen_mob = "minecraft:allay"
			if (0.25 > Math.random()) {
				chosen_mob = "minecraft:vex"
			}
			let mob = level.createEntity(chosen_mob)
			mob.setPos(pos_x,pos_y,pos_z)
			mob.spawn()
			level.spawnParticles("minecraft:soul_fire_flame",false,pos_x,pos_y,pos_z,1,1,1,25,0)
			level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.fire.ambient","blocks",1,2)
			block.set("minecraft:air")
			item.shrink(1)
		}
	}
})