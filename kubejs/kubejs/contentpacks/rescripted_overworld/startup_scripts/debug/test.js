/** @param {Internal.MinecraftServer} server */
global.test34 = server => {
	server.runCommandSilent(`say hi`)
}

/** @param {Internal.MinecraftServer} server */
global.test_read = server => {
	server.runCommandSilent(`say testread`)
	let config = JsonIO.read("kubejs/config/hardcore_progress.json")
	if (config == null) {
		server.runCommandSilent(`say config file not found! creating!`)
		global.test_write(server)
		let config = JsonIO.read("kubejs/config/hardcore_progress.json")
		server.runCommandSilent(`say ${config}`)
	} else {
		server.runCommandSilent(`say ${config}`)
		if (config.get("enabled") == true) {
		}
		if (server.isHardcore()) {
			server.runCommandSilent(`say is world hardcore!`)
		}
	}
}

function create_hardcore_config_file() {
	let config = JsonIO.read("kubejs/config/hardcore_progress.json")
	if (config == null) {
		JsonIO.write("kubejs/config/hardcore_progress.json",{"enabled":true,"unlocks":{}})
	}
	return 1
}