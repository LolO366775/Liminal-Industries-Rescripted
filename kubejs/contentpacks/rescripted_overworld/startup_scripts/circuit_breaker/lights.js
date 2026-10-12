/**
* @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx
*/
global.turn_lights_on_command = ctx => {
	let position = ctx.source.getPosition()
	let level = ctx.source.getLevel()
	let node = global.get_room_node2(position.x(),position.z(),level)
	if (is_block_node(node)) {
		node.getEntityData().getCompound("data").putBoolean("lights_off",false)
		turn_room_lights_on(node)
	}
}
/**
* @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx
*/
global.turn_lights_off_command = ctx => {
	let position = ctx.source.getPosition()
	let level = ctx.source.getLevel()
	let node = global.get_room_node2(position.x(),position.z(),level)
	if (node.hasTag("kubejs:room_nodes")) {
		node.getEntityData().getCompound("data").putBoolean("lights_off",true)
		turn_room_lights_off(node)
	}
}
/**
* @param {Internal.BlockContainerJS} room_node
*/
function turn_room_lights_on(room_node){
	const level = room_node.getLevel()
	const [node_x,node_y,node_z] = [room_node.getX(),room_node.getY(),room_node.getZ()]
	turn_light_on_slice(level,node_x,node_y,node_z,-23,-23)
	turn_light_on_slice(level,node_x,node_y,node_z,-23,23)
	turn_light_on_slice(level,node_x,node_y,node_z,23,-23)
	turn_light_on_slice(level,node_x,node_y,node_z,23,23)
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
function turn_light_on_slice(level,node_x,node_y,node_z,offset_x,offset_z){
	let server = level.getServer()
	let dimension = level.getDimension()
	server.runCommandSilent(`execute in ${dimension} positioned ${node_x} ${node_y} ${node_z} run fill ~${offset_x} 0 ~${offset_z} ~ 46 ~ kubejs:ceilling_lamp_waking replace #kubejs:yellow_ceilling_lamps_off`)
	server.runCommandSilent(`execute in ${dimension} positioned ${node_x} ${node_y} ${node_z} run fill ~${offset_x} 0 ~${offset_z} ~ 46 ~ kubejs:ceilling_lamp2_waking replace #kubejs:white_ceilling_lamps_off`)
	server.runCommandSilent(`execute in ${dimension} positioned ${node_x} ${node_y} ${node_z} run fill ~${offset_x} 0 ~${offset_z} ~ 46 ~ kubejs:ceilling_lamp_red_waking replace #kubejs:red_ceilling_lamps_off`)
	return true
}
/**
* @param {Internal.BlockContainerJS} room_node
*/
function turn_room_lights_off(room_node){
	try {
		let level = room_node.getLevel()
		let [node_x,node_y,node_z] = [room_node.getX(),room_node.getY(),room_node.getZ()]
		turn_light_off_slice(level,node_x,node_y,node_z,-23,-23)
		turn_light_off_slice(level,node_x,node_y,node_z,-23,23)
		turn_light_off_slice(level,node_x,node_y,node_z,23,-23)
		turn_light_off_slice(level,node_x,node_y,node_z,23,23)
		return true		
	} catch (error) {
		//console.log(`Error turning off room lights at ${node_x} ${node_y} ${node_z}: ${error}`);
		return false	
	}
}
/**
* @param {Internal.Level} level
* @param {Number} node_x
* @param {Number} node_y
* @param {Number} node_z
* @param {Number} offset_x
* @param {Number} offset_z
*/
function turn_light_off_slice(level,node_x,node_y,node_z,offset_x,offset_z){
	let server = level.getServer()
	let dimension = level.getDimension()
	server.runCommandSilent(`execute in ${dimension} positioned ${node_x} ${node_y} ${node_z} run fill ~${offset_x} 0 ~${offset_z} ~ 46 ~ kubejs:ceilling_lamp_off replace #kubejs:yellow_ceilling_lamps_on`)
	server.runCommandSilent(`execute in ${dimension} positioned ${node_x} ${node_y} ${node_z} run fill ~${offset_x} 0 ~${offset_z} ~ 46 ~ kubejs:ceilling_lamp2_off replace #kubejs:white_ceilling_lamps_off`)
	server.runCommandSilent(`execute in ${dimension} positioned ${node_x} ${node_y} ${node_z} run fill ~${offset_x} 0 ~${offset_z} ~ 46 ~ kubejs:ceilling_lamp_red_off replace #kubejs:red_ceilling_lamps_off`)
	server.runCommandSilent(`execute in ${dimension} positioned ${node_x} ${node_y} ${node_z} run fill ~${offset_x} 0 ~${offset_z} ~ 46 ~ minecraft:air replace minecraft:light`)
	server.runCommandSilent(`execute in ${dimension} positioned ${node_x} ${node_y} ${node_z} run fill ~${offset_x} 0 ~${offset_z} ~ 46 ~ minecraft:air replace torchmaster:invisible_light`)
	return true
}



