/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function place_eye_event_common(event,result_id) {
	let above = event.block.getUp()
	if (above == "minecraft:air" || above.getUp() == "minecraft:light") {
		let player = event.getPlayer()
		let direction = player.getHorizontalFacing().toString()
		if (direction == "north") {
			above.set(result_id, {"facing":"west"})
		} else if (direction == "south") {
			above.set(result_id, {"facing":"east"})
		} else if (direction == "west") {
			above.set(result_id, {"facing":"south"})
		} else {
			above.set(result_id, {"facing":"north"})
		}
		let server_player = player.server.getPlayer(player.getUuid())
		if (!server_player.isCreative()) {
			event.item.shrink(1)
		}
		let [pos_x,pos_y,pos_z] = [above.getX(),above.getY(),above.getZ()]
		above.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.shroomlight.place","blocks",1,1)
	}		
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function item_eye_place_event(event) {
	if (event.facing == "up") {
		let item = event.getItem()
		if (item.getId() == "endrem:black_eye") {
			place_eye_event_common(event,"kubejs:black_eye")
		} else if (item.getId() == "endrem:cold_eye") {
			place_eye_event_common(event,"kubejs:cold_eye")
		} else if (item.getId() == "endrem:corrupted_eye") {
			place_eye_event_common(event,"kubejs:corrupted_eye")
		} else if (item.getId() == "endrem:cryptic_eye") {
			place_eye_event_common(event,"kubejs:cryptic_eye")
		} else if (item.getId() == "endrem:cursed_eye") {
			place_eye_event_common(event,"kubejs:cursed_eye")
		} else if (item.getId() == "endrem:evil_eye") {
			place_eye_event_common(event,"kubejs:evil_eye")
		} else if (item.getId() == "endrem:exotic_eye") {
			place_eye_event_common(event,"kubejs:exotic_eye")
		} else if (item.getId() == "endrem:guardian_eye") {
			place_eye_event_common(event,"kubejs:guardian_eye")
		} else if (item.getId() == "endrem:lost_eye") {
			place_eye_event_common(event,"kubejs:lost_eye")
		} else if (item.getId() == "endrem:magical_eye") {
			place_eye_event_common(event,"kubejs:magical_eye")
		} else if (item.getId() == "endrem:nether_eye") {
			place_eye_event_common(event,"kubejs:nether_eye")
		} else if (item.getId() == "endrem:old_eye") {
			place_eye_event_common(event,"kubejs:old_eye")
		} else if (item.getId() == "endrem:rogue_eye") {
			place_eye_event_common(event,"kubejs:rogue_eye")
		} else if (item.getId() == "endrem:undead_eye") {
			place_eye_event_common(event,"kubejs:undead_eye")
		} else if (item.getId() == "endrem:witch_eye") {
			place_eye_event_common(event,"kubejs:witch_eye")
		} else if (item.getId() == "endrem:wither_eye") {
			place_eye_event_common(event,"kubejs:wither_eye")
		}
	}		
}

// could also be wrenchable? or just like shift right clicked with an empty hand?
BlockEvents.broken(event => {
	//checks for eye block tag
	let block = event.getBlock() 
	let block_id = block.getId()
	let eyes = ["black_eye","cold_eye","corrupted_eye","cryptic_eye","cursed_eye","evil_eye","exotic_eye","guardian_eye","lost_eye","magical_eye","nether_eye","old_eye","rogue_eye","undead_eye","witch_eye","wither_eye"]
	eyes.forEach(element => {
		if (block_id == `kubejs:${element}`) {
			block.popItem(`endrem:${element}`)
		}
	})
})