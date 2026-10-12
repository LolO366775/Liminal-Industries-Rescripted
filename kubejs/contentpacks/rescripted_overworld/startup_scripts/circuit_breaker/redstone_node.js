/**
* @param {Internal.BlockEntityJS} entity
*/
global.tick_redstone_node = entity => {
	let room_node = entity.block
	let dimension = room_node.level.getDimension()
	if (dimension != "backrooms:room_forge") {
		if (room_node.getId() == "kubejs:redstone_room_node_block") {
			let room_node_data = room_node.getEntityData().getCompound("data")
			let shutdown = room_node_data.getInt("shutdown")
			shutdown++
			room_node_data.putInt("shutdown",shutdown)
			if (room_node_data.getInt("shutdown") >= 3 && !room_node_data.getBoolean("lights_off")) {
				room_node.getEntityData().getCompound("data").putBoolean("lights_off",true)
				turn_room_lights_off(room_node)
				ping_ciruit_breaker(room_node)
			}
		}
	}
}

/**
* @param {Internal.BlockContainerJS} room_node
*/
function ping_ciruit_breaker(room_node){
	let level = room_node.getLevel()
	let circuit_breaker_loc = room_node.getEntityData().getCompound("data").getCompound("circuit_breaker")
	let pos_x = circuit_breaker_loc.getInt("x")
	let pos_y = circuit_breaker_loc.getInt("y")
	let pos_z = circuit_breaker_loc.getInt("z")
	let circuit_breaker = level.getBlock(pos_x,pos_y,pos_z)
	level.playSound(null,pos_x + 0.5,pos_y,pos_z + 0.5,"immersiveengineering:chute","blocks",1,0)
	if (!circuit_breaker.hasTag("kubejs:circuit_breakers")) {
		level.playSound(null,pos_x + 0.5,pos_y,pos_z + 0.5,"immersiveengineering:chute","blocks",1,0)
		level.playSound(null,pos_x + 0.5,pos_y,pos_z + 0.5,"immersiveengineering:electromagnet","blocks",1,0)
		level.spawnParticles("minecraft:firework",false,pos_x + 0.5,pos_y,pos_z + 0.5,0,0,0,50,0.2)
		level.spawnParticles("minecraft:campfire_signal_smoke",false,pos_x + 0.5,pos_y,pos_z + 0.5,0.3,0.3,0.3,5,0)
	}
	return true
}