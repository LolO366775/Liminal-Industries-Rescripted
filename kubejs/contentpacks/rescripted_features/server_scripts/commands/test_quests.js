/*ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	
	event.register(
        Commands.literal("backrooms")
		.then(Commands.literal("quests")
		.then(Commands.literal("test")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				//let level = ctx.source.getPlayer().getLevel()
				//let player = ctx.source.getPlayer()
				//let quests_file = FTBQuests.getFile(level).addData()
				//let quest = FTBQuests.getFile(level)
				//FTBQuests.getServerDataFromPlayer(player).complete("2444D3B7ED634EA4")
				//let quest_object = FTBQuests.getObject(level,"2444D3B7ED634EA4")
				//let quest_num = QuestUtils.parseId("0000003129087384")
				//let chapter = QuestUtils.parseId("14F820A255718CC8").toString()
				//QuestUtils.getChapter(chapter).getQuestFile().deleteObject(quest_num)
				//ctx.source.getServer().runCommandSilent(`say ${quest}`)

				QuestApi.quest(context => {
					context.setChapterId("14F820A255718CC8")
					context.quest("quest_id")
        				.withTitle("fart")
        				.withDescription("fart2")
        				.withPosition(10, 10)
        				.withSubtitle("fart3")
						.withDependency("21E96772C20BED6F")
				})

				return 1
            })
        )
    ))
})*/