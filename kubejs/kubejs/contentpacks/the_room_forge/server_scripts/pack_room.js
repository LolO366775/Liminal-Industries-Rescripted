ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	
	event.register(
        Commands.literal("room_forge")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("room")
		.then(Commands.literal("pack")
		.then(Commands.argument('room_name', Arguments.STRING.create(event))
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let room = Arguments.STRING.getResult(ctx, "room_name")
				forge_pack_room(ctx,room,false,false)
				return 1
            })
        )
		.then(Commands.argument('room_name', Arguments.STRING.create(event))
		.then(Commands.argument('include_entities', Arguments.BOOLEAN.create(event))
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let include_entities = Arguments.BOOLEAN.getResult(ctx, "include_entities")
				let room = Arguments.STRING.getResult(ctx, "room_name")
				forge_pack_room(ctx,room,include_entities,true)
				return 1
            })
        ))
		.then(Commands.argument('room_name', Arguments.STRING.create(event))
		.then(Commands.argument('include_entities', Arguments.BOOLEAN.create(event))
		.then(Commands.literal("force")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let include_entities = Arguments.BOOLEAN.getResult(ctx, "include_entities")
				let room = Arguments.STRING.getResult(ctx, "room_name")
				forge_pack_room(ctx,room,include_entities,true)
				return 1
            })
        )))
    )))

	event.register(
        Commands.literal("room_forge")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("room")
		.then(Commands.literal("unpack")
		.then(Commands.argument('room_name', Arguments.STRING.create(event))
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let room = Arguments.STRING.getResult(ctx, "room_name")
				forge_unpack_room(ctx,room,false)
				return 1
            })
        )
		.then(Commands.argument('room_name', Arguments.STRING.create(event))
		.then(Commands.literal("force")
		    .executes(ctx => {
				let room = Arguments.STRING.getResult(ctx, "room_name")
				forge_unpack_room(ctx,room,true)
				return 1
            })
        ).then(Commands.literal("continual")
		.executes(ctx => {
			let room = Arguments.STRING.getResult(ctx, "room_name")
			forge_unpack_room_no_walls(ctx,room,false)
			return 1
        }).then(Commands.literal("force")
		    .executes(ctx => {
				let room = Arguments.STRING.getResult(ctx, "room_name")
				forge_unpack_room_no_walls(ctx,room,true)
				return 1
            })
        )))
    )))

	event.register(
        Commands.literal("room_forge")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("room")
		.then(Commands.literal("empty")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let player = ctx.source.getPlayer()
				let needs_confirmation = player.persistentData.getCompound("room_forge").getBoolean("needs_confirmation")
				if (needs_confirmation) {
					player.persistentData.merge({"room_forge":{"last_action":"emptying","needs_confirmation":false}})
					player.tell(`§eClear room request cancelled`)
				} else {
					player.persistentData.merge({"room_forge":{"last_action":"emptying","needs_confirmation":true}})
					player.tell(`§eYou are trying to clear your room. Confirm?`)
				}	
				return 1
            })
        )
		.then(Commands.literal("empty")
		.then(Commands.literal("confirm")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let player = ctx.source.getPlayer()
				let needs_confirmation = player.persistentData.getCompound("room_forge").getBoolean("needs_confirmation")
				if (needs_confirmation) {
					let server = ctx.source.getServer()
					player.persistentData.merge({"room_forge":{"last_action":"emptying","needs_confirmation":false,"room":""}})
					server.runCommandSilent(`execute in backrooms:room_forge run fill 70 0 -22 114 10 22 minecraft:air`)
					server.runCommandSilent(`execute in backrooms:room_forge run fill 70 11 -22 114 20 22 minecraft:air`)
					server.runCommandSilent(`execute in backrooms:room_forge run fill 70 21 -22 114 30 22 minecraft:air`)
					server.runCommandSilent(`execute in backrooms:room_forge run fill 70 31 -22 114 40 22 minecraft:air`)
					server.runCommandSilent(`execute in backrooms:room_forge run fill 70 41 -22 114 47 22 minecraft:air`)	
					player.tell(`§aRoom successfully cleared!`)
				} else {
					player.tell(`§cYou have no requests to confirm!`)
				}
				return 1
            })
        ))
    ))
})
/**
* @param {Internal.Player} player
* @param {String} room
* @param {Boolean} force
*/
function just_packed_room(player,room,force){
	if (force) {
		return false
	}
	let mode = player.persistentData.getCompound("room_forge").getString("last_action")
	if (mode == "packing") {
		player.tell(`§cYou are trying to double pack a room without unpacking! Would you like to force pack anyways?`)
		return true
	}
	let unpacked_room = player.persistentData.getCompound("room_forge").getString("room")
	if (unpacked_room != room && unpacked_room != "") {
		player.tell(`§cYou are trying to pack this room as something else! Would you like to force pack anyways?`)
		return true
	}
	return false
}
/**
* @param {Internal.Player} player
* @param {Boolean} force
*/
function just_unpacked_room(player,force){
	if (force) {
		return false
	}
	let mode = player.persistentData.getCompound("room_forge").getString("last_action")
	if (mode == "unpacking") {
		player.tell(`§cYou haven't packed this room yet! Would you like to force unpack anyways?`)
		return true
	}
	return false
}

