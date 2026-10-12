ServerEvents.recipes(event => {

	event.remove({output: 'actuallyadditions:teleport_staff'})
	event.remove({output: 'immersiveengineering:fluid_placer'})
	event.remove({output: 'botania:dirt_rod'})
	event.remove({output: 'botania:skydirt_rod'})
	event.remove({output: 'botania:fire_rod'})

	event.remove({output: '#forge:dusts/ender_pearl'})

	event.remove({id: 'botania:elven_trade/ender_pearl_return'})
	event.remove({id: 'enderio:sag_milling/ender_pearl'})
	event.remove({ input: 'minecraft:ender_eye', type: 'tconstruct:melting' })
	event.remove({ input: 'minecraft:ender_chest', type: 'tconstruct:melting' })
	event.remove({ input: 'minecraft:end_crystal', type: 'tconstruct:melting' })
	event.remove({ input: 'minecraft:chain', type: 'tconstruct:melting' })
	event.remove({ input: 'miners_delight:copper_cup', type: 'create:filling' })

	event.remove({output: 'immersiveengineering:slag_glass'})
	event.smelting('immersiveengineering:slag_glass', 'immersiveengineering:slag_gravel')

	event.remove({output: 'thermal:white_rockwool'})
	event.custom({
		"type":"createaddition:rolling",
		"input": {
	      	"item": "thermal:slag"
		},
		"result": {
			"item": "thermal:white_rockwool",
			"count": 1
		}
	})

	event.remove({ output: 'minecraft:ender_eye'})
	event.shapeless('minecraft:ender_eye', [
		'minecraft:ender_pearl',
		'minecraft:blaze_powder'
	])

	event.remove({output: 'tempad:tempad'})
	event.shaped('tempad:tempad', [
		'   ', 
		'ABA',
		'CDE'  
		],{
		A: 'enderio:dark_steel_ingot',
		B: 'minecraft:tinted_glass',
		C: 'tiab:time_in_a_bottle',
		D: 'mekanism:teleportation_core',
		E: 'enderio:ender_resonator'
})

	event.remove({mod: 'snad'})
	event.recipes.create.filling('snad:snad',['minecraft:sand',Fluid.of('kubejs:unstable_compound', 1000)])
	event.recipes.create.filling('snad:red_snad',['minecraft:red_sand',Fluid.of('kubejs:unstable_compound', 1000)])
	event.recipes.create.filling('snad:suol_snad',['minecraft:soul_sand',Fluid.of('kubejs:unstable_compound', 1000)])
	event.shapeless('snad:snad', ['minecraft:sand','kubejs:unstable_compound'])
	event.shapeless('snad:red_snad', ['minecraft:red_sand','kubejs:unstable_compound'])
	event.shapeless('snad:suol_snad', ['minecraft:soul_sand','kubejs:unstable_compound'])
	//event.recipes.createPressing('snad:snad', 'minecraft:sand') //use if changes are off

	event.replaceInput({input: 'minecraft:ender_pearl'}, 'minecraft:ender_pearl', 'minecraft:echo_shard')
	event.replaceInput({input: 'minecraft:ender_eye'}, 'minecraft:ender_eye', 'minecraft:echo_shard')
	event.replaceInput({id: 'thermal:machines/crucible/crucible_ender_pearl'}, 'minecraft:echo_shard', 'ae2:ender_dust')

	event.replaceInput({output: 'thermal:chiller_ball_cast'}, 'minecraft:magma_cream', 'minecraft:slime_ball')
	event.replaceInput({output: 'thermal:chiller_rod_cast'}, 'minecraft:blaze_rod', 'minecraft:stick')
	event.replaceInput({output: 'thermal:chiller_ingot_cast'}, 'minecraft:nether_brick', 'minecraft:brick')

	event.remove({output: 'mekanism:dust_coal', input: 'minecraft:charcoal'})
	event.remove({id: 'mekanism:processing/coal/to_dust'})
	event.remove({id: 'enderio:sag_milling/coal'})


	event.remove({ output: 'musketmod:cartridge'})
	event.shapeless('8x musketmod:cartridge', [
		'thermal:lead_nugget',
		'minecraft:gunpowder',
		'minecraft:paper'
	])

	event.remove({ id: 'actuallyadditions:tiny_to_charcoal'})
	event.remove({ id: 'actuallyadditions:coal_to_tiny'})
	event.remove({ id: 'immersiveengineering:refinery/acetaldehyde'})

	event.shapeless('minecraft:coal_block', ['9x minecraft:coal'])
	event.shapeless('9x minecraft:coal', ['minecraft:coal_block'])
	event.shapeless('8x actuallyadditions:tiny_coal', ['minecraft:coal'])
	event.shaped('minecraft:charcoal', [
		'AAA', 
		'A A',
		'AAA'  
	],{
		A: 'actuallyadditions:tiny_charcoal'
})

	event.remove({output: 'eidolon:polished_planks', input: 'eidolon:polished_wood_pillar'})
	
	event.remove({output: 'storagedrawers:void_upgrade'})
	event.shapeless('storagedrawers:void_upgrade', ['storagedrawers:upgrade_template'])

	event.remove({output: 'decorative_blocks:lattice'})
	event.shaped('decorative_blocks:lattice', [
		'S S', 
		' S ',
		'S S'  
	],{
		S: 'minecraft:stick'
	})
})

