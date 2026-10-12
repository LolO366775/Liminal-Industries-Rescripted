StartupEvents.registry('block', event => {
	event.create('controller_wallpaper','cardinal')
	.fullBlock(true)
	.material("wood")
	.soundType("cherry_wood")
    .unbreakable()
	.tagBlock('wither_immune')
	.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_controller_wallpaper(entity, false)
		})
	})

	event.create('exposed_controller_wallpaper','cardinal')
	.fullBlock(true)
	.material("wood")
	.soundType("cherry_wood")
    .unbreakable()
	.tagBlock('wither_immune')
	.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_controller_wallpaper(entity, false)
		})
	})

	event.create('controller_wallpaper_dead','cardinal')
	.model('kubejs:block/controller_wallpaper_dead')
	.fullBlock(true)
	.material("wood")
	.soundType("cherry_wood")
    .unbreakable()
	.tagBlock('wither_immune')

	event.create('backup_generator','cardinal')
	.fullBlock(true)
	.material("wood")
	.soundType("cherry_wood")
	.unbreakable()
	.tagBlock('wither_immune')
	.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_controller_wallpaper(entity, true)
		})
	})
	.displayName('Backup Generator')
})
/**
* @param {Internal.BlockEntityJS} entity
* @param {Boolean} backup
*/
global.tick_controller_wallpaper = (entity,backup) => {
	let wallpaper = entity.block
	let circuit_breaker = get_circuit_breaker(wallpaper)
	if (is_circuit_breaker(wallpaper,circuit_breaker)) {
		let [pos_x,pos_y,pos_z] = [circuit_breaker.getX(),circuit_breaker.getY(),circuit_breaker.getZ()]
		let level = circuit_breaker.getLevel()
		if (!controller_stopped_by_lights_out_event(level,backup)) {
			circuit_breaker.level.server.runCommandSilent(`execute in ${level.getDimension()} positioned ${pos_x} ${pos_y} ${pos_z} run data merge block ~ ~ ~ {Energy:1000}`)
			if (circuit_breaker.properties.get("powered") == "true") {
				level.playSound(null,pos_x + 0.5,pos_y,pos_z + 0.5,"refurbished_furniture:block.electricity_generator.engine","blocks",0.1,0)
				let dimension = level.getDimension()
				if (dimension != "backrooms:room_forge") {
					let room_node = global.get_room_node2(pos_x,pos_z,level)
					circuit_breaker_reset_shutdown(room_node,circuit_breaker)
				}
			}
		}
	}
}
/**
* @param {Internal.BlockContainerJS} wallpaper
*/
function get_circuit_breaker(wallpaper){
	let direction = wallpaper.properties.get("facing")
	if (direction == "north") {return wallpaper.getNorth()}
	if (direction == "south") {return wallpaper.getSouth()}
	if (direction == "east") {return wallpaper.getEast()}
	if (direction == "west") {return wallpaper.getWest()}
	return wallpaper
}
/**
* @param {Internal.BlockContainerJS} wallpaper
* @param {Internal.BlockContainerJS} circuit_breaker
*/
function is_circuit_breaker(wallpaper,circuit_breaker){
	let opposite_check = "empty"
	let cir_direction = circuit_breaker.properties.get("facing")
	let wall_direction = wallpaper.properties.get("facing")
	if (wall_direction == "north") {opposite_check = "south"}
	else if (wall_direction == "south") {opposite_check = "north"}
	else if (wall_direction == "east") {opposite_check = "west"}
	else if (wall_direction == "west") {opposite_check = "east"}
	return (circuit_breaker.hasTag("kubejs:circuit_breakers")  && cir_direction == opposite_check)
}


/**
* @param {Internal.BlockContainerJS} circuit_breaker
* @param {Internal.BlockContainerJS} room_node
*/
function circuit_breaker_reset_shutdown(room_node,circuit_breaker){
	const [pos_x,pos_y,pos_z] = [circuit_breaker.getX(),circuit_breaker.getY(),circuit_breaker.getZ()]
	let room_node_data = room_node.getEntityData().getCompound("data")
	if (room_node.getId() == "kubejs:redstone_room_node_block") {
		room_node_data.merge({"shutdown":0,"circuit_breaker":{"x":pos_x,"y":pos_y,"z":pos_z}})
		if (room_node_data.getBoolean("lights_off")) {
			room_node.getEntityData().getCompound("data").putBoolean("lights_off",false)
			turn_room_lights_on(room_node)
			circuit_breaker.level.playSound(null,pos_x + 0.5,pos_y,pos_z + 0.5,"fairylights:cord.snap","blocks",0.2,0)
		}
	} else if (room_node.getId() == "kubejs:dead_room_node_block") {
		room_node.set("kubejs:redstone_room_node_block")
		room_node_data = room_node.getEntityData().getCompound("data")
		room_node_data.merge({"lights_off":false,"shutdown":0,"circuit_breaker":{"x":pos_x,"y":pos_y,"z":pos_z}})
	}
    return 1
}
/**
* @param {Internal.BlockContainerJS} room_node
*/
function is_room_node_event_locked(room_node){
	let node_data = room_node.entityData.getCompound("data")
	if (node_data.getBoolean("event_lock")) {
		return true
	}
	return false
}

/**
* @param {Internal.ServerLevel} level
* @param {Boolean} backup
*/
function controller_stopped_by_lights_out_event(level, backup){
	if (backup) {
		return false
	}
	let event_type =  level.persistentData.getCompound("event").getString("type")
	if (event_type == "lights_out") {
		return true
	}
	return false
}