/**
* @param {Internal.BlockEntityJS} entity
* @param {String} personality
*/
global.tick_weird_chair = (entity,personality) => {
	let chair = entity.block
	if (personality == "scared") {
		personality_tick_scared(chair)
	} else if (personality == "drunk") {
		personality_tick_drunk(chair)
	} else if (personality == "aggressive") {
		personality_tick_aggressive(chair)
	}
}
/**
* @param {Internal.BlockContainerJS} chair
*/
function personality_tick_scared(chair){
	let level = chair.getLevel()
	let [pos_x,pos_y,pos_z] = [chair.getX() + 0.5,chair.getY() + 0.5,chair.getZ() + 0.5]
	let player = level.getNearestPlayer(pos_x,pos_y,pos_z,10,true)
	if (player != null) {
		weird_chair_runaway(chair)
	}
}
/**
* @param {Internal.BlockContainerJS} chair
*/
function personality_tick_drunk(chair){
	weird_chair_rotate(chair)
}
/**
* @param {Internal.BlockContainerJS} chair
*/
function personality_tick_aggressive(chair){
	weird_chair_aggressive(chair)
}
/**
* @param {Internal.BlockContainerJS} chair
*/
function weird_chair_rotate(chair){
	let direction = chair.properties.get("facing")
	let chair_id = chair.getId()
	let chair_data = chair.entityData.getCompound("data")
	let just_moved = chair_data.getBoolean("just_moved")
	if (just_moved) {
		chair_data.putBoolean("just_moved",false)
	} else {
		if (direction == "north") {
			chair.set(chair_id, {"facing":"east"})
			chair_data.putBoolean("just_moved",true)
		} else if (direction == "east") {
			chair.set(chair_id, {"facing":"south"})
			chair_data.putBoolean("just_moved",true)
		} else if (direction == "south") {
			chair.set(chair_id, {"facing":"west"})
			chair_data.putBoolean("just_moved",true)
		} else {
			chair.set(chair_id, {"facing":"north"})
			chair_data.putBoolean("just_moved",true)
		}
	}
}

/**
* @param {Internal.BlockLeftClickedEventJS} event
*/
global.left_click_weird_chair = (event,type) => {
	let chair = event.getBlock()
	if (type == "oak") {
		weird_chair_runaway(chair)
	} else if (type == "spruce") {
		weird_chair_rotate(chair)
	} else if (type == "birch") {
		weird_chair_aggressive(chair)
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
global.right_click_weird_chair = (event,type) => {
	let chair = event.getBlock()
	if (type == "oak") {
		weird_chair_runaway(chair)
	} else if (type == "spruce") {
		weird_chair_rotate(chair)
	} else if (type == "birch") {
		weird_chair_aggressive(chair)
	}
}
/**
* @param {Internal.BlockContainerJS} chair
*/
function weird_chair_runaway(chair){
	let direction = chair.properties.get("facing")
	let directions = ["north","south","east","west"]
	let facing_blocks = {"south": chair.getNorth(),"north": chair.getSouth(),"west": chair.getEast(),"east": chair.getWest()}
	let facing_block = facing_blocks["north"]
	facing_block = facing_blocks[direction]
	if (facing_block.getDown().id == "minecraft:air") {
		chair.set("minecraft:air")
		facing_block.getDown().set("kubejs:weird_chair", {"facing":direction})
	} else if (facing_block.id == "minecraft:air") {
		chair.set("minecraft:air")
		facing_block.set("kubejs:weird_chair", {"facing":direction})
	} else if (facing_block.getUp().id == "minecraft:air") {
		chair.set("minecraft:air")
		facing_block.getUp().set("kubejs:weird_chair", {"facing":direction})
	} else {
		let random_direction = directions[Math.round((Math.random() * (4 - 0.001)) - 0.5)]
		chair.set("kubejs:weird_chair", {"facing":random_direction})
	}
}
/**
* @param {Internal.BlockContainerJS} chair
* @param {Boolean} harmful
*/
function weird_chair_aggressive(chair){
	let [pos_x,pos_y,pos_z] = [chair.getX(),chair.getY(),chair.getZ()]
	let level = chair.getLevel()
	let player = level.getNearestPlayer(pos_x,pos_y,pos_z,10,true)
	if (player != null) {
		let chair_id = chair.getId()
		let chair_data = chair.entityData.getCompound("data")
		let just_moved = chair_data.getBoolean("just_moved")
		if (just_moved) {
			chair_data.putBoolean("just_moved",false)
		} else {
			let [player_pos_block] = [player.getBlock()]
			if (player_pos_block == "minecraft:air") {
				let [player_x,player_y,player_z] = [player.getX(),player.getY(),player.getZ()]
				chair.set("minecraft:air")
				let directions = ["north","south","east","west"]
				let random_direction = directions[Math.round((Math.random() * (4 - 0.001)) - 0.5)]
				player_pos_block.set(chair_id, {"facing":random_direction,"just_moved":"true"})
				level.playSound(null,player_x,player_y,player_z,"minecraft:block.scaffolding.place","blocks",1,1)
				if (0.5 > Math.random()) {
					player.attack(player.damageSources().cramming(),5)
					level.spawnParticles("minecraft:angry_villager",false,player_x,player_y,player_z,0.75,0.75,0.75,10,0)
				} else {
					level.spawnParticles("minecraft:heart",false,player_x,player_y,player_z,0.75,0.75,0.75,10,0)			
				}
			}
		}
	}
}