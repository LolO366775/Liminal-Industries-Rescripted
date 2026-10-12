/**
* @param {String[]} sector_list
*/
function get_random_room(sector_list) {
	try {
		/** @type {String[]} */
		let rooms = []
		let size = sector_list.length
		for (let count = 0; count < size; count++) {
			let sector_id = sector_list[count]
			let sector = get_config_rooms(sector_id)
			rooms = rooms.concat(sector)
		}
		let list_size = rooms.length
		let room_num = Math.round((Math.random() * (list_size -0.001))-0.5)
		let chosen_room = rooms[room_num]
		if (chosen_room.startsWith("##")) {
			let room_group_id = chosen_room.substring(2)
			chosen_room = get_random_room_from_grouping(room_group_id)
		} else if (chosen_room.startsWith("#")) {
			let reference_id = chosen_room.substring(1)
			chosen_room = get_one_sector_reference_room(reference_id)
		}
		return chosen_room
	} catch (error) {
		console.log(error)
    	return "error_floor1"
	}
}

/**
* @param {String} chosen_room
*/
function get_converted_room_id(chosen_room) {
	try {
		if (chosen_room.startsWith("##")) {
			let room_group_id = chosen_room.substring(2)
			chosen_room = get_random_room_from_grouping(room_group_id)
		}
		//double sector reference is not allowed
		return chosen_room
	} catch (error) {
		return chosen_room
	}
}
/**
* @param {String} sector_id
*/
function get_config_rooms(sector_id){
	try {
		/** @type {String[]} */
		let rooms = []
		let file_data = JsonIO.readJson(`kubejs/config/sectors/${sector_id}.json`)
		let room_list = file_data.getAsJsonObject().get("rooms").asJsonArray
		for (let index = 0; index < room_list.size(); index++) {
			let room = room_list.get(index).asString
			rooms.push(room)
		}
		return rooms
	} catch (error) {
		console.log("get_config_rooms " + error)
		console.log(`no sector id found: ${sector_id}`)
		console.log(`error_floor6`)
		let rooms = ["error_floor6"]
		return rooms
	}
}
/**
* @param {String} reference_id
*/
function get_one_sector_reference_room(reference_id){
	let room_list = get_sector_reference_rooms(reference_id)
    let room_num = Math.round((Math.random() * (room_list.length -0.001))-0.5)
	let chosen_room = get_converted_room_id(room_list[room_num])
	return chosen_room
}
/**
* @param {String} reference_id
*/
function get_sector_reference_rooms(reference_id){
	let room_list = ["empty"]
	try {
		let file_data = JsonIO.read(`kubejs/config/sectors/${reference_id}.json`)
		/** @type {String[]} */
		room_list = file_data.get("rooms")
		return room_list
	} catch (error) {
		return room_list
	}
}