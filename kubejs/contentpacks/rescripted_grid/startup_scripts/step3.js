//Step 3: Calculate sector of new node and generate it
/**
* @param {Internal.BlockContainerJS} connector
*/
function generate_new_node(connector){
	let level = connector.getLevel()
	let dimension = level.getDimension()
	let [center_x,center_z] = [get_world_center(level),get_world_center(level)]
	let [pos_x,pos_z] = [connector.getX(),connector.getZ()]
	let node_x = get_node_a(pos_x,center_x)
	let node_y = get_node_dimension_y(level) //get_node_dimension_y() is in step 1-2
	let node_z = get_node_a(pos_z,center_z)
	let connector_north = level.getBlock(node_x,node_y,node_z - 22)
	let connector_south = level.getBlock(node_x,node_y,node_z + 22)
	let connector_west = level.getBlock(node_x - 22,node_y,node_z)
	let connector_east = level.getBlock(node_x + 22,node_y,node_z)
	let pass1 = (connector_north.id == "minecraft:air")
	let pass2 = (connector_south.id == "minecraft:air")
	let pass3 = (connector_west.id == "minecraft:air")
	let pass4 = (connector_east.id == "minecraft:air")
	if (pass1 && pass2 && pass3 && pass4) {
		let room = "empty"
		let dimension_id = dimension.toString()
		if (dimension_id == "backrooms:room_forge") {
			room = get_random_room_forge_room(node_x,node_z)
		} else {
			room = get_random_room(get_sector_list(node_x,node_z,dimension_id))	
		}
		room = convert_errored_rooms(room)
		let node = level.getBlock(node_x,node_y,node_z)
		node.set("kubejs:layered_room_node_block")
		if (dimension_id == "minecraft:overworld") {
			node.getUp().set("kubejs:event_room_node_block")
		}
		let node_data = node.getEntityData().getCompound("data")
		node_data.putInt("slice",1)
		//connector.level.server.runCommandSilent(`say ${room}`)
		//console.log(room);
		node_data.putString("room",room)
		node.getEntityData().put("data",node_data)
		//level.server.runCommandSilent(`say ${node.getEntityData()}`)
		connector_north.set("kubejs:room_node_connector", {"facing":"north"})
		connector_south.set("kubejs:room_node_connector", {"facing":"south"})
		connector_west.set("kubejs:room_node_connector", {"facing":"west"})
		connector_east.set("kubejs:room_node_connector", {"facing":"east"})
	}
}
/**
* @param {Internal.ServerLevel} level
*/
function get_world_center(level){
	let dimension = level.getDimension()
	if (dimension == "minecraft:overworld") {
		return -1000
	}
    return 0
}
/**
* @param {Internal.ServerLevel} level
*/
global.get_world_center_bridge = (level) => {
	return get_world_center(level)
}
/**
* @param {Number} center_a
* @param {Number} pos_a
*/
function get_node_a(pos_a, center_a){
	let node_a = 0;
	let parcel_dist_a = Math.floor(Math.abs(pos_a - (center_a)) / 23)
	if (parcel_dist_a > 0) {
    	if (parcel_dist_a % 2 == 0) {parcel_dist_a = Math.floor(parcel_dist_a - 1)}
    }
	parcel_dist_a = Math.ceil(parcel_dist_a / 2)
	if (pos_a > center_a) {
        node_a = center_a + parcel_dist_a * 46
    } else if (pos_a < center_a) {
        node_a = center_a + parcel_dist_a * 46 * (-1)
    } else {
        node_a = center_a
	}
	node_a = Math.floor(node_a)
    return node_a
}
/**
* @param {Number} sector
*/
function has_panel_cutout(sector) {
	if (sector == 3) {return true}
	if (sector == 4) {return true}
	if (sector == 5) {return true}
	if (sector == 6) {return true}
	return false
}
//Room Forge Addition
/**
* @param {Number} pos_x
* @param {Number} pos_z
*/
function get_random_room_forge_room(pos_x, pos_z) {
	if (pos_x == 0 && pos_z == 0) {
		return "room_forge_starting1"
	} else if (pos_x == 46 && pos_z == 0) {
		return "room_forge_starting2"
	} else if (pos_x == 0) {
		return "room_forge_inner_wall"
	} else if (pos_x == 46) {
		return "room_forge_outer_wall"
	} else if (pos_x == 92 && pos_z == 0) {
		return "room_forge_empty_room"
	} else if (pos_x == 92 && pos_z == -46) {
		return "room_forge_empty_room_left_side"
	} else if (pos_x == 92 && pos_z == 46) {
		return "room_forge_empty_room_right_side"
	} else if (pos_x == 138 && pos_z == 0) {
		return "room_forge_empty_room_back_side"
	}
	return "nothing"
}