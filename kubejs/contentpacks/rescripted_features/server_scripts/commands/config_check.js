ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("config")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("check_fart")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
                let dimension_id = ctx.source.level.getDimension().toString()
                try {
                    proofread_sector_file(dimension_id)
                    ctx.source.player.tell(`§eSuccessfully loaded configs!`)
                } catch (error) {
                    ctx.source.player.tell(`§c${error}`)
                }
				return 1
            })
        ))
    )
})





/**
* @param {String} dimension_id
*/
function proofread_sector_file(dimension_id){
    let file_result = proofread_file_path("config/rescripted/generation/sectors.json")
    if (file_result.result == "false") {
        return {"result":"false","custom_error":file_result.custom_error}
    }
    let file_data = file_result.value
    let dimension_data = proofread_json_object_from_json_object(file_data)
    if (file_result.result == "false") {
        return {"result":"false","custom_error":file_result.custom_error}
    }


    



	/*let dimension_data = file_data.get(dimension_id).asJsonObject
    if (dimension_data == "null") {
        return {"result":"false","custom_error":`§cRequired JsonObject missing for dimension id: "${dimension_id}" `}
    }
    dimension_data.asJsonObject
    let world_center = dimension_data.get("world_center")
    if (world_center == "null") {
        return {"result":"false","custom_error":`§cRequired JsonObject missing for dimension ${dimension_id}: "world_center"`}
    }
    world_center = world_center
    world_center.get("x").asInt
    if (world_center == "null") {
        return {"result":"false","custom_error":`§cRequired JsonObject missing for dimension ${dimension_id}: "world_center"`}
    }
    world_center.get("z").asInt*/
}




/**
* @param {String} file_path
*/
function proofread_file_path(file_path){
    let file_data = JsonIO.readJson(file_path)
    if (file_data == null) {
        return {"result":"false","value":file_data,"custom_error":`§cFile at path ${file_path} was not found!`}
    }
    return {"result":"true","value":file_data,"custom_error":"none"}
}



/**
* @param {Internal.JsonObject} data
* @param {String} property
* @param {String} custom_error
*/
function proofread_json_object_from_json_object(data,property,custom_error){
    let property_data = data.get(property)
    if (property_data == "null") {
        return {"result":"false","value":property_data,"custom_error":custom_error}
    }
    let new_data = property_data.asJsonObject
    return {"result":"true","value":new_data,"custom_error":"none"}
}