/**
* @param {Internal.RecipesEventJS} event
*/
function rescripted_recipes_item_nerfs(event){
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
}