//Server-Startup Bridge Functions
/**
* @param {Internal.BlockEntityJS} entity
*/
global.locker_sculkling_tick_event = entity => {
	let locker = entity.block
	locker_sculkling_tick(locker)
}
//Functions
/**
* @param {Internal.BlockContainerJS} locker
*/
function locker_sculkling_tick(locker){
	let [pos_x,pos_y,pos_z] = [locker.getX(),locker.getY(),locker.getZ()]
	let level = locker.getLevel()
	let half = locker.properties.get("half")
	let open = locker.properties.get("open")
	let hurt_immune = locker.properties.get("triggered")
	let aggro_dist = 10
	if (half == "bottom") {
		if (is_locker_not_dead(locker)) {
			let player_nearby = is_player_nearby_locker(locker,aggro_dist)
			if (player_nearby) {locker_change_anger(locker,true)}
			if (is_locker_angry(locker)) {
				if (!player_nearby) {locker_change_anger(locker,false)}
			}
			if (open == "true") {
				if (player_nearby && is_locker_pissed(locker)) {locker_shoot_bullet(locker,level.getNearestPlayer(pos_x,pos_y,pos_z,aggro_dist,true))}
				if (!player_nearby) {locker_sculkling_doors(locker,false,10)}
				//if (locker_data.getBoolean("hurt_immune")) {locker_data.putBoolean("hurt_immune",false)}
			}
			if (!locker_door_timer(locker)) {
				if (open == "true") {locker_sculkling_doors(locker,false,10)}
				else if (player_nearby) {locker_sculkling_doors(locker,true,10)}
			}
		}
	}
}
/**
* @param {Internal.BlockContainerJS} locker
*/
function get_locker_facing_block(locker){
	let facing = locker.properties.get("facing")
	if (facing == "north") {return locker.getNorth()}
	if (facing == "south") {return locker.getSouth()}
	if (facing == "east") {return locker.getEast()}
	if (facing == "west") {return locker.getWest()}
    return locker
}
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
/**
* @param {Internal.BlockContainerJS} locker
* @param {Internal.Player} player
*/
function locker_shoot_bullet(locker,player){
	let [pos_x,pos_y,pos_z] = [locker.getX() + 0.5,locker.getY() + 0.5,locker.getZ() + 0.5]
	let level = locker.getLevel()
	if (locker.getEntityData().getCompound("data").getInt("door_timer") > 1) {
		let facing = locker.properties.get("facing")
		if (facing == "north") {pos_z--}
		else if (facing == "south") {pos_z++}
		else if (facing == "east") {pos_x++}
		else if (facing == "west") {pos_x--}
		let bullet = level.createEntity("minecraft:shulker_bullet")
		let player_uuid = player.getNbt().get("UUID")
		bullet.mergeNbt({"Steps":7,"Target":player_uuid})
		bullet.setPos(pos_x,pos_y,pos_z)
		bullet.spawn()
		level.playSound(null,pos_x ,pos_y,pos_z,"minecraft:entity.shulker.shoot","blocks",1,1)
	}
    return 1
}
/**
* @param {Internal.BlockContainerJS} locker
* @param {Boolean} open
* @param {Number} time
*/
function locker_sculkling_doors(locker,open,time){
	let [pos_x,pos_y,pos_z] = [locker.getX() + 0.5,locker.getY() + 0.5,locker.getZ() + 0.5]
	let facing = locker.properties.get("facing")
	let above = locker.getUp()
	if (above.getId() == "kubejs:locker_sculkling") {
		above.set("kubejs:locker_sculkling",{"facing":facing,"half":"top","open":open,"triggered":false})
	}
	locker.set("kubejs:locker_sculkling",{"facing":facing,"half":"bottom","open":open,"triggered":false})
	if (open) {
		locker.getEntityData().getCompound("data").putInt("door_timer",time)
		locker.level.playSound(null,pos_x ,pos_y,pos_z,"minecraft:entity.shulker.open","blocks",1,0)
		let locker_data = locker.getEntityData().getCompound("data")
		let health = locker_data.getInt("health")
		if (health == 0) {locker_data.putInt("health",20)}
	} else {
		locker.getEntityData().getCompound("data").putInt("door_timer",time)
		locker.level.playSound(null,pos_x ,pos_y,pos_z,"minecraft:entity.shulker.close","blocks",1,0)
	}
	return 1
}
/**
* @param {Internal.BlockContainerJS} locker
*/
function locker_door_timer(locker){
	let locker_data = locker.getEntityData().getCompound("data")
	let door_timer = locker_data.getInt("door_timer")
	if (door_timer > 0) {
		door_timer--
		locker_data.putInt("door_timer",door_timer)
		return true
	}
	return false
}

/**
* @param {Internal.BlockContainerJS} locker
* @param {boolean} increase
*/
function locker_change_anger(locker,increase){
	let locker_data = locker.getEntityData().getCompound("data")
	let anger = locker_data.getInt("anger")
	locker.level.server.runCommandSilent(`before locker change anger`)
	//let distance = get_anger_distance(locker)
	let distance = 1
	if (increase && !anger >= 30) {
		for (let repeat = 0; repeat < distance; repeat++) {
			if (!anger >= 30) {
				anger++
			}
		}
		locker_data.putInt("anger",anger)
		return true
	} else if (anger > 0) {
		anger--
		locker_data.putInt("anger",anger)
		return true
	}
	return false
}
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
/**
* @param {Internal.BlockContainerJS} locker
* @param {number} distance
*/
function is_player_nearby_locker(locker,distance){
	let [pos_x,pos_y,pos_z] = [locker.getX() + 0.5,locker.getY() + 0.5,locker.getZ() + 0.5]
	let player = locker.level.getNearestPlayer(pos_x,pos_y,pos_z,distance,true)
	if (player != null) {return true}
	return false
}
/**
* @param {Internal.BlockContainerJS} locker
*/
function is_locker_angry(locker){
	let locker_data = locker.getEntityData().getCompound("data")
	let anger = locker_data.getInt("anger")
	if (anger > 0) {return true}
	return false
}
/**
* @param {Internal.BlockContainerJS} locker
*/
function is_locker_pissed(locker){
	let locker_data = locker.getEntityData().getCompound("data")
	let anger = locker_data.getInt("anger")
	if (anger > 10) {return true}
	return false
}
/**
* @param {Internal.BlockContainerJS} locker
*/
function is_locker_not_dead(locker){
	let locker_data = locker.getEntityData().getCompound("data")
	let death_timer = locker_data.getInt("death_timer")
	if (death_timer > 0) {
		if (death_timer != 1) {
			death_timer--
			locker_data.putInt("death_timer",death_timer)
		} else {
			let [pos_x,pos_y,pos_z] = [locker.getX() + 0.5,locker.getY() + 0.5,locker.getZ() + 0.5]
			locker.level.spawnParticles("minecraft:cloud",false,pos_x,pos_y,pos_z,0.5,0.5,0.5,20,0)
			open_locker(locker,true)
		}
		return false
	}
	return true
}
/**
* @param {Internal.BlockContainerJS} locker
* @param {String} click
*/
function is_click_locker_front(locker,click){
	let facing = locker.properties.get("facing")
	if (facing == "north") {facing = "south"}
	else if (facing == "south") {facing = "north"}
	else if (facing == "east") {facing = "west"}
	else if (facing == "west") {facing = "east"}
	if (click == facing) {
	}
}