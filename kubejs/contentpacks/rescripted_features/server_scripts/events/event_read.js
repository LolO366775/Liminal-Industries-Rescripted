ServerEvents.loaded(event => {
	let players = event.server.playerList.getPlayers()
	for (let index = 0; index < players.length; index++) {
		let player = players[index]
		global.lights_out_config_bridge(false,player)
	}
})
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("events")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("check_lights_out")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				let player = ctx.source.getPlayer()
				global.lights_out_config_bridge(true,player)
				return 1
            })
        ))
    )
})
