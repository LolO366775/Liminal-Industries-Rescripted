//works, but I may have to split this up into steps
//havent rewritten the location terminal support yet, if I do that
//leaving the nether doesnt work
//havent tested entering or leaving with a spawnpoint set
//both entering and leaving works with a card (does it drain the compound tho?) also shouldnt drain compound if any of the teleports fail
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
global.clock_right_click_event = event => {
	let player = event.getPlayer()
	if (!player.isFake()) {
		let card = event.getItem()
		if (card.hasTag("kubejs:location_cards")) {
			click_clock_with_card_event(event)
		} else {
			activate_clock_event(event)
		}
	}

}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function click_clock_with_card_event(event){
	let player = event.getPlayer()
	let card = event.getItem()
	let clock = event.getBlock()
	let destination_result = get_clock_destination_result_from_card(card,clock)
	let result = destination_result.result
	clock_tell_status(clock,player,result)
	if (result == "success_backrooms") {
		try {
			let destination = destination_result.destination
			enter_nether(player,destination)
		} catch (error) {}
	}
	if (result == "success_nether") {
		try {
			let destination = destination_result.destination
			leave_nether(player,destination)
		} catch (error) {}
	}
}
/**
* @param {Internal.ItemStack} card
* @param {Internal.BlockContainerJS} clock
*/
function get_clock_destination_result_from_card(card,clock){
	if (card.hasTag("kubejs:location_cards")) {
		try {
			let clock_level = clock.getLevel()
			let clock_dimension = clock_level.getDimension()
			let server = clock_level.getServer()
			let card_data = card.getNbt().getCompound("location")
			if (card_data.isEmpty()) {
				return {"result":"no_location"}
			}
			let card_dimension = card_data.getString("levelKey")
			if (card_dimension == "") {
				return {"result":"no_location"}
			}
			let destination_level = server.getLevel(card_dimension)
			if (clock_dimension == "minecraft:overworld") {
				if (card_dimension != "minecraft:the_nether") {
					return {"result":"location_not_nether"}
				}
			} else if (clock_dimension == "minecraft:the_nether") {
				if (card_dimension != "minecraft:overworld") {
					return {"result":"location_not_overworld"}
				}
			}
			let position = card_data.getCompound("blockpos")
			let [pos_x,pos_y,pos_z] = [position.getInt("X"),position.getInt("Y"),position.getInt("Z")]
			if (position.isEmpty()) {
				return {"result":"no_location"}
			}
			let destination = destination_level.getBlock(pos_x,pos_y,pos_z)
			if (clock_dimension == "minecraft:overworld") {
				return {"result":"success_backrooms","destination":destination}
			} else if (clock_dimension == "minecraft:the_nether") {
				return {"result":"success_nether","destination":destination}
			}
		} catch (error) {
			return {"result":"no_location"}
		}
	}
	return {"result":"ignore"}
}
/**
* @param {Internal.BlockContainerJS} clock
* @param {Internal.Player} player
* @param {String} status
*/
function clock_tell_status(clock,player,status){
	let level = clock.getLevel()
	let [pos_x,pos_y,pos_z] = [clock.getX(),clock.getY(),clock.getZ()]
	if (status == "no_location") {
		player.tell(`§6This card has no set location!`)
		level.playSound(null,pos_x,pos_y,pos_z,"mekanism:gui.digital_beep","blocks",1,0)
	}
	if (status == "location_not_nether") {
		player.tell(`§6This card's location must be set to a position in the Endless Library!`)
		level.playSound(null,pos_x,pos_y,pos_z,"mekanism:gui.digital_beep","blocks",1,0)
	}
	if (status == "location_not_overworld") {
		player.tell(`§6This card's location must be set to a position in the Backrooms!`)
		level.playSound(null,pos_x,pos_y,pos_z,"mekanism:gui.digital_beep","blocks",1,0)
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function activate_clock_event(event){
	let clock = event.getBlock()
	let player = event.getPlayer()
	if (has_charge_or_is_nether(clock)) {
		let destination = get_clock_destination_or_default(clock,player)
		let dimension = event.level.getDimension()
		if (dimension == "minecraft:the_nether") {
			leave_nether(player,destination)
		} else if (dimension == "minecraft:overworld") {
			enter_nether(player,destination)
		}
	}
}
//I can probably combine these two, make the effects based on the location dimension (enter nether / leave nether)
/**
* @param {Internal.Player} player
* @param {Internal.BlockContainerJS} location
*/
function leave_nether(player,location){
	player.runCommandSilent("ftbquests change_progress @s complete 716F08C62355DA97")
	let server = player.getServer()
	let level = server.getLevel("minecraft:overworld")
	try {
		let [pos_x,pos_y,pos_z] = [location.getX() + 0.5,location.getY(),location.getZ() + 0.5]
		level.playSound(null,pos_x,pos_y,pos_z,"supplementaries:block.bellows.retract","blocks",10,0)
		level.playSound(null,pos_x,pos_y,pos_z,"supplementaries:block.globe.spin","blocks",10,0)
		player.teleportTo("minecraft:overworld",pos_x,pos_y,pos_z,0,0)
	} catch (error) {
		let [pos_x,pos_y,pos_z] = [-999.5,23,-999.5]
		player.teleportTo("minecraft:overworld",pos_x,pos_y,pos_z,0,0)
		level.playSound(null,pos_x,pos_y,pos_z,"supplementaries:block.bellows.retract","blocks",10,0)
		level.playSound(null,pos_x,pos_y,pos_z,"supplementaries:block.globe.spin","blocks",10,0)
	}
}
/**
* @param {Internal.LivingEntity} entity
* @param {Internal.BlockContainerJS} location
*/
function enter_nether(entity,location){
	let [pos_x,pos_y,pos_z] = [location.getX() + 0.5,location.getY(),location.getZ() + 0.5]
	if (entity.getType() == "minecraft:player") {
		let level = location.getLevel()
		entity.teleportTo("minecraft:the_nether",pos_x,pos_y,pos_z,0,0)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.nether_wastes.mood","blocks",100,0)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.nether_wastes.mood","blocks",100,0)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.nether_wastes.mood","blocks",100,0)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.nether_wastes.mood","blocks",100,0)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.nether_wastes.mood","blocks",100,0)
	} else {
		entity.teleportTo("minecraft:the_nether",pos_x,pos_y,pos_z,0,0)
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} clock
* @param {Internal.Player} player
*/
function get_clock_destination_or_default(clock,player){
	//clock-terminal disabled for now
	/*try {
		let terminal = get_clock_location_terminal(clock)
		if (terminal.getId() == "kubejs:location_terminal") {
			let destination_dimension = get_terminal_destination_dimension(terminal,"",true)
			return get_terminal_destination(terminal,destination_dimension,"",true)
		}
		return get_clock_respawn_point_or_default(clock,player)	
	} catch (error) {
		return get_clock_respawn_point_or_default(clock,player)	
	}*/
	return get_clock_respawn_point_or_default(clock,player)
}
/**
* @param {Internal.BlockRightClickedEventJS} clock
* @param {Internal.Player} player
*/
function get_clock_respawn_point_or_default(clock,player){
	try {
		let server = player.getServer()
		let player_uuid = player.getUuid()
		let server_player = server.getPlayer(player_uuid)
		let dimension = clock.getLevel().getDimension()
		let res_pos = server_player.getRespawnPosition()
		let res_dim = server_player.getRespawnDimension().location()
		if (dimension == "minecraft:overworld") {
			if (res_dim == "minecraft:the_nether") {
				return server.getLevel(res_dim).getBlock(res_pos)
			}
		} else if (dimension == "minecraft:the_nether") {
			if (res_dim == "minecraft:overworld") {
				return server.getLevel(res_dim).getBlock(res_pos)
			}
		}
		return get_clock_dimension_destination_default(clock,player)
	} catch (error) {
		console.log(error)
		return get_clock_dimension_destination_default(clock,player)
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} clock
* @param {Internal.Player} player
*/
function get_clock_dimension_destination_default(clock,player){
	let server = player.getServer()
	try {
		let dimension = clock.getLevel().getDimension()
		if (dimension == "minecraft:overworld") {
			return server.getLevel("minecraft:the_nether").getBlock(0,50,0)
		}
		return server.getLevel("minecraft:overworld").getBlock(-1000,23,-1000)
	} catch (error) {
		return server.getLevel("minecraft:overworld").getBlock(-1000,23,-1000)
	}
}
/**
* @param {Internal.BlockContainerJS} clock
*/
function has_charge_or_is_nether(clock){
	if (clock.level.getDimension() == "minecraft:the_nether") {
		return true
	} else {
		let facing = clock.properties.get("facing")
		let back = get_clock_catalyst_back(clock,facing)
		let left = get_clock_catalyst_left(clock,facing)
		let right = get_clock_catalyst_right(clock,facing)
		let up = clock.getUp()
		let down = clock.getDown()
		if (is_clock_charge(back)) {
			deplete_clock_charge(back)
			return true
		} else if (is_clock_charge(left)) {
			deplete_clock_charge(left)
			return true
		} else if (is_clock_charge(right)) {
			deplete_clock_charge(right)
			return true
		} else if (is_clock_charge(up)) {
			deplete_clock_charge(up)
			return true
		} else if (is_clock_charge(down)) {
			deplete_clock_charge(down)
			return true
		}
	}
	return false
}
/**
* @param {Internal.BlockContainerJS} clock_charge
* @param {Internal.Player} player
*/
function deplete_clock_charge(clock_charge){
	if (clock_charge.getId() == "kubejs:compound_charge") {
		let charges = clock_charge.properties.get("charges")
		if (charges == "1") {
			clock_charge.set("kubejs:empty_compound_charge")
			return 1
		} else if (charges == "2") {
			clock_charge.set("kubejs:compound_charge",{"charges":"1"})
			return 1
		} else if (charges == "3") {
			clock_charge.set("kubejs:compound_charge",{"charges":"2"})
			return 1
		}
	}
	if (clock_charge.getId() == "kubejs:compound_sponge") {
		clock_charge.set("minecraft:sponge")
		return 1
	}
	return 1
}
/**
* @param {Internal.BlockContainerJS} clock
*/
function get_clock_location_terminal(clock){
	let facing = clock.properties.get("facing")
	let back = get_clock_catalyst_back(clock,facing)
	let left = get_clock_catalyst_left(clock,facing)
	let right = get_clock_catalyst_right(clock,facing)
	let up = clock.getUp()
	let down = clock.getDown()
	if (is_location_terminal(back,true)) {
		return back
	} else if (is_location_terminal(left,true)) {
		return left
	} else if (is_location_terminal(right,true)) {
		return right
	} else if (is_location_terminal(up,true)) {
		return up
	} else if (is_location_terminal(down,true)) {
		return down
	}
	return clock
}
/**
* @param {Internal.BlockContainerJS} clock
* @param {String} facing
*/
function get_clock_catalyst_back(clock,facing){
	if (facing == "north") {
		return clock.getSouth()
	} else if (facing == "south") {
		return clock.getNorth()
	} else if (facing == "east") {
		return clock.getWest()
	} else if (facing == "west") {
		return clock.getEast()
	}
	return clock
}
/**
* @param {Internal.BlockContainerJS} clock
* @param {String} facing
*/
function get_clock_catalyst_right(clock,facing){
	if (facing == "north") {
		return clock.getWest()
	} else if (facing == "south") {
		return clock.getEast()
	} else if (facing == "east") {
		return clock.getNorth()
	} else if (facing == "west") {
		return clock.getSouth()
	}
	return clock
}
/**
* @param {Internal.BlockContainerJS} clock
* @param {String} facing
*/
function get_clock_catalyst_left(clock,facing){
	if (facing == "north") {
		return clock.getEast()
	} else if (facing == "south") {
		return clock.getWest()
	} else if (facing == "east") {
		return clock.getSouth()
	} else if (facing == "west") {
		return clock.getNorth()
	}
	return clock
}
/**
* @param {Internal.BlockContainerJS} clock_charge
*/
function is_clock_charge(clock_charge){
	if (clock_charge.getId() == "kubejs:compound_charge") {return true}
	if (clock_charge.getId() == "kubejs:compound_sponge") {return true}
	return false
}