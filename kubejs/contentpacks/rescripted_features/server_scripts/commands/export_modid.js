/*ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("generator")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("metadata")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let dependencies = [""]
				ModGen.createModInfo("examplemod")
    			.fromMetaData()
    			.withName("ExampleMod")
    			.withForgeVersion("[47,)")
    			.withMcVersion("1.20.1")
    			.withDescription("This is a test Mod")
    			.withAuthors(["WhiseNT"])
    			.withModDependencies(dependencies)
    			.build()
				return 1
            })
        ))
    )
})
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("generator")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("modid")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				PackGen.createMetaData("generator")
                .withAuthors(["WhiseNT"])
                .withName("Test Name")
                .withVersion("1.0.0")
                .withDescription("This is a test MetaData")
                .build()
				return 1
            })
        ))
    )
})*/

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("quickgen")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("modid")
		.requires(source => source.hasPermission(2))
		.then(Commands.argument('mod_id', Arguments.STRING.create(event))
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let mod_id = Arguments.STRING.getResult(ctx, "mod_id")
				ModGen.fastGenerateMod(mod_id)
				return 1
            })
        )))
    )
})