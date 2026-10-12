ServerEvents.recipes(event => {
	event.recipes.botania.petal_apothecary('minecraft:bone', [
            'eidolon:enchanted_ash',
            'eidolon:enchanted_ash',
            'eidolon:enchanted_ash'
    ])
	event.shapeless('kubejs:porcelain_shard', ['eidolon:enchanted_ash','minecraft:clay_ball','minecraft:white_dye'])
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
		'refurbished_furniture:plate', 
		'tconstruct:molten_porcelain', 
		500
	)
	melting(
		'kubejs:porcelain_cup', 
		'tconstruct:molten_porcelain', 
		300
	)
	melting(
		'kubejs:porcelain_shard', 
		'tconstruct:molten_porcelain', 
		100
	)
	event.custom({
  		"type": "tconstruct:casting_table",
  		"cooling_time": 98,
  		"fluid": {
    		"amount": 100,
    		"tag": "tconstruct:molten_porcelain"
  		},
  		"result": "kubejs:porcelain_shard"
	})
	event.recipes.create.crushing([
		Item.of('kubejs:porcelain_shard', 3),
		Item.of('kubejs:porcelain_shard').withChance(0.5)
	],
	'refurbished_furniture:plate'
	)
	event.recipes.create.splashing([
        Item.of('minecraft:clay_ball'),
        Item.of('eidolon:enchanted_ash').withChance(0.75),
        Item.of('minecraft:white_dye').withChance(0.25)
    ],
    'kubejs:porcelain_shard')

	//soups in cups
	event.replaceInput({mod:'miners_delight'}, 'miners_delight:copper_cup', 'kubejs:porcelain_cup')
	event.remove({id:'farmersdelight:cooking/bone_broth'})
	event.remove({id:'minersdelight:cooking/alt_insect_stew'})
	event.remove({id:'farmersdelight:cooking/vegetable_soup'})
	event.remove({id:'farmersdelight:cooking/onion_soup'})
	event.remove({id:'farmersdelight:cooking/mushroom_stew'})
	event.remove({id:'farmersdelight:cooking/beetroot_soup'})
	event.remove({id:'minersdelight:cooking/bat_soup'})
	event.remove({id:'minersdelight:cooking/cave_soup'})
	event.remove({id:'farmersdelight:cooking/baked_cod_stew'})
	event.remove({id:'farmersdelight:cooking/rabbit_stew'})
	event.remove({id:'farmersdelight:cooking/beef_stew'})
	event.remove({id:'farmersdelight:cooking/chicken_soup'})
	event.remove({id:'minersdelight:cooking/insect_stew'})
	event.remove({id:'farmersdelight:cooking/pumpkin_soup'})
	event.remove({id:'farmersdelight:cooking/noodle_soup'})
	event.remove({id:'farmersdelight:cooking/fish_stew'})

	let cooking = (container_id,ingredients,result_id,count) => {
		event.custom({
  			"type": "farmersdelight:cooking",
			"container": {
        		"item": container_id
      		},
  			"cookingtime": 200,
  			"experience": 1.0,
  			"ingredients": ingredients,
  			"recipe_book_tab": "meals",
  			"result": {"item": result_id, "count": count}
		})
	}
	//insect stew
	cooking("minecraft:bowl",[
    	[{"item": "miners_delight:arthropod"},{"item": "miners_delight:crunchy_bar"}],
		[{"item": "miners_delight:arthropod"},{"item": "miners_delight:crunchy_bar"}],
		{"item":"miners_delight:silverfish_eggs"}
  	],"miners_delight:insect_stew",1)
	cooking("kubejs:porcelain_cup",[
		[{"item": "miners_delight:arthropod"},{"item": "miners_delight:crunchy_bar"}],
		{"item":"miners_delight:silverfish_eggs"}
  	],"miners_delight:insect_stew_cup",2)
	//bat soup
	cooking("minecraft:bowl",[
		{"tag": "forge:mushrooms"},
    	{"tag": "forge:foods/bat_wing"},
		{"tag": "forge:foods/bat_wing"}
  	],"miners_delight:bat_soup",1)
	cooking("kubejs:porcelain_cup",[
		{"tag": "forge:mushrooms"},
    	{"tag": "forge:foods/bat_wing"}
  	],"miners_delight:bat_soup_cup",2)
	//cave soup
	cooking("minecraft:bowl",[
    	{"tag": "forge:vegetables/cave_carrot"},
		{"tag": "forge:mushrooms"},
		{"item": "minecraft:red_mushroom"},
		{"item": "minecraft:brown_mushroom"}
  	],"miners_delight:cave_soup",1)
	cooking("kubejs:porcelain_cup",[
    	{"tag": "forge:vegetables/cave_carrot"},
		{"item": "minecraft:red_mushroom"},
		{"item": "minecraft:brown_mushroom"}
  	],"miners_delight:cave_soup_cup",2)
	//baked cod stew
	cooking("minecraft:bowl",[
    	{"tag": "forge:raw_fishes/cod"},
    	{"tag": "forge:crops/potato"},
		{"tag": "forge:eggs"},
		{"tag": "forge:crops/tomato"}
  	],"farmersdelight:baked_cod_stew",1)
	cooking("kubejs:porcelain_cup",[
		{"tag": "forge:raw_fishes/cod"},
		[{"tag": "forge:crops/potato"},{"tag": "forge:crops/tomato"}],
		{"tag": "forge:eggs"}
  	],"miners_delight:baked_cod_stew_cup",2)
	//beef stew
	cooking("minecraft:bowl",[
    	{"tag": "forge:raw_beef"},
		{"tag": "forge:crops/carrot"},
		{"tag": "forge:crops/potato"}
  	],"farmersdelight:beef_stew",1)
	cooking("kubejs:porcelain_cup",[
    	{"tag": "forge:raw_beef"},
		[{"tag": "forge:crops/carrot"},{"tag": "forge:crops/potato"}]
  	],"miners_delight:beef_stew_cup",2)
	//beetroot soup
	cooking("minecraft:bowl",[
    	{"tag": "forge:crops/beetroot"},
    	{"tag": "forge:crops/beetroot"},
    	{"tag": "forge:crops/beetroot"}
  	],"minecraft:beetroot_soup",1)
	cooking("kubejs:porcelain_cup",[
    	{"tag": "forge:crops/beetroot"},
    	{"tag": "forge:crops/beetroot"}
  	],"miners_delight:beetroot_soup_cup",2)
	//beef stew
	cooking("minecraft:bowl",[
		{"tag": "forge:raw_chicken"},
		{"tag": "forge:crops/carrot"},
		{"tag": "forge:salad_ingredients"},
		{"tag": "forge:vegetables"}
  	],"farmersdelight:chicken_soup",1)
	cooking("kubejs:porcelain_cup",[
		{"tag": "forge:raw_chicken"},
		{"tag": "forge:salad_ingredients"},
		{"tag": "forge:vegetables"}
  	],"miners_delight:chicken_soup_cup",2)
	//mushroom stew
	cooking("minecraft:bowl",[
    	{"tag": "forge:mushrooms"},
		{"tag": "forge:mushrooms"}
  	],"minecraft:mushroom_stew",1)
	cooking("kubejs:porcelain_cup",[
		{"tag": "forge:mushrooms"}
  	],"miners_delight:mushroom_stew_cup",2)
	//noodle soup
	cooking("minecraft:bowl",[
    	{"tag": "forge:pasta"},
		{"tag": "forge:eggs"},
		{"item": "minecraft:dried_kelp"},
		{"tag": "forge:raw_pork"}
  	],"farmersdelight:noodle_soup",1)
	cooking("kubejs:porcelain_cup",[
		{"tag": "forge:pasta"},
		{"tag": "forge:eggs"},
		{"item": "minecraft:dried_kelp"}
  	],"miners_delight:noodle_soup_cup",2)
	//onion soup
	cooking("minecraft:bowl",[
		{"tag": "forge:crops/onion"},
		{"tag": "forge:crops/onion"},
		{"tag": "forge:bread"},
		{"tag": "forge:milk"}
  	],"farmersdelight:onion_soup",1)
	cooking("kubejs:porcelain_cup",[
		{"tag": "forge:crops/onion"},
		{"tag": "forge:bread"},
		{"tag": "forge:milk"}
  	],"miners_delight:onion_soup_cup",2)
	//pumpkin soup
	cooking("minecraft:bowl",[
		{"item": "farmersdelight:pumpkin_slice"},
		{"tag": "forge:salad_ingredients"},
		{"tag": "forge:raw_pork"},
		{"tag": "forge:milk"}
  	],"farmersdelight:pumpkin_soup",1)
	cooking("kubejs:porcelain_cup",[
		{"item": "farmersdelight:pumpkin_slice"},
		{"tag": "forge:salad_ingredients"},
		{"tag": "forge:milk"}
  	],"miners_delight:pumpkin_soup_cup",2)
	//rabbit stew
	cooking("minecraft:bowl",[
		{"item": "minecraft:rabbit"},
		{"tag": "forge:crops/potato"},
		{"tag": "forge:crops/carrot"},
		[{"item": "minecraft:brown_mushroom"},{"item": "minecraft:red_mushroom"}]
  	],"minecraft:rabbit_stew",1)
	cooking("kubejs:porcelain_cup",[
		{"item": "minecraft:rabbit"},
		[{"tag": "forge:crops/carrot"},{"tag": "forge:crops/potato"}],
		[{"item": "minecraft:brown_mushroom"},{"item": "minecraft:red_mushroom"}]
  	],"miners_delight:rabbit_stew_cup",2)
	//vegetable soup
	cooking("minecraft:bowl",[
    	{"tag": "forge:crops/carrot"},
		{"tag": "forge:crops/potato"},
		{"tag": "forge:crops/beetroot"},
		{"tag": "forge:salad_ingredients"}
  	],"farmersdelight:vegetable_soup",1)
	cooking("kubejs:porcelain_cup",[
    	{"tag": "forge:crops/carrot"},
		[{"tag": "forge:crops/potato"},{"tag": "forge:crops/beetroot"}],
		{"tag": "forge:salad_ingredients"}
  	],"miners_delight:vegetable_soup_cup",2)
	cooking("minecraft:bowl",[
    	{"item": "minecraft:bone"},
		{"item": "minecraft:bone"},
		{"tag": "forge:mushrooms"}
  	],"farmersdelight:bone_broth",1)
	cooking("kubejs:porcelain_cup",[
    	{"item": "minecraft:bone"},
		{"tag": "forge:mushrooms"}
  	],"miners_delight:bone_broth_cup",2)
})