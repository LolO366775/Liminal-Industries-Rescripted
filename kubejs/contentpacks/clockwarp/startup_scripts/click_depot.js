/**
* @param {Internal.BlockRightClickedEventJS} event
*/
global.location_terminal_right_click_with_card_event = event => {
	let card = event.getItem()
	if (card.hasTag("kubejs:location_cards")) {
		let depot = event.getBlock().getUp()
		let [pos_x,pos_y,pos_z] = [depot.getX(),depot.getY(),depot.getZ()]
		let level = depot.getLevel()
		if (depot.hasTag("kubejs:dimensional_package_depots")) {
			try {
				let card_location_data = get_location_from_card(card)
				let card_result = card_location_data.result
				if (card_result == "no_address") {
					event.player.tell(`§6This card has no address!`)
					level.playSound(null,pos_x,pos_y,pos_z,"mekanism:gui.digital_beep","blocks",1,0)
				}
				if (card_result == "success") {
					add_address_to_depot_event(event,depot)
				}
			} catch (error) {
				event.player.tell(`§4There was an error adding this location: ${error}`)
				level.playSound(null,pos_x,pos_y,pos_z,"mekanism:gui.digital_beep","blocks",1,0)
			}
		} else {
			event.player.tell(`§6There is no Dimensional Package Depot connected!`)
			level.playSound(null,pos_x,pos_y,pos_z,"mekanism:gui.digital_beep","blocks",1,0)
		}
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {Internal.BlockContainerJS} depot
*/
function add_address_to_depot_event(event,depot){
	let level = depot.getLevel()
	let [pos_x,pos_y,pos_z] = [depot.getX(),depot.getY(),depot.getZ()]
	let card = event.getItem()
	let card_location_data = get_location_from_card(card)
	event.player.tell(`§2Location added to depot!`)
	set_depot_colour_event(event,depot)
	let new_location = card_location_data.value
	let address = new_location.address
	let depot_data = depot.getEntityData().getCompound("data")
	let address_list = depot_data.getCompound("address_list")
	address_list.put(address,new_location)
	depot.mergeEntityData({"data":{"address_list":address_list}})
	level.playSound(null,pos_x,pos_y,pos_z,"mekanism:gui.digital_beep","blocks",1,2)
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
global.dimensional_depot_right_click_event = event => {
	let card = event.getItem()
	if (card.hasTag("kubejs:location_cards")) {
		let depot = event.getBlock()
		let [pos_x,pos_y,pos_z] = [depot.getX(),depot.getY(),depot.getZ()]
		let level = depot.getLevel()
		try {
			let card_location_data = get_location_from_card(card)
			let card_result = card_location_data.result
			if (card_result == "no_address") {
				event.player.tell(`§2Location added to card!`)
				set_depot_colour_event(event,depot)
				depot_save_location_card(card,depot)
				level.playSound(null,pos_x,pos_y,pos_z,"mekanism:gui.digital_beep","blocks",1,2)
			}
		} catch (error) {
			event.player.tell(`§4There was an error adding this location: ${error}`)
			level.playSound(null,pos_x,pos_y,pos_z,"mekanism:gui.digital_beep","blocks",1,0)
		}
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {Internal.BlockContainerJS} depot
*/
function set_depot_colour_event(event,depot){
	let card = event.getItem()
	let depot_id = depot.getId()
	let depot_colour = get_depot_result_colour(card)
	if (depot_colour == "0") {
		depot.set(depot_id,{"age":"0"})
	} else {
		depot.set(depot_id,{"age":depot_colour})	
	}
}
/**
* @param {Internal.ItemStack} card
*/
function get_depot_result_colour(card){
	let card_id = card.getId()
	if (card_id == "kubejs:brown_location_card") {
		return "1"
	}
	if (card_id == "kubejs:red_location_card") {
		return "2"
	}
	if (card_id == "kubejs:orange_location_card") {
		return "3"
	}
	if (card_id == "kubejs:yellow_location_card") {
		return "4"
	}
	if (card_id == "kubejs:lime_location_card") {
		return "5"
	}
	if (card_id == "kubejs:green_location_card") {
		return "6"
	}
	if (card_id == "kubejs:cyan_location_card") {
		return "7"
	}
	if (card_id == "kubejs:light_blue_location_card") {
		return "8"
	}
	if (card_id == "kubejs:blue_location_card") {
		return "9"
	}
	if (card_id == "kubejs:purple_location_card") {
		return "10"
	}
	if (card_id == "kubejs:magenta_blue_location_card") {
		return "11"
	}
	if (card_id == "kubejs:pink_location_card") {
		return "12"
	}
	if (card_id == "kubejs:white_location_card") {
		return "13"
	}
	if (card_id == "kubejs:light_gray_location_card") {
		return "14"
	}
	if (card_id == "kubejs:gray_blue_location_card") {
		return "15"
	}
	if (card_id == "kubejs:black_location_card") {
		return "16"
	}
	return "0"
}
/**
* @param {String} address
*/
function address_name_default(address){
	if (address == "Brown Location Card") {
		return "Brown"
	}
	if (address == "Red Location Card") {
		return "Red"
	}
	if (address == "Orange Location Card") {
		return "Orange"
	}
	if (address == "Yellow Location Card") {
		return "Yellow"
	}
	if (address == "Lime Location Card") {
		return "Lime"
	}
	if (address == "Green Location Card") {
		return "Green"
	}
	if (address == "Cyan Location Card") {
		return "Cyan"
	}
	if (address == "Light Blue Location Card") {
		return "Light Blue"
	}
	if (address == "Blue Location Card") {
		return "Blue"
	}
	if (address == "Purple Location Card") {
		return "Purple"
	}
	if (address == "Pink Location Card") {
		return "Pink"
	}
	if (address == "White Location Card") {
		return "White"
	}
	if (address == "Light Gray Location Card") {
		return "Light Gray"
	}
	if (address == "Gray Location Card") {
		return "Gray"
	}
	if (address == "Black Location Card") {
		return "Black"
	}
	return address
}
/**
* @param {Internal.ItemStack} card
*/
function get_location_from_card(card){
	try {
		let card_data = card.getNbt().getCompound("location")
		if (card_data.isEmpty()) {
			return {"result":"no_address","value":{}}
		}
		let dimension = card_data.getString("levelKey")
		if (dimension == "") {
			return {"result":"no_address","value":{}}
		}
		let position = card_data.getCompound("blockpos")
		if (position.isEmpty()) {
			return {"result":"no_address","value":{}}
		}
		let address = address_name_default(card_data.getString("name"))
		if (address == "") {
			return {"result":"success","value":{"address":"default","dimension":dimension,"position":position}}
		} else {
			return {"result":"success","value":{"address":address,"dimension":dimension,"position":position}}
		}
	} catch (error) {
		return {"result":"no_address","value":{}}
	}
}
/**
* @param {Internal.ItemStack} card
* @param {Internal.BlockContainerJS} depot
*/
function depot_save_location_card(card,depot){
	try {
		let level = depot.getLevel()
		let name = address_name_default(card.getDisplayName().getString().replace("[","").replace("]",""))
		let dimension = level.getDimension().toString()
		let [pos_x,pos_y,pos_z] = [depot.getX() + 0.5,depot.getY() + 1,depot.getZ() + 0.5]
		card.setNbt({"location":{"name":name,"levelKey":dimension,"blockpos":{"X":pos_x,"Y":pos_y,"Z":pos_z}}})
	} catch (error) {}
}