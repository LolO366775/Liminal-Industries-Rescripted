/*ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	
	event.register(
        Commands.literal("hardcore")
		.then(Commands.literal("checkpoint")
		.then(Commands.literal("add")
		.then(Commands.argument('quest', Arguments.STRING.create(event))
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let quest = Arguments.STRING.getResult(ctx, "quest")
				global.add_hardcore_add_checkpoint(quest)
				return 1
            })
        ))
		.then(Commands.literal("remove")
		.then(Commands.argument('quest', Arguments.STRING.create(event))
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let quest = Arguments.STRING.getResult(ctx, "quest")
				global.remove_hardcore_add_checkpoint(quest)
				return 1
            })
        ))
    ))
})

ItemEvents.firstRightClicked("kubejs:chapter_1_star", event => {
	global.use_hardcore_star(event,1)
})
ItemEvents.firstRightClicked("kubejs:chapter_2_star", event => {
	global.use_hardcore_star(event,2)
})
ItemEvents.firstRightClicked("kubejs:chapter_3_star", event => {
	global.use_hardcore_star(event,3)
})
ItemEvents.firstRightClicked("kubejs:chapter_4_star", event => {
	global.use_hardcore_star(event,4)
})
ItemEvents.firstRightClicked("kubejs:chapter_5_star", event => {
	global.use_hardcore_star(event,5)
})*/