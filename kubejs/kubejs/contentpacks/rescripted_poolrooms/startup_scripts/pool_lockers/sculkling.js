StartupEvents.registry('mob_effect', event => {
	event.create('anti_levitation')
	.harmful()
    .effectTick((entity, lvl) => {
		global.anti_levitation_tick(entity)
    })
})
/**
* @param {Internal.LivingEntity} entity
*/
global.anti_levitation_tick = entity => {
	if (entity.hasEffect("minecraft:levitation")) {
		entity.removeEffect("minecraft:levitation")
		entity.removeEffect("kubejs:anti_levitation")
	}
}
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
	let half = locker.properties.get("half")
	try {
		if (half == "bottom") {
			if (is_locker_not_dead(locker)) {
				locker.level.server.runCommandSilent("say is locker not dead")
				let open = locker.properties.get("open")
				let hurt_immune = locker.properties.get("triggered")
				let on_door_cooldown = (locker.getEntityData().getCompound("data").getInt("door_timer") > 0)
				let aggro_dist = 10
				/*if (hurt_immune == "true") {
					let locker_id = locker.getId()
					let facing = locker.properties.get("facing")
					let locker_data = locker.getEntityData()
					locker.properties.put("triggered","false")
					//locker.set(locker_id,{"facing":facing,"half":half,"open":open,"triggered":false})
					//locker.setEntityData(locker_data)
				}*/
				let player_nearby = is_player_nearby_locker(locker,aggro_dist)
				locker.level.server.runCommandSilent("say " + open)
				if (open == "true") {
					sculkling_open_tick(locker,player_nearby,aggro_dist,on_door_cooldown)
				}
				if (player_nearby) {
					sculkling_nearby_player_tick(locker,aggro_dist,on_door_cooldown)
				} else {
					locker_change_anger(locker,false)
				}
				if (on_door_cooldown) {
					reduce_locker_door_timer(locker)
				}
			}
		}	
	} catch (error) {
		//locker.level.server.runCommandSilent("say " + error)
	}
}
/**
* @param {Internal.BlockContainerJS} locker
* @param {Boolean} player_nearby
* @param {Number} aggro_dist
* @param {Boolean} on_door_cooldown
*/
function sculkling_open_tick(locker,player_nearby,aggro_dist,on_door_cooldown){
	let [pos_x,pos_y,pos_z] = [locker.getX(),locker.getY(),locker.getZ()]
	if (!player_nearby) {
		locker_sculkling_doors(locker,false,10)
	} else if (!on_door_cooldown) {
		locker_sculkling_doors(locker,false,10)
	} else if (is_locker_pissed(locker)) {
		let nearest_player = locker.level.getNearestPlayer(pos_x,pos_y,pos_z,aggro_dist,true)
		if (nearest_player != null) {
			locker_shoot_bullet(locker,nearest_player)
		}
		locker.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.warden.heartbeat","blocks",1,0.8)
	} else {
		locker.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.warden.heartbeat","blocks",1,0.8)
	}
}
/**
* @param {Internal.BlockContainerJS} locker
* @param {Number} aggro_dist
* @param {Boolean} on_door_cooldown
*/
function sculkling_nearby_player_tick(locker,aggro_dist,on_door_cooldown){
	let open = locker.properties.get("open")
	let is_open = (open == "true")
	let [pos_x,pos_y,pos_z] = [locker.getX(),locker.getY(),locker.getZ()]
	if (!is_open) {
		if (is_locker_angry(locker)) {
			if (!on_door_cooldown) {
				sculkling_open_doors_and_roar(locker)
			}
		} else {
			locker.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.warden.heartbeat","blocks",0.3,0)
		}
	}
	locker_change_anger(locker,true)
	locker_player_status_effects(locker,aggro_dist)
}
/**
* @param {Internal.BlockContainerJS} locker
*/
function sculkling_open_doors_and_roar(locker){
	locker_sculkling_doors(locker,true,10)
	let [pos_x,pos_y,pos_z] = [locker.getX(),locker.getY(),locker.getZ()]
	if (is_locker_pissed(locker)) {
		locker.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.warden.roar","blocks",1,2)
	} else {
		locker.level.playSound(null,pos_x ,pos_y,pos_z,"minecraft:entity.warden.angry","blocks",1,2)
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
	} else {
		locker.getEntityData().getCompound("data").putInt("door_timer",time)
		locker.level.playSound(null,pos_x ,pos_y,pos_z,"minecraft:entity.shulker.close","blocks",1,0)
	}
	return 1
}
/**
* @param {Internal.BlockContainerJS} locker
*/
function reduce_locker_door_timer(locker){
	let locker_data = locker.getEntityData().getCompound("data")
	let door_timer = locker_data.getInt("door_timer")
	if (door_timer > 0) {
		door_timer--
		locker_data.putInt("door_timer",door_timer)
	}
}
/**
* @param {Internal.BlockContainerJS} locker
* @param {boolean} increase
*/
function locker_change_anger(locker,increase){
	let locker_data = locker.getEntityData().getCompound("data")
	let anger = locker_data.getInt("anger")
	let anger_maxed = (anger >= 30)
	let open = locker.properties.get("open")
	let is_open = (open == "true")
	if (increase) {
		if (!anger_maxed) {
			if (is_locker_angry(locker)) {
				if (is_open) {
					locker_increase_anger_or_roar(locker,is_open,anger)
				}
			} else {
				locker_increase_anger_or_roar(locker,is_open,anger)
			}
		}
	} else if (anger > 0) {
		anger--
		locker_data.putInt("anger",anger)
	}
}
/**
* @param {Internal.BlockContainerJS} locker
* @param {Boolean} is_open
* @param {Number} anger
*/
function locker_increase_anger_or_roar(locker,is_open,anger){
	let locker_data = locker.getEntityData().getCompound("data")
	let [pos_x,pos_y,pos_z] = [locker.getX() + 0.5,locker.getY() + 0.5,locker.getZ() + 0.5]
	anger++
	//locker.level.server.runCommandSilent("say " + anger)
	if (!is_locker_pissed(locker)) {
		locker_data.putInt("anger",anger)
		if (is_locker_pissed(locker)) {
			locker.level.playSound(null,pos_x ,pos_y,pos_z,"minecraft:entity.warden.roar","blocks",1,2)
		} else {
			locker_increase_anger_roar_chance(locker,is_open)
		}
	} else {
		locker_data.putInt("anger",anger)
		locker_increase_anger_roar_chance(locker,is_open)
	}
}
/**
* @param {Internal.BlockContainerJS} locker
* @param {Boolean} is_open
*/
function locker_increase_anger_roar_chance(locker,is_open){
	let [pos_x,pos_y,pos_z] = [locker.getX() + 0.5,locker.getY() + 0.5,locker.getZ() + 0.5]
	if (0.1 > Math.random()) {
		if (is_open) {
			if (is_locker_pissed(locker)) {
				locker.level.playSound(null,pos_x ,pos_y,pos_z,"minecraft:entity.warden.roar","blocks",1,2)
			} else {
				locker.level.playSound(null,pos_x ,pos_y,pos_z,"minecraft:entity.warden.angry","blocks",1,2)
			}
		} else {
			locker.level.playSound(null,pos_x ,pos_y,pos_z,"minecraft:entity.warden.agitated","blocks",0.3,1.5)
		}
	}
}
/**
* @param {Internal.BlockContainerJS} locker
* @param {Number} distance 
*/
function locker_player_status_effects(locker,distance){
	let [pos_x,pos_y,pos_z] = [locker.getX() + 0.5,locker.getY() + 0.5,locker.getZ() + 0.5]
	let y_dist = distance / 2
	let nearby_entities = locker.getLevel().getEntitiesWithin(AABB.of(pos_x - distance, pos_y - y_dist, pos_z - distance, pos_x + distance, pos_y + y_dist, pos_z + distance))
  	nearby_entities.forEach(element => {
    	if (element.getType() == "minecraft:player") {
			locker_give_player_effect(locker,element)
		}
    })
}
/**
* @param {Internal.BlockContainerJS} locker
* @param {Internal.Player} player 
*/
function locker_give_player_effect(locker,player){
	let open = locker.properties.get("open")
	if (open == "true") {
		player.potionEffects.add("minecraft:darkness",40,0,true,false)
		//player.potionEffects.add("cofh_core:chilled",40,0,true,false)
	}
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
	if (anger > 5) {return true}
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
		bullet.setNbt({"ForgeData":{"type":"sculker"}})
		let player_uuid = player.getNbt().get("UUID")
		bullet.mergeNbt({"Steps":7,"Target":player_uuid})
		bullet.setPos(pos_x,pos_y,pos_z)
		bullet.spawn()
		level.playSound(null,pos_x ,pos_y,pos_z,"minecraft:entity.shulker.shoot","blocks",1,1)
	}
    return 1
}