/**
* @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx
* @param {String} room
* @param {Boolean} force
*/
function forge_unpack_room_no_walls(ctx,room,force){
	let player = ctx.source.getPlayer()
	if (!just_unpacked_room(player,force)) {
		let server = ctx.source.getServer()
		let level = server.getLevel("backrooms:room_forge")
		let player = ctx.source.getPlayer()
		player.persistentData.merge({"room_forge":{"last_action":"unpacking","room":room}})
		server.runCommandSilent(`execute in backrooms:room_forge run place template backrooms:slice1/room_forge_empty_room 69 0 -23`)
		server.runCommandSilent(`execute in backrooms:room_forge run place template backrooms:slice2/room_forge_empty_room 69 12 -23`)
		server.runCommandSilent(`execute in backrooms:room_forge run place template backrooms:slice3/room_forge_empty_room 69 24 -23`)
		server.runCommandSilent(`execute in backrooms:room_forge run place template backrooms:slice4/room_forge_empty_room 69 36 -23`)
		server.runCommandSilent(`execute in backrooms:room_forge run fill 69 2 -23 69 45 23 minecraft:air`)
		server.runCommandSilent(`execute in backrooms:room_forge run fill 69 2 -23 115 45 -23 minecraft:air`)
		server.runCommandSilent(`execute in backrooms:room_forge run fill 115 2 -23 115 45 23 minecraft:air`)
		server.runCommandSilent(`execute in backrooms:room_forge run fill 115 2 23 70 45 23 minecraft:air`)
		if (!forge_place_slices_attempt(server,room)) {
			let result = server.runCommandSilent(`execute in backrooms:room_forge run place template backrooms:${room} 69 0 -23`)
			if (result == 0) {
				player.tell(`§cNo structure files with that name was found!`)
				return 0
			} else {
				player.tell(`§aSuccessfully unpacked backrooms:${room}!`)
				level.getBlock(63,21,-14).set("minecraft:air")
				level.getBlock(63,22,-14).set("minecraft:air")
				level.getBlock(63,23,-14).set("minecraft:air")
				level.getBlock(63,24,-14).set("minecraft:air")
				level.getBlock(63,21,-9).set("minecraft:air")
			}
		} else {
			player.tell(`§aSuccessfully unpacked backrooms:${room}!`)
			level.getBlock(63,21,-14).set("minecraft:air")
			level.getBlock(63,22,-14).set("minecraft:air")
			level.getBlock(63,23,-14).set("minecraft:air")
			level.getBlock(63,24,-14).set("minecraft:air")
			level.getBlock(63,21,-9).set("minecraft:air")
		}
	}
	return 1
}

