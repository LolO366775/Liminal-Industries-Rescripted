
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	event.register(
        Commands.literal("backrooms")
        .requires(source => source.hasPermission(2))
		.then(Commands.literal("rooms")
        .requires(source => source.hasPermission(2))
		.then(Commands.literal("lights")
        .requires(source => source.hasPermission(2))
		.then(Commands.literal("off")
        .requires(source => source.hasPermission(2))
            .executes(ctx => {
                global.turn_lights_off_command(ctx)
				return 1
            })
        )
		.then(Commands.literal("on")
        .requires(source => source.hasPermission(2))
            .executes(ctx => {
                global.turn_lights_on_command(ctx)
				return 1
            })
        )
	)))
})