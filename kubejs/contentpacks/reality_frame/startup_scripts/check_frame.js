//Requires: check_bottom_layer()
//Requires: check_bottom_layer()
//Requires: check_pillar_blocks()
//Requires: get_corner_block()
/**
* @param {Internal.BlockContainerJS} controller
*/
function is_reality_frame_valid(controller) {
	let [pos_x,pos_y,pos_z] = [controller.getX(),controller.getY(),controller.getZ()]
	let level = controller.getLevel()
	let corner_block = get_corner_block(pos_x,pos_y,pos_z,level)
	if (corner_block.id == "kubejs:reality_frame") {
		let corner_x = corner_block.getX()
		let corner_z = corner_block.getZ()
		let check1 = check_bottom_layer(corner_x,pos_y,corner_z,level,controller)
		let check2 = check_pillar_blocks(corner_x,pos_y,corner_z,level)
		let check3 = check_bottom_layer(corner_x,pos_y + 8,corner_z,level,controller)
		if (check1 && check2 && check3) {return true}
	}
	return false
}
//Requires: get_x_offset
//Requires: get_z_offset
/**
* @param {Number} pos_x
* @param {Number} pos_y
* @param {Number} pos_z
* @param {Internal.ServerLevel} level
*/
function get_corner_block(pos_x,pos_y,pos_z,level) {
	let controller = level.getBlock(pos_x,pos_y,pos_z)
	if (controller.getId() == "kubejs:reality_controller" || controller.getId() == "kubejs:reality_controller_running") {
		let facing = controller.properties.get("facing")
		let block_x = get_x_offset(pos_x,facing)
		let block_z = get_z_offset(pos_z,facing)
		return level.getBlock(block_x,pos_y,block_z)
	}
	return level.getBlock(pos_x,pos_y,pos_z)
}
/**
* @param {Number} pos_x
* @param {String} direction
*/
function get_x_offset(pos_x,direction) {
	if (direction == "north" || direction == "up" || direction == "down" || direction == "south") {return pos_x - 4}
	if (direction == "east") {return pos_x - 8}
	return pos_x
}
/**
* @param {Number} pos_z
* @param {String} direction
*/
function get_z_offset(pos_z,direction) {
	if (direction == "west" || direction == "east") {return pos_z - 4}
	if (direction == "south") {return pos_z - 8}
	return pos_z
}
//Requires: controller_check()
/**
* @param {Number} pos_x
* @param {Number} pos_y
* @param {Number} pos_z
* @param {Internal.ServerLevel} level
* @param {Internal.BlockContainerJS} controller
*/
function check_bottom_layer(pos_x,pos_y,pos_z,level,controller) {

	//west side (9 blocks)
	for (let count = 0; count < 9; count++) {
		if (!controller_check(pos_x,pos_y,pos_z + count,level,controller)) {
			if (level.getBlock(pos_x,pos_y,pos_z + count).getId() != "kubejs:reality_frame") {return false}
		}
	}
	//east side (9 blocks)
	for (let count = 0; count < 9; count++) {
		if (!controller_check(pos_x + 8,pos_y,pos_z + count,level,controller)) {
			if (level.getBlock(pos_x + 8,pos_y,pos_z + count).getId() != "kubejs:reality_frame") {return false}
		}
	}
	//north side (7 blocks)
	for (let count = 1; count < 8; count++) {
		if (!controller_check(pos_x + count,pos_y,pos_z,level,controller)) {
			if (level.getBlock(pos_x + count,pos_y,pos_z).getId() != "kubejs:reality_frame") {return false}
		}
	}
	//south side (7 blocks)
	for (let count = 1; count < 8; count++) {
		if (!controller_check(pos_x + count,pos_y,pos_z + 8,level,controller)) {
			if (level.getBlock(pos_x + count,pos_y,pos_z + 8).getId() != "kubejs:reality_frame") {return false}
		}
	}
	return true
}
/**
* @param {Number} pos_x
* @param {Number} pos_y
* @param {Number} pos_z
* @param {Internal.ServerLevel} level
* @param {Internal.BlockContainerJS} controller
*/
function controller_check(pos_x,pos_y,pos_z,level,controller) {
	//let [pos_x,pos_y,pos_z] = [controller.getX(),controller.getY(),controller.getZ()]
	let frame = level.getBlock(pos_x,pos_y,pos_z)
	if (frame.getId() == "kubejs:reality_controller" || frame.getId() == "kubejs:reality_controller_running") {
		let controller_x = Math.floor(controller.getX())
		let controller_y = Math.floor(controller.getY())
		let controller_z = Math.floor(controller.getZ())
		let frame_x = Math.floor(pos_x)
		let frame_y = Math.floor(pos_y)
		let frame_z = Math.floor(pos_z)
		if(controller_x == frame_x && controller_y == frame_y && controller_z == frame_z) {return true}
	}
	return false
}
/**
* @param {Number} pos_x
* @param {Number} pos_y
* @param {Number} pos_z
* @param {Internal.ServerLevel} level
*/
function check_pillar_blocks(pos_x,pos_y,pos_z,level) {
	//4 pillar blocks (7 times upwards)
	for (let count = 1; count < 8; count++) {
		if (level.getBlock(pos_x,pos_y + count,pos_z).getId() != "kubejs:reality_frame") {return false}
		if (level.getBlock(pos_x,pos_y + count,pos_z + 8).getId() != "kubejs:reality_frame") {return false}
		if (level.getBlock(pos_x + 8,pos_y + count,pos_z).getId() != "kubejs:reality_frame") {return false}
		if (level.getBlock(pos_x + 8,pos_y + count,pos_z + 8).getId() != "kubejs:reality_frame") {return false}
	}
	return true
}