ServerEvents.recipes(event => {
	try {
		if (is_recipes_location_cards_enabled()) {recipes_location_cards(event)}
		if (is_recipes_location_cards_enabled()) {recipes_plywood(event)}
	} catch (error) {
		console.log(`Error loading recipe config!`)
		console.log(`§c${error}`)
	}
})
function is_recipes_location_cards_enabled(){
	let file_data = JsonIO.readJson("kubejs/config/recipes.json").asJsonObject
	let enabled = file_data.get("location_cards").asBoolean
	return enabled
}
function is_recipes_plywood_enabled(){
	let file_data = JsonIO.readJson("kubejs/config/recipes.json").asJsonObject
	let enabled = file_data.get("plywood").asBoolean
	return enabled
}
/**
* @param {Internal.RecipesEventJS} event
*/
function recipes_location_cards(event){
	let location_cards = (output,dyes) => {
		event.shapeless(output, [
			'storage_shelves:cardboard',
			dyes
		])
	}
	location_cards('kubejs:brown_location_card','#forge:dyes/brown')
	location_cards('kubejs:red_location_card','#forge:dyes/red')
	location_cards('kubejs:orange_location_card','#forge:dyes/orange')
	location_cards('kubejs:yellow_location_card','#forge:dyes/yellow')
	location_cards('kubejs:lime_location_card','#forge:dyes/lime')
	location_cards('kubejs:green_location_card','#forge:dyes/green')
	location_cards('kubejs:cyan_location_card','#forge:dyes/cyan')
	location_cards('kubejs:light_blue_location_card','#forge:dyes/light_blue')
	location_cards('kubejs:blue_location_card','#forge:dyes/blue')
	location_cards('kubejs:purple_location_card','#forge:dyes/purple')
	location_cards('kubejs:magenta_location_card','#forge:dyes/magenta')
	location_cards('kubejs:pink_location_card','#forge:dyes/pink')
	location_cards('kubejs:white_location_card','#forge:dyes/white')
	location_cards('kubejs:light_gray_location_card','#forge:dyes/light_gray')
	location_cards('kubejs:gray_location_card','#forge:dyes/gray')
	location_cards('kubejs:black_location_card','#forge:dyes/black')
}
/**
* @param {Internal.RecipesEventJS} event
*/
function recipes_plywood(event){
	event.recipes.create.splashing(
		['create:pulp'],
        'dustrial_decor:cardboard_scrap'
	)
	event.recipes.create.pressing(
		['storage_shelves:cardboard'],
		'create:cardboard'
	)
	event.shaped('kubejs:plywood_block', [
		'CCC',
		'CCC',
		'CCC'
		],{
			C: 'storage_shelves:cardboard'
		}
	)
	event.shapeless('storage_shelves:cardboard', "kubejs:plywood_block")
	event.shaped('kubejs:carpet_dust_block', [
		'CCC',
		'CCC',
		'CCC'
		],{
			C: 'kubejs:carpet_dust'
		}
	)
	event.shapeless('kubejs:carpet_dust', "kubejs:carpet_dust_block")
}