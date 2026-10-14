/**
* @param {Internal.RecipesEventJS} event
*/
function rescripted_recipes_books(event){
	event.remove({output: 'minecraft:book'})
	event.shapeless('minecraft:book', [
		'3x minecraft:paper',
		'minecraft:leather'
	])
	event.remove({id: 'eccentrictome:tome'})
	event.shapeless('eccentrictome:tome', [
		'kubejs:wallpaper',
		'kubejs:cut_carpet'
	])
	event.recipes.farmersdelight.cutting(
        "minecraft:book",
        "#minecraft:axes", // tool
        [ // results
			'3x minecraft:paper',
			'minecraft:leather'
        ],
        // "" // sound
	)
	let books = (input, output) => {
		event.shapeless(output, [
			input
		])
	}
	books("eccentrictome:tome","ftbquests:book")
	books("ftbquests:book", Item.of('patchouli:guide_book', '{"patchouli:book":"parcool:parcool_guide"}').strongNBT())
	books(Item.of('patchouli:guide_book', '{"patchouli:book":"parcool:parcool_guide"}').strongNBT(), Item.of('patchouli:guide_book', '{"patchouli:book":"thermal:guidebook"}').strongNBT())
	books(Item.of('patchouli:guide_book', '{"patchouli:book":"thermal:guidebook"}').strongNBT(), 'botania:lexicon')
	books('botania:lexicon', 'immersiveengineering:manual')
	books('immersiveengineering:manual', 'eidolon:codex')
	books('eidolon:codex', 'ae2:guide')
	books('ae2:guide', 'actuallyadditions:booklet')
	books('actuallyadditions:booklet', 'tconstruct:encyclopedia')
	books('tconstruct:encyclopedia', 'tconstruct:materials_and_you')
	books('tconstruct:materials_and_you', 'tconstruct:tinkers_gadgetry')
	books('tconstruct:tinkers_gadgetry', 'tconstruct:puny_smelting')
	books('tconstruct:puny_smelting', 'tconstruct:mighty_smelting')
	books('tconstruct:mighty_smelting', 'tconstruct:fantastic_foundry')
	books('tconstruct:fantastic_foundry', Item.of('patchouli:guide_book', '{"patchouli:book":"patchouli:summoning"}'))
	books(Item.of('patchouli:guide_book', '{"patchouli:book":"patchouli:summoning"}').strongNBT(), Item.of('patchouli:guide_book', '{"patchouli:book":"patchouli:reality_frame"}'))
	books(Item.of('patchouli:guide_book', '{"patchouli:book":"patchouli:reality_frame"}').strongNBT(), "ftbquests:book")
}