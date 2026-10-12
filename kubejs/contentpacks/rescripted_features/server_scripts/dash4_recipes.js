ServerEvents.recipes(event => {
	event.recipes.create.milling([
		'8x immersiveengineering:dust_wood'
	],
	'dustrial_decor:cardboard_scrap'
	)
	event.recipes.create.milling([
		'immersiveengineering:dust_wood'
	],
	'dustrial_decor:cardboard'
	)
	event.smelting('supplementaries:ash', 'immersiveengineering:dust_wood')
	event.replaceOutput({output: 'immersiveengineering:dust_wood'}, '#forge:dusts/wood', 'mekanism:sawdust')

	event.recipes.create.milling([
		Item.of('waystones:warp_dust').withChance(0.25)
	],
	'minecraft:chorus_fruit'
	)

	event.replaceInput({id: 'corrosive_sculk:woven_sculk_vein'}, 'minecraft:sculk_vein', 'actuallyadditions:solidified_experience')
	event.replaceInput({id: 'corrosive_sculk:woven_sculk_vein_flipped'}, 'minecraft:sculk_vein', 'actuallyadditions:solidified_experience')
	event.replaceInput({id: 'corrosive_sculk:woven_sculk'}, 'minecraft:sculk', 'actuallyadditions:solidified_experience')
	event.replaceInput({id: 'corrosive_sculk:woven_sculk_flipped'}, 'minecraft:sculk', 'actuallyadditions:solidified_experience')
})