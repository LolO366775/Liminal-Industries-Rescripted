StartupEvents.registry('block', event => {
	event.create('location_terminal','cardinal')
	.fullBlock(true)
	.material("wood")
	.soundType("wood")
    .tagBlock('minecraft:mineable/pickaxe')
	.tagBlock('minecraft:mineable/axe')
	.blockEntity(entityInfo => {})
})
/**
* @param {Internal.BlockContainerJS} terminal
* @param {Boolean} from_clock
*/
function is_location_terminal(terminal,from_clock){
	if (terminal.getId() == "kubejs:location_terminal") {
		if (does_terminal_have_address(terminal,from_clock)) {
			return true
		}
	}
	return false
}
/**
* @param {Internal.BlockContainerJS} terminal
* @param {Boolean} from_clock
*/
function does_terminal_have_address(terminal,from_clock){
	let terminal_data = terminal.getEntityData().getCompound("data")
	let address_data = terminal_data.getCompound("address_list")
	if (from_clock) {
		address_data = terminal_data.getCompound("clock_address_list")
	}
	if (address_data.isEmpty()) {
		return false
	}
	return true
}
/**
* @param {Internal.BlockContainerJS} terminal
* @param {String} address
* @param {Boolean} from_clock
*/
function get_terminal_destination_dimension(terminal,address,from_clock){
	let address_list = terminal.getEntityData().getCompound("data").getCompound("address_list")
	let address_data = address_list.getCompound(address)
	if (from_clock) {
		let terminal_dimension = terminal.level.getDimension()
		if (terminal_dimension == "minecraft:the_nether") {
			return "minecraft:overworld"
		} else if (terminal_dimension == "minecraft:overworld") {
			return "minecraft:the_nether"
		}
	}
	return address_data.getString("dimension")
}
/**
* @param {Internal.BlockContainerJS} terminal
* @param {String} dimension
* @param {String} address
* @param {Boolean} from_clock
*/
function get_terminal_destination(terminal,dimension,address,from_clock){
	let terminal_data = terminal.getEntityData().getCompound("data")
	let address_list = terminal_data.getCompound("address_list")
	let address_data = address_list.getCompound(address)
	if (from_clock) {
		address_list = terminal_data.getCompound("clock_address_list")
		let terminal_dimension = terminal.level.getDimension()
		if (terminal_dimension == "minecraft:the_nether") {
			address_data = address_list.get("backrooms")
		} else if (terminal_dimension == "minecraft:overworld") {
			address_data = address_list.get("nether")
		}
	}
	let position = address_data.getCompound("position")
	let [pos_x,pos_y,pos_z] = [position.getInt("X"),position.getInt("Y"),position.getInt("Z")]
	let new_level = terminal.level.server.getLevel(dimension)
	return new_level.getBlock(pos_x,pos_y,pos_z)
}
/**
* @param {Internal.BlockContainerJS} location
* @param {Internal.ItemStack} input
* @param {Internal.ItemStack} output
*/
function terminal_transport_item(location,input,output){
	let [pos_x,pos_y,pos_z] = [location.getX(),location.getY(),location.getZ()]
	let level = location.getLevel()
	let item_entity = level.createEntity("minecraft:item")
	item_entity.setPos(pos_x,pos_y,pos_z)
	item_entity.item = output
	item_entity.spawn()
	input.setCount(0)
	return 1
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
global.location_terminal_right_click_event = event => {
	if (event.item.hasTag("kubejs:location_cards")) {
		let terminal = event.getBlock()
		let [pos_x,pos_y,pos_z] = [terminal.getX(),terminal.getY(),terminal.getZ()]
		let level = terminal.getLevel()
		try {
			let result = set_location_terminal_from_card(terminal,event.item)
			if (result == "no_address") {
				event.player.tell(`§6This card has no address!`)
				level.playSound(null,pos_x,pos_y,pos_z,"mekanism:gui.digital_beep","blocks",1,0)
			}
			if (result == "no_name") {
				event.player.tell(`§6This card has no name!`)
				level.playSound(null,pos_x,pos_y,pos_z,"mekanism:gui.digital_beep","blocks",1,0)
			}
			else if (result == "success") {
				event.player.tell(`§2Location added to terminal!`)
				level.playSound(null,pos_x,pos_y,pos_z,"mekanism:gui.digital_beep","blocks",1,2)
			}
		} catch (error) {
			event.player.tell(`§4There was an error adding this location`)
			level.playSound(null,pos_x,pos_y,pos_z,"mekanism:gui.digital_beep","blocks",1,0)
		}
	}
}
/**
* @param {Internal.BlockContainerJS} terminal
* @param {Internal.ItemStack} card
*/
function set_location_terminal_from_card(terminal,card){
	let terminal_data = terminal.getEntityData().getCompound("data")
	try {
		let card_data = card.getNbt().getCompound("location")
		if (card_data.isEmpty()) {return "no_address"}
		let address = card_data.getString("name")
		if (address == "") {return "no_name"}
		let dimension = card_data.getString("levelKey")
		if (dimension == "") {return "no_address"}
		let position = card_data.getCompound("blockpos")
		if (position.isEmpty()) {return "no_address"}
		let address_data = terminal_data.getCompound("address_list")
		address_data.put(address,{"dimension":dimension,"position":position})
		terminal_data.put("address_list",address_data)
		//Sets clock positon data alongside the actual position data
		if (dimension == "minecraft:the_nether") {
			let clock_dimension_list = terminal_data.getCompound("clock_address_list")
			clock_dimension_list.put("nether",{"position":position})
			terminal_data.put("clock_address_list",clock_dimension_list)
		} else if (dimension == "minecraft:overworld") {
			let clock_dimension_list = terminal_data.getCompound("clock_address_list")
			clock_dimension_list.put("backrooms",{"position":position})
			terminal_data.put("clock_address_list",clock_dimension_list)
		}
	} catch (error) {
		return "no_address"
	}
	terminal.setEntityData({"data":terminal_data})
	return "success"
}