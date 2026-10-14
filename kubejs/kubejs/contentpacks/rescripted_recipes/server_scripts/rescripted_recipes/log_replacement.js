/**
* @param {Internal.RecipesEventJS} event
*/
function rescripted_recipes_log_replacement(event){
	let logReplacement = (replace) => {
		event.replaceInput({output: replace}, 'minecraft:oak_log', '#minecraft:planks')
	}
	logReplacement('create:schematicannon')
	logReplacement('create:radial_chassis')
	logReplacement('create:linear_chassis')
	logReplacement('actuallyadditions:fermenting_barrel')
	logReplacement('create:cart_assembler')
	logReplacement('minecraft:smoker')
	logReplacement('sophisticatedbackpacks:smoking_upgrade')
	logReplacement('sophisticatedbackpacks:auto_smoking_upgrade')
}