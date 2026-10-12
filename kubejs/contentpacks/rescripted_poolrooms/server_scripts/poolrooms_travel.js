ServerEvents.recipes(event => {
	event.remove({output: "blockofsky:void_block"})
})
BlockEvents.rightClicked("blockofsky:void_block", event  => {
	if (!event.player.isFake()) {
		if (event.item.hasTag("kubejs:location_cards")) {
			click_poolrooms_portal_with_card_event(event)
		} else {
			click_poolrooms_exit_event(event)
		}
	}
})
BlockEvents.rightClicked('kubejs:poolrooms_portal', event => {
	if (event.item.id == 'kubejs:drain_item') {
        let [pos_x,pos_y,pos_z] = [event.block.getX(),event.block.getY(),event.block.getZ()]
		event.item.count--
        event.block.set("kubejs:drain")
        event.block.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.lantern.hit","blocks",1,2)
	} else if (event.getHand() == "main_hand") {
		if (!event.item.isBlock()) {
			if (event.item.hasTag("kubejs:location_cards")) {
				click_poolrooms_portal_with_card_event(event)
			} else {
				global.enter_poolrooms(event.getPlayer())
			}
		}
	}
})
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function click_poolrooms_portal_with_card_event(event){
	let player = event.getPlayer()
	let card = event.getItem()
	let portal = event.getBlock()
	let destination_result = get_poolrooms_destination_result_from_card(card,portal)
	let result = destination_result.result
	poolrooms_portal_tell_status(portal,player,result)
	if (result == "success_backrooms") {
		try {
			let destination = destination_result.destination
			let [pos_x,pos_y,pos_z] = [destination.getX() + 0.5,destination.getY(),destination.getZ() + 0.5]
			player.teleportTo("backrooms:poolrooms",pos_x,pos_y,pos_z,90,0)
		} catch (error) {}
	}
	if (result == "success_poolrooms") {
		try {
			let destination = destination_result.destination
			let [pos_x,pos_y,pos_z] = [destination.getX() + 0.5,destination.getY(),destination.getZ() + 0.5]
			player.teleportTo("minecraft:overworld",pos_x,pos_y,pos_z,90,0)
		} catch (error) {}
	}
}
/**
* @param {Internal.ItemStack} card
* @param {Internal.BlockContainerJS} portal
*/
function get_poolrooms_destination_result_from_card(card,portal){
	if (card.hasTag("kubejs:location_cards")) {
		try {
			let portal_level = portal.getLevel()
			let portal_dimension = portal_level.getDimension()
			let server = portal_level.getServer()
			let card_data = card.getNbt().getCompound("location")
			if (card_data.isEmpty()) {
				return {"result":"no_location"}
			}
			let card_dimension = card_data.getString("levelKey")
			if (card_dimension == "") {
				return {"result":"no_location"}
			}
			let destination_level = server.getLevel(card_dimension)
			if (portal_dimension == "minecraft:overworld") {
				if (card_dimension != "backrooms:poolrooms") {
					return {"result":"location_not_poolrooms"}
				}
			} else if (portal_dimension == "backrooms:poolrooms") {
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
			if (portal_dimension == "minecraft:overworld") {
				return {"result":"success_backrooms","destination":destination}
			} else if (portal_dimension == "backrooms:poolrooms") {
				return {"result":"success_poolrooms","destination":destination}
			}
		} catch (error) {
			return {"result":"no_location"}
		}
	}
	return {"result":"ignore"}
}
/**
* @param {Internal.BlockContainerJS} portal
* @param {Internal.Player} player
* @param {String} status
*/
function poolrooms_portal_tell_status(portal,player,status){
	let level = portal.getLevel()
	let [pos_x,pos_y,pos_z] = [portal.getX(),portal.getY(),portal.getZ()]
	if (status == "no_location") {
		player.tell(`§6This card has no set location!`)
		level.playSound(null,pos_x,pos_y,pos_z,"mekanism:gui.digital_beep","blocks",1,0)
	}
	if (status == "location_not_poolrooms") {
		player.tell(`§6This card's location must be set to a position in the Poolrooms!`)
		level.playSound(null,pos_x,pos_y,pos_z,"mekanism:gui.digital_beep","blocks",1,0)
	}
	if (status == "location_not_overworld") {
		player.tell(`§6This card's location must be set to a position in the Backrooms!`)
		level.playSound(null,pos_x,pos_y,pos_z,"mekanism:gui.digital_beep","blocks",1,0)
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} portal
* @param {Internal.Player} player
*/
function get_poolrooms_respawn_point_or_default(portal,player){
	try {
		let server = player.getServer()
		let player_uuid = player.getUuid()
		let server_player = server.getPlayer(player_uuid)
		let dimension = portal.getLevel().getDimension()
		let res_pos = server_player.getRespawnPosition()
		let res_dim = server_player.getRespawnDimension().location()
		if (dimension == "minecraft:overworld") {
			if (res_dim == "backrooms:poolrooms") {
				return server.getLevel(res_dim).getBlock(res_pos)
			}
		} else if (res_dim == "backrooms:poolrooms") {
			if (res_dim == "minecraft:overworld") {
				return server.getLevel(res_dim).getBlock(res_pos)
			}
		}
		return get_poolrooms_dimension_destination_default(portal,player)
	} catch (error) {
		console.log(error)
		return get_poolrooms_dimension_destination_default(portal,player)
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} portal
* @param {Internal.Player} player
*/
function get_poolrooms_dimension_destination_default(portal,player){
	let server = player.getServer()
	try {
		let dimension = portal.getLevel().getDimension()
		if (dimension == "minecraft:overworld") {
			return server.getLevel("backrooms:poolrooms").getBlock(0,23,0)
		} else if (dimension == "backrooms:poolrooms") {
			return server.getLevel("minecraft:overworld").getBlock(-1000,23,-1000)
		}
	} catch (error) {
		return server.getLevel("minecraft:overworld").getBlock(-1000,23,-1000)
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function click_poolrooms_exit_event(event){
	let portal = event.getBlock()
	let player = event.getPlayer()
	try {
		let destination = get_poolrooms_respawn_point_or_default(portal,player)
		let level = destination.getLevel()
		let dimension = level.getDimension()
		let [pos_x,pos_y,pos_z] = [destination.getX() + 0.5,destination.getY(),destination.getZ() + 0.5]
		player.teleportTo(dimension,pos_x,pos_y,pos_z,0,0)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.portal.travel","blocks",0.2,2)
	} catch (error) {}
}