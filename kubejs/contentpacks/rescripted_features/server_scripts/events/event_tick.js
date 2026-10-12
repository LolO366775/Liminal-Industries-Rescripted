LevelEvents.tick("minecraft:overworld",event => {
	let level = event.server.getLevel("minecraft:overworld")
	if (is_event_happening(level)) {
		event_tick_down(level)
	} else {
		if (0.00005 >= Math.random()) {
			try {
				let enabled = get_lights_out_config_enabled()
				if (enabled) {
					level.persistentData.put("event",{"type":"lights_out_flicker","ticks":600})
				}
			} catch (error) {}
		}
	}
})
/**
* @param {Internal.ServerLevel} level
*/
function is_event_happening(level){
	let event_data =  level.persistentData.getCompound("event")
	if (event_data.isEmpty()) {
		return false
	}
	let event_type = event_data.getString("type")
	if (event_type == "none") {
		return false
	}
	return true
}
/**
* @param {Internal.ServerLevel} level
*/
function event_tick_down(level){
	let event_data =  level.persistentData.getCompound("event")
	let event_ticks = event_data.getInt("ticks")
	let event_type = event_data.getString("type")
	event_ticks--
	event_data.putInt("ticks",event_ticks)
	if (0 >= event_ticks) {
		if (event_type == "lights_out_flicker") {
			level.persistentData.put("event",{"type":"lights_out","ticks":1200})
		} else {
			event_data.putString("type","none")
		}

	}
}