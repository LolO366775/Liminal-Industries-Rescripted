PlayerEvents.respawned(event => {
	let player = event.getPlayer()
	if(player.getY() >= 46) {
		player.setX(-999.5)
		player.setY(23)
		player.setZ(-999.5)
		let server = player.getServer()
		let new_level = server.getLevel("minecraft:overworld")
		player.setLevel(new_level)
	}
})