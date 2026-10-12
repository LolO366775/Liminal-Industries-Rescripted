ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	
	event.register(
        Commands.literal("backrooms")
		.then(Commands.literal("test")
		    .executes(ctx => {
				let server = ctx.source.getServer()
				let pos_x = ctx.source.position.x()
				let pos_y = ctx.source.position.y()
				let pos_z = ctx.source.position.z()
				let dimension = ctx.source.getLevel().getDimension()
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~ 0 ~ ~46 10 ~46 minecraft:structure_void replace minecraft:barrier`)
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~ 11 ~ ~46 20 ~46 minecraft:structure_void replace minecraft:barrier`)
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~ 21 ~ ~46 30 ~46 minecraft:structure_void replace minecraft:barrier`)
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~ 31 ~ ~46 40 ~46 minecraft:structure_void replace minecraft:barrier`)
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~ 41 ~ ~46 47 ~46 minecraft:structure_void replace minecraft:barrier`)
				return 1
            })
        )
    )

	event.register(
        Commands.literal("backrooms")
		.then(Commands.literal("water")
		    .executes(ctx => {
				let server = ctx.source.getServer()
				let pos_x = ctx.source.position.x()
				let pos_y = ctx.source.position.y()
				let pos_z = ctx.source.position.z()
				let dimension = ctx.source.getLevel().getDimension()
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~ 0 ~ ~46 10 ~46 minecraft:water replace minecraft:water`)
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~ 11 ~ ~46 20 ~46 minecraft:water replace minecraft:water`)
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~ 21 ~ ~46 30 ~46 minecraft:water replace minecraft:water`)
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~ 31 ~ ~46 40 ~46 minecraft:water replace minecraft:water`)
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~ 41 ~ ~46 47 ~46 minecraft:water replace minecraft:water`)
				return 1
            })
        )
    )

	event.register(
        Commands.literal("backrooms")
		.then(Commands.literal("water2")
		    .executes(ctx => {
				let server = ctx.source.getServer()
				let pos_x = ctx.source.position.x()
				let pos_y = ctx.source.position.y()
				let pos_z = ctx.source.position.z()
				let dimension = ctx.source.getLevel().getDimension()
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~ 0 ~ ~46 10 ~46 minecraft:structure_void replace minecraft:water`)
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~ 11 ~ ~46 20 ~46 minecraft:structure_void replace minecraft:water`)
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~ 21 ~ ~46 30 ~46 minecraft:structure_void replace minecraft:water`)
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~ 31 ~ ~46 40 ~46 minecraft:structure_void replace minecraft:water`)
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run fill ~ 41 ~ ~46 47 ~46 minecraft:structure_void replace minecraft:water`)
				return 1
            })
        )
    )
})

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	
	event.register(
        Commands.literal("backrooms")
		.then(Commands.literal("test3")
		    .executes(ctx => {
				global.test34(ctx.source.getServer())
            })
        )
    )
})