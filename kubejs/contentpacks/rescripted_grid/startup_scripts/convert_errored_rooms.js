//Step 3: Calculate sector of new node and generate it
/**
* @param {String} room
*/
function convert_errored_rooms(room){
	if (room == "error_floor1") {
		return "error_fallback"
	}
	if (room == "error_floor2") {
		return "error_fallback"
	}
	if (room == "error_floor3") {
		return "error_fallback"
	}
	if (room == "error_floor4") {
		return "error_fallback"
	}
	if (room == "error_floor5") {
		return "error_fallback"
	}
	if (room == "error_floor6") {
		return "error_fallback"
	}
	if (room == "error_floor7") {
		return "error_fallback"
	}
	return room
}