ServerEvents.recipes(event => {
	event.remove({ output: '#waystones:waystones' })
	event.remove({ output: 'waystones:deepslate_waystone' })
	event.remove({ output: 'waystones:blackstone_waystone' })
	event.remove({ output: 'waystones:end_stone_waystone' })
	event.remove({ output: '#waystones:sharestones' })
	event.remove({ output: 'waystones:warp_plate' })
	event.remove({ output: 'waystones:warp_dust' })
	event.remove({ output: 'waystones:warp_stone' })
	event.remove({ output: 'waystones:portstone' })
	event.remove({ output: 'waystones:return_scroll' })
	event.remove({ output: 'waystones:bound_scroll' })
	event.remove({ output: 'waystones:warp_scroll' })
	try {
		if (is_recipes_waystones_enabled()) {recipes_waystones(event)}
		if (is_recipes_craftable_waystones_enabled()) {recipes_craftable_waystones(event)}
	} catch (error) {
		console.log(`Error loading recipe config!`)
		console.log(`§c${error}`)
	}
})
function is_recipes_waystones_enabled(){
	let file_data = JsonIO.readJson("kubejs/config/recipes.json").asJsonObject
	let enabled = file_data.get("waystones").asBoolean
	return enabled
}
function is_recipes_craftable_waystones_enabled(){
	let file_data = JsonIO.readJson("kubejs/config/recipes.json").asJsonObject
	let enabled = file_data.get("craftable_waystones").asBoolean
	return enabled
}
/**
* @param {Internal.RecipesEventJS} event
*/
function recipes_waystones(event){
	event.recipes.createCrushing([
		'waystones:warp_dust',
		Item.of('waystones:warp_dust').withChance(0.75),
		Item.of('waystones:warp_dust').withChance(0.25)
	],	'minecraft:shulker_shell')
	event.shaped('waystones:warp_stone', [
		' W ', 
		'WEW',
		' W '  
		],{
		  W: 'waystones:warp_dust', 
		  E: 'minecraft:emerald'
	})
	event.shapeless('waystones:return_scroll', ['kubejs:wallpaper','supplementaries:antique_ink','kubejs:carpet_dust'])
	event.shapeless('waystones:bound_scroll', ['kubejs:wallpaper','supplementaries:antique_ink','enderio:confusing_powder'])
	event.shapeless('waystones:warp_scroll', ['kubejs:wallpaper','supplementaries:antique_ink','waystones:warp_dust'])
	/*event.shapeless('waystones:warp_stone', 'waystones:portstone')
	event.custom({"type": "create:item_application",
		"ingredients":[
			{"item": "minecraft:polished_andesite"},
			{"item": "waystones:warp_stone"}
		],
		"results": [
			{"item": "waystones:portstone"}
		]
	})*/
	event.recipes.create.deploying('waystones:portstone',['minecraft:polished_andesite','waystones:warp_stone'])
}
BlockEvents.leftClicked("waystones:portstone", event => {
	if (is_recipes_waystones_enabled()) {
		if (event.player.isCrouching()) {
			let portstone = event.getBlock()
			let above = portstone.getUp()
			let waterlogged = above.properties.get("waterlogged")
			portstone.set("minecraft:polished_andesite")
			portstone.popItemFromFace("waystones:warp_stone","up")
			if (waterlogged == "true") {
				above.set("minecraft:water")
			} else {
				above.set("minecraft:air")
			}
		}
	}
})
BlockEvents.rightClicked("waystones:portstone", event => {
	if (is_recipes_waystones_enabled()) {
		if (event.player.isCrouching()) {
			if (event.item.getId() == "create:wrench") {
			let portstone = event.getBlock()
				rotate_portstone(portstone)
			}
		}	
	}
})
/**
* @param {Internal.BlockContainerJS} portstone
*/
function rotate_portstone(portstone){
	let above = portstone.getUp()
	let facing = portstone.properties.get("facing")
	let waterlogged = portstone.properties.get("waterlogged")
	let above_waterlogged = above.properties.get("waterlogged")
	if (facing == "north") {
		portstone.set("waystones:portstone",{"facing":"east","waterlogged":waterlogged,"half":"lower","origin":"player"})
		above.set("waystones:portstone",{"facing":"east","waterlogged":above_waterlogged,"half":"upper","origin":"player"})
	} else if (facing == "east") {
		portstone.set("waystones:portstone",{"facing":"south","waterlogged":waterlogged,"half":"lower","origin":"player"})
		above.set("waystones:portstone",{"facing":"south","waterlogged":above_waterlogged,"half":"upper","origin":"player"})
	} else if (facing == "south") {
		portstone.set("waystones:portstone",{"facing":"west","waterlogged":waterlogged,"half":"lower","origin":"player"})
		above.set("waystones:portstone",{"facing":"west","waterlogged":above_waterlogged,"half":"upper","origin":"player"})
	} else {
		portstone.set("waystones:portstone",{"facing":"north","waterlogged":waterlogged,"half":"lower","origin":"player"})
		above.set("waystones:portstone",{"facing":"north","waterlogged":above_waterlogged,"half":"upper","origin":"player"})
	}
}
/*BlockEvents.rightClicked("minecraft:polished_andesite", event => {
	if (is_recipes_waystones_enabled()) {
		if (event.item.getId() == "waystones:warp_stone") {
			let portstone = event.getBlock()
			let above = portstone.getUp()
			portstone.set("waystones:portstone",{"facing":"north","waterlogged":"false","half":"lower","origin":"player"})
			if (above.getId() == "minecraft:air") {
				above.set("waystones:portstone",{"facing":"north","waterlogged":"false","half":"upper","origin":"player"})
			} else if (above.getId() == "minecraft:water") {
				above.set("waystones:portstone",{"facing":"north","waterlogged":"true","half":"upper","origin":"player"})
			}
			event.item.shrink(1)
		}
	}
})*/
/**
* @param {Internal.RecipesEventJS} event
*/
function recipes_craftable_waystones(event){
	let waystones = (output,material,eye) => {
		event.shaped(output, [
			' E ', 
			'SAS',
			'OTO'
		],{
		  	E: eye, 
		  	T: 'botania:terrasteel_block',
		  	S: 'ae2:singularity',
		  	A: material,
		  	O: 'minecraft:crying_obsidian',
		})
	}
	waystones("waystones:waystone","minecraft:polished_andesite","endrem:lost_eye")
	waystones("waystones:waystone","minecraft:polished_andesite","endrem:exotic_eye")
	waystones("waystones:mossy_waystone","minecraft:mossy_cobblestone","endrem:lost_eye")
	waystones("waystones:mossy_waystone","minecraft:mossy_cobblestone","endrem:exotic_eye")
	waystones("waystones:sandy_waystone","minecraft:chiseled_sandstone","endrem:lost_eye")
	waystones("waystones:sandy_waystone","minecraft:chiseled_sandstone","endrem:exotic_eye")
	waystones("waystones:deepslate_waystone","minecraft:deepslate_bricks","endrem:lost_eye")
	waystones("waystones:deepslate_waystone","minecraft:deepslate_bricks","endrem:exotic_eye")
	waystones("waystones:blackstone_waystone","minecraft:blackstone","endrem:lost_eye")
	waystones("waystones:blackstone_waystone","minecraft:blackstone","endrem:exotic_eye")
	waystones("waystones:end_stone_waystone","minecraft:end_stone","endrem:lost_eye")
	waystones("waystones:end_stone_waystone","minecraft:end_stone","endrem:exotic_eye")
}