/**
* @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx
* @param {String} room
* @param {Boolean} force
*/
function forge_unpack_room(ctx,room,force){
	let player = ctx.source.getPlayer()
	if (!just_unpacked_room(player,force)) {
		let server = ctx.source.getServer()
		let level = server.getLevel("backrooms:room_forge")
		let player = ctx.source.getPlayer()
		player.persistentData.merge({"room_forge":{"last_action":"unpacking","room":room}})
		server.runCommandSilent(`execute in backrooms:room_forge run place template backrooms:slice1/room_forge_empty_room 69 0 -23`)
		server.runCommandSilent(`execute in backrooms:room_forge run place template backrooms:slice2/room_forge_empty_room 69 12 -23`)
		server.runCommandSilent(`execute in backrooms:room_forge run place template backrooms:slice3/room_forge_empty_room 69 24 -23`)
		server.runCommandSilent(`execute in backrooms:room_forge run place template backrooms:slice4/room_forge_empty_room 69 36 -23`)
		if (!forge_place_slices_attempt(server,room)) {
			let result = server.runCommandSilent(`execute in backrooms:room_forge run place template backrooms:${room} 69 0 -23`)
			if (result == 0) {
				player.tell(`§cNo structure files with that name was found!`)
				return 0
			} else {
				player.tell(`§aSuccessfully unpacked backrooms:${room}!`)
				level.getBlock(63,21,-14).set("minecraft:air")
				level.getBlock(63,22,-14).set("minecraft:air")
				level.getBlock(63,23,-14).set("minecraft:air")
				level.getBlock(63,24,-14).set("minecraft:air")
				level.getBlock(63,21,-9).set("minecraft:air")
			}
		} else {
			player.tell(`§aSuccessfully unpacked backrooms:${room}!`)
			level.getBlock(63,21,-14).set("minecraft:air")
			level.getBlock(63,22,-14).set("minecraft:air")
			level.getBlock(63,23,-14).set("minecraft:air")
			level.getBlock(63,24,-14).set("minecraft:air")
			level.getBlock(63,21,-9).set("minecraft:air")
		}
	}
	return 1
}
/**
* @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx
* @param {String} room
* @param {Boolean} include_entities
* @param {Boolean} force
*/
function forge_pack_room(ctx,room,include_entities,force){
	let ignore_entities = !include_entities
	let player = ctx.source.getPlayer()
	if (!just_packed_room(player,room,force)) {
		let server = ctx.source.getServer()
		let level = server.getLevel("backrooms:room_forge")
		player.persistentData.merge({"room_forge":{"last_action":"packing","room":room}})
		//
		forge_pack_room_replace_slices(server,"minecraft:structure_void","kubejs:structure_foam_placeholder")
		forge_pack_room_replace_slices(server,"kubejs:ceilling_lamp_waking","kubejs:ceilling_lamp")
		forge_pack_room_replace_slices(server,"kubejs:ceilling_lamp2_waking","kubejs:ceilling_lamp2")
		forge_pack_room_replace_slices(server,"kubejs:ceilling_lamp_red_waking","kubejs:ceilling_lamp_red")
		forge_pack_room_replace_slices(server,"minecraft:air","minecraft:light")
		//
		server.runCommandSilent(`execute in backrooms:room_forge run fill 69 47 -23 115 47 23 minecraft:bedrock`)
		server.runCommandSilent(`execute in backrooms:room_forge run fill 115 0 23 69 0 -23 minecraft:bedrock`)
		server.runCommandSilent(`execute in backrooms:room_forge run fill 69 0 -23 69 46 23 minecraft:structure_void replace minecraft:air`)
		server.runCommandSilent(`execute in backrooms:room_forge run fill 69 0 23 115 46 23 minecraft:structure_void replace minecraft:air`)
		server.runCommandSilent(`execute in backrooms:room_forge run fill 115 0 23 115 46 -23 minecraft:structure_void replace minecraft:air`)
		server.runCommandSilent(`execute in backrooms:room_forge run fill 115 0 -23 69 46 -23 minecraft:structure_void replace minecraft:air`)
		level.getBlock(63,21,-14).set("structure_block",{"mode":"save"})
		level.getBlock(63,21,-14).mergeEntityData({"mode":"SAVE","posX":6,"posY":-21,"posZ":-9,"sizeX":47,"sizeY":12,"sizeZ":47})
		level.getBlock(63,22,-14).set("structure_block",{"mode":"save"})
		level.getBlock(63,22,-14).mergeEntityData({"mode":"SAVE","posX":6,"posY":-10,"posZ":-9,"sizeX":47,"sizeY":12,"sizeZ":47})
		level.getBlock(63,23,-14).set("structure_block",{"mode":"save"})
		level.getBlock(63,23,-14).mergeEntityData({"mode":"SAVE","posX":6,"posY":1,"posZ":-9,"sizeX":47,"sizeY":12,"sizeZ":47})
		level.getBlock(63,24,-14).set("structure_block",{"mode":"save"})
		level.getBlock(63,24,-14).mergeEntityData({"mode":"SAVE","posX":6,"posY":12,"posZ":-9,"sizeX":47,"sizeY":12,"sizeZ":47})
		level.getBlock(63,21,-9).set("structure_block",{"mode":"save"})
		level.getBlock(63,21,-9).mergeEntityData({"mode":"SAVE","posX":6,"posY":-21,"posZ":-14,"sizeX":47,"sizeY":47,"sizeZ":47})
		server.runCommandSilent(`execute in backrooms:room_forge run data modify block 63 21 -14 name set value "backrooms:slice1/${room}"`)
		server.runCommandSilent(`execute in backrooms:room_forge run data modify block 63 22 -14 name set value "backrooms:slice2/${room}"`)
		server.runCommandSilent(`execute in backrooms:room_forge run data modify block 63 23 -14 name set value "backrooms:slice3/${room}"`)
		server.runCommandSilent(`execute in backrooms:room_forge run data modify block 63 24 -14 name set value "backrooms:slice4/${room}"`)
		server.runCommandSilent(`execute in backrooms:room_forge run data modify block 63 21 -14 ignoreEntities set value ${ignore_entities}`)
		server.runCommandSilent(`execute in backrooms:room_forge run data modify block 63 22 -14 ignoreEntities set value ${ignore_entities}`)
		server.runCommandSilent(`execute in backrooms:room_forge run data modify block 63 23 -14 ignoreEntities set value ${ignore_entities}`)
		server.runCommandSilent(`execute in backrooms:room_forge run data modify block 63 24 -14 ignoreEntities set value ${ignore_entities}`)
		server.runCommandSilent(`execute in backrooms:room_forge run data modify block 63 21 -9 name set value "backrooms:${room}"`)
		server.runCommandSilent(`execute in backrooms:room_forge run data modify block 63 21 -9 ignoreEntities set value ${ignore_entities}`)

		player.tell(`§aSuccessfully packed backrooms:${room}!`)
	}
}

