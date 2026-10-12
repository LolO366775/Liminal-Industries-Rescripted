EntityEvents.hurt("minecraft:player", event  => {
	const dimension = event.level.getDimension()
	if (event.source.getType() == "fall") {
		if (dimension == "minecraft:the_nether") {
			event.cancel()
		}
	}
})