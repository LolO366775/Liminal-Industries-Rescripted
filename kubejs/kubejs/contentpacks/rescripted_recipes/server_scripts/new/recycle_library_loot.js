ServerEvents.recipes(event => {

	event.shapeless("farmersdelight:canvas", ["brewinandchewin:coaster"])
	event.remove({id:"brewinandchewin:item_coaster"})
	event.recipes.create.crushing([
		Item.of('farmersdelight:canvas'),
		Item.of('farmersdelight:canvas').withChance(0.5)
	],
		'brewinandchewin:coaster'
	)
	event.recipes.create.crushing([
		Item.of('minecraft:gunpowder'),
		Item.of('minecraft:gunpowder').withChance(0.5),
		Item.of('minecraft:gunpowder').withChance(0.5),
		Item.of('minecraft:gunpowder').withChance(0.5)
	],
		'immersiveengineering:gunpowder_barrel'
	)
	event.recipes.create.crushing([
		Item.of('minecraft:cyan_dye').withChance(0.5)
	],
		'minecraft:warped_wart_block'
	)
	event.recipes.create.crushing([
		Item.of('minecraft:gold_nugget').withChance(0.5),
		Item.of('create:copper_nugget').withChance(0.5),
		Item.of('create:zinc_nugget').withChance(0.5),
		Item.of('minecraft:iron_nugget').withChance(0.5)
	],
		'supplementaries:slidy_block'
	)

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
		'create:package_frogport', 
		'tconstruct:molten_iron', 
		90
	)
	melting(
		'supplementaries:relayer', 
		'tconstruct:molten_iron', 
		90
	)
	melting(
		'immersiveengineering:turntable', 
		'tconstruct:molten_copper', 
		90
	)
	melting(
		'supplementaries:cage', 
		'tconstruct:molten_iron', 
		270
	)

	event.recipes.create.cutting([
		Item.of('immersiveengineering:slab_treated_wood_horizontal', 2)
	],
	'immersiveengineering:workbench'
	)
	event.recipes.create.cutting([
		Item.of('immersiveengineering:slab_treated_wood_horizontal', 2)
	],
	'immersiveengineering:circuit_table'
	)
	event.recipes.create.cutting([
		Item.of('minecraft:oak_slab', 3),
		'minecraft:book'
	],
	'minecraft:lectern'
	)

})