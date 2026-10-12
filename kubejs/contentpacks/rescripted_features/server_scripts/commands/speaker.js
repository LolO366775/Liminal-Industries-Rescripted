ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("events")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("speaker")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				let position = ctx.source.getPosition()
				let level = ctx.source.getLevel()
				let [pos_x,pos_y,pos_z] = [position.x(),position.y(),position.z()]
				let speaker = level.getBlock(pos_x,pos_y,pos_z)
				global.speaker_event_command(speaker)
				return 1
            })
        ))
    )
})
