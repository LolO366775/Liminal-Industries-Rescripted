ServerEvents.recipes(event => {

	let timed_crafting = (type, input, output, count, time) => {
		event.custom({
  			"type": type,
  			"category": "food",
 			"ingredient": {
				"item": input
			},
  			"result": {
    			"count": count,
    			"item": output
  			},
  			"time": time
		})
	}
	timed_crafting("refurbished_furniture:oven_baking","minecraft:water_bucket", "refurbished_furniture:sea_salt",4,1200)
	timed_crafting("refurbished_furniture:oven_baking","refurbished_furniture:raw_vegetable_pizza", "refurbished_furniture:cooked_vegetable_pizza",1,1200)
	timed_crafting("refurbished_furniture:oven_baking","refurbished_furniture:raw_meatlovers_pizza", "refurbished_furniture:cooked_meatlovers_pizza",1,1200)
	timed_crafting("refurbished_furniture:oven_baking","minecraft:potato", "minecraft:baked_potato",1,200)
	timed_crafting("refurbished_furniture:microwave_heating","minecraft:potato", "minecraft:baked_potato",1,200)
	timed_crafting("refurbished_furniture:toaster_heating","refurbished_furniture:cheese_sandwich", "refurbished_furniture:cheese_toastie",1,400)
	timed_crafting("refurbished_furniture:toaster_heating","refurbished_furniture:bread_slice", "refurbished_furniture:toast",1,300)
	timed_crafting("refurbished_furniture:freezer_solidifying","kubejs:almond_water_can", "kubejs:ice_cold_almond_water_can",1,600)
	timed_crafting("refurbished_furniture:freezer_solidifying","kubejs:blue_almond_water_can", "kubejs:ice_cold_blue_almond_water_can",1,600)
	timed_crafting("refurbished_furniture:freezer_solidifying","kubejs:green_almond_water_can", "kubejs:ice_cold_green_almond_water_can",1,600)
	timed_crafting("refurbished_furniture:freezer_solidifying","kubejs:red_almond_water_can", "kubejs:ice_cold_red_almond_water_can",1,600)

	event.recipes.create.sequenced_assembly([
        'refurbished_furniture:raw_meatlovers_pizza'
    ], 'refurbished_furniture:dough', [
        event.recipes.createDeploying('refurbished_furniture:dough', ['refurbished_furniture:dough', 'minecraft:cooked_beef']),
        event.recipes.createDeploying('refurbished_furniture:dough', ['refurbished_furniture:dough', 'minecraft:cooked_chicken']),
		event.recipes.createDeploying('refurbished_furniture:dough', ['refurbished_furniture:dough', 'minecraft:cooked_porkchop']),
		event.recipes.createDeploying('refurbished_furniture:dough', ['refurbished_furniture:dough', 'refurbished_furniture:cheese']),
    ]).transitionalItem('refurbished_furniture:dough').loops(1)

	 event.recipes.create.sequenced_assembly([
        'refurbished_furniture:raw_vegetable_pizza'
    ], 'refurbished_furniture:dough', [
        event.recipes.createDeploying('refurbished_furniture:dough', ['refurbished_furniture:dough', 'minecraft:carrot']),
        event.recipes.createDeploying('refurbished_furniture:dough', ['refurbished_furniture:dough', 'minecraft:beetroot']),
		event.recipes.createDeploying('refurbished_furniture:dough', ['refurbished_furniture:dough', 'minecraft:potato']),
		event.recipes.createDeploying('refurbished_furniture:dough', ['refurbished_furniture:dough', 'refurbished_furniture:cheese']),
    ]).transitionalItem('refurbished_furniture:dough').loops(1)

	let cutting = (output, input) => {
		event.recipes.farmersdelight.cutting(
			input, "#forge:tools/knives",
			[output]
		)
	}
	cutting('6x refurbished_furniture:meatlovers_pizza_slice','refurbished_furniture:cooked_meatlovers_pizza')
	cutting('6x refurbished_furniture:vegetable_pizza_slice','refurbished_furniture:cooked_vegetable_pizza')
})