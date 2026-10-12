StartupEvents.registry('block', event => {	
	event.create('reality_core')
	.material("stone")
	.soundType("lantern")
    .unbreakable()
	.tagBlock('wither_immune')
	.fullBlock(false)
	.transparent(true)
	.defaultCutout()
	.noItem()
	.box(4, 4, 4, 12, 12, 12)
	.displayName('Active Reality Core')
	.blockEntity(entityInfo => {
		entityInfo.serverTick(10, 0, entity => {
			global.tick_reality_frame_core(entity)
		})
	})
})
/**
* @param {Internal.BlockEntityJS} entity
*/
global.tick_reality_frame_core = entity => {
	let core = entity.block
	let [core_x,core_y,core_z] = [core.getX(),core.getY(),core.getZ()]
	let block_data = core.getEntityData().getCompound("data")
	let timer = block_data.getInt("timer")
	let level = core.getLevel()
	let dimension = level.getDimension()
	let server = level.getServer()
	timer++
	block_data.putInt("timer",timer)
	if (reality_frame_check_timestamps(timer,core)) {
		reality_frame_burst_timestamps(timer,core)
		reality_frame_sound_timestamps(timer,core)
		level.spawnParticles("supplementaries:rotation_trail_emitter",true,core_x + 0.5,core_y + 0.5,core_z + 0.5,0,0,0,2,1)
		level.spawnParticles("supplementaries:rotation_trail_emitter",true,core_x + 0.5,core_y + 0.5,core_z + 0.5,0,0,0,2,1)
		level.spawnParticles("supplementaries:rotation_trail_emitter",true,core_x + 0.5,core_y + 0.5,core_z + 0.5,0,0,0,2,1)
		level.spawnParticles("supplementaries:rotation_trail_emitter",true,core_x + 0.5,core_y + 0.5,core_z + 0.5,0,0,0,2,1)
		level.spawnParticles("supplementaries:rotation_trail_emitter",true,core_x + 0.5,core_y + 0.5,core_z + 0.5,0,0,0,2,1)
		server.runCommandSilent(`execute in ${dimension} positioned ${core_x} ${core_y + 0.5} ${core_z} run effect give @e[distance=..5] wither 1 9 true`)
		if (timer == 120) {
			generate_reality(core,level,server)
		}
	}				
}
/**
* @param {Number} timer
* @param {Internal.BlockContainerJS} core
*/
function reality_frame_check_timestamps(timer,core) {
	let frame_checks = [10,20,30,40,50,60,70,80,90,100,110]
	frame_checks.forEach((element) => {
		if (timer == element) {
			let level = core.getLevel()
			let block_data = core.getEntityData().getCompound("data")
			let controller_pos_data = block_data.getCompound("controller")
			let [controller_x,controller_y,controller_z] = [controller_pos_data.getInt("x"),controller_pos_data.getInt("y"),controller_pos_data.getInt("z")]
			let controller = level.getBlock(controller_x,controller_y,controller_z)
			let corner_block = get_corner_block(controller_x,controller_y,controller_z,level)
			if (corner_block.id == "kubejs:reality_frame") {
				let [corner_x,corner_y,corner_z] = [corner_block.getX(),corner_block.getY(),corner_block.getZ()]
				let check1 = check_bottom_layer(corner_x,corner_y,corner_z,level,controller)
				let check2 = check_pillar_blocks(corner_x,corner_y,corner_z,level)
				let check3 = check_bottom_layer(corner_x,corner_y + 8,corner_z,level,controller)
				if (check1 && check2 && check3) {return true}
			}
			reality_frame_deactivate(controller,core)
			return false
		}
	})
	return true
}
/**
* @param {Internal.BlockContainerJS} controller
* @param {Internal.BlockContainerJS} core
*/
function reality_frame_deactivate(controller,core) {
	let [core_x,core_y,core_z] = [core.getX(),core.getY(),core.getZ()]
	core.level.playSound(null,core_x,core_y,core_z,"minecraft:block.beacon.deactivate","blocks",10,0)
	core.set("minecraft:air")
	if (controller.getId() == "kubejs:reality_controller_running") {
		controller.set("kubejs:reality_controller")
	}
	return true
}
/**
* @param {Number} timer
* @param {Internal.BlockContainerJS} core
*/
function reality_frame_burst_timestamps(timer,core) {
	let burst_timestamps = [50,75,100,110,113,116,118]
	burst_timestamps.forEach((element) => {
		if (timer == element) {
			let [pos_x,pos_y,pos_z] = [core.getX(),core.getY(),core.getZ()]
			core.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.nether_wastes.mood","blocks",10,2)
			core.level.spawnParticles("minecraft:dust_color_transition 0 1 1 5 0 0.3 1",true,pos_x + 0.5,pos_y + 0.5,pos_z + 0.5,0.3,0.3,0.3,5,0.1)
			core.level.spawnParticles("minecraft:flash",true,pos_x + 0.5,pos_y + 0.5,pos_z + 0.5,0,0,0,1,0)
		}
	})
}
/**
* @param {Number} timer
* @param {Internal.BlockContainerJS} core
*/
function reality_frame_sound_timestamps(timer,core) {
	let sound_timestamps = [20,40,60,80,100]
	sound_timestamps.forEach((element) => {
		if (timer == element) {
			let [pos_x,pos_y,pos_z] = [core.getX(),core.getY(),core.getZ()]
			core.level.playSound(null,pos_x,pos_y,pos_z,"mekanism:tile.machine.antiprotonic_nucleosynthesizer","blocks",3,0)
		}
	})
}
/**
* @param {Internal.BlockContainerJS} core
* @param {Internal.ServerLevel} level
* @param {Internal.MinecraftServer} server
*/
function generate_reality(core,level,server) {
	const [pos_x,pos_y,pos_z] = [core.getX(),core.getY(),core.getZ()]
	const dimension = level.getDimension()
	server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run stopsound @a master mekanism:tile.machine.antiprotonic_nucleosynthesizer`)
	level.spawnParticles("minecraft:dust_color_transition 0 1 1 7 0 0 1",false,pos_x,pos_y,pos_z,3,3,3,300,1)
	level.spawnParticles("minecraft:dust_color_transition 0 1 1 7 0 0 1",false,pos_x,pos_y,pos_z,3,3,3,300,1)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.warped_forest.mood","blocks",1,2)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.warped_forest.mood","blocks",1,2)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.warped_forest.mood","blocks",1,2)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.warped_forest.mood","blocks",1,2)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.beacon.deactivate","blocks",1,0)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.illusioner.mirror_move","blocks",1,2)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.ender_chest.close","blocks",1,0)
	let chip_type = core.getEntityData().getCompound("data").getString("chip_type")
	let controller_pos_data = core.getEntityData().getCompound("data").getCompound("controller")
	const [controller_x,controller_y,controller_z] = [controller_pos_data.getInt("x"),controller_pos_data.getInt("y"),controller_pos_data.getInt("z")]
	let controller = level.getBlock(controller_x,controller_y,controller_z)
	let direction = controller.properties.get("facing")
	core.set("minecraft:air")
	if (controller.getId() == "kubejs:reality_controller_running") {
		controller.set("kubejs:reality_controller",{"facing":direction})
	}
	let result = 1
	if (chip_type == "infinity") {
		level.playLocalSound(pos_x,pos_y,pos_z,"minecraft:block.end_portal.spawn","blocks",1,0,true)
		level.spawnParticles("minecraft:flash",true,pos_x + 0.5,pos_y + 0.5,pos_z + 0.5,0,0,0,1,0)
		core.set("kubejs:black_hole")
	} else {
		result = server.runCommandSilent(`execute in ${dimension} positioned ${pos_x - 3} ${pos_y - 3} ${pos_z - 3} run place template backrooms:reality_${chip_type}`)
	}
	if (result == 0) {
		server.runCommandSilent(`execute in ${dimension} positioned ${pos_x - 3} ${pos_y - 3} ${pos_z - 3} run place template backrooms:reality_error`)
	}

}