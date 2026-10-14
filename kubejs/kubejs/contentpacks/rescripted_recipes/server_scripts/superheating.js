ServerEvents.recipes(event => {
	try {
		if (is_recipes_superheating_changes_enabled()) {recipes_superheating_changes(event)}
	} catch (error) {
		console.log(`Error loading recipe config!`)
		console.log(`§c${error}`)
	}
})
function is_recipes_superheating_changes_enabled(){
	let file_data = JsonIO.readJson("kubejs/config/recipes.json").asJsonObject
	let enabled = file_data.get("superheating_changes").asBoolean
	return enabled
}
/**
* @param {Internal.RecipesEventJS} event
*/
function recipes_superheating_changes(event){
	let bioethanol_exists = Fluid.exists('createaddition:bioethanol')
	let ethanol_exists = Fluid.exists('immersiveengineering:ethanol')
	let light_oil_exists = Fluid.exists('thermal:light_oil')
	let heavy_oil_exists = Fluid.exists('thermal:heavy_oil')
	let refined_fuel_exists = Fluid.exists('thermal:refined_fuel')
	let cinder_flour_exists = Item.exists('create:cinder_flour')
	let biomass_exists = Item.exists('createaddition:biomass')
	let cinder_dough_exists = Item.exists('kubejs:cinder_dough')
	let blaze_cake_base_exists = Item.exists('create:blaze_cake_base')
	let sulfur_exists = Item.exists('thermal:sulfur')
	if (bioethanol_exists && ethanol_exists && cinder_flour_exists && biomass_exists) {
		event.remove({id:'createaddition:mixing/bioethanol'})
		event.recipes.create.mixing(Fluid.of('createaddition:bioethanol', 225), [
			Fluid.of('immersiveengineering:ethanol', 225),
			'create:cinder_flour',
			'createaddition:biomass'
		]).superheated()
	}
	if (blaze_cake_base_exists && cinder_dough_exists && light_oil_exists && heavy_oil_exists) {
		event.remove({id:'create:compacting/blaze_cake'})
		event.recipes.create.mixing(Item.of('kubejs:cinder_dough', 3), [
			Fluid.of('thermal:light_oil', 100),
			Item.of('create:cinder_flour', 3)
		])
		event.recipes.create.mixing(Item.of('kubejs:cinder_dough', 3), [
			Fluid.of('thermal:heavy_oil', 50),
			Item.of('create:cinder_flour', 3)
		])
		event.recipes.create.compacting('create:blaze_cake_base', [
			'kubejs:cinder_dough',
			'2x minecraft:sugar'
		])
		event.remove({id:'create:crushing/netherrack'})
		event.remove({id:'createaddition:mixing/netherrack'})
		event.recipes.create.crushing(['create:cinder_flour', Item.of('create:cinder_flour').withChance(0.5)], 'minecraft:nether_wart')
	}
	if (refined_fuel_exists && light_oil_exists) {
		event.remove({id:'thermal:machines/refinery/refinery_light_oil'})
		event.recipes.create.mixing(Fluid.of('thermal:refined_fuel', 100), [
			Fluid.of('thermal:light_oil', 100)
		]).superheated()
	}
	if (sulfur_exists && light_oil_exists) {
		event.recipes.create.mixing("thermal:sulfur", [
			Fluid.of('thermal:light_oil', 100)
		]).superheated()
	}
}