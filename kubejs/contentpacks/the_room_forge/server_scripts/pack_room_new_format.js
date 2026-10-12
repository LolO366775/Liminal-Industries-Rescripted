ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	
	event.register(
        Commands.literal("room_forge")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("room")
		.then(Commands.literal("pack_new")
		.then(Commands.argument('room_name', Arguments.STRING.create(event))
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let room = Arguments.STRING.getResult(ctx, "room_name")
				forge_pack_room_new_format(ctx,room,false,false)
				return 1
            })
        )
		.then(Commands.argument('room_name', Arguments.STRING.create(event))
		.then(Commands.argument('include_entities', Arguments.BOOLEAN.create(event))
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let include_entities = Arguments.BOOLEAN.getResult(ctx, "include_entities")
				let room = Arguments.STRING.getResult(ctx, "room_name")
				forge_pack_room_new_format(ctx,room,include_entities,true)
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
				forge_pack_room_new_format(ctx,room,include_entities,true)
				return 1
            })
        )))
    )))
})
/**
* @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx
* @param {String} room
* @param {Boolean} include_entities
* @param {Boolean} force
*/
function forge_pack_room_new_format(ctx,room,include_entities,force){
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
		server.runCommandSilent(`execute in backrooms:room_forge run data modify block 63 21 -14 name set value "backrooms:${room}/slice1"`)
		server.runCommandSilent(`execute in backrooms:room_forge run data modify block 63 22 -14 name set value "backrooms:${room}/slice2"`)
		server.runCommandSilent(`execute in backrooms:room_forge run data modify block 63 23 -14 name set value "backrooms:${room}/slice3"`)
		server.runCommandSilent(`execute in backrooms:room_forge run data modify block 63 24 -14 name set value "backrooms:${room}/slice4"`)
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
