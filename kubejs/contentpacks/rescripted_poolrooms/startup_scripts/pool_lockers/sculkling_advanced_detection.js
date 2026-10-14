//WIP and currently unused
/**
* @param {Internal.BlockContainerJS} locker
*/
function locker_advanced_detection(locker){
	if (player_nearby) {
		let facing_block = get_locker_facing_block(locker)
		facing_block.getPlayersInRadius(9).forEach(element => {
			let player_pos = element.position().add(0,2,0)
			let facing_pos = facing_block.getPos().getCenter()
			let vec2 = facing_pos.vectorTo(player_pos).scale(0.1)
			let [ray_x,ray_y,ray_z] = [facing_pos.x(),facing_pos.y(),facing_pos.z()]
			level.spawnParticles("minecraft:campfire_signal_smoke",false,ray_x,ray_y,ray_z,0,0,0,1,0)
			let [dir_x,dir_y,dir_z] = [vec2.x(),vec2.y(),vec2.z()]
			//element.server.runCommandSilent(`say ${vec2}`)
			for (let index = 0; index < 10; index++) {
				[ray_x,ray_y,ray_z] = [ray_x + dir_x,ray_y + dir_y,ray_z + dir_z]
				let ray_block = level.getBlock(ray_x,ray_y,ray_z)
				//let does_collide = ray_block.blockState.isCollisionShapeFullBlock(level,ray_block.getPos())
				if (ray_block.getId() != "minecraft:air") {
					break
				}
				level.spawnParticles("minecraft:large_smoke",false,ray_x,ray_y,ray_z,0,0,0,1,0)
			}
		})
	}
}
//
//Currently Unused
/**
* @param {Internal.BlockContainerJS} locker
*/
function get_anger_distance(locker){
	//locker.level.server.runCommandSilent(`say ${player_in_locker_aabb(locker,10)}`)
	if (player_in_locker_aabb(locker,5)) {return 2} //3
	if (player_in_locker_aabb(locker,10)) {return 1} //2
	//if (player_in_locker_aabb(locker,15)) {return 1}
	return 0
}
/**
* @param {Internal.BlockContainerJS} locker
* @param {Number} distance 
*/
function player_in_locker_aabb(locker,distance){
	let [pos_x,pos_y,pos_z] = [locker.getX() + 0.5,locker.getY() + 0.5,locker.getZ() + 0.5]
	let y_dist = distance / 2
	let pass = false
	let nearby_entities = locker.getLevel().getEntitiesWithin(AABB.of(pos_x - distance, pos_y - y_dist, pos_z - distance, pos_x + distance, pos_y + y_dist, pos_z + distance))
  	nearby_entities.forEach(element => {
    	if (element.getType() == "minecraft:player") {pass = true}
    })
	return pass
}