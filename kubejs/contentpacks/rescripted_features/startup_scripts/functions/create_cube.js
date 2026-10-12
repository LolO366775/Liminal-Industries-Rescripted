/**
* @param {Internal.BlockContainerJS} node
* @param {String} id
*/
function create_big_cube(node){
	let node_data = node.getEntityData().getCompound("data")
	let colour = node_data.getString("cube_colour")
	let level = node.getLevel()
	let [pos_x,pos_y,pos_z] = [node.getX() + 0.5,node.getY() + 0.5,node.getZ() + 0.5]
	for (let x_offset = -2; x_offset < 1; x_offset++) {
		for (let z_offset = -2; z_offset < 1; z_offset++) {
			for (let y_offset = -1; y_offset < 2; y_offset++) {
				let [new_pos_x,new_pos_y,new_pos_z] = [pos_x + x_offset, pos_y + y_offset, pos_z + z_offset]
				let cube = level.getBlock(new_pos_x,new_pos_y,new_pos_z)
				cube.set(get_cube_colour_id(colour))
			}
		}
	}
    return 1
}
/**
* @param {String} colour
*/
function get_cube_colour_id(colour){
	if (colour == "red") {
		return "antiblocksrechiseled:bright_red"
	}
	if (colour == "orange") {
		return "antiblocksrechiseled:bright_orange"
	}
	if (colour == "yellow") {
		return "antiblocksrechiseled:bright_yellow"
	}
	if (colour == "green") {
		return "antiblocksrechiseled:bright_green"
	}
	if (colour == "cyan") {
		return "antiblocksrechiseled:bright_cyan"
	}
	if (colour == "blue") {
		return "antiblocksrechiseled:bright_blue"
	}
	if (colour == "magenta") {
		return "antiblocksrechiseled:bright_magenta"
	}
	if (colour == "white") {
		return "antiblocksrechiseled:bright_white"
	}
	if (colour == "black") {
		return "antiblocksrechiseled:bright_black"
	}
	return "antiblocksrechiseled:bright_cyan"
}