/**
* @param {String} room_group_id
*/
function get_random_room_variant(room_group_id) {
	try {
		let file_data = JsonIO.readJson(`kubejs/config/sectors/room_variants/${room_group_id}.json`).getAsJsonObject()
		let base_room = file_data.get("base").asString
		let room_list = file_data.get("variants").asJsonArray
		room_list["add(java.lang.String)"](base_room)
		let list_size = room_list.size()
		let room_num = Math.round((Math.random() * (list_size -0.001))-0.5)
		let chosen_room = room_list.get(room_num).asString
		return chosen_room
	} catch (error) {
    	return "error_floor7"
	}
}