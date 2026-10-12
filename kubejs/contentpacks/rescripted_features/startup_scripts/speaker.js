StartupEvents.registry('block', event => {
	let register_speaker = (id,display_name,type) => {
		event.create(id,'cardinal').displayName(display_name)
		.fullBlock(true)
		.mapColor("metal")
		.soundType("metal")
		.tagBlock('minecraft:mineable/pickaxe')
		.property(BlockProperties.POWERED)
		.placementState(c =>{
			c.set(BlockProperties.POWERED, true)
		})
		.defaultState(c =>{
			c.set(BlockProperties.POWERED, true)
		})
		.item(item => 
			item.modelJson({
				"parent": `kubejs:block/speaker/${type}_on`
			})
		)
		.blockEntity(entityInfo => {
			entityInfo.serverTick(20, 0, entity => {
				global.tick_backrooms_speaker(entity)
			})
		})
		.blockstateJson = {
			"variants": {
				"powered=true,facing=north": {
					"model": `kubejs:block/speaker/${type}_on`,
					"y": 180
				},
				"powered=true,facing=east": {
					"model": `kubejs:block/speaker/${type}_on`,
					"y": 270
				},
				"powered=true,facing=south": {
					"model": `kubejs:block/speaker/${type}_on`,
					"y": 0
				},
				"powered=true,facing=west": {
					"model": `kubejs:block/speaker/${type}_on`,
					"y": 90
				},
				"powered=false,facing=north": {
					"model": `kubejs:block/speaker/${type}_off`,
					"y": 180
				},
				"powered=false,facing=east": {
					"model": `kubejs:block/speaker/${type}_off`,
					"y": 270
				},
				"powered=false,facing=south": {
					"model": `kubejs:block/speaker/${type}_off`,
					"y": 0
				},
				"powered=false,facing=west": {
					"model": `kubejs:block/speaker/${type}_off`,
					"y": 90
				}
			}
		}
	}
	register_speaker("backrooms_speaker_light","Backrooms Speaker","light")
	register_speaker("backrooms_speaker_dark","Backrooms Speaker","dark")
})
/**
* @param {Internal.BlockEntityJS} entity
*/
global.tick_backrooms_speaker = entity => {
	let speaker = entity.getBlock()
	let speaker_data = speaker.getEntityData().getCompound("data")
	let playing = speaker_data.getBoolean("playing")
	let powered = speaker.properties.get("powered")
	//console.log(powered);
	if (playing) {
		speaker_playing_tick(speaker)
	} else if (powered == "true") {
		speaker_not_playing_tick(speaker)
	}
}
/**
* @param {Internal.BlockContainerJS} speaker
*/
function speaker_playing_tick(speaker) {
	let speaker_data = speaker.getEntityData().getCompound("data")
	let time_left = speaker_data.getInt("time_left")
	if (time_left > 0) {
		time_left--
		speaker_data.putInt("time_left",time_left)
		speaker_static_tick(speaker)
	} else {
		speaker_data.putBoolean("playing",false)
		speaker_radio_close(speaker)
	}
}
/**
* @param {Internal.BlockContainerJS} speaker
*/
function speaker_static_tick(speaker) {
	let speaker_data = speaker.getEntityData().getCompound("data")
	let is_quiet = speaker_data.getBoolean("is_quiet")
	if (!is_quiet) {
		let level = speaker.getLevel()
		let [pos_x,pos_y,pos_z] = [speaker.getX() + 0.5,speaker.getY(),speaker.getZ() + 0.5]
		level.playSound(null,pos_x,pos_y,pos_z,"kubejs:radio_static_tick","ambient",1,1)
	}
}
/**
* @param {Internal.BlockContainerJS} speaker
*/
function speaker_radio_close(speaker) {
	let speaker_data = speaker.getEntityData().getCompound("data")
	let is_quiet = speaker_data.getBoolean("is_quiet")
	if (!is_quiet) {
		let level = speaker.getLevel()
		let [pos_x,pos_y,pos_z] = [speaker.getX() + 0.5,speaker.getY(),speaker.getZ() + 0.5]
		level.playSound(null,pos_x,pos_y,pos_z,"kubejs:radio_close","ambient",1,1)
	}
}
/**
* @param {Internal.BlockContainerJS} speaker
*/
function speaker_radio_open(speaker) {
	let speaker_data = speaker.getEntityData().getCompound("data")
	let is_quiet = speaker_data.getBoolean("is_quiet")
	if (!is_quiet) {
		let level = speaker.getLevel()
		let [pos_x,pos_y,pos_z] = [speaker.getX() + 0.5,speaker.getY(),speaker.getZ() + 0.5]
		level.playSound(null,pos_x,pos_y,pos_z,"kubejs:radio_open","ambient",1,1)
		level.playSound(null,pos_x,pos_y,pos_z,"kubejs:radio_static_tick","ambient",1,1)
	}
}
/**
* @param {Internal.BlockContainerJS} speaker
*/
function speaker_not_playing_tick(speaker) {
	let speaker_data = speaker.getEntityData().getCompound("data")
	let mode = speaker_data.getString("mode")
	if (mode == "repeat") {
		speaker_play_repeat_sound(speaker)
	} else {
		if (0.005 > Math.random()) {
			speaker_play_random_sound(speaker)
		}
	}
}
/**
* @param {Internal.BlockContainerJS} speaker
*/
function speaker_play_repeat_sound(speaker) {
	let sound = speaker_data.getString("sound")
	let duration = speaker_data.getInt("duration")
	speaker_play_sound(speaker,sound,duration)
}
/**
* @param {Internal.BlockContainerJS} speaker
*/
function speaker_play_random_sound(speaker) {
	let random_sound_data = speaker_get_random_sound_data()
	let sound = random_sound_data.name
	let duration = random_sound_data.duration
	speaker_play_sound(speaker,sound,duration)
	speaker_radio_open(speaker)
}
/**
* @param {Internal.BlockContainerJS} speaker
* @param {String} sound
* @param {Number} duration
*/
function speaker_play_sound(speaker,sound,duration) {
	let speaker_data = speaker.getEntityData().getCompound("data")
	speaker_data.putInt("time_left",duration)
	speaker_data.putBoolean("playing",true)
	let level = speaker.getLevel()
	let [pos_x,pos_y,pos_z] = [speaker.getX() + 0.5,speaker.getY(),speaker.getZ() + 0.5]
	let sound_id = "kubejs:radio_" + sound
	level.playSound(null,pos_x,pos_y,pos_z,sound_id,"ambient",5,1)
}
/**
* @param {Internal.BlockContainerJS} speaker
*/
global.speaker_event_command = speaker => {
	speaker_play_random_sound(speaker)
}
function speaker_get_random_sound_data() {
	let beep1 = {"name":"beep1","duration":16,"quiet":false,"distance":5}
	let cave16 = {"name":"cave16","duration":8,"quiet":false,"distance":5}
	let clanging_chimes = {"name":"clanging_chimes","duration":10,"quiet":false,"distance":5}
	let coin_grinding = {"name":"coin_grinding","duration":8,"quiet":false,"distance":5}
	let drop_echo = {"name":"drop_echo","duration":6,"quiet":false,"distance":5}
	let even_larger_drain = {"name":"even_larger_drain","duration":14,"quiet":false,"distance":5}
	let fan = {"name":"fan","duration":26,"quiet":false,"distance":5}
	let forgor = {"name":"forgor","duration":17,"quiet":false,"distance":5}
	let gem_pling = {"name":"gem_pling","duration":2,"quiet":false,"distance":5}
	let greg = {"name":"greg","duration":14,"quiet":false,"distance":5}
	let infuser = {"name":"infuser","duration":18,"quiet":false,"distance":5}
	let jingle = {"name":"jingle","duration":10,"quiet":false,"distance":5}
	let large_metal_door_open = {"name":"large_metal_door_open","duration":5,"quiet":false,"distance":5}
	let large_scream = {"name":"large_scream","duration":7,"quiet":false,"distance":5}
	let radio = {"name":"radio","duration":20,"quiet":false,"distance":5}
	let render = {"name":"render","duration":24,"quiet":false,"distance":5}
	let talking = {"name":"talking","duration":16,"quiet":false,"distance":5}
	let dweller1 = {"name":"dweller1","duration":3,"quiet":false,"distance":5}
	let dweller2 = {"name":"dweller2","duration":4,"quiet":false,"distance":5}
	let dweller3 = {"name":"dweller3","duration":4,"quiet":false,"distance":5}
	let dweller4 = {"name":"dweller4","duration":6,"quiet":false,"distance":5}
	//let on_hold = {"name":"on_hold","duration":15,"quiet":false,"distance":5}
	//let space_jazz = {"name":"space_jazz","duration":25,"quiet":false,"distance":5}
	//let vibing = {"name":"vibing","duration":13,"quiet":false,"distance":5}
	let random_group1 = [beep1,cave16,clanging_chimes,coin_grinding,drop_echo,even_larger_drain,fan,forgor] //8
	let random_group2 = [gem_pling,greg,infuser,jingle,large_metal_door_open,large_scream,radio,render,talking] //9
	//let random_group3 = [on_hold,space_jazz,vibing] //3
	let dweller_group = [dweller1,dweller2,dweller3,dweller4] //4
	let sound_list = random_group1.concat(random_group2,dweller_group)
	let random_num = Math.round((Math.random() * (sound_list.length -0.001)) -0.5)
	let chosen_sound = sound_list[random_num]
	return chosen_sound
}
//sculk sounds for dark
//playsound minecraft:entity.warden.agitated block @s -1113 25 -1060 5 1
//playsound minecraft:entity.warden.sniff block @s -1113 25 -1060 5 1
//playsound minecraft:entity.warden.listening_angry block @s -1113 25 -1060 5 1
//playsound minecraft:entity.warden.nearby_closer block @s -1113 25 -1060 5 1
//playsound minecraft:entity.warden.tendril_clicks block @s -1113 25 -1060 5 0
//playsound minecraft:entity.warden.roar block @s -1113 25 -1060 5 1