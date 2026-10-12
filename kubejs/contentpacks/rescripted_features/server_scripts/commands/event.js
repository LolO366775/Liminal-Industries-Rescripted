ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("events")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("lights_out")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				let server = ctx.source.getServer()
				let level = server.getLevel("minecraft:overworld")
				level.persistentData.put("event",{"type":"lights_out_flicker","ticks":600})
				return 1
            })
        ))
    )
})


