ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("create")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("layered_node")
		.requires(source => source.hasPermission(2))
		.then(Commands.argument('block_pos', Arguments.BLOCK_POS.create(event))
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				const position = Arguments.VEC3.getResult(ctx, "block_pos")
				global.create_layered_node_command(ctx,position)
				return 1
            })
        )))
    )
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("rooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("regenerate")
		.requires(source => source.hasPermission(2))
		.then(Commands.argument('block_pos', Arguments.BLOCK_POS.create(event))
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				const position = Arguments.VEC3.getResult(ctx, "block_pos")
				global.regenerate_room_command(ctx,position)
				return 1
            })
        )))
    )
})
