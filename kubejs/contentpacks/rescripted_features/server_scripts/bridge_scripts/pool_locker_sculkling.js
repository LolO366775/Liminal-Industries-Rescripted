BlockEvents.placed("kubejs:locker_sculkling",event => {
	let bottom = event.getBlock()
	let top = event.getBlock().getUp()
	if (top.blockState.canBeReplaced()) {
		let facing = bottom.properties.get("facing")
		top.set("kubejs:locker_sculkling",{"half":"top","facing":facing,"open":false})
		bottom.set("kubejs:locker_sculkling",{"half":"bottom","facing":facing,"open":false})
	} else {
		event.cancel()
	}
})
BlockEvents.leftClicked("kubejs:locker_sculkling", event => {
	global.locker_sculkling_left_click(event)
})

BlockEvents.rightClicked("kubejs:locker_sculkling", event => {
	global.locker_sculkling_right_click(event)
})

EntityEvents.hurt("minecraft:player", event  => {
	let player = event.getPlayer()
	let damage_source = event.getSource()
	if (!player.isDamageSourceBlocked(damage_source)) {
		if (damage_source.getType() == "mob") {
			let attacker = event.source.getImmediate()
			if (attacker.getType() == "minecraft:shulker_bullet") {
				try {
					let type = attacker.getNbt().getCompound("ForgeData").getString("type")
					if (type == "sculker") {
						sculkling_difficulty_damage(player)
					}
				} catch (error) {}
			}
		}
	}
})
/**
* @param {Internal.Player} player
*/
function sculkling_difficulty_damage(player){
	player.removeAllEffects()
	player.potionEffects.add("kubejs:anti_levitation",100,0,true,false)
	let difficulty = player.level.getDifficulty()
	if (difficulty == "normal") {
		player.potionEffects.add("minecraft:blindness",100,0,true,false)
		player.potionEffects.add("cofh_core:chilled",100,2,true,false)
	} else if (difficulty == "hard") {
		player.potionEffects.add("minecraft:blindness",100,0,true,false)
		player.potionEffects.add("cofh_core:chilled",100,2,true,false)
		player.potionEffects.add("minecraft:instant_damage",20,0,true,false)
	}
}