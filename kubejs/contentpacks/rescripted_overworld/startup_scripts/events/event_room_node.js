/**
* @param {Internal.BlockEntityJS} entity
*/
global.tick_event_room_node = entity => {
	let node = entity.getBlock()
	let dimension = node.level.getDimension()
	if (dimension == "minecraft:overworld") {
		let event_type = "none"
		let below = node.getDown()
		let level = node.level.server.getLevel("minecraft:overworld")
		let event_data =  level.persistentData.getCompound("event")
		if (below.hasTag("kubejs:room_nodes")) {
			event_type = event_data.getString("type")
			let status = get_room_light_status(below)
			if (event_type == "lights_out") {
				if (status == "lights_on" || status == "flicker") {
					//if (is_event_allowed_in_sector(below)) {}
					turn_room_lights_off_event_tick(below)
				}
			} else if (event_type == "lights_out_flicker") {
				if (status == "lights_on") {
					//if (is_event_allowed_in_sector(below)) {}
					turn_room_lights_flicker_event_tick(below)
				}
			} else if (event_type == "none") {
				if (status == "lights_on" || status == "flicker") {
					//if (is_event_allowed_in_sector(below)) {}
					turn_room_lights_on_event_tick
				}
			}
		}
	}
}
/**
* @param {Internal.BlockContainerJS} room_node
*/
function turn_room_lights_flicker_event_tick(room_node){
	let node_data = room_node.getEntityData().getCompound("data")
	let are_lights_off = (node_data.getBoolean("lights_off") || node_data.getBoolean("event_lights_off"))
	if (!are_lights_off) {
		node_data.putString("room_light_status","flicker")
		turn_room_lights_flicker(room_node)
	}
	return true
}
/**
* @param {Internal.BlockContainerJS} room_node
*/
function turn_room_lights_off_event_tick(room_node){
	let node_data = room_node.getEntityData().getCompound("data")
	let are_lights_off = (node_data.getBoolean("lights_off") || node_data.getBoolean("event_lights_off"))
	if (!are_lights_off) {
		node_data.putString("room_light_status","lights_off")
		turn_room_lights_off(room_node)
	}
	return true
}
/**
* @param {Internal.BlockContainerJS} room_node
*/
function turn_room_lights_on_event_tick(room_node){
	let node_data = room_node.getEntityData().getCompound("data")
	let are_lights_off_event = node_data.getBoolean("event_lights_off")
	if (are_lights_off_event) {
		node_data.putString("room_light_status","lights_on")
		turn_room_lights_on(room_node)
	}
	return true
}
/**
* @param {Internal.BlockContainerJS} room_node
*/
function get_room_light_status(room_node){
	try {
		let node_data = room_node.getEntityData().getCompound("data")
		let lights = node_data.getString("room_light_status")
		let override = node_data.getBoolean("lights_off")
		if (lights == "flicker") {
			return "flicker"
		}
		if (lights == "on") {
			return "lights_on"
		}
		if (lights == "off") {
			return "lights_off"
		}
		if (override) {
			return "unaffected"
		}
		return "lights_on"
	} catch (error) {
		return "unaffected"
	}
}



/**
* @param {Internal.BlockContainerJS} room_node
*/
function is_event_allowed_in_sector(room_node){
	let [pos_x,pos_z] = [room_node.getX(),room_node.getZ()]
	let level = room_node.getLevel()
	let world_center = get_world_center(level)
	let sector = get_sector(pos_x,pos_z,world_center,world_center,level)
	try {
		let enabled = get_lights_out_config_enabled()
		if (!enabled) {
			return false
		}
		let sectors = get_lights_out_config_sectors()
		let whitelist = sectors.whitelist
		let blacklist = sectors.blacklist
		for (let black_num = 0; black_num < blacklist.length; black_num++) {
			//level.server.runCommandSilent(`say b1: ${sector}`)
			//level.server.runCommandSilent(`say b2: ${blacklist[black_num]}`)
			if (sector == blacklist[black_num]) {
				return false
			}
		}
		for (let white_num = 0; white_num < whitelist.length; white_num++) {
			//level.server.runCommandSilent(`say w1: ${sector}`)
			//level.server.runCommandSilent(`say w2: ${whitelist[white_num]}`)
			if (sector == whitelist[white_num]) {
				return true
			}
		}
		if (whitelist.length == 0) {
			return true
		}
		return false
	} catch (error) {
		return false
	}
}