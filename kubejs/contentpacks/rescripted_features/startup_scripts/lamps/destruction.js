/**
* @param {Internal.BlockEntityJS} entity
* @param {String} type
*/
global.tick_breaking_lamp = (entity,type) => {
	let lamp = entity.block
	let level = lamp.getLevel()
	let [pos_x,pos_y,pos_z] = [lamp.getX() + 0.5,lamp.getY(),lamp.getZ() + 0.5]
	lamp.popItemFromFace("kubejs:fluorescent_tube","down")
	if (type == "white") {
		lamp.set("kubejs:ceilling_lamp2_broken")
	} else if (type == "red") {
		lamp.set("kubejs:ceilling_lamp_red_broken")	
	} else {
		lamp.set("kubejs:ceilling_lamp_broken")
	}
	level.playSound(null,pos_x,pos_y,pos_z,"block.glass.break","blocks",1,0)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.firework_rocket.blast","blocks",1,2)
	level.spawnParticles("minecraft:block kubejs:ceilling_lamp",false,pos_x,pos_y,pos_z,0.5,0.5,0.5,50,0.01)
	level.spawnParticles("minecraft:firework",false,pos_x,pos_y,pos_z,0.1,0.1,0.1,5,0.05)
	level.spawnParticles("minecraft:white_ash",false,pos_x,pos_y,pos_z,0.1,0.1,0.1,50,0.1)
	let below = lamp.getDown()
	while (pos_y > 0) {
		if (below.getId() == "torchmaster:invisible_light" || below.getId() == "minecraft:light") {below.set("minecraft:air")}
		pos_y--
		below = below.getDown()
	}
}
/**
* @param {Internal.ExplosionEventJS$Before} event
*/
global.explode_lamps_in_radius = event => {
	let block = event.getBlock()
	let size = Math.round(event.getSize() * 1.5)
	global.explode_lamps_in_radius_block(block,size)
}
/**
* @param {Internal.BlockContainerJS} block
* @param {number} size
*/
global.explode_lamps_in_radius_block = (block,size) => {
	let level = block.getLevel()
	let max_offset = (size * 2) + 1
	let corner_x = (block.getX() + 0.5) - (size + 1)
	let corner_y = (block.getY() + 0.5) - size
	let corner_z = (block.getZ() + 0.5) - (size + 1)
	for (let index_x = 0; index_x < max_offset; index_x++) {
		let pos_x = corner_x + index_x
		for (let index_y = 0; index_y < max_offset; index_y++) {
			let pos_y = corner_y + index_y
			for (let index_z = 0; index_z < max_offset; index_z++) {
				let pos_z = corner_z + index_z
				let block = level.getBlock(pos_x,pos_y,pos_z)
				if (block.hasTag("ceiling_lamp_on")) {
					if (block.hasTag("yellow_ceiling_lamp")) {
						block.set("kubejs:ceilling_lamp_breaking")
					} else if (block.hasTag("white_ceiling_lamp")) {
						block.set("kubejs:ceilling_lamp2_breaking")
					} else if (block.hasTag("red_ceiling_lamp")) {
						block.set("kubejs:ceilling_lamp_red_breaking")
					} else if (block.getId() == "kubejs:ceilling_lamp_off") {//idk why the fuck these still dont work
						block.set("kubejs:ceilling_lamp_breaking")
					} else if (block.getId() == "kubejs:ceilling_lamp2_off") {
						block.set("kubejs:ceilling_lamp2_breaking")
					} else if (block.getId() == "kubejs:ceilling_lamp_red_off") {
						block.set("kubejs:ceilling_lamp_red_breaking")
					}
				}
			}
		}
	}
}