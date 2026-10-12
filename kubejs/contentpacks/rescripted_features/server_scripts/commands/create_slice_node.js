ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	/*event.register(
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
    )*/
   event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("create")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("layered_node")
		.requires(source => source.hasPermission(2))
		.then(Commands.argument('block_pos', Arguments.BLOCK_POS.create(event))
		.requires(source => source.hasPermission(2))
		.then(Commands.argument('room_id', Arguments.STRING.create(event))
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				const position = Arguments.VEC3.getResult(ctx, "block_pos")
				const room_id = Arguments.STRING.getResult(ctx, "room_id")
				let [pos_x, pos_y, pos_z] = [position.x(), position.y(), position.z()]
				let level = ctx.source.getLevel()
				let node = level.getBlock(pos_x,pos_y,pos_z)
				node.set("kubejs:layered_room_node_block")
				let node_data = node.getEntityData().getCompound("data")
				node_data.putString("room",room_id)
				return 1
            })
        ))))
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
