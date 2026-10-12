/**
* @param {Internal.BlockEntityJS} entity
* @param {String} type
*/
global.tick_blinking_lamp = (entity,type) => {
	let lamp = entity.block
	let level = lamp.getLevel()
	let [pos_x,pos_y,pos_z] = [lamp.getX() + 0.5,lamp.getY(),lamp.getZ() + 0.5]
	let powered = lamp.properties.get("powered")
	if (powered == "true") {
		powered = "false"
	} else {
		powered = "true"
	}
	if (0.1 > Math.random()) {
		if (type == "white") {
			if (0.1 > Math.random()) {
				lamp.set("kubejs:ceilling_lamp2_dying")
			} else {
				lamp.set("kubejs:ceilling_lamp2_blinking",{"powered":powered})
			}
		} else if (type == "red") {
			if (0.1 > Math.random()) {
				lamp.set("kubejs:ceilling_lamp_red_dying")
			} else {
				lamp.set("kubejs:ceilling_lamp_red_blinking",{"powered":powered})
			}
		} else {
			if (0.1 > Math.random()) {
				lamp.set("kubejs:ceilling_lamp_dying")
			} else {
				lamp.set("kubejs:ceilling_lamp_blinking",{"powered":powered})
			}
		}
		let pitch = 1 + Math.random() / 5
		level.playSound(null,pos_x,pos_y,pos_z,"refurbished_furniture:block.lightswitch.flick","blocks",0.5,pitch)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.note_block.xylophone","blocks",0.5,pitch)
	}
}