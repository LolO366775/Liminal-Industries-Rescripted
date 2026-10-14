ServerEvents.recipes(event => {
	try {
		let enabled = is_recipes_create_connected_enabled()
		if (enabled) {
			recipes_create_connected(event)
		}
	} catch (error) {
		console.log(`Error loading recipe config!`)
		console.log(`§c${error}`)
	}
})
function is_recipes_create_connected_enabled(){
	let file_data = JsonIO.readJson("kubejs/config/recipes.json").asJsonObject
	let enabled = file_data.get("create_connected").asBoolean
	return enabled
}
/**
* @param {Internal.RecipesEventJS} event
*/
function recipes_create_connected(event){
	event.remove({id: 'create_connected:crafting/kinetics/six_way_gearbox_from_gearbox'})
	event.remove({id: 'create_connected:crafting/kinetics/six_way_gearbox_from_parallel'})
	event.remove({id: 'create_connected:crafting/kinetics/six_way_gearbox'})
	event.recipes.create.sequenced_assembly([
    	'create_connected:six_way_gearbox'
    ],
	'create:andesite_casing', [
        event.recipes.createDeploying('create:andesite_casing', ['create:andesite_casing', 'create:large_cogwheel']),
        event.recipes.createDeploying('create:andesite_casing', ['create:andesite_casing', 'create:cogwheel']),
		event.recipes.createDeploying('create:andesite_casing', ['create:andesite_casing', 'create:cogwheel']),
		event.recipes.createDeploying('create:andesite_casing', ['create:andesite_casing', 'create:cogwheel']),
		event.recipes.createDeploying('create:andesite_casing', ['create:andesite_casing', 'create:cogwheel']),
		event.recipes.createDeploying('create:andesite_casing', ['create:andesite_casing', 'create:large_cogwheel'])
    ]).transitionalItem('create:andesite_casing').loops(1)
}