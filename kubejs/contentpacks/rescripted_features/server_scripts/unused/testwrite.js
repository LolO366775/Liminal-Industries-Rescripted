ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	event.register(
        Commands.literal("backrooms")
		.then(Commands.literal("test_read")
            .executes(ctx => {
				let server = ctx.source.getServer()
				global.test_read(server)
				return 1
            })
        )
    )
})

