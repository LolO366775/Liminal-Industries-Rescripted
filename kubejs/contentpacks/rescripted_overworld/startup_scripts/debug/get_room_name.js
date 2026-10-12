/**
* @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx
* @param {Internal.Vector3d} position
*/
global.get_room_name_command = (ctx,position) => {
	let player = ctx.source.getPlayer()
	let has_player = (player != null)
	let level = ctx.source.getLevel()
	let [pos_x,pos_y,pos_z] = [position.x(),position.y(),position.z()]
	let pos_block = level.getBlock(pos_x,pos_y,pos_z)
	pos_x = pos_block.getX()
	pos_y = pos_block.getY()
	pos_z = pos_block.getZ()
	let node = global.get_room_node2(pos_x,pos_z,level) //is global now
	if (node.hasTag("kubejs:room_nodes")) {
		let room_name = node.getEntityData().getCompound("data").getString("room")
		if (has_player) {
			player.tell(`The room at ${pos_x}, ${pos_y}, ${pos_z} is ${room_name}`)
		}
	} else if (has_player) {
		player.tell(`There is no room node found at ${pos_x}, ${pos_y}, ${pos_z}`)
	}
	return 1
}