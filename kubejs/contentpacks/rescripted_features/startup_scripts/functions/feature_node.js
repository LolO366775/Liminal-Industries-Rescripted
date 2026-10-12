/**
* @param {Internal.BlockEntityJS} entity
*/
global.tick_feature_node = entity => {
	let node = entity.block
	let level = node.getLevel()
	let dimension = level.getDimension()
	let enabled = level.getServer().getPersistentData().getCompound("custom_gamerules").getBoolean("activeFeatureNodes")
	if (enabled) {
		if (dimension != "backrooms:room_forge") {
			if (is_room_node_done_generating(node)) {
				let feature_type = node.getEntityData().getCompound("data").getString("feature_type")
				spawn_node_feature(node,feature_type)
			}
		}
	}
}
/**
* @param {Internal.BlockContainerJS} node
*/
function spawn_speaker_on_ceiling(node){//if this fails for any reason, the speaker should spawn on the floor
	try {
		let above = node
		for (let index = 0; index < 50; index++) {
			if (above.getUp().getId() == "kubejs:ceilling") {//should eventually be ceilling tag
				place_speaker(above)
				return true
			} else {
				above = above.getUp()
			}
		}
		place_speaker(node)
		return false		
	} catch (error) {
		place_speaker(node)
		return false
	}
}
/**
* @param {Internal.BlockContainerJS} node
*/
function place_speaker(node){
	let [pos_x,pos_y,pos_z] = [node.getX(),node.getY(),node.getZ()]
	let level = node.getLevel()
	let direction = get_opposite_direction(pos_x,pos_y,pos_z,level)
	node.set("kubejs:backrooms_speaker_light",{"facing":direction})
}
//WIP. would have some issues.
/**
* @param {Internal.BlockContainerJS} node
* @param {String} feature_type
*/
function spawn_node_feature_on_floor(node,feature_type){
	let below = node
	for (let index = 0; index < 50; index++) {
		if (is_below_feature_node_empty(below)) {
			below = below.getDown()
			below.level.server.runCommandSilent("say below!")
		} else {
			spawn_node_feature(below,feature_type)
		}
	}
}
/**
* @param {Internal.BlockContainerJS} node
* @param {String} feature_type
*/
function spawn_node_feature(node,feature_type){
	let level = node.getLevel()
	if (feature_type == "mob") {
		spawn_mob(node,level)
	} else if (feature_type == "spawner") {
		place_spawner(node)
	} else if (feature_type == "loot") {
		place_loot_any(node,level)
	} else if (feature_type == "waystone") {
		place_waystone(node,"waystone")
	} else if (feature_type == "cube") {
		create_big_cube(node)
	}
}
/**
* @param {Internal.BlockContainerJS} node
*/
function is_below_feature_node_empty(node){
	let below_id = node.getDown().getId()
	if (below_id == "minecraft:air") {
		return true
	}
	if (below_id == "minecraft:water") {
		return true
	}
	if (below_id == "minecraft:light") {
		return true
	}
	return false
}
/**
* @param {Internal.BlockContainerJS} node
* @param {Internal.ServerLevel} level
*/
function spawn_mob(node,level){
	const node_data = node.getEntityData().getCompound("data")
	const mob_type = node_data.getString("mob_type")
	const [pos_x, pos_y, pos_z] = [node.getX(),node.getY(),node.getZ()]
	if (mob_type == "warden") {
		let mob = level.createEntity("minecraft:warden")
		mob.mergeNbt({"PersistenceRequired":true,"Brain":{"memories":{"minecraft:dig_cooldown":{"value":{},"ttl":6000}}}})
		mob.setPos(pos_x + 0.5,pos_y,pos_z + 0.5)
		mob.spawn()
	} else if (mob_type == "ravager") {
		let mob = level.createEntity("minecraft:ravager")
		mob.mergeNbt({"PersistenceRequired":true,"DeathLootTable":"minecraft:empty","Health":100,"Attributes":[{"Name":"generic.max_health","Base":100},{"Name":"generic.follow_range","Base":50}]})
		mob.setPos(pos_x + 0.5,pos_y,pos_z + 0.5)
		mob.spawn()
	} else if (mob_type == "blaze") {
		let mob = level.createEntity("minecraft:blaze")
		mob.setPos(pos_x + 0.5,pos_y,pos_z + 0.5)
		mob.spawn()
	}
	node.set("air")
    return 1
}
/**
* @param {Internal.BlockContainerJS} spawner
* @param {Internal.ServerLevel} level
*/
function place_spawner(spawner){
	let spawner_data = spawner.getEntityData().getCompound("data")
	let mob_type = spawner_data.getString("mob_type")
	spawner.set("kubejs:sculk_spawner")
	let mob_id = "minecraft:husk"
	if (mob_type == "spider") {
		mob_id = "minecraft:spider"
	} else if (mob_type == "cave_spider") {
		mob_id = "minecraft:cave_spider"
	} else if (mob_type == "slime") {
		mob_id = "minecraft:slime"
	} else if (mob_type == "creeper") {
		mob_id = "minecraft:creeper"
	} else if (mob_type == "guardian") {
		mob_id = "minecraft:guardian"
	} else if (mob_type == "drowned") {
		mob_id = "minecraft:drowned"
	}
	spawner_data = spawner.getEntityData().getCompound("data").putString("mob_type",mob_id)
	spawner.mergeEntityData(spawner_data)
    return 1
}
//This Function Is Imported From "generation/place_loot"
/**
* @param {Number} pos_x
* @param {Number} pos_y
* @param {Number} pos_z
* @param {Internal.ServerLevel} level
*/
function get_direction(pos_x,pos_y,pos_z,level){
	let furniture = level.getBlock(pos_x,pos_y,pos_z)
	if (furniture.getNorth().getId() != "minecraft:air") {return "north"}
	if (furniture.getSouth().getId() != "minecraft:air") {return "south"}
	if (furniture.getEast().getId() != "minecraft:air") {return "east"}
	if (furniture.getWest().getId() != "minecraft:air") {return "west"}
	let directions = ["north","south","east","west"]
	return directions[Math.round((Math.random() * (directions.length -0.001))-0.5)]
}
/**
* @param {Number} pos_x
* @param {Number} pos_y
* @param {Number} pos_z
* @param {Internal.ServerLevel} level
*/
function get_opposite_direction(pos_x,pos_y,pos_z,level){
	let furniture = level.getBlock(pos_x,pos_y,pos_z)
	if (furniture.getNorth().getId() != "minecraft:air") {return "south"}
	if (furniture.getSouth().getId() != "minecraft:air") {return "north"}
	if (furniture.getEast().getId() != "minecraft:air") {return "west"}
	if (furniture.getWest().getId() != "minecraft:air") {return "east"}
	let directions = ["north","south","east","west"]
	return directions[Math.round((Math.random() * (directions.length -0.001))-0.5)]
}
/**
* @param {String} type
*/
function get_loot(type){
	let loot_pool = [{"id":"minecraft:empty","placement":"empty"}]
	if (type == "common") {
		let chairs = [{"id":"refurbished_furniture:oak_chair","placement":"directional"},{"id":"refurbished_furniture:spruce_chair","placement":"directional"},{"id":"refurbished_furniture:birch_chair","placement":"directional"},{"id":"refurbished_furniture:jungle_chair","placement":"directional"}]
		let tables = [{"id":"refurbished_furniture:oak_table","placement":"none"},{"id":"refurbished_furniture:spruce_table","placement":"none"},{"id":"refurbished_furniture:birch_table","placement":"none"},{"id":"refurbished_furniture:jungle_table","placement":"none"}]
		let common_loot = [{"id":"speaker","placement":"special"},{"id":"wet_spot","placement":"special"},{"id":"pipes","placement":"special"},{"id":"refurbished_furniture:television","placement":"directional"},{"id":"mekanism:radioactive_waste_barrel","placement":"directional_opposite"}]
		loot_pool = common_loot.concat(chairs,chairs,chairs,tables)
	} else if (type == "common_sculk") {
		let epic = [{"id":"refurbished_furniture:computer","placement":"directional"},{"id":"refurbished_furniture:television","placement":"directional"}]
		let sculk = [{"id":"minecraft:air","placement":"none"},{"id":"deepslate_waystone","placement":"special"},{"id":"rare_loot","placement":"special"}]
		loot_pool = epic.concat(sculk,sculk)
	} else if (type == "rare") {
		let rare_loot1 = [{"id":"refurbished_furniture:recycle_bin","placement":"none"},{"id":"minecraft:jukebox","placement":"none"},{"id":"refurbished_furniture:light_toaster","placement":"directional"},{"id":"refurbished_furniture:light_stove","placement":"directional"}]
		let rare_loot2 = [{"id":"refurbished_furniture:light_stove","placement":"directional"},{"id":"refurbished_furniture:light_microwave","placement":"directional"},{"id":"refurbished_furniture:red_cooler","placement":"directional"},{"id":"refurbished_furniture:light_electricity_generator","placement":"directional"}]
		let rare_loot3 = [{"id":"refurbished_furniture:oak_drawer","placement":"directional"},{"id":"refurbished_furniture:plate","placement":"none"},{"id":"moyai:moyai","placement":"directional_opposite"},{"id":"kubejs:batteries","placement":"none"}]
		let rare_loot4 = [{"id":"wet_spot","placement":"special"},{"id":"kubejs:weird_chair","placement":"directional"},{"id":"waystone","placement":"special"}]
		loot_pool = rare_loot1.concat(rare_loot2,rare_loot3,rare_loot4)
	} else if (type == "epic") {
		loot_pool = [{"id":"minecraft:air","placement":"none"},{"id":"refurbished_furniture:computer","placement":"directional"},{"id":"refurbished_furniture:television","placement":"directional"}]
	} else if (type == "water") {
		loot_pool = [{"id":"minecraft:water","placement":"none"},{"id":"mekanism:radioactive_waste_barrel","placement":"directional_opposite"},{"id":"refurbished_furniture:light_fridge","placement":"directional"}]
	}
	return loot_pool[Math.round((Math.random() * (loot_pool.length -0.001))-0.5)]
}
/**
* @param {String} furniture
* @param {String} placement
* @param {String} direction
* @param {Internal.BlockContainerJS} loot_spot
*/
function place_loot(furniture,placement,direction,loot_spot){
	loot_spot.set("minecraft:air")
	if (placement == "special") {
		let pos_y = loot_spot.getY()
		if (furniture == "pipes" && pos_y < 47) {
			loot_spot.set("create:fluid_tank", {"shape":"plain"})
			loot_spot.getUp().set("create:fluid_tank", {"shape":"plain"})
			let above_spot = loot_spot.getUp().getUp()
			let above_id = above_spot.getId()
			while (pos_y < 47 && (above_id == "minecraft:air" || above_id == "minecraft:light")) {
				above_spot.set("create:fluid_pipe")
				above_spot = above_spot.getUp()
				above_id = above_spot.getId()
				pos_y++
			}
		} else if (furniture == "wet_spot") {
			let carpet = loot_spot.getDown()
			if (carpet.getId() == "kubejs:carpet") {carpet.set("kubejs:soggy_carpet")}
			if (carpet.getNorth().getId() == "kubejs:carpet") {carpet.getNorth().set("kubejs:soggy_carpet")}
			if (carpet.getSouth().getId() == "kubejs:carpet") {carpet.getSouth().set("kubejs:soggy_carpet")}
			if (carpet.getEast().getId() == "kubejs:carpet") {carpet.getEast().set("kubejs:soggy_carpet")}
			if (carpet.getWest().getId() == "kubejs:carpet") {carpet.getWest().set("kubejs:soggy_carpet")}
		} else if (furniture == "waystone") {
			place_waystone(loot_spot,"waystone")
		} else if (furniture == "deepslate_waystone") {
			place_waystone(loot_spot,"deepslate_waystone")
		} else if (furniture == "speaker") {
			spawn_speaker_on_ceiling(loot_spot)
		}
	} else if (placement == "directional" || placement == "directional_opposite") {
		loot_spot.set(furniture,{"facing":direction})
	} else {
		loot_spot.set(furniture)
	}
    return 1
}
/**
* @param {String} furniture
* @param {String} placement
* @param {String} direction
* @param {Internal.BlockContainerJS} loot_spot
*/
function place_loot_water(furniture,placement,direction,loot_spot){
	loot_spot.set("minecraft:water")
	let loot_spot_up = loot_spot.getUp()
	if (furniture == "refurbished_furniture:light_fridge" || furniture == "refurbished_furniture:light_freezer") {
		if (loot_spot_up.getId() == "minecraft:air" || loot_spot_up.getId() == "minecraft:light") {
			loot_spot.set("refurbished_furniture:light_freezer",{"facing":direction})
			loot_spot_up.set(furniture,{"facing":direction})
		}
	} else if (placement == "directional" || placement == "directional_opposite") {
		loot_spot.set(furniture,{"facing":direction,"waterlogged":true})
	} else {
		loot_spot.set(furniture,{"waterlogged":true})
	}
    return 1
}
/**
* @param {Internal.ServerLevel} level
* @param {Internal.BlockContainerJS} node
*/
function place_loot_any(node,level){
	let [pos_x, pos_y, pos_z] = [node.getX(),node.getY(),node.getZ()]
	let node_data = node.getEntityData().getCompound("data")
	let loot_type = node_data.getString("loot_type")
	let loot = get_loot(loot_type)
	let loot_id = loot["id"]
	if (loot_id == "rare_loot") {
		loot = get_loot("rare")
		loot_id = loot["id"]
	}
	let loot_placement = loot["placement"]
	let loot_dirction = "none"
	if (loot_placement == "directional_opposite") {loot_dirction = get_opposite_direction(pos_x,pos_y,pos_z,level)} 
	else if (loot_placement == "directional") {loot_dirction = get_direction(pos_x,pos_y,pos_z,level)}
	place_loot(loot_id,loot_placement,loot_dirction,node)
    return 1
}
/**
* @param {Internal.BlockContainerJS} node
* @param {String} waystone_type
*/
function place_waystone(node,waystone_type){
	let level = node.getLevel()
	let dimension = level.getDimension()
	let server = level.getServer()
	let [pos_x,pos_y,pos_z] = [node.getX(),node.getY(),node.getZ()]
	let waystone_name = get_random_waystone_name()
	server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run waystones place ~ ~ ~ ${waystone_type} ${waystone_name}`)
    return 1
}
/**
* @param {Internal.BlockContainerJS} loot_spot
*/
function is_room_node_done_generating(loot_spot){
	let [pos_x,pos_z] = [loot_spot.getX(),loot_spot.getZ()]
	let level = loot_spot.getLevel()
	let room_node = global.get_room_node2(pos_x,pos_z,level)
	if (room_node.hasTag("kubejs:room_nodes")) {
		if (room_node.getId() == "kubejs:layered_room_node_block") {
			return false
		}
		return true
	}
	return false
}