/**
* @param {Internal.MinecraftServer} server
* @param {String} output
* @param {String} input
*/
function forge_pack_room_replace_slices(server,output,input){
	try {
		server.runCommandSilent(`execute in backrooms:room_forge run fill 69 1 -22 114 11 23 ${output} replace ${input}`)
		server.runCommandSilent(`execute in backrooms:room_forge run fill 69 12 -22 114 23 23 ${output} replace ${input}`)
		server.runCommandSilent(`execute in backrooms:room_forge run fill 69 24 -22 114 35 23 ${output} replace ${input}`)
		server.runCommandSilent(`execute in backrooms:room_forge run fill 69 36 -22 114 46 23 ${output} replace ${input}`)
	} catch (error) {}
}
/**
* @param {Internal.MinecraftServer} server
* @param {String} room
*/
function forge_place_slices_attempt(server,room){
	if (server.runCommandSilent(`execute in backrooms:room_forge run place template backrooms:slice1/${room} 69 0 -23`) != 1) {return false}
	if (server.runCommandSilent(`execute in backrooms:room_forge run place template backrooms:slice2/${room} 69 12 -23`) != 1) {return false}
	if (server.runCommandSilent(`execute in backrooms:room_forge run place template backrooms:slice3/${room} 69 24 -23`) != 1) {return false}
	if (server.runCommandSilent(`execute in backrooms:room_forge run place template backrooms:slice4/${room} 69 36 -23`) != 1) {return false}
    return true
}
