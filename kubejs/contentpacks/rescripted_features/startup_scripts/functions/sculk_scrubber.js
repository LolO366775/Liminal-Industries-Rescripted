/**
* @param {Internal.BlockEntityJS} entity
*/
global.tick_sculk_scrubber = entity => {
	let scrubber = entity.block
	let level = scrubber.getLevel()
	let block_data = scrubber.getEntityData().getCompound("data")
	let timer = block_data.getInt("timer")
	let [pos_x,pos_y,pos_z] = [scrubber.getX() - 0.5,scrubber.getY() - 0.5,scrubber.getZ() - 0.5]
	let [sound_x,sound_y,sound_z] = [scrubber.getX() - 0.5,scrubber.getY() + 0.5,scrubber.getZ() - 0.5]
	if (timer < 30) {
		pos_x++
		pos_z++
		timer++
		block_data.putInt("timer",timer)
		let cleanse_radius = 0
		let burst_timestamps = [5,10,15,20,25]
		burst_timestamps.forEach((element) => {
			if (timer == element) {
				level.playSound(null,sound_x,sound_y,sound_z,"block.sculk.break","blocks",1,0)
				level.playSound(null,sound_x,sound_y,sound_z,"minecraft:block.respawn_anchor.set_spawn","blocks",1,1)
				level.spawnParticles("minecraft:sculk_soul",false,sound_x,sound_y,sound_z,1,1,1,10,0)
				level.spawnParticles("minecraft:sonic_boom",false,sound_x,sound_y,sound_z,0,0,0,1,0.1)
				level.spawnParticles("minecraft:dust_color_transition 0 1 1 4 0 0 0",false,sound_x,sound_y,sound_z,1,0.5,1,10,0.1)
				level.spawnParticles("minecraft:dust_color_transition 0 1 1 4 0 0 0",false,sound_x,sound_y,sound_z,1,0.5,1,10,0.1)
				level.spawnParticles("minecraft:dust_color_transition 0 1 1 4 0 0 0",false,sound_x,sound_y,sound_z,1,0.5,1,10,0.1)
				level.spawnParticles("minecraft:dust_color_transition 0 1 1 4 0 0 0",false,sound_x,sound_y,sound_z,1,0.5,1,10,0.1)
				cleanse_radius = block_data.getInt("cleanse_radius")
				cleanse_radius++
				block_data.putInt("cleanse_radius",cleanse_radius)
				let cleanse_diameter = (cleanse_radius * 2) + 1
				let [corner_x,corner_y,corner_z] = [(pos_x - cleanse_radius) - 2, (pos_y - cleanse_radius), (pos_z - cleanse_radius) - 2]
				if (0 < cleanse_diameter) {
					pos_y = corner_y
					for (let loop_y = 0; loop_y < cleanse_diameter; loop_y++) {
						pos_y++
						pos_x = corner_x
						for (let loop_x = 0; loop_x < cleanse_diameter; loop_x++) {
							pos_x ++
							pos_z = corner_z
							for (let loop_z = 0; loop_z < cleanse_diameter; loop_z++) {
								pos_z++
								let pos_block = level.getBlock(pos_x,pos_y,pos_z)
								if (pos_block.getId() != "kubejs:sculked_sculk_scrubber") {
									cleanse_sculk_step(pos_block)
								}
							}
						}
					}
				}
			}
		})
		if (timer == 30) {
			level.playSound(null,sound_x,sound_y,sound_z,"minecraft:block.respawn_anchor.deplete","blocks",1,0)
		}
	}
}


/**
* @param {Internal.BlockContainerJS} pos_block
*/
function cleanse_sculk_step(pos_block) {
	if (pos_block.hasTag("kubejs:block_sculk")) {
		pos_block.set("kubejs:porous_stone")
	} else if (pos_block.hasTag("kubejs:sculk")) {
		pos_block.set("minecraft:air")
	}
}