ServerEvents.recipes(event => {
	try {
		let enabled = is_recipes_rescripted_oil_processing_enabled()
		if (enabled) {
			recipes_rescripted_oil_processing(event)
		}
	} catch (error) {
		console.log(`Error loading recipe config!`)
		console.log(`§c${error}`)
	}
})
function is_recipes_rescripted_oil_processing_enabled(){
	let file_data = JsonIO.readJson("kubejs/config/recipes.json").asJsonObject
	let enabled = file_data.get("rescripted_oil_processing").asBoolean
	return enabled
}
/**
* @param {Internal.RecipesEventJS} event
*/
function recipes_rescripted_oil_processing(event){
	let rock_gen = (output, adjacent, below) => {
		event.custom({
        	"type": "thermal:rock_gen",
        	"adjacent": adjacent,
        	"below": below,
        	"result": {
            	"item": output
        	}
    	})
	}
	rock_gen('thermal:oil_sand', 'minecraft:water', 'kubejs:oil_carpet')
	rock_gen('thermal:oil_red_sand', 'minecraft:water', 'kubejs:red_oil_carpet')
	event.recipes.create.filling('thermal:oil_sand',['minecraft:sand',Fluid.of('thermal:crude_oil', 50)])
	event.recipes.create.filling('thermal:oil_red_sand',['minecraft:red_sand',Fluid.of('thermal:crude_oil', 50)])
	event.recipes.create.emptying(['minecraft:sand',Fluid.of('thermal:crude_oil', 50)],'thermal:oil_sand')
	event.recipes.create.emptying(['minecraft:red_sand',Fluid.of('thermal:crude_oil', 50)],'thermal:oil_red_sand')
	event.recipes.thermal.crucible(Fluid.of('thermal:crude_oil', 1000), 'kubejs:oil_sponge')
	event.recipes.thermal.crucible(Fluid.of('thermal:crude_oil', 500), 'thermal:oil_sand')
	event.recipes.thermal.crucible(Fluid.of('thermal:crude_oil', 500), 'thermal:oil_red_sand')
}