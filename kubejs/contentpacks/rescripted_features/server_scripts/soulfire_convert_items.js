ItemEntityEvents.tick("kubejs:soulcoal",event => {
	if (Item.exists("kubejs:soulcoal")) {
		global.dropped_soulcoal_event(event)
	}
})
/**
* @param {Internal.ItemEntityEventJS} event
*/
global.dropped_soulcoal_event = event => {
	let item_entity = event.itemEntity
	let [pos_x,pos_y,pos_z] = [item_entity.getX(),item_entity.getY(),item_entity.getZ()]
	let level = item_entity.getLevel()
	try {
		if (has_soulburn(item_entity)) {
			level.spawnParticles("minecraft:soul_fire_flame",false,pos_x,pos_y,pos_z,0.25,0.25,0.25,1,0.01)
		} else {
			level.spawnParticles("minecraft:flame",false,pos_x,pos_y,pos_z,0.25,0.25,0.25,1,0.01)
		}
		let age = item_entity.nbt.getInt("Age")
		if (age > 50) {
			soulcoal_explode_radius(item_entity)
		}
	} catch (error) {
		soulcoal_explode_radius(item_entity)
	}
}
/**
* @param {Internal.ItemEntity} item_entity
*/
function has_soulburn(item_entity){
	let [pos_x,pos_y,pos_z] = [item_entity.getX(),item_entity.getY(),item_entity.getZ()]
	let level = item_entity.getLevel()
	let ground = level.getBlock(pos_x - 0.5,pos_y,pos_z - 0.5).getDown()
	if (ground.hasTag("minecraft:soul_fire_base_blocks")) {
		return true
	} else {
		return false
	}
}
/**
* @param {Internal.ItemEntity} item_entity
*/
function soulcoal_explode_radius(item_entity){
	try {
		let level = item_entity.getLevel()
		let soulburn = has_soulburn(item_entity)
		let power = item_entity.item.getCount()
		let [pos_x,pos_y,pos_z] = [item_entity.getX(),item_entity.getY(),item_entity.getZ()]
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.generic.explode","blocks",1,2)
		level.spawnParticles("minecraft:explosion",false,pos_x,pos_y,pos_z,1,1,1,25,0)
		level.spawnParticles("minecraft:flash",false,pos_x,pos_y,pos_z,1,0,1,1,0)
		if (soulburn) {
			level.playSound(null,pos_x,pos_y,pos_z,"minecraft:particle.soul_escape","blocks",1,0)
			level.spawnParticles("minecraft:soul_fire_flame",false,pos_x,pos_y,pos_z,1,1,1,10,0.01)
    		level.spawnParticles("minecraft:sculk_soul",false,pos_x,pos_y,pos_z,1,1,1,10,0.1)
		}
		let nearby_entities = level.getEntitiesWithin(AABB.of(pos_x - 1, pos_y - 1, pos_z - 1, pos_x + 1, pos_y + 1, pos_z + 1))
		nearby_entities.forEach(element => {
			if (element.living) {
				if (element.isAttackable()) {
					if (soulburn) {
						element.attack(power * 2)
					} else {
						element.attack(power)
					}
					//element.attack(element.damageSources().explosion(),power * 2)
				}
				if (soulburn) {
					element.potionEffects.add("minecraft:wither", 300)
					element.potionEffects.add("minecraft:nausea", 300)
					element.potionEffects.add("minecraft:weakness", 300)
				}
				element.setRemainingFireTicks(200)
			}
			if (element.getType() == "minecraft:item") {
				if (soulburn) {
					convert_item_entity(element)
				}
			}
		})	
		item_entity.remove("discarded")	
	} catch (error) {
		//console.log(error)
		item_entity.remove("discarded")
	}
}
/**
* @param {Number} pos_x
* @param {Number} pos_y
* @param {Number} pos_z
* @param {Number} power
* @param {Internal.Level} level
*/
global.soulfire_convert_generic = (pos_x,pos_y,pos_z,level) => {
	try {
		let nearby_entities = level.getEntitiesWithin(AABB.of(pos_x - 3, pos_y - 3, pos_z - 3, pos_x + 3, pos_y + 3, pos_z + 3))
		nearby_entities.forEach(element => {
			if (element.getType() == "minecraft:item") {
				convert_item_entity(element)
			}
		})		
	} catch (error) {}
}
/**
* @param {Internal.ItemEntity} entity
*/
function convert_item_entity(entity){
	let item = entity.getItem()
	let item_id = item.getId()
	let count = item.getCount()
	let level = entity.getLevel()
	let [pos_x,pos_y,pos_z] = [entity.getX(),entity.getY(),entity.getZ()]
	let new_item_id = "minecraft:air"
	if (item_id == "kubejs:empty_fuse") {
		new_item_id = "kubejs:soul_fuse"
	} else if (item_id == "minecraft:brick") {
		new_item_id = "minecraft:nether_brick"
	} else if (item_id == "minecraft:bricks") {
		new_item_id = "minecraft:nether_bricks"
	}
	if (new_item_id != "minecraft:air") {
		entity.remove("discarded")
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:particle.soul_escape","blocks",1,0)
		level.spawnParticles("minecraft:soul_fire_flame",false,pos_x,pos_y,pos_z,1,1,1,10,0.01)
    	level.spawnParticles("minecraft:sculk_soul",false,pos_x,pos_y,pos_z,1,1,1,10,0.1)
		let new_item = level.createEntity("minecraft:item")
		new_item.mergeNbt({"Item":{"id":new_item_id,"Count":count}})
		new_item.setPos(pos_x,pos_y,pos_z)
		new_item.spawn()
	}
}