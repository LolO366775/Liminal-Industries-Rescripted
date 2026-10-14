/**
* @param {Internal.BlockEntityJS} entity
*/
global.tick_ceiling_lamp_buzzing = entity => {
	let speaker = entity.getBlock()
	let speaker_data = speaker.getEntityData().getCompound("data")
	let playing = speaker_data.getBoolean("playing")
	if (playing) {
		ceiling_lamp_playing_tick(speaker)
	} else {
		ceiling_lamp_not_playing_tick(speaker)
	}
}
/**
* @param {Internal.BlockContainerJS} speaker
*/
function ceiling_lamp_playing_tick(speaker) {
	let speaker_data = speaker.getEntityData().getCompound("data")
	let time_left = speaker_data.getInt("time_left")
	if (time_left > 0) {
		time_left--
		speaker_data.putInt("time_left",time_left)
	} else {
		speaker_data.putBoolean("playing",false)
	}
}
/**
* @param {Internal.BlockContainerJS} speaker
*/
function ceiling_lamp_not_playing_tick(speaker) {
	let sound = "kubejs:light_hum1_loop"
	let duration = 3
	//let sound = "minecraft:light_hum5_loop"
	//let duration = 18
	//let sound = "minecraft:light_hum6_loop"
	//let duration = 6
	//let sound = speaker_data.getString("sound")
	//let duration = speaker_data.getInt("duration")
	ceiling_lamp_play_sound(speaker,sound,duration)
}
/**
* @param {Internal.BlockContainerJS} speaker
* @param {String} sound
* @param {Number} duration
*/
function ceiling_lamp_play_sound(lamp,sound,duration) {
	let speaker_data = lamp.getEntityData().getCompound("data")
	speaker_data.putInt("time_left",duration)
	speaker_data.putBoolean("playing",true)
	try {
		let level = lamp.getLevel()
		let hearing_range = 5
		let [pos_x,pos_y,pos_z] = [lamp.getX() + 0.5,lamp.getY(),lamp.getZ() + 0.5]
		if (can_nearby_player_hear_buzzing(lamp, hearing_range)) {
			if (is_lamp_exposed(lamp)) {
				level.playSound(null,pos_x,pos_y,pos_z,sound,"ambient",hearing_range,1)				
			}
		}
	} catch (error) {}
}
/**
* @param {Internal.BlockContainerJS} lamp
*/
function is_lamp_exposed(lamp) {
	let [north,south,east,west] = [lamp.getNorth(),lamp.getSouth(),lamp.getEast(),lamp.getWest()]
	let [up,down] = [lamp.getUp(),lamp.getDown()]
	if (north.blockState.canBeReplaced()) {return true}
	if (south.blockState.canBeReplaced()) {return true}
	if (east.blockState.canBeReplaced()) {return true}
	if (west.blockState.canBeReplaced()) {return true}
	if (up.blockState.canBeReplaced()) {return true}
	if (down.blockState.canBeReplaced()) {return true}
	return false
}
/**
* @param {Internal.BlockContainerJS} lamp
* @param {number} distance
*/
function can_nearby_player_hear_buzzing(lamp, distance){
	let check_distance = (distance * 3)
	let [pos_x,pos_y,pos_z] = [lamp.getX() + 0.5,lamp.getY() + 0.5,lamp.getZ() + 0.5]
	let player = lamp.level.getNearestPlayer(pos_x,pos_y,pos_z,check_distance,false)
	if (player != null) {return true}
	return false
}
/**
* @param {Internal.BlockContainerJS} lamp
*/
global.tick_ceiling_lamp_waking = lamp => {
	try {
		let level = lamp.getLevel()
		let dimension = level.getDimension()
		if (dimension != "backrooms:room_forge") {
			let pitch = 1 + Math.random() / 5
			let [pos_x,pos_y,pos_z] = [lamp.getX(),lamp.getY(),lamp.getZ()]
			level.playSound(null,pos_x,pos_y,pos_z,"refurbished_furniture:block.lightswitch.flick","blocks",1,pitch)
			level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.note_block.xylophone","blocks",1,pitch)
			turn_on_unloaded_lamp(lamp)
		}
	} catch (error) {
		turn_on_unloaded_lamp(lamp)	
	}
}
/**
* @param {Internal.BlockContainerJS} lamp
*/
function turn_on_unloaded_lamp(lamp) {
	if (0.025 > Math.random()) {
		let result_id = "kubejs:ceilling_lamp_buzzing"
		let lamp_id = lamp.getId()
		if (lamp_id == "kubejs:ceilling_lamp2_waking") {
			result_id = "kubejs:ceilling_lamp2_buzzing"
		} else if (lamp_id == "kubejs:ceilling_lamp_red_waking") {
			result_id = "kubejs:ceilling_lamp_red_buzzing"
		}
		lamp.set(result_id)
		generate_light_collumn_startup(lamp)
	} else {
		let result_id = "kubejs:ceilling_lamp"
		let lamp_id = lamp.getId()
		if (lamp_id == "kubejs:ceilling_lamp2_waking") {
			result_id = "kubejs:ceilling_lamp2"
		} else if (lamp_id == "kubejs:ceilling_lamp_red_waking") {
			result_id = "kubejs:ceilling_lamp_red"
		}
		lamp.set(result_id)
		generate_light_collumn_startup(lamp)
	}
}
/**
* @param {Internal.BlockContainerJS} lamp
*/
function generate_light_collumn_startup(lamp){
    let below = lamp.getDown()
    let level = lamp.getLevel()
    let [pos_x,pos_y,pos_z] = [lamp.getX(),lamp.getY(),lamp.getZ()]
	while (pos_y > 0) {
		if (below.getId() != "minecraft:air") {
            break
        }
        if (Platform.isLoaded("torchmaster")) {
            below.set("torchmaster:invisible_light")
        } else {
            below.set("minecraft:light")
        }
		pos_y--
		below = below.getDown()
		if (level.getBlock(pos_x,pos_y - 6,pos_z).getId() != "minecraft:air") {
			break
		}
	}
}