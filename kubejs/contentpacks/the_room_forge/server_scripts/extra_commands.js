ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event

	event.register(
        Commands.literal("room_forge")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("extra")
		.then(Commands.literal("convert_barriers")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let server = ctx.source.getServer()
				server.runCommandSilent(`execute in backrooms:room_forge run fill 70 1 -22 114 10 22 kubejs:structure_foam_placeholder replace minecraft:barrier`)
				server.runCommandSilent(`execute in backrooms:room_forge run fill 70 11 -22 114 20 22 kubejs:structure_foam_placeholder replace minecraft:barrier`)
				server.runCommandSilent(`execute in backrooms:room_forge run fill 70 21 -22 114 30 22 kubejs:structure_foam_placeholder replace minecraft:barrier`)
				server.runCommandSilent(`execute in backrooms:room_forge run fill 70 31 -22 114 40 22 kubejs:structure_foam_placeholder replace minecraft:barrier`)
				server.runCommandSilent(`execute in backrooms:room_forge run fill 70 41 -22 114 46 22 kubejs:structure_foam_placeholder replace minecraft:barrier`)
				return 1
            })
        ))
    )
	event.register(
        Commands.literal("room_forge")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("extra")
		.then(Commands.literal("set_barriers")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let server = ctx.source.getServer()
				server.runCommandSilent(`execute in backrooms:room_forge run fill 70 1 -22 114 10 22 minecraft:barrier replace minecraft:structure_void`)
				server.runCommandSilent(`execute in backrooms:room_forge run fill 70 11 -22 114 20 22 minecraft:barrier replace minecraft:structure_void`)
				server.runCommandSilent(`execute in backrooms:room_forge run fill 70 21 -22 114 30 22 minecraft:barrier replace minecraft:structure_void`)
				server.runCommandSilent(`execute in backrooms:room_forge run fill 70 31 -22 114 40 22 minecraft:barrier replace minecraft:structure_void`)
				server.runCommandSilent(`execute in backrooms:room_forge run fill 70 41 -22 114 46 22 minecraft:barrier replace minecraft:structure_void`)
				return 1
            })
        ))
    )

	event.register(
        Commands.literal("room_forge")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("extra")
		.then(Commands.literal("remove_foam")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let server = ctx.source.getServer()
				server.runCommandSilent(`execute in backrooms:room_forge run fill 70 1 -22 114 10 22 minecraft:air replace kubejs:structure_foam_placeholder`)
				server.runCommandSilent(`execute in backrooms:room_forge run fill 70 11 -22 114 20 22 minecraft:air replace kubejs:structure_foam_placeholder`)
				server.runCommandSilent(`execute in backrooms:room_forge run fill 70 21 -22 114 30 22 minecraft:air replace kubejs:structure_foam_placeholder`)
				server.runCommandSilent(`execute in backrooms:room_forge run fill 70 31 -22 114 40 22 minecraft:air replace kubejs:structure_foam_placeholder`)
				server.runCommandSilent(`execute in backrooms:room_forge run fill 70 41 -22 114 46 22 minecraft:air replace kubejs:structure_foam_placeholder`)
				return 1
            })
        ))
    )

	event.register(
        Commands.literal("room_forge")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("extra")
		.then(Commands.literal("remove_walls")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let server = ctx.source.getServer()
				server.runCommandSilent(`execute in backrooms:room_forge run fill 69 2 -23 69 46 23 minecraft:air`)
				server.runCommandSilent(`execute in backrooms:room_forge run fill 69 2 -23 115 45 -23 minecraft:air`)
				server.runCommandSilent(`execute in backrooms:room_forge run fill 115 2 -23 115 45 23 minecraft:air`)
				server.runCommandSilent(`execute in backrooms:room_forge run fill 115 2 23 70 45 23 minecraft:air`)
				return 1
            })
        ))
    )
})