ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	
	event.register(
        Commands.literal("kubejs")
		.then(Commands.literal("list_all_ids")
		.then(Commands.literal("creative_tab")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let server = ctx.source.getServer()
				Utils.getRegistryIds("creative_mode_tab").forEach(tabId => {
					server.runCommandSilent(`say ${tabId}`)
				})
				return 1
            })
        )
    ))
})