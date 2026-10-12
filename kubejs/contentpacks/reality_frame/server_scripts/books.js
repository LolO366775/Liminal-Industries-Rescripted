ServerEvents.recipes(event => {
	event.shapeless(Item.of('eccentrictome:tome', '{"eccentrictome:mods":{actuallyadditions:{0:{Count:1b,id:"actuallyadditions:booklet"}},ae2:{0:{Count:1b,id:"ae2:guide",tag:{Enchantments:[]}}},botania:{0:{Count:1b,id:"botania:lexicon"}},eidolon:{0:{Count:1b,id:"eidolon:codex",tag:{Enchantments:[]}}},ftbquests:{0:{Count:1b,id:"ftbquests:book",tag:{Enchantments:[]}}},immersiveengineering:{0:{Count:1b,id:"immersiveengineering:manual"}},patchouli:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"patchouli:summoning"}},1:{Count:1b,id:"patchouli:guide_book",tag:{Enchantments:[],"patchouli:book":"patchouli:reality_frame"}}},tconstruct:{0:{Count:1b,id:"tconstruct:materials_and_you"}}},"eccentrictome:version":1}'), [
		'3x kubejs:wallpaper'
	])
	let books = (input, output) => {
		event.shapeless(output, [
			input
		])
	}
	books(Item.of('patchouli:guide_book', '{"patchouli:book":"patchouli:summoning"}').strongNBT(), Item.of('patchouli:guide_book', '{"patchouli:book":"patchouli:reality_frame"}'))
	books(Item.of('patchouli:guide_book', '{"patchouli:book":"patchouli:reality_frame"}').strongNBT(), 'tconstruct:materials_and_you')
	books('tconstruct:encyclopedia', Item.of('eccentrictome:tome', '{"eccentrictome:mods":{actuallyadditions:{0:{Count:1b,id:"actuallyadditions:booklet"}},ae2:{0:{Count:1b,id:"ae2:guide",tag:{Enchantments:[]}}},botania:{0:{Count:1b,id:"botania:lexicon"}},eidolon:{0:{Count:1b,id:"eidolon:codex",tag:{Enchantments:[]}}},ftbquests:{0:{Count:1b,id:"ftbquests:book",tag:{Enchantments:[]}}},immersiveengineering:{0:{Count:1b,id:"immersiveengineering:manual"}},patchouli:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"patchouli:summoning"}},1:{Count:1b,id:"patchouli:guide_book",tag:{Enchantments:[],"patchouli:book":"patchouli:reality_frame"}}},tconstruct:{0:{Count:1b,id:"tconstruct:materials_and_you"}}},"eccentrictome:version":1}'))
})