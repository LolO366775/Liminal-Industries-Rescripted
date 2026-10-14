/**
* @param {Internal.BlockContainerJS} room_node
*/
function turn_room_lights_flicker(room_node){
	const level = room_node.getLevel()
	const [node_x,node_y,node_z] = [room_node.getX(),room_node.getY(),room_node.getZ()]
	turn_light_flicker_slice(level,node_x,node_y,node_z,-23,-23)
	turn_light_flicker_slice(level,node_x,node_y,node_z,-23,23)
	turn_light_flicker_slice(level,node_x,node_y,node_z,23,-23)
	turn_light_flicker_slice(level,node_x,node_y,node_z,23,23)
	return true
}
/**
* @param {Internal.Level} level
* @param {Number} node_x
* @param {Number} node_y
* @param {Number} node_z
* @param {Number} offset_x
* @param {Number} offset_z
*/
function turn_light_flicker_slice(level,node_x,node_y,node_z,offset_x,offset_z){
	let server = level.getServer()
	let dimension = level.getDimension()
	server.runCommandSilent(`execute in ${dimension} positioned ${node_x} ${node_y} ${node_z} run fill ~${offset_x} 0 ~${offset_z} ~ 46 ~ kubejs:ceilling_lamp_blinking replace #kubejs:yellow_ceilling_lamps_on`)
	server.runCommandSilent(`execute in ${dimension} positioned ${node_x} ${node_y} ${node_z} run fill ~${offset_x} 0 ~${offset_z} ~ 46 ~ kubejs:ceilling_lamp2_blinking replace #kubejs:white_ceilling_lamps_on`)
	server.runCommandSilent(`execute in ${dimension} positioned ${node_x} ${node_y} ${node_z} run fill ~${offset_x} 0 ~${offset_z} ~ 46 ~ kubejs:ceilling_lamp_red_blinking replace #kubejs:red_ceilling_lamps_on`)
	server.runCommandSilent(`execute in ${dimension} positioned ${node_x} ${node_y} ${node_z} run fill ~${offset_x} 0 ~${offset_z} ~ 46 ~ minecraft:light[level=0] replace minecraft:light`)
	return true
}