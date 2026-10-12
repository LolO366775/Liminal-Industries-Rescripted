/**
* @param {Internal.BlockEntityJS} entity
* @param {String} personality
*/
global.tick_sculk_spawner = (entity) => {
	let spawner = entity.getBlock()
	let powered = spawner.properties.get("powered")
	let spawner_data = spawner.getEntityData().getCompound("data")
	let exhaustion = spawner_data.getInt("exhaustion")
	let mob_type = get_sculk_spawner_mob_type(spawner)
	let souls = spawner_data.getInt("souls")
	if (exhaustion > 0) {
		exhaustion--
		spawner_data.putInt("exhaustion",exhaustion)
	} else if (souls == 0) {
		charge_sculk_spawner(spawner)
	}
	if (powered == "true") {
		if (can_sculk_spawner_spawn(spawner)) {
			sculk_spawner_spawn_mob(spawner,mob_type)
		} else {
			deactivate_sculk_spawner(spawner)
		}
	} else {
		if (can_sculk_spawner_spawn(spawner)) {
			activate_sculk_spawner(spawner)
		}
	}
}
/**
* @param {Internal.BlockContainerJS} spawner
*/
function can_sculk_spawner_spawn(spawner){
	let level = spawner.getLevel()
	let difficulty = level.server.getWorldData().getDifficulty()
	if (is_above_sculk_spawner_valid_spawn(spawner)) {
		if (difficulty != "PEACEFUL") {
			if (is_player_nearby_spawner(spawner)) {
				if (sculk_spawner_nearby_mob_count(spawner)) {
					let spawner_data = spawner.getEntityData().getCompound("data")
					let souls = spawner_data.getInt("souls")
					if (souls > 0) {
						return true
					}
				}			
			}
		}
	}
	return false
}
/**
* @param {Internal.BlockContainerJS} spawner
*/
function is_player_nearby_spawner(spawner){
	try {
		let level = spawner.getLevel()
		let [pos_x,pos_y,pos_z] = [spawner.getX() + 0.5,spawner.getY() + 0.5,spawner.getZ() + 0.5]
		let distance = 5
		let nearby_entities = level.getEntitiesWithin(AABB.of(pos_x - distance, pos_y - distance, pos_z - distance, pos_x + distance, pos_y + distance, pos_z + distance))
		let pass = false
  		nearby_entities.forEach(element => {
    		if (element.isPlayer()) {
				pass = can_player_be_seen_by_spawner(element)
      		}
			if (element.getType() == "minecraft:armor_stand") {
				pass = true
      		}
    	})
		return pass
	} catch (error) {
		return false
	}
}
/**
* @param {Internal.ServerPlayer} player
*/
function can_player_be_seen_by_spawner(player){
	try {
		if (player.gameMode.isCreative()) {
			return false
		}
		if (player.isSpectator()) {
			return false
		}
	return true
	} catch (error) {
		return true
	}
}
/**
* @param {Internal.BlockContainerJS} spawner
*/
function is_above_sculk_spawner_valid_spawn(spawner){
	let above = spawner.getUp()
	if (above.hasTag("kubejs:sculk_spawner_valid_spawn")) {
		return true
	}
	return false
}
/**
* @param {Internal.BlockContainerJS} spawner
*/
function get_sculk_spawner_mob_type(spawner){
	try {
		let spawner_data = spawner.getEntityData().getCompound("data")
		let mob_type = spawner_data.getString("mob_type")
		if (mob_type != "")	{
			return mob_type
		}
	} catch (error) {}
	return "minecraft:husk"
}
/**
* @param {Internal.BlockContainerJS} spawner
*/
function activate_sculk_spawner(spawner){
	let [pos_x,pos_y,pos_z] = [spawner.getX() + 0.5,spawner.getY(),spawner.getZ() + 0.5]
	spawner.set("kubejs:sculk_spawner",{"powered":"true"})
	spawner.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.iron_door.open","blocks",1,0)
}
/**
* @param {Internal.BlockContainerJS} spawner
*/
function deactivate_sculk_spawner(spawner){
	let [pos_x,pos_y,pos_z] = [spawner.getX() + 0.5,spawner.getY(),spawner.getZ() + 0.5]
	spawner.set("kubejs:sculk_spawner",{"powered":"false"})
	spawner.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.iron_door.close","blocks",1,0)
}
/**
* @param {Internal.BlockContainerJS} spawner
*/
function charge_sculk_spawner(spawner){
	let level = spawner.getLevel()
	let difficulty = level.server.getWorldData().getDifficulty()
	if (difficulty != "PEACEFUL") {
		let spawner_data = spawner.getEntityData().getCompound("data")
		let [pos_x,pos_y,pos_z] = [spawner.getX() + 0.5,spawner.getY(),spawner.getZ() + 0.5]
		if (difficulty == "EASY") {
			spawner_data.putInt("souls",5)
		} else if (difficulty == "HARD") {
			spawner_data.putInt("souls",15)
		} else {
			spawner_data.putInt("souls",10)
		}
		spawner.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.sculk.charge","blocks",1,0)
		spawner.level.spawnParticles("minecraft:sculk_charge_pop",false,pos_x,pos_y,pos_z,0.5,0.5,0.5,50,0)
	}
}
/**
* @param {Internal.BlockContainerJS} spawner
*/
function sculk_spawner_nearby_mob_count(spawner){
	let level = spawner.getLevel()
	let aabb = AABB.ofBlock(spawner.getPos()).inflate(15)
	let mob_count = level.getEntitiesWithin(aabb).filter(entity => entity.isMonster()).size()
	if (mob_count >= 10) {
		return false
	}
	return true
}
/**
* @param {Internal.BlockContainerJS} spawner
* @param {String} mob_id
*/
function sculk_spawner_spawn_mob(spawner,mob_id){
	let spawner_data = spawner.getEntityData().getCompound("data")
	let exhaustion = spawner_data.getInt("exhaustion")
	if (exhaustion > 0) {
		let souls = spawner_data.getInt("souls")
		souls--
		spawner_data.putInt("souls",souls)
	} else {
		spawner_data.putInt("exhaustion",120)
	}
	let [pos_x,pos_y,pos_z] = [spawner.getX() + 0.5,spawner.getY(),spawner.getZ() + 0.5]
	let level = spawner.getLevel()
	let mob = level.createEntity(mob_id)
	let entity_data = get_sculk_mob_data(mob_id)
	mob.setPos(pos_x,pos_y + 1,pos_z)
	mob.mergeNbt(entity_data)
	mob.spawn()
	level.spawnParticles("minecraft:soul_fire_flame",false,pos_x,pos_y,pos_z,1,1,1,25,0)
	level.playSound(null,pos_x,pos_y,pos_z,"botania:babylon_spawn","blocks",0.5,0)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.warden.heartbeat","blocks",1,0)
}
/**
* @param {String} mob_id
*/
function get_sculk_mob_data(mob_id){
	let health = get_sculk_health_attribute(mob_id)
	let attributes = get_sculk_mob_attributes(mob_id)
	if (mob_id == "minecraft:slime") {
		if (0.4 > Math.random()) {
			return {"Size":3,"Team":"sculk","Health":health,"Attributes":attributes}
		}
		return {"Size":2,"Team":"sculk","Health":health,"Attributes":attributes}
	}
	if (mob_id == "minecraft:drowned") {
		let weapon_data = [{"id":"minecraft:trident","Count":1}]
		return {"Size":2,"Team":"sculk","Health":health,"Attributes":attributes,"HandItems":weapon_data}
	}
	if (mob_id == "minecraft:spider" || mob_id == "minecraft:cave_spider") {
		let scale = {"pehkui:base": {"initial": 0.5, "scale": 0.5, "target": 0.5}}
		return {"Size":2,"Team":"sculk","Health":health,"Attributes":attributes,"pehkui:scale_data_types":scale}
	}
	return {"Team":"sculk","Health":health,"Attributes":attributes}
}
/**
* @param {String} mob_id
*/
function get_sculk_mob_attributes(mob_id){
	let follow_range = set_sculk_attribute("generic.follow_range",50)
	let max_health = set_sculk_attribute("generic.max_health",get_sculk_health_attribute(mob_id))
	let movement_speed = set_sculk_attribute("generic.movement_speed",0.4)
	let attack_damage = set_sculk_attribute("generic.attack_damage",8)
	let attributes = [max_health,movement_speed,attack_damage,follow_range]
	if (mob_id == "minecraft:creeper") {
		movement_speed = set_sculk_attribute("generic.movement_speed",0.35)
		attributes = [max_health,movement_speed,attack_damage,follow_range]
		return attributes
	} else if (mob_id == "minecraft:cave_spider") {
		movement_speed = set_sculk_attribute("generic.movement_speed",0.35)
		attack_damage = set_sculk_attribute("generic.attack_damage",2)
		attributes = [max_health,movement_speed,follow_range]
		return attributes
	} else if (mob_id == "minecraft:spider") {
		movement_speed = set_sculk_attribute("generic.movement_speed",0.35)
		attack_damage = set_sculk_attribute("generic.attack_damage",3)
		attributes = [max_health,movement_speed,follow_range]
		return attributes
	}
	return attributes
}
/**
* @param {String} attribute_id
* @param {Number} level
*/
function set_sculk_attribute(attribute_id,level){
	return {"Name":attribute_id,"Base":level}
}
/**
* @param {String} mob_id
*/
function get_sculk_health_attribute(mob_id){
	if (mob_id == "minecraft:creeper") {
		return 20
	} else if (mob_id == "minecraft:spider") {
		return 10
	} else if (mob_id == "minecraft:cave_spider") {
		return 5
	}
	return 25
}