/**
* @param {Internal.RecipesEventJS} event
*/
function rescripted_recipes_metal_working(event){
	event.recipes.create.compacting('6x create:copper_nugget', [
		'create:fluid_pipe'
	  ]).heatLevel("LOWHEATED2")
}