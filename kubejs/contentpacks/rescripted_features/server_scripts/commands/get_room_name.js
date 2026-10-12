ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	
	event.register(
        Commands.literal("backrooms")
		.then(Commands.literal("info")
		.then(Commands.literal("room")
		.then(Commands.literal("name")
		.then(Commands.argument('block_pos', Arguments.BLOCK_POS.create(event))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
				let position = Arguments.VEC3.getResult(ctx, "block_pos")
				global.get_room_name_command(ctx,position)
				return 1
            })
        ))))
    )
})