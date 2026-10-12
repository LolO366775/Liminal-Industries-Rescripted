/**
* @param {Number} pos_x
* @param {Number} pos_z
* @param {String} dimension_id
*/
function get_sector_list(pos_x,pos_z,dimension_id){
	let sector_table = []
	try {
		let dimension_data = get_dimension_config_data(dimension_id).asJsonObject
		let sectors = dimension_data.get("sectors").asJsonArray
		let distance = get_distance_from_world_center(dimension_data,pos_x,pos_z)
		let size = sectors.size()
		for (let count = 0; count < size; count++) {
			let sector_key = sectors.get(count).asString
			try {			
				let sector = get_sector_data(sector_key,dimension_data)
				if (is_distance_in_config_sector(sector,distance)) {
					sector_table.push(sector_key)
				}
			} catch (error) {console.log("get_sector_list second try:" + error)}
		}
	} catch (error) {
		console.log("get_sector_list first try:" + error)
		sector_table.push("error_floor3")
	}
	if (sector_table.length == 0) {
		sector_table = ["error_floor4"]
	}
	return sector_table 
}
/**
* @param {String} dimension_id
*/
function get_dimension_config_data(dimension_id){
	let file_data = JsonIO.readJson("kubejs/config/sectors.json").asJsonObject
	let dimension_data = file_data.get(dimension_id).asJsonObject
	return dimension_data
}
/**
* @param {String} search_key
* @param {Internal.JsonObject} config_dimension_data
*/
function get_sector_data(search_key,config_dimension_data){
	let sector_key = config_dimension_data.get("key").asJsonObject
	let sector_data = sector_key.get(search_key).asJsonObject
	return sector_data
}
/**
* @param {Internal.JsonObject} sector_data
*/
function get_sector_distance_code(sector_data){
	let code = sector_data.get("code").asDouble
	return code
}
/**
* @param {Internal.JsonObject} config_dimension_data
* @param {Number} pos_x
* @param {Number} pos_z
*/
function get_distance_from_world_center(config_dimension_data,pos_x,pos_z){
	let world_center = config_dimension_data.get("world_center").asJsonObject
	let world_center_x = world_center.get("x").asInt
	let world_center_z = world_center.get("z").asInt
	let distance = Math.sqrt(((world_center_z - pos_z) ** 2) + ((world_center_x - pos_x) ** 2))
	return distance
}
/**
* @param {Internal.JsonObject} sector_data
* @param {Number} distance
*/
function is_distance_in_config_sector(sector_data,distance){
	try {
		let generation = sector_data.get("generation").asJsonArray
		for (let count = 0; count < generation.size(); count++) {
			let rule = generation.get(count).asJsonObject
			if (does_respect_sector_rules(rule,distance)) {
				return true
			}
		}
		return false
	} catch (error) {
		return false
	}
}
/**
* @param {Internal.JsonObject} rule
* @param {Number} distance
*/
function does_respect_sector_rules(rule,distance){
	try {
		let min = rule.get("min").asInt
		if (distance >= min) {
			try {
				let max = rule.get("max").asInt
				if (distance > max) {
					return false
				}
			} catch (error) {}
			return true
		} else {
			return false
		}
	} catch (error) {
		return false
	}
}