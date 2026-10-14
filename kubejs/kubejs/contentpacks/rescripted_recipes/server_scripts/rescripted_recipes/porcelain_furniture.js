/**
* @param {Internal.RecipesEventJS} event
*/
function rescripted_recipes_porcelain_furniture(event){

	let crushing = (output, input) => {
		event.recipes.create.milling([
			Item.of(output).withCount(3),
			Item.of(output).withChance(0.5)
		],
		input
		)
	}
	crushing('kubejs:porcelain_shard', '#refurbished_furniture:wooden_kitchen_cabinetry')
	crushing('kubejs:porcelain_shard', '#refurbished_furniture:coloured_kitchen_cabinetry')
	crushing('kubejs:porcelain_shard', '#refurbished_furniture:wooden_kitchen_storage_cabinets')
	crushing('kubejs:porcelain_shard', '#refurbished_furniture:coloured_kitchen_storage_cabinets')
	crushing('kubejs:porcelain_shard', '#refurbished_furniture:wooden_kitchen_drawers')
	crushing('kubejs:porcelain_shard', '#refurbished_furniture:coloured_kitchen_drawers')
	crushing('kubejs:porcelain_shard', '#refurbished_furniture:wooden_kitchen_sinks')
	crushing('kubejs:porcelain_shard', '#refurbished_furniture:coloured_kitchen_sinks')
	crushing('kubejs:porcelain_shard', '#refurbished_furniture:bathroom')

	let tag_melting = (Input, Output, Amount) => {
		event.custom({"type": "tconstruct:melting",

			"ingredient": {
			"tag": Input
			},
			"result": {
			"amount": Amount,
			"tag": Output
			},
			"temperature": 800,
			"time": 100
		})
	}
	tag_melting(
		'#refurbished_furniture:wooden_kitchen_cabinetry', 
		'tconstruct:molten_porcelain', 
		500
	)
	tag_melting(
		'refurbished_furniture:coloured_kitchen_cabinetry', 
		'tconstruct:molten_porcelain', 
		500
	)
	tag_melting(
		'refurbished_furniture:wooden_kitchen_storage_cabinets', 
		'tconstruct:molten_porcelain', 
		500
	)
	tag_melting(
		'refurbished_furniture:coloured_kitchen_storage_cabinets', 
		'tconstruct:molten_porcelain', 
		500
	)
	tag_melting(
		'refurbished_furniture:wooden_kitchen_drawers', 
		'tconstruct:molten_porcelain', 
		500
	)
	tag_melting(
		'refurbished_furniture:coloured_kitchen_drawers', 
		'tconstruct:molten_porcelain', 
		500
	)
	tag_melting(
		'refurbished_furniture:wooden_kitchen_sinks', 
		'tconstruct:molten_porcelain', 
		500
	)
	tag_melting(
		'refurbished_furniture:coloured_kitchen_sinks', 
		'tconstruct:molten_porcelain', 
		500
	)
	tag_melting(
		'refurbished_furniture:bathroom', 
		'tconstruct:molten_porcelain', 
		500
	)
}