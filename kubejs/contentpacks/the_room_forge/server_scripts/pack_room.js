ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	const command_arguments = {
		/** @param {String} name*/
		"literal_argument" : name => {
			return Commands.literal(name).requires(source => source.hasPermission(Commands.LEVEL_GAMEMASTERS))
		},
		/** @param {String} name*/
		"string_argument" : name => {
			return Commands.argument(name, Arguments.STRING.create(event)).requires(source => source.hasPermission(Commands.LEVEL_GAMEMASTERS))
		},
		/** @param {String} name*/
		"boolean_argument" : name => {
			return Commands.argument(name, Arguments.BOOLEAN.create(event)).requires(source => source.hasPermission(Commands.LEVEL_GAMEMASTERS))
		},
		/** @param {String} name*/
		"block_argument" : name => {
			return Commands.argument(name, Arguments.BLOCK_STATE.create(event)).requires(source => source.hasPermission(Commands.LEVEL_GAMEMASTERS))
		}
	}
	const command_executors = {
		/** @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx @param {Boolean} force*/
		"pack" : (ctx,force) => {
			const room = Arguments.STRING.getResult(ctx, "room_name")
			forge_pack_room(ctx,room,false,force)
			return 1
   		},
		/** @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx @param {Boolean} force*/
		"pack_include_entities" : (ctx,force) => {
			const include_entities = Arguments.BOOLEAN.getResult(ctx, "include_entities")
			const room = Arguments.STRING.getResult(ctx, "room_name")
			forge_pack_room(ctx,room,include_entities,force)
			return 1
   		},
		/** @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx @param {Boolean} force*/
		"unpack" : (ctx,force) => {
			const room = Arguments.STRING.getResult(ctx, "room_name")
			const result = forge_unpack_room(ctx,room,force)
			return result
        },
		/** @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx @param {Boolean} force*/
		"unpack_wallpaper" : (ctx,force) => {
			const room = Arguments.STRING.getResult(ctx, "room_name")
			const wallpaper_id = Arguments.BLOCK_STATE.getResult(ctx, "wallpaper_id")
			const result = forge_unpack_room_with_wallpaper(ctx,room,wallpaper_id,force)
			return result
        }
	}

	let pack_room = command_arguments.literal_argument("room_forge")
		.then(command_arguments.literal_argument("room")
		.then(command_arguments.literal_argument("pack")
		.then(command_arguments.string_argument("room_name").executes(ctx => command_executors.pack(ctx,false))
		.then(command_arguments.boolean_argument("include_entities").executes(ctx => command_executors.pack_include_entities(ctx,false))
		.then(command_arguments.literal_argument("force").executes(ctx => command_executors.pack(ctx,true))
	)))))
	let unpack_room = command_arguments.literal_argument("room_forge")
		.then(command_arguments.literal_argument("room")
		.then(command_arguments.literal_argument("unpack")
		.then(command_arguments.string_argument("room_name").executes(ctx => command_executors.unpack(ctx,false))
		.then(command_arguments.literal_argument("force").executes(ctx => command_executors.unpack(ctx,true))
	))))
	let unpack_room_with = command_arguments.literal_argument("room_forge")
		.then(command_arguments.literal_argument("room")
		.then(command_arguments.literal_argument("unpack")
		.then(command_arguments.string_argument("room_name").executes(ctx => command_executors.unpack(ctx,false))
		.then(command_arguments.literal_argument("with")
		.then(command_arguments.block_argument("wallpaper_id").executes(ctx => command_executors.unpack_wallpaper(ctx,false))
		.then(command_arguments.literal_argument("force").executes(ctx => command_executors.unpack_wallpaper(ctx,true))
	))))))
	event.register(pack_room)
	event.register(unpack_room)
	event.register(unpack_room_with)


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
* @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx
* @param {String} room
* @param {Boolean} include_entities
* @param {Boolean} force
*/
function forge_pack_room(ctx,room,include_entities,force){
	//let ignore_entities = !include_entities
	let [corner_x,corner_z] = [69,-23]
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
		try { //this should be room export most likely
			let room_size = new Vec3i(47,12,47)
			let manager = server.getStructureManager()
			let old_format = [`backrooms:slice1/${room}`,`backrooms:slice2/${room}`,`backrooms:slice3/${room}`,`backrooms:slice4/${room}`]
			let new_format = [`backrooms:${room}/slice1`,`backrooms:${room}/slice2`,`backrooms:${room}/slice3`,`backrooms:${room}/slice4`]
			let slice1_pos = level.getBlock(corner_x,0,corner_z).getPos()
			let slice2_pos = level.getBlock(corner_x,12,corner_z).getPos()
			let slice3_pos = level.getBlock(corner_x,24,corner_z).getPos()
			let slice4_pos = level.getBlock(corner_x,36,corner_z).getPos()
			let slice1_schematic = manager.getOrCreate(old_format[0])
			let slice2_schematic = manager.getOrCreate(old_format[1])
			let slice3_schematic = manager.getOrCreate(old_format[2])
			let slice4_schematic = manager.getOrCreate(old_format[3])
			let slice1_schematic_new_format = manager.getOrCreate(new_format[0])
			let slice2_schematic_new_format = manager.getOrCreate(new_format[1])
			let slice3_schematic_new_format = manager.getOrCreate(new_format[2])
			let slice4_schematic_new_format = manager.getOrCreate(new_format[3])
			slice1_schematic.fillFromWorld(level,slice1_pos,room_size,include_entities,"minecraft:structure_void") //idk if this should be include entities or ignore them
			slice2_schematic.fillFromWorld(level,slice2_pos,room_size,include_entities,"minecraft:structure_void")
			slice3_schematic.fillFromWorld(level,slice3_pos,room_size,include_entities,"minecraft:structure_void")
			slice4_schematic.fillFromWorld(level,slice4_pos,room_size,include_entities,"minecraft:structure_void")
			slice1_schematic_new_format.fillFromWorld(level,slice1_pos,room_size,include_entities,"minecraft:structure_void")
			slice2_schematic_new_format.fillFromWorld(level,slice2_pos,room_size,include_entities,"minecraft:structure_void")
			slice3_schematic_new_format.fillFromWorld(level,slice3_pos,room_size,include_entities,"minecraft:structure_void")
			slice4_schematic_new_format.fillFromWorld(level,slice4_pos,room_size,include_entities,"minecraft:structure_void")
			manager.save(old_format[0])
			manager.save(old_format[1])
			manager.save(old_format[2])
			manager.save(old_format[3])
			manager.save(new_format[0])
			manager.save(new_format[1])
			manager.save(new_format[2])
			manager.save(new_format[3])
			player.tell(`§aSuccessfully packed backrooms:${room}!`)
		} catch (error) {
			player.tell(`§cError while packing backrooms:${room}`)
			player.tell(error)
		}
	}
}


