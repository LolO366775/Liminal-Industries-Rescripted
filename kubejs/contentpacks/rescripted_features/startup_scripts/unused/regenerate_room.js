/**
* @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx
* @param {Internal.Vector3d} position
*/
global.create_layered_node_command = (ctx,position) => {
	const [pos_x, pos_y, pos_z] = [position.x(), position.y(), position.z()]
	const level = ctx.source.getLevel()
	let node = level.getBlock(pos_x,pos_y,pos_z)
	create_layered_node(node)
	return 1
}

/**
* @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx
* @param {Internal.Vector3d} position
*/
global.regenerate_room_command = (ctx,position) => {
	let [pos_x, pos_z] = [position.x(), position.z()]
	let level = ctx.source.getLevel()
	let room_node = global.get_room_node2(pos_x,pos_z,level)
	regenerate_room(room_node)
	return 1
}

/**
* @param {Internal.BlockContainerJS} room_node
*/
function regenerate_room(room_node){
	if (room_node.hasTag("kubejs:room_nodes")) {
		let level = room_node.getLevel()
		let dimension = level.getDimension()
		let [node_x,node_z] = [room_node.getX(),room_node.getZ()]
		let [center_x,center_z] = [global.get_world_center_bridge(level),global.get_world_center_bridge(level)]
		let sector = global.get_sector_bridge(node_x,node_z,center_x,center_z,dimension)
		erase_room_slice(room_node,-23,-23)
		erase_room_slice(room_node,-23,23)
		erase_room_slice(room_node,23,-23)
		erase_room_slice(room_node,23,23)
		create_layered_node(room_node,get_random_room(sector))
	}
	return 1
}

/**
* @param {Internal.BlockContainerJS} node
* @param {String} room
*/
function create_layered_node(node,room){
	node.set("kubejs:layered_room_node_block")
	let node_data = node.getEntityData().getCompound("data")
	node_data.putInt("slice",1)
	node_data.putString("room",room)
	node_data.putBoolean("panel_cutout",false) //has_panel_cutout(sector)?
	return 1
}

/**
* @param {Internal.BlockContainerJS} room_node
* @param {Number} offset_x
* @param {Number} offset_z
*/
function erase_room_slice(room_node,offset_x,offset_z){
	let level = room_node.getLevel()
	let [node_x,node_y,node_z] = [room_node.getX(),room_node.getY(),room_node.getZ()]
	let server = level.getServer()
	let dimension = level.getDimension()
	server.runCommandSilent(`execute in ${dimension} positioned ${node_x} ${node_y} ${node_z} run fill ~${offset_x} 0 ~${offset_z} ~ 46 ~ kubejs:liminalstone`)
	return true
}