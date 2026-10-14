/**
* @param {boolean} success_feedback
* @param {Internal.ServerPlayer} player
*/
global.lights_out_config_bridge = (success_feedback, player) => {
	try {
		let config = get_lights_out_config()
		let enabled = get_lights_out_config_enabled()
		let sectors = get_lights_out_config_sectors()
		if (success_feedback) {
			player.tell(`§aSuccessfully loaded event config!`)
		}
	} catch (error) {
		player.tell(`§4Error loading event config!`)
		player.tell(`§c${error}`)
		player.tell(`§eUsing default values.`)
		//player.tell(`§eRewrote default config file.`)
		//JsonIO.write("kubejs/config/events.json",{"lights_out":{"enabled":"true","sectors":{"blacklist":[0,1],"whitelist":[]}}})
	}
}
function get_lights_out_config(){
	let file_data = JsonIO.read("kubejs/config/events.json")
	/** @type {{"enabled": boolean,"sectors":{"blacklist": number[],"whitelist": number[]}}} */
	let lights_out = file_data.get("lights_out")
	return lights_out
}
function get_lights_out_config_enabled(){
	let enabled = get_lights_out_config().enabled
	return enabled
}
function get_lights_out_config_sectors(){
	let sectors = get_lights_out_config().sectors
	return sectors
}