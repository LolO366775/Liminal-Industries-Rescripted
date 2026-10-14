//Removes all redundant node command blocks
ServerEvents.command('function', event => {
	let command = event.getInput()
	if (command == "function backrooms:room_node_generation") {
		let source = event.getParseResults().getContext().getSource()
		let level = source.getLevel()
		let pos_x = source.getPosition().x()
		let pos_y = source.getPosition().y()
		let pos_z = source.getPosition().z()
		level.getBlock(pos_x - 1,pos_y,pos_z - 1).set("minecraft:air")

		event.cancel()
	}
})

ServerEvents.command('function', event => {
	let command = event.getInput()
	if (command == "function backrooms:common_loot") {
		let source = event.getParseResults().getContext().getSource()
		let level = source.getLevel()
		let pos_x = source.getPosition().x() - 1
		let pos_y = source.getPosition().y()
		let pos_z = source.getPosition().z() - 1
		let commandblock = level.getBlock(pos_x,pos_y,pos_z)
		//highjack_loot_command(commandblock,"common")
		event.cancel()
	}
})

ServerEvents.command('function', event => {
	let command = event.getInput()
	if (command == "function backrooms:spawner_drowned") {
		let source = event.getParseResults().getContext().getSource()
		let level = source.getLevel()
		let dimension = level.getDimension()
		let server = source.getServer()
		let pos_x = source.getPosition().x() - 1
		let pos_y = source.getPosition().y()
		let pos_z = source.getPosition().z() - 1
		event.cancel()
	}
})


/**
* @param {Internal.BlockContainerJS} commandblock
* @param {String} rarity
*/
function highjack_loot_command(commandblock,rarity){
	let level = commandblock.getLevel()
	let server = level.getServer()
	let [pos_x,pos_y,pos_z] = [commandblock.getX(),commandblock.getY(),commandblock.getZ()]
	if (is_coords_commandblock(pos_x,pos_y,pos_z,level)) {
		let dimension = level.getDimension()
		server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run backrooms create feature_node ~ ~ ~ loot ${rarity}`)
	}
    return false
}

/**
* @param {Number} pos_x
* @param {Number} pos_y
* @param {Number} pos_z
* @param {Internal.ServerLevel} level
*/
function is_coords_commandblock(pos_x,pos_y,pos_z,level){
	let commandblock = level.getBlock(pos_x,pos_y,pos_z)
	if (commandblock.getId() == "minecraft:repeating_command_block") {
		return true
	}
    return false
}