//unpacking
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
* @param {String} wallpaper_id
* @param {String} room
* @param {Boolean} force
*/
function forge_unpack_room_with_wallpaper(ctx,room,wallpaper_id,force){
	const player = ctx.source.getPlayer()
	if (!just_unpacked_room(player,force)) {
		const server = ctx.source.getServer()
		const level = server.getLevel("backrooms:room_forge")
		const pass = room_forge_place_slices_attempt(server,room)
		if (pass) {
			room_forge_successful_unpacking(level,room,player)
			server.runCommandSilent(`execute in backrooms:room_forge run fill 69 1 -23 69 46 23 ${wallpaper_id}`)
			server.runCommandSilent(`execute in backrooms:room_forge run fill 69 1 -23 115 46 -23 ${wallpaper_id}`)
			server.runCommandSilent(`execute in backrooms:room_forge run fill 115 1 -23 115 46 23 ${wallpaper_id}`)
			server.runCommandSilent(`execute in backrooms:room_forge run fill 115 1 23 70 46 23 ${wallpaper_id}`)
		} else {
			player.tell(`§cNo structure files with that name was found!`)
			return 0
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
	const player = ctx.source.getPlayer()
	if (!just_unpacked_room(player,force)) {
		const server = ctx.source.getServer()
		const level = server.getLevel("backrooms:room_forge")
		const pass = room_forge_place_slices_attempt(server,room)
		if (pass) {
			room_forge_successful_unpacking(level,room,player)
		} else {
			player.tell(`§cNo structure files with that name was found!`)
			return 0
		}
	}
	return 1
}
/**
* @param {Internal.ServerLevel} level
* @param {String} room
* @param {Internal.ServerPlayer} player
*/
function room_forge_successful_unpacking(level,room,player){
	player.persistentData.merge({"room_forge":{"last_action":"unpacking","room":room}})
	player.tell(`§aSuccessfully unpacked backrooms:${room}!`)
}
/**
* @param {Internal.MinecraftServer} server
* @param {String} room
*/
function room_forge_place_slices_attempt(server,room){
	const total_slices = 4
	let pass = true
	for (let slice = 1; slice <= total_slices; slice++) {
		if (!room_forge_does_slice_exist(slice,room,server)) {
			pass = false
			break
		}
	}
	if (pass) {
		try {
			room_forge_room_pre_place_attempt(server)
			for (let slice = 1; slice <= total_slices; slice++) {
				room_forge_place_single_slice_attempt(slice,room,server)
			}
		} catch (error) {
			//server.runCommandSilent("say " + error)
		}
	}
	return pass
}
/**
* @param {Number} slice
* @param {String} room_id
* @param {Internal.MinecraftServer} server
*/
function room_forge_does_slice_exist(slice,room_id,server){
	try {
		let manager = server.getStructureManager()
		let room_schematic = manager.get(`backrooms:slice${slice}/${room_id}`)
		let is_empty = !room_schematic.isEmpty()
		return is_empty
	} catch (error) {
		//server.runCommandSilent("say " + error)
		return false
	}
}
/**
* @param {Number} slice
* @param {String} room_id
* @param {Internal.MinecraftServer} server
*/
function room_forge_place_single_slice_attempt(slice,room_id,server){
	let level = server.getLevel("backrooms:room_forge")
	try {
		let corner_y = room_forge_get_slice_y(slice)
		let [corner_x,corner_z] = [69,-23]
		let slice_pos = level.getBlock(corner_x,corner_y,corner_z).getPos()
		let manager = server.getStructureManager()
		let room_schematic = manager.get(`backrooms:slice${slice}/${room_id}`)
		let default_empty = room_schematic.isEmpty()
		let pass = "false"
		if (default_empty) {
			return "false_empty"
		} else {
			room_schematic.ifPresent(e => {
       	 		pass = e.placeInWorld(level, slice_pos, slice_pos, new $StructurePlaceSettings(), level.getRandom(), 3)
				//server.runCommandSilent("say " + room_id)
    		})
			return pass.toString()
		}
	} catch (error) {
		//server.runCommandSilent("say " + error)
		return "false"
	}
}
/**
* @param {Number} slice
*/
function room_forge_get_slice_y(slice){
	if (slice == 2) {return 12}
	if (slice == 3) {return 24}
	if (slice == 4) {return 36}
	return 0
}

/**
* @param {Internal.MinecraftServer} server
*/
function room_forge_room_pre_place_attempt(server){
	let level = server.getLevel("backrooms:room_forge")
	try {
		let manager = server.getStructureManager()
		let lower_room = manager.get("backrooms:room_forge/new_room_lower")
		let upper_room = manager.get("backrooms:room_forge/new_room_upper")
		let [corner_x,corner_z] = [70,-22]
		let [lower_y,upper_y] = [0,24]
		let lower_pos = level.getBlock(corner_x,lower_y,corner_z).getPos()
		let upper_pos = level.getBlock(corner_x,upper_y,corner_z).getPos()
		lower_room.ifPresent(e => {
       		e.placeInWorld(level, lower_pos, lower_pos, new $StructurePlaceSettings(), level.getRandom(), 3)
    	})
		upper_room.ifPresent(e => {
       		e.placeInWorld(level, upper_pos, upper_pos, new $StructurePlaceSettings(), level.getRandom(), 3)
    	})
	} catch (error) {
		server.runCommandSilent("say " + error)
	}
}

//misc
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