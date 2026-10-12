/**
* @param {number} pos_x
* @param {number} pos_z
* @param {Internal.ServerLevel} level
*/
function get_room_node(pos_x,pos_z,level){
	let center = get_world_center(level)
	let [node_x,node_y,node_z] = [get_node_a(pos_x,center),get_node_y(level),get_node_a(pos_z,center)]
	let room_node = level.getBlock(node_x,node_y,node_z)
    return room_node
}
/**
* @param {number} pos_x
* @param {number} pos_z
* @param {Internal.ServerLevel} level
*/
global.get_room_node2 = (pos_x,pos_z,level) => {
	let center = get_world_center(level)
	let [node_x,node_y,node_z] = [get_node_a(pos_x,center),get_node_y(level),get_node_a(pos_z,center)]
	let room_node = level.getBlock(node_x,node_y,node_z)
    return room_node
}
/**
* @param {Internal.ServerLevel} level
*/
function get_node_y(level){
    return get_node_dimension_y(level)
}