/**
* @param {Internal.RecipesEventJS} event
*/
function rescripted_recipes_tinker_changes(event){
    event.remove({type: 'tconstruct:alloy'})
    event.remove({output: 'tconstruct:seared_melter'})
    event.remove({output: 'tconstruct:smeltery_controller'})
	event.shaped('tconstruct:smeltery_controller', [
		'AAA', 
	  	'BCB',
	  	'ADA'  
	  	],{
	  	A: 'tconstruct:seared_brick',
	  	B: 'minecraft:copper_ingot',
		C: 'minecraft:glass',
	  	D: 'immersiveengineering:component_electronic'
  })
}