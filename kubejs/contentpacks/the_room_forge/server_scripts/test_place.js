
/*ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("test_place_block")
		.requires(source => source.hasPermission(2))
		.then(Commands.argument('node_pos', Arguments.BLOCK_POS.create(event))
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	/*const position = Arguments.VEC3.getResult(ctx, "node_pos")
				let level = ctx.source.getLevel()
				let server = ctx.source.getServer()
				let [pos_x,pos_y,pos_z] = [position.x(),position.y(),position.z()]
				let block = level.getBlock(pos_x,pos_y,pos_z)
				server.runCommandSilent(`say start!`)
				let file_data = JsonIO.read("kubejs/config/test_schematic.json")
				/** @type {any[]} */
				/*let blocks = file_data.get("blocks")
				let row_block = block
				let index3 = 0
				for (let index = 0; index < 47; index++) {
					let add_block = row_block
					//for (let index2 = 0; index2 < 47; index2++) {
						let block_data = blocks[index3]
						/** @type {String} */
						/*let id = block_data.id
						/** @type {Internal.Map<string, string>} */
						/*let properties = block_data.properties
						server.runCommandSilent(`say ${id} ${properties}`)
						add_block.set(id)
						//add_block.mergeEntityData
						add_block = add_block.getEast()
						index3++
					//}
					row_block = row_block.getSouth()
				}
				return 1
            })
        )
    ))
})*/
const $LevelResource = Java.loadClass("net.minecraft.world.level.storage.LevelResource")

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("test_place_block")
		.requires(source => source.hasPermission(2))
        .executes(ctx => {
			let server = ctx.source.getServer()
			server.runCommandSilent(`say start!`)
			let world_path = server.getWorldPath($LevelResource.ROOT).getParent()
			server.runCommandSilent(`say after world_path!`)
			server.runCommandSilent(`say ${world_path}`)
			let file_system = world_path.getFileSystem()
			let directory = `${world_path}/data/fart.json`
			server.runCommandSilent(`say ${directory}`)
			let gen_config = file_system.getPath(directory)
			server.runCommandSilent(`say ${gen_config}`)
			let config_file = gen_config.toFile()
			if (config_file.exists()) {
				JsonIO.write(gen_config, {"settings": "creeper", "weirdblock": "minecraft:end_gateway"})
			} else {
				config_file.createNewFile()
			}
			//let file_data = JsonIO.read(gen_config)
			server.runCommandSilent(`say after file_data!`)
			return 1
        })
    ))
})


ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("config_parse")
		.requires(source => source.hasPermission(2))
        .executes(ctx => {
			let dimension_id = ctx.source.level.getDimension().toString()
			let player = ctx.source.player
			proofread_dimension_file(dimension_id,player)
			return 1
        })
    ))
})




/**
* @param {String} dimension_id
* @param {Internal.ServerPlayer} player
*/
function proofread_dimension_file(dimension_id,player){
	try {
		let test_result = proofread_dimension_file_path("config/rescripted/generation/dimensions.json")
		let world_data = test_result.value.asJsonObject
		proofread_dimension_world_center(world_data,dimension_id,player)
	} catch (error) {
		return {"result":"false","custom_error":"§cUnusual Error: " + error}
	}
}
/**
* @param {String} file_path
*/
function proofread_dimension_file_path(file_path){
    let file_data = JsonIO.readJson(file_path)
    if (file_data == null) {
        return {"result":"false","value":file_data,"custom_error":`§cFile at path ${file_path} was not found!`}
    }
    return {"result":"true","value":file_data,"custom_error":"none"}
}


/**
* @param {Internal.JsonObject} config_data
* @param {String} dimension_id
* @param {Internal.ServerPlayer} player
*/
function proofread_dimension_world_center(config_data,dimension_id,player){
	try {
		let dimension_data = config_data.get(dimension_id).asJsonObject
		try {
			let world_center = dimension_data.get("world_center").asJsonObject
			try {
				world_center.get("x").asInt
				try {
					world_center.get("z").asInt
				} catch (error) {
					player.tell(`§4Error parsing file config/rescripted/generation/dimensions.json`)
					player.tell(`§cError with Number property for dimension ${dimension_id}.world_center.z: ${error}`)
					return false
				}	
			} catch (error) {
				player.tell(`§4Error parsing file config/rescripted/generation/dimensions.json`)
				player.tell(`§cError with Number property for dimension ${dimension_id}.world_center.x: ${error}`)
				return false
			}	
		} catch (error) {
			player.tell(`§4Error parsing file config/rescripted/generation/dimensions.json`)
			player.tell(`§cError with JsonObject property for dimension ${dimension_id}.world_center: ${error}`)
			return false
		}
	} catch (error) {
		player.tell(`§4Error parsing file config/rescripted/generation/dimensions.json`)
		player.tell(`§cError with JsonObject property ${dimension_id}: ${error}`)
		return false
	}
	return true
}



ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("config_parse2")
		.requires(source => source.hasPermission(2))
        .executes(ctx => {
			let dimension_id = ctx.source.level.getDimension().toString()
			let player = ctx.source.player
			proofread_dimension_file2(dimension_id,player)
			return 1
        })
    ))
})





/**
* @param {String} dimension_id
* @param {Internal.ServerPlayer} player
*/
function proofread_dimension_file2(dimension_id,player){
	/** @type {Internal.JsonObject} */
	let file_data
	let result_error = "none"
	try {
		file_data = JsonIO.readJson("config/rescripted/generation/dimensions.json").asJsonObject
	} catch (error) {
		new_error = `§cFile at path ${file_path} was not found!` + error
	}
}