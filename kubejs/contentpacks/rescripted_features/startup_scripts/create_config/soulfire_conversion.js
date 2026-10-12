/**
* @param {String} input_id
* @param {String} output_id
* @param {Boolean} creates_soulfire
*/
function add_soulfire_conversion_interaction_to_config(input_id,output_id,creates_soulfire){
	try {
		let config_data = JsonIO.readJson("kubejs/config/interactions").asJsonObject
		config_data.add(input_id,{"result":output_id,"soulfire":creates_soulfire})
	} catch (error) {}
}