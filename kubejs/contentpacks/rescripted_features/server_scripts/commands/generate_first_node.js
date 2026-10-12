ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("generation")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("node")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("first")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("poolrooms")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let level = ctx.source.getLevel()
				global.generate_first_node(level)
				return 1
            })
        )
		.then(Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let level = ctx.source.getLevel()
				global.generate_first_node(level)
				return 1
            })
        ))))
    )
})