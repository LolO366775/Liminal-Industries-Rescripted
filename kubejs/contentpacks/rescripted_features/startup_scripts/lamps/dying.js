/**
* @param {Internal.BlockEntityJS} entity
* @param {String} type
*/
global.tick_dying_lamp = (entity,type) => {
	let lamp = entity.block
	let level = lamp.getLevel()
	let [pos_x,pos_y,pos_z] = [lamp.getX() + 0.5,lamp.getY(),lamp.getZ() + 0.5]
	if (type == "white") {
		if (0.5 > Math.random()) {
			lamp.set("kubejs:ceilling_lamp2_blinking")
		} else {
			lamp.set("kubejs:ceilling_lamp2_off")
		}
	} else if (type == "red") {
		if (0.5 > Math.random()) {
			lamp.set("kubejs:ceilling_lamp_red_blinking")
		} else {
			lamp.set("kubejs:ceilling_lamp_red_off")
		}
	} else {
		if (0.5 > Math.random()) {
			lamp.set("kubejs:ceilling_lamp_blinking")
		} else {
			lamp.set("kubejs:ceilling_lamp_off")
		}
	}
	level.playSound(null,pos_x,pos_y,pos_z,"immersiveengineering:spark","blocks",1,1)
	level.playSound(null,pos_x,pos_y,pos_z,"block.glass.break","blocks",1,0)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.firework_rocket.blast","blocks",1,2)
	level.spawnParticles("minecraft:block kubejs:ceilling_lamp",false,pos_x,pos_y,pos_z,0.5,0.5,0.5,50,0.01)
	level.spawnParticles("minecraft:firework",false,pos_x,pos_y,pos_z,0.1,0.1,0.1,5,0.05)
	level.spawnParticles("minecraft:white_ash",false,pos_x,pos_y,pos_z,0.1,0.1,0.1,50,0.1)
}