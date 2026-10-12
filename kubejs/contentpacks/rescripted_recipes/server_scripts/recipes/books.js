ServerEvents.recipes(event => {

	event.remove({output: 'minecraft:book'})
	event.shapeless('minecraft:book', [
		'3x minecraft:paper',
		'minecraft:leather'
	])

	event.recipes.farmersdelight.cutting(
        "minecraft:book",
        "#minecraft:axes", // tool
        [ // results
			'3x minecraft:paper',
			'minecraft:leather'
        ],
        // "" // sound
	);

	event.shapeless('ftbquests:book', [
		'kubejs:wallpaper'
	])

	let books = (input, output) => {
		event.shapeless(output, [
			input
		])
	}

	books('eccentrictome:tome', 'botania:lexicon')
	books('botania:lexicon', 'immersiveengineering:manual')
	books('immersiveengineering:manual', 'eidolon:codex')
	books('eidolon:codex', 'ae2:guide')
	books('ae2:guide', 'actuallyadditions:booklet')
	books('actuallyadditions:booklet', Item.of('patchouli:guide_book', '{"patchouli:book":"patchouli:summoning"}'))

	books('tconstruct:materials_and_you', 'tconstruct:tinkers_gadgetry')
	books('tconstruct:tinkers_gadgetry', 'tconstruct:puny_smelting')
	books('tconstruct:puny_smelting', 'tconstruct:mighty_smelting')
	books('tconstruct:mighty_smelting', 'tconstruct:fantastic_foundry')
	books('tconstruct:fantastic_foundry', 'tconstruct:encyclopedia')


	

})