BlockEvents.rightClicked('minecraft:water_cauldron', event => {
	if (event.item.id == 'kubejs:hot_steel') {
		let cauldron = event.getBlock()
		let cauldron_level = cauldron.properties.get("level")
		let [pos_x,pos_y,pos_z] = [cauldron.getX() + 0.5,cauldron.getY() + 0.5,cauldron.getZ() + 0.5]
		event.item.shrink(1)
		if (cauldron_level == 3) {
			cauldron.set("water_cauldron",{"level":"2"})
		} else if (cauldron_level == 2) {
			cauldron.set("water_cauldron",{"level":"1"})
		} else {
			cauldron.set("cauldron")
		}
		cauldron.level.spawnParticles("minecraft:cloud",false,pos_x,pos_y,pos_z,0.3,0.3,0.3,10,0.001)
		cauldron.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.fire.extinguish","blocks",0.15,2)
		cauldron.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.bubble_column.upwards_inside","blocks",1,2)
		if (0.8 > Math.random()) {
			cauldron.popItemFromFace("immersiveengineering:ingot_steel","up")
		} else {
			cauldron.popItemFromFace("kubejs:cracked_steel","up")
		}
	}
})