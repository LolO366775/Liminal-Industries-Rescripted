ServerEvents.recipes(event => {
	try {
		if (is_recipes_slime_seeds_enabled()) {recipes_slime_seeds(event)}
		if (is_recipes_budding_crystals()) {recipes_budding_crystals(event)}
		if (is_recipes_budding_crystal_transmutation_enabled()) {recipes_budding_crystal_transmution(event)}
	} catch (error) {
		console.log(`Error loading recipe config!`)
		console.log(`§c${error}`)
	}
})
function is_recipes_slime_seeds_enabled(){
	let file_data = JsonIO.readJson("kubejs/config/recipes.json").asJsonObject
	let enabled = file_data.get("slime_seeds").asBoolean
	return enabled
}
function is_recipes_budding_crystals(){
	let file_data = JsonIO.readJson("kubejs/config/recipes.json").asJsonObject
	let enabled = file_data.get("budding_crystals").asBoolean
	return enabled
}
function is_recipes_budding_crystal_transmutation_enabled(){
	let file_data = JsonIO.readJson("kubejs/config/recipes.json").asJsonObject
	let enabled = file_data.get("budding_crystal_transmutation").asBoolean
	return enabled
}
/**
* @param {Internal.RecipesEventJS} event
*/
function recipes_slime_seeds(event){
    let slime_seeds = (input, result) => {
    	event.custom({
        	"type": "thermal:insolator",
        	"ingredient": {
            	"item": input
        	},
        	"result": [
            	{
                	"item": input,
                	"chance": 0.9
            	},
            	{
                	"item": result,
                	"chance": 0.1
            	}
        	],
        	"experience": 0.15
    	})
	}
	slime_seeds("tconstruct:ender_slime_dirt","tconstruct:ender_slime_grass_seeds")
	slime_seeds("tconstruct:earth_slime_dirt","tconstruct:sky_slime_grass_seeds")
	slime_seeds("tconstruct:sky_slime_dirt","tconstruct:earth_slime_grass_seeds")
	slime_seeds("tconstruct:ichor_slime_dirt","tconstruct:ichor_slime_grass_seeds")
}
/**
* @param {Internal.RecipesEventJS} event
*/
function recipes_budding_crystals(event){
	event.recipes.thermal.bottler('ae2:flawless_budding_quartz', [
		Fluid.of('actuallyadditions:crystallized_oil', 1000), 
		'ae2:flawed_budding_quartz'])

	event.recipes.thermal.bottler('minecraft:budding_amethyst', [
		Fluid.of('actuallyadditions:crystallized_oil', 1000), 
		'minecraft:amethyst_block'])

	event.recipes.create.mixing(Fluid.of('actuallyadditions:crystallized_oil', 1000), [
		'actuallyadditions:crystallized_canola_seed',
		Fluid.of('actuallyadditions:refined_canola_oil', 1000)
	])
}
/**
* @param {Internal.RecipesEventJS} event
*/
function recipes_budding_crystal_transmution(event){
    let create = (block, item, result) => {
		event.custom({"type": "create:item_application",
			"ingredients":[
				{"item": block},
				{"item": item}
			],
			"results": [
				{"item": result}
			]
		})
	}
	create("tconstruct:budding_sky_slime_crystal", "minecraft:slime_ball", "tconstruct:budding_earth_slime_crystal")
	create("tconstruct:budding_ender_slime_crystal", "minecraft:slime_ball", "tconstruct:budding_earth_slime_crystal")
	create("tconstruct:budding_ichor_slime_crystal", "minecraft:slime_ball", "tconstruct:budding_earth_slime_crystal")
	create("tconstruct:budding_earth_slime_crystal", "tconstruct:sky_slime_ball", "tconstruct:budding_sky_slime_crystal")
	create("tconstruct:budding_ender_slime_crystal", "tconstruct:sky_slime_ball", "tconstruct:budding_sky_slime_crystal")
	create("tconstruct:budding_ichor_slime_crystal", "tconstruct:sky_slime_ball", "tconstruct:budding_sky_slime_crystal")
	create("tconstruct:budding_earth_slime_crystal", "tconstruct:ender_slime_ball", "tconstruct:budding_ender_slime_crystal")
	create("tconstruct:budding_sky_slime_crystal", "tconstruct:ender_slime_ball", "tconstruct:budding_ender_slime_crystal")
	create("tconstruct:budding_ichor_slime_crystal", "tconstruct:ender_slime_ball", "tconstruct:budding_ender_slime_crystal")
	create("tconstruct:budding_earth_slime_crystal", "tconstruct:ichor_slime_ball", "tconstruct:budding_ichor_slime_crystal")
	create("tconstruct:budding_sky_slime_crystal", "tconstruct:ichor_slime_ball", "tconstruct:budding_ichor_slime_crystal")
	create("tconstruct:budding_ender_slime_crystal", "tconstruct:ichor_slime_ball", "tconstruct:budding_ichor_slime_crystal")
}