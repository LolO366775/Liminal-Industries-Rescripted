/*ServerEvents.recipes(event => {
	try {
		let enabled = is_recipes_quartz_processing_enabled()
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
/*function recipes_empowering(event){
	event.recipes.create.crushing(Item.of('thermal:quartz_dust').withChance(0.5), 'kubejs:pool_tile')
}*/