/**
* @param {Number} pos_x
* @param {Number} pos_z
* @param {String} dimension_id
*/
function get_sector_list(pos_x,pos_z,dimension_id){
	let sector_table = []
	try {
		let dimension_data = get_dimension_config_data(dimension_id).asJsonObject
		if (dimension_data == null) {
			sector_table = ["fallback"]
			return sector_table
		}
		let generation = dimension_data.get("generation").asJsonArray
		let distance = get_distance_from_world_center(dimension_data,pos_x,pos_z)
		let size = generation.size()
		for (let count = 0; count < size; count++) {
			try {
				let rule = get_generation_rule(generation,count)
				if (rule != null) {
					if (does_respect_sector_rules(rule,distance)) {
						let sector = get_rule_sector_id(rule)
						sector_table.push(sector)
					}
				}
			} catch (error) {
				console.log('Error In Function: "get_sector_list"')
				console.log('Report: ' + error)
				console.log('Dimension: ' + dimension_id)
				console.log('Estimated Cause: Malformed Config JSON for rule ' + count)
				console.log('Result: Skipping Rule!')
			}
		}
	} catch (error) {
		console.log('Error In Function: "get_sector_list"')
		console.log('Report: ' + error)
		console.log('Dimension: ' + dimension_id)
		console.log('Estimated Cause: Missing Generation or Malformed Config JSON')
		console.log('Result: Returning default sector list')
		sector_table = ["fallback"]
	}
	if (sector_table.length == 0) {
		console.log('Error In Function: "get_sector_list"')
		console.log('Report: Sector array is empty!')
		console.log('Dimension: ' + dimension_id)
		console.log('Estimated Cause: Sector gap in config. Currently nothing is set to spawn here!')
		console.log('Result: Returning default sector list')
		sector_table = ["fallback"]
	}
	return sector_table 
}
/**
* @param {String} dimension_id
*/
function get_dimension_config_data(dimension_id){
	try {
		let file_data = JsonIO.readJson("kubejs/config/sectors.json").asJsonObject
		let dimension_data = file_data.get(dimension_id).asJsonObject
		return dimension_data	
	} catch (error) {
		console.log('Error In Function: "get_dimension_config_data"')
		console.log('Report: ' + error)
		console.log('Dimension: ' + dimension_id)
		console.log('Estimated Cause: Dimension data does not exist within config!')
		console.log('Result: Skipping! Will default to fallback sector')
		return null
	}
}
/**
* @param {Internal.JsonArray} generation
* @param {Number} count
*/
function get_generation_rule(generation,count){
	try {
		let rule = generation.get(count).asJsonObject
		return rule
	} catch (error) {
		console.log('Error In Function: "get_generation_rule"')
		console.log('Report: ' + error)
		console.log('Estimated Cause: Malformed JSON at generation rule ' + count)
		console.log('Result: Skipping Rule!')
		return null
	}
}
/**
* @param {Internal.JsonObject} rule
*/
function get_rule_sector_id(rule){
	try {
		let sector_id = rule.get("sector").asString
		return sector_id
	} catch (error) {
		console.log('Error In Function: "get_rule_sector_id"')
		console.log('Report: ' + error)
		console.log('Estimated Cause: Malformed config JSON')
		console.log('Result: Returning fallback sector id')
		return "fallback"
	}
}
/**
* @param {Internal.JsonObject} config_dimension_data
* @param {Number} pos_x
* @param {Number} pos_z
*/
function get_distance_from_world_center(config_dimension_data,pos_x,pos_z){
	try {
		let world_center = config_dimension_data.get("world_center").asJsonObject
		let world_center_x = world_center.get("x").asInt
		let world_center_z = world_center.get("z").asInt
		let distance = Math.sqrt(((world_center_z - pos_z) ** 2) + ((world_center_x - pos_x) ** 2))
		return distance
	} catch (error) {
		console.log('Error In Function: "get_distance_from_world_center"')
		console.log('Report: ' + error)
		console.log('Estimated Cause: Missing or malformed world center data')
		console.log('Result: Assuming center to be X:0, Z:0')
		let world_center_x = 0
		let world_center_z = 0
		let distance = Math.sqrt(((world_center_z - pos_z) ** 2) + ((world_center_x - pos_x) ** 2))
		return distance
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
		console.log('Error In Function: "does_respect_sector_rules"')
		console.log('Report: ' + error)
		console.log('Estimated Cause: Missing Rule Distance Minimum!')
		console.log('Result: Assuming sector rule to be false')
		return false
	}
}