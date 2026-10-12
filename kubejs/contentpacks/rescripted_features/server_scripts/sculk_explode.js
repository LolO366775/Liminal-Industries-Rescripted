LevelEvents.beforeExplosion(event => {
	let server = event.server
	let position = event.position
	let dimension = event.getLevel().getDimension()
	let pos_x = position.x()
	let pos_y = position.y()
	let pos_z = position.z()
	
	let exploder_id = event.exploder.entityType
	if (exploder_id == "entity.minecraft.creeper") {
		event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.generic.explode","blocks",5,1.5)
		event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.warden.sonic_boom","blocks",5,0)
		event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.warden.dig","blocks",5,2)
		event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.warden.dig","blocks",5,2)
		event.level.spawnParticles("minecraft:warped_spore",false,pos_x,pos_y + 1,pos_z,0,0,0,1000,9)
		event.level.spawnParticles("minecraft:sculk_soul",false,pos_x,pos_y + 1,pos_z,0,0,0,20,0.3)
		event.level.spawnParticles("minecraft:sonic_boom",false,pos_x,pos_y,pos_z,2,2,2,20,2)
		event.level.spawnParticles("minecraft:dust_color_transition 0.1 0.1 0.1 2 0 0.6 0.6",false,pos_x,pos_y,pos_z,0,0,0,200,0.1)
		server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run place feature minecraft:sculk_patch_deep_dark ~ ~ ~`)
		server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~5 0 ~5 ~-5 46 ~-5 kubejs:ceilling_lamp_breaking replace kubejs:ceilling_lamp`)
		server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~5 0 ~5 ~-5 46 ~-5 kubejs:ceilling_lamp_breaking replace kubejs:ceilling_lamp_off`)
		server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run effect give @a[distance=..5] darkness 5 0 true`)
	}
})

ItemEvents.dropped(event => {
	let server = event.server
	let item_id = event.getItem().getId()
	let position = event.entity.position()
	let pos_x = position.x()
	let pos_y = position.y()
	let pos_z = position.z()
	if (item_id == "immersiveengineering:stick_steel") {
		server.scheduleInTicks(20, callback => {
			event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:custom.metal_pipe_close","blocks",10,1)
		})
	}
})