// priority: 0

ServerEvents.tags('block', event => {

	event.add('minecraft:dirt', 'kubejs:soggy_carpet')
	event.add('farmersdelight:mushroom_colony_growable_on', 'kubejs:soggy_carpet')
	event.add('minecraft:mushroom_grow_block', 'kubejs:soggy_carpet')
	event.remove('minecraft:moss_replaceable', 'kubejs:soggy_carpet')
	event.remove('minecraft:logs', 'botania:livingwood_log')
	event.remove('minecraft:soul_fire_base_blocks', 'tconstruct:soul_glass')

	event.add('minecraft:sculk_replaceable', 'kubejs:ceilling')
	event.add('minecraft:sculk_replaceable', 'kubejs:ceilling2')
	event.add('minecraft:sculk_replaceable', 'kubejs:ceilling_lamp')
	event.add('minecraft:sculk_replaceable', 'kubejs:ceilling_lamp2')
	event.add('minecraft:sculk_replaceable', 'kubejs:ceilling_lamp_off')
	event.add('minecraft:sculk_replaceable', 'kubejs:carpet')
	event.add('minecraft:sculk_replaceable', 'kubejs:red_carpet')
	event.add('minecraft:sculk_replaceable', 'kubejs:soggy_carpet')
	event.add('minecraft:sculk_replaceable', 'kubejs:wallpaper1')
	event.add('minecraft:sculk_replaceable', 'kubejs:wallpaper2')
	event.add('minecraft:sculk_replaceable', 'kubejs:wallpaper3')
	event.add('minecraft:sculk_replaceable', 'kubejs:wallpaper4')
	event.add('minecraft:sculk_replaceable', 'kubejs:wallpaper5')
	event.add('minecraft:sculk_replaceable', 'kubejs:wallpaper6')
	event.add('minecraft:sculk_replaceable', 'kubejs:stripped_wallpaper')
	event.add('minecraft:sculk_replaceable', 'kubejs:porous_stone')
	event.add('minecraft:sculk_replaceable', 'kubejs:missing_tiles_empty')
	event.add('minecraft:sculk_replaceable', 'kubejs:missing_tiles_half')
	event.add('minecraft:sculk_replaceable', 'kubejs:pool_tiles')
	event.add('minecraft:sculk_replaceable', 'kubejs:long_pool_tiles')
	event.add('minecraft:sculk_replaceable', 'kubejs:pool_tiles_slab')
	event.add('minecraft:sculk_replaceable', 'kubejs:pool_tiles_stairs')
	event.add('minecraft:sculk_replaceable', 'kubejs:pool_tiles_sky')
	event.add('minecraft:sculk_replaceable', 'kubejs:drain')

	event.add('kubejs:backrooms_enviroment', 'kubejs:ceilling')
	event.add('kubejs:backrooms_enviroment', 'kubejs:ceilling2')
	event.add('kubejs:backrooms_enviroment', 'kubejs:ceilling_lamp')
	event.add('kubejs:backrooms_enviroment', 'kubejs:ceilling_lamp_off')
	event.add('kubejs:backrooms_enviroment', 'kubejs:carpet')
	event.add('kubejs:backrooms_enviroment', 'kubejs:floor_tiles')
	event.add('kubejs:backrooms_enviroment', 'kubejs:red_carpet')
	event.add('kubejs:backrooms_enviroment', 'kubejs:soggy_carpet')
	event.add('kubejs:backrooms_enviroment', 'kubejs:wallpaper1')
	event.add('kubejs:backrooms_enviroment', 'kubejs:wallpaper2')
	event.add('kubejs:backrooms_enviroment', 'kubejs:wallpaper3')
	event.add('kubejs:backrooms_enviroment', 'kubejs:wallpaper4')
	event.add('kubejs:backrooms_enviroment', 'kubejs:wallpaper5')
	event.add('kubejs:backrooms_enviroment', 'kubejs:wallpaper6')
	event.add('kubejs:backrooms_enviroment', 'kubejs:stripped_wallpaper')
	event.add('kubejs:backrooms_enviroment', 'kubejs:ceilling_frame')
	event.add('kubejs:backrooms_enviroment', 'kubejs:carpet_stairs')
	event.add('kubejs:backrooms_enviroment', 'kubejs:carpet_slab')
	event.add('kubejs:backrooms_enviroment', 'kubejs:red_carpet_stairs')
	event.add('kubejs:backrooms_enviroment', 'kubejs:red_carpet_slab')
	event.add('kubejs:backrooms_enviroment', 'kubejs:ceilling_stairs')
	event.add('kubejs:backrooms_enviroment', 'kubejs:ceilling_slab')
	event.add('kubejs:backrooms_enviroment', 'minecraft:water')
	event.add('kubejs:backrooms_enviroment', 'minecraft:lava')
	event.add('kubejs:backrooms_enviroment', 'kubejs:missing_tiles_empty')
	event.add('kubejs:backrooms_enviroment', 'kubejs:missing_tiles_half')
	event.add('kubejs:backrooms_enviroment', 'kubejs:pool_tiles')
	event.add('kubejs:backrooms_enviroment', 'kubejs:long_pool_tiles')
	event.add('kubejs:backrooms_enviroment', 'kubejs:pool_tiles_slab')
	event.add('kubejs:backrooms_enviroment', 'kubejs:pool_tiles_stairs')
	event.add('kubejs:backrooms_enviroment', 'kubejs:pool_tiles_sky')
	event.add('kubejs:backrooms_enviroment', 'kubejs:drain')
	event.add('kubejs:backrooms_enviroment', 'kubejs:drain_breakable')
	event.add('kubejs:backrooms_enviroment', 'kubejs:oil_carpet')
	event.add('kubejs:backrooms_enviroment', 'kubejs:error')
	event.add('kubejs:backrooms_enviroment', 'kubejs:error_carpet')
	event.add('kubejs:backrooms_enviroment', 'kubejs:error_wallpaper')
	event.add('kubejs:backrooms_enviroment', 'blockofsky:sky_block')

	event.add('kubejs:circuit_breakers', 'cfm_wap:light_circuit_breaker')
	event.add('kubejs:circuit_breakers', 'cfm_wap:dark_circuit_breaker')

	// Skylight Lanterns: blocks that project virtual skylight so crops/Dynamic Trees grow indoors.
	event.add('skylightlanterns:skylight_source', 'kubejs:ceilling_lamp')
	event.add('skylightlanterns:skylight_source', 'kubejs:ceilling_lamp2')
	event.add('skylightlanterns:skylight_source', 'kubejs:ceilling_lamp_red')
	event.add('skylightlanterns:skylight_source', 'blockofsky:sky_block')

	// Keep Dynamic Trees' rooty soggy carpet as immune as the carpets it sits in.
	event.add('minecraft:wither_immune', 'dynamictrees:rooty_soggy_carpet')

	event.add('kubejs:sculk', 'minecraft:sculk')
	event.add('kubejs:sculk', 'kubejs:sculk_carapace')
	event.add('kubejs:sculk', 'kubejs:sculk_shroom')
	event.add('kubejs:sculk', 'kubejs:sculk_tendrils')
	event.add('kubejs:sculk', 'minecraft:spawner')
	event.add('kubejs:sculk', 'kubejs:sculk_spawner')
	event.add('kubejs:sculk', 'minecraft:sculk_vein')
	event.add('kubejs:sculk', 'minecraft:sculk_catalyst')
	event.add('kubejs:sculk', 'minecraft:sculk_shrieker')
	event.add('kubejs:sculk', 'minecraft:sculk_sensor')
	event.add('kubejs:sculk', 'minecraft:calibrated_sculk_sensor')

	event.add('kubejs:sculk_spawner_valid_spawn', 'minecraft:sculk_vein')
	event.add('kubejs:sculk_spawner_valid_spawn', 'kubejs:sculk_shroom')
	event.add('kubejs:sculk_spawner_valid_spawn', 'kubejs:sculk_tendrils')
	event.add('kubejs:sculk_spawner_valid_spawn', 'minecraft:air')
	event.add('kubejs:sculk_spawner_valid_spawn', 'minecraft:cave_air')
	event.add('kubejs:sculk_spawner_valid_spawn', 'minecraft:void_air')
	event.add('kubejs:sculk_spawner_valid_spawn', 'minecraft:water')
	event.add('kubejs:sculk_spawner_valid_spawn', 'minecraft:light')
	event.add('kubejs:sculk_spawner_valid_spawn', 'corrosive_sculk:woven_sculk_vein')

	event.add('kubejs:block_sculk', 'minecraft:sculk')
	event.add('kubejs:block_sculk', 'minecraft:spawner')
	event.add('kubejs:block_sculk', 'kubejs:sculk_spawner')
	event.add('kubejs:block_sculk', 'kubejs:sculk_stairs')
	event.add('kubejs:block_sculk', 'kubejs:sculk_slab')

	event.add('kubejs:soft_sculk', 'minecraft:sculk_vein')
	event.add('kubejs:soft_sculk', 'minecraft:sculk_catalyst')
	event.add('kubejs:soft_sculk', 'minecraft:sculk_shrieker')
	event.add('kubejs:soft_sculk', 'minecraft:sculk_sensor')
	event.add('kubejs:soft_sculk', 'minecraft:calibrated_sculk_sensor')
	event.add('kubejs:soft_sculk', 'kubejs:sculk_shroom')
	event.add('kubejs:soft_sculk', 'kubejs:sculk_tendrils')

	event.add('minecraft:features_cannot_replace', '#kubejs:backrooms_enviroment')
	event.add('mekanism:cardboard_blacklist', '#kubejs:backrooms_enviroment')

	event.add('create:fan_processing_catalysts/splashing', 'minecraft:wet_sponge')
	event.remove('minecraft:moss_replaceable', 'kubejs:soggy_carpet')
	event.add('minecraft:replaceable_by_trees', 'minecraft:light')
	event.add('create:fan_transparent', 'minecraft:wet_sponge')

	event.remove('minecraft:planks', 'immersiveengineering:fiberboard')

	const mushrooms = event.get('botania:shimmering_mushrooms').getObjectIds()
  	mushrooms.forEach(mushrooms => {
    	event.removeAllTagsFrom(mushrooms)
  	})
	
})

ServerEvents.tags('item', event => {
	event.remove('curios:belt', 'beachparty:bikini')
	event.remove('curios:belt', 'beachparty:trunks')
	//rubber rings seem to be the only ones that must be disabled
	event.remove('curios:belt', 'beachparty:rubber_ring_blue')
	event.remove('curios:belt', 'beachparty:rubber_ring_pink')
	event.remove('curios:belt', 'beachparty:rubber_ring_stripped')
	event.remove('curios:belt', 'beachparty:rubber_ring_pelican')
	event.remove('curios:belt', 'beachparty:rubber_ring_axolotl')
	//
	event.remove('curios:feet', 'beachparty:crocs')
	event.remove('curios:hands', 'beachparty:swim_wings')
	event.remove('curios:head', 'beachparty:beach_hat')
	event.remove('curios:head', 'beachparty:sunglasses')
})

