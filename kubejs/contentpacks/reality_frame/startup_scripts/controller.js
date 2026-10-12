StartupEvents.registry('block', event => {	
	event.create('reality_controller','cardinal').displayName('Reality Controller')
	.fullBlock(true)
	.material("netherite_block")
	.soundType("netherite_block")
	.tagBlock('minecraft:mineable/pickaxe')
	.item(item => item.modelJson({
		parent: 'kubejs:block/reality_controller'
	}))
	.blockEntity(entityInfo => {})
	
	event.create('reality_controller_running','cardinal').displayName('Reality Controller (Active)')
	.fullBlock(true)
	.material("netherite_block")
	.soundType("netherite_block")
	.tagBlock('minecraft:mineable/pickaxe')
	.item(item => item.modelJson({
		parent: 'kubejs:block/reality_controller_running'
	}))
	.blockEntity(entityInfo => {})
})

/**
* @param {Internal.BlockRightClickedEventJS} event
*/
global.start_reality_frame_event = event => {
	let player = event.getPlayer()
	let controller = event.block
	let level = event.getLevel()
	let pos_x = controller.getX()
	let pos_y = controller.getY()
	let pos_z = controller.getZ()
	let result
	if (event.item.getId() == "kubejs:data_chip1") {result = start_reality_frame("cave",pos_x,pos_y,pos_z,level)}
	else if (event.item.getId() == "kubejs:data_chip2") {result = start_reality_frame("nether",pos_x,pos_y,pos_z,level)}
	else if (event.item.getId() == "kubejs:data_chip3") {result = start_reality_frame("osmium",pos_x,pos_y,pos_z,level)}
	else if (event.item.getId() == "kubejs:data_chip4") {result = start_reality_frame("grass",pos_x,pos_y,pos_z,level)}
	else if (event.item.getId() == "kubejs:data_chip5") {result = start_reality_frame("diamonds",pos_x,pos_y,pos_z,level)}
	else if (event.item.getId() == "kubejs:data_chip6") {result = start_reality_frame("blaze",pos_x,pos_y,pos_z,level)}
	else if (event.item.getId() == "kubejs:data_chip7") {result = start_reality_frame("pyramid",pos_x,pos_y,pos_z,level)}
	else if (event.item.getId() == "kubejs:data_chip8") {result = start_reality_frame("end",pos_x,pos_y,pos_z,level)}
	else if (event.item.getId() == "kubejs:data_chip9") {result = start_reality_frame("room",pos_x,pos_y,pos_z,level)}
	else if (event.item.getId() == "kubejs:data_chip10") {result = start_reality_frame("portal",pos_x,pos_y,pos_z,level)}
	else if (event.item.getId() == "kubejs:data_chip_error") {result = start_reality_frame("error",pos_x,pos_y,pos_z,level)}
	else if (event.item.getId() == "kubejs:data_chip_infinity") {result = start_reality_frame("infinity",pos_x,pos_y,pos_z,level)}
	if (player != null) {
		if (result == 0) {
			player.tell(`The reality charge is missing or empty`)
		} else if (result == 2) {
			player.tell(`The frame is incomplete`)
		} else if (result == 3) {
			player.tell(`The controller is in the wrong spot or the frame is incomplete`)
		}
	}
}

//Requires: get_core_x()
//Requires: get_core_z()
//Requires: is_reality_frame_valid()
//This Function Is Imported From "generation/reality"
/**
* @param {Number} pos_x
* @param {Number} pos_y
* @param {Number} pos_z
* @param {Internal.ServerLevel} level
* @param {String} chip_type
*/
function start_reality_frame(chip_type,pos_x,pos_y,pos_z,level) {
	let controller = level.getBlock(pos_x,pos_y,pos_z)
	let reality_charge = controller.getUp()
	if (reality_charge.getId() == "kubejs:reality_charge") {
		let corner_block = get_corner_block(pos_x,pos_y,pos_z,level)
		if (corner_block.id == "kubejs:reality_frame") {
			let valid_frame = is_reality_frame_valid(controller)
			if (valid_frame) {
				let direction = controller.properties.get("facing")
				let core_x = get_core_x(pos_x,direction)
				let core_y = pos_y + 4
				let core_z = get_core_z(pos_z,direction)
				let core = level.getBlock(core_x,core_y,core_z)
				let dimension = level.getDimension()
				level.playSound(null,pos_x,pos_y + 1,pos_z,"minecraft:item.bottle.fill_dragonbreath","blocks",1,0)
				level.playSound(null,pos_x,pos_y,pos_z,"mekanism:tile.machine.antiprotonic_nucleosynthesizer","blocks",3,0)
				level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.illusioner.prepare_blindness","blocks",1,0)
				level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.ender_chest.open","blocks",1,0)
				level.spawnParticles("minecraft:dust_color_transition 1 0 1 5 0 0 0",false,pos_x,pos_y,pos_z,0.4,0.4,0.4,10,0.1)
				level.getServer().runCommandSilent(`execute in ${dimension} positioned ${core_x} ${core_y} ${core_z} run fill ~-3 ~-3 ~-3 ~3 ~3 ~3 minecraft:air`)
				reality_charge.set("kubejs:reality_charge_empty")
				controller.set("kubejs:reality_controller_running",{"facing":direction})
				core.set("kubejs:reality_core")
				let core_data = core.getEntityData().getCompound("data")
				core_data.put("controller",{"x":pos_x,"y":pos_y,"z":pos_z})
				core_data.putString("chip_type",chip_type)
				return 1
			}
			return 2
		}
		return 3
	}
	return 0
}
//This Function Is Imported From "generation/reality"
/**
* @param {Internal.BlockContainerJS} core
*/
function generate_reality(core) {
	let level = core.getLevel()
	let dimension = level.getDimension()
	let server = level.getServer()
	let [pos_x,pos_y,pos_z] = [core.getX(),core.getY(),core.getZ()]
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
	let [controller_x,controller_y,controller_z] = [controller_pos_data.getInt("x"),controller_pos_data.getInt("y"),controller_pos_data.getInt("z")]
	let controller = level.getBlock(controller_x,controller_y,controller_z)
	let direction = controller.properties.get("facing")
	core.set("minecraft:air")
	if (controller.getId() == "kubejs:reality_controller_running") {
		controller.set("kubejs:reality_controller",{"facing":direction})
	}
	let result = 1
	if (chip_type == "infinity") {
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.end_portal.spawn","blocks",1,0)
		level.spawnParticles("minecraft:flash",true,pos_x + 0.5,pos_y + 0.5,pos_z + 0.5,0,0,0,1,0)
		core.set("kubejs:black_hole")
	} else {
		result = server.runCommandSilent(`execute in ${dimension} positioned ${pos_x - 3} ${pos_y - 3} ${pos_z - 3} run place template backrooms:reality_${chip_type}`)
	}
	if (result == 0) {
		server.runCommandSilent(`execute in ${dimension} positioned ${pos_x - 3} ${pos_y - 3} ${pos_z - 3} run place template backrooms:reality_error`)
	}

}
//This Function Is Imported From "generation/reality_check"
/**
* @param {Number} pos_x
* @param {String} direction
*/
function get_core_x(pos_x,direction) {
	if (direction == "west") {return pos_x + 4}
	if (direction == "east") {return pos_x - 4}
	return pos_x
}
//This Function Is Imported From "generation/reality_check"
/**
* @param {Number} pos_z
* @param {String} direction
*/
function get_core_z(pos_z,direction) {
	if (direction == "north" || direction == "up" || direction == "down") {return pos_z + 4}
	if (direction == "south") {return pos_z - 4}
	return pos_z
}