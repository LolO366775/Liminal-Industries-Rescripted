PlayerEvents.loggedIn(event => {
	let player = event.player
	let server = event.server
	server.runCommandSilent(`execute as ${player.getUuid()} run tellraw @s[gamemode=creative] {"text":"You joined the world in creative.","bold":true,"color":"green"}`)
	server.runCommandSilent(`execute as ${player.getUuid()} run tellraw @s[gamemode=creative] {"text":"Click this text if you want to go to a superflat test world.","bold":true,"color":"white","clickEvent":{"action":"run_command","value":"/execute in backrooms:limbo run tp @s ~ ~ ~"}}`)
	server.runCommandSilent(`execute as ${player.getUuid()} run tellraw @s[gamemode=creative] {"text":"Click this text if you want to go to the room forge.","bold":true,"color":"yellow","clickEvent":{"action":"run_command","value":"/execute in backrooms:room_forge run tp @s 0 23 0"}}`)
	server.runCommandSilent(`execute as ${player.getUuid()} run tellraw @s[gamemode=creative] {"text":"Click this text if you want to go to the poolrooms.","bold":true,"color":"aqua","clickEvent":{"action":"run_command","value":"/execute in backrooms:poolrooms run tp @s 0 64 0"}}`)
	let spawned = player.persistentData.getBoolean("spawned")
	if (!spawned) {
		player.persistentData.putBoolean("spawned",true)
		player.give("ftbquests:book")
		player.teleportTo("minecraft:overworld",-1000.5,23,-1000.5,90,0)
	}
})