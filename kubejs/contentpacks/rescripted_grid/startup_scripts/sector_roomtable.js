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
			chosen_room = get_random_room_variant(room_group_id)
		} else if (chosen_room.startsWith("#")) {
			let reference_id = chosen_room.substring(1)
			chosen_room = get_random_room_from_grouping(reference_id)
		}
		return chosen_room
	} catch (error) {
		console.log('Error In Function: "get_random_room"')
		console.log('Report: ' + error)
		console.log('Estimated Cause: Malformed Config JSON')
		console.log('Result: Returning default room')
		return "zero1"	
	}
}
/**
* @param {String} chosen_room
*/
function get_converted_room_id(chosen_room) {
	try {
		if (chosen_room.startsWith("##")) {
			let room_group_id = chosen_room.substring(2)
			chosen_room = get_random_room_variant(room_group_id)
		}
		return chosen_room
	} catch (error) {
		console.log('Error In Function: "get_converted_room_id"')
		console.log('Report: ' + error)
		console.log('Estimated Cause: No room variants found for room: ' + chosen_room)
		console.log('Result: Skipping! No variants will be chosen')
		return chosen_room
	}
}
/**
* @param {String} sector_id
*/
function get_config_rooms(sector_id){
	//kind of a weird conversion from JsonArray to String[], might want to update that in the future
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
		console.log('Error In Function: "get_config_rooms"')
		console.log('Report: ' + error)
		console.log('Estimated Cause: Rooms JSON Array is missing or missing Sector ID: ' + sector_id)
		console.log('Result: Returning default room list')
		return ["zero1"]
	}
}
/**
* @param {String} room_group_id
*/
function get_random_room_from_grouping(room_group_id) {
	try {
		let room_list = get_room_group_rooms(room_group_id)
		if (room_list == null) {
			return "zero1"
		}
    	let room_num = Math.round((Math.random() * (room_list.size() -0.001))-0.5)
		let chosen_room = room_list.get(room_num).asString
		let final_chosen_room = get_converted_room_id(chosen_room)
		return final_chosen_room		
	} catch (error) {
		console.log('Error In Function: "get_random_room_from_grouping"')
		console.log('Report: ' + error)
		console.log('Estimated Cause: Malformed Config JSON')
		console.log('Result: Returning default room list')
		return "zero1"
	}
}
/**
* @param {String} room_group_id
*/
function get_room_group_rooms(room_group_id){
	try {
		let file_data = JsonIO.readJson(`kubejs/config/sectors/room_groups/${room_group_id}.json`)
		let room_list = file_data.getAsJsonArray("rooms")
		return room_list
	} catch (error) {
		console.log('Error In Function: "get_room_group_rooms"')
		console.log('Report: ' + error)
		console.log('Estimated Cause: Rooms JSON Array is missing or missing Room Group ID: ' + room_group_id)
		console.log('Result: Will return default room from grouping')
		return null
	}
}