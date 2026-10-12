let $StructurePlaceSettings = Java.loadClass('net.minecraft.world.level.levelgen.structure.templatesystem.StructurePlaceSettings')

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event

	event.register(
        Commands.literal("room_forge")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("procedure")
		.then(Commands.literal("next")
		    .executes(ctx => {
				procedure_next(ctx)
				return 1
            })
        ).then(Commands.literal("pack")
		.requires(source => source.hasPermission(2))
		    .then(Commands.argument('include_entities', Arguments.BOOLEAN.create(event))
			.requires(source => source.hasPermission(2))
		    	.executes(ctx => {
					let include_entities = Arguments.BOOLEAN.getResult(ctx, "include_entities")
					let room = procedure_get_room()
					forge_pack_room(ctx,room,include_entities,true)
					return 1
            	})
        	).executes(ctx => {
				let room = procedure_get_room()
				forge_pack_room(ctx,room,false,true)
				return 1
            })
        ).then(Commands.literal("start")
		    .executes(ctx => {
				procedure_start(ctx)
				return 1
            })
        )
    ))
})
/**
* @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx
*/
function procedure_next(ctx){
	let player = ctx.source.getPlayer()
	let file_data = procedure_get_file_data()
	let path = procedure_get_file_path()
	let step = file_data.get("step").asDouble
	step++
	let rooms = room_forge_get_procedure_rooms(file_data)
	player.tell(`§7Step: ${step} out of: ${rooms.size()}`)
	if (step > rooms.size()) {
		player.tell(`§aEnd of procedure!`)
		file_data.addProperty("step",0)
	} else {
		let room_id = rooms.get(step).asString
		let level = ctx.source.server.getLevel("backrooms:room_forge")
		//player.persistentData.merge({"room_forge":{"last_action":"cloning","side":side}})
		player.tell(`§eSwitched room to ${room_id}!`)
		file_data.addProperty("step",step)
		if (can_room_forge_procedure_place_slices(room_id,player)) {
			room_forge_procedure_place_room(room_id,player)
			level.getBlock(63,21,-14).set("minecraft:air")
			level.getBlock(63,22,-14).set("minecraft:air")
			level.getBlock(63,23,-14).set("minecraft:air")
			level.getBlock(63,24,-14).set("minecraft:air")
			level.getBlock(63,21,-9).set("minecraft:air")
			//run_all_room_forge_procedures(file_data,server)
		} else {
			player.tell(`§cNo room "${room_id}" with valid slices found!`)
		}
	}
	JsonIO.write(path,file_data)
}
function procedure_get_file_path(){
	let path = "kubejs/config/room_forge/procedure.json"
	return path
}
function procedure_get_file_data(){
	let path = procedure_get_file_path()
	let file_data = JsonIO.readJson(path).asJsonObject
	return file_data
}
function procedure_get_room(){
	let file_data = procedure_get_file_data()
	let step = file_data.get("step").asDouble
	let rooms = room_forge_get_procedure_rooms(file_data)
	let room_id = rooms.get(step).asString
	return room_id
}
/**
* @param {String} room_id
* @param {Internal.Player} player
*/
function room_forge_procedure_place_room(room_id,player){
	let [pos_x,pos_z] = [69,-23]
	let server = player.getServer()
	let level = server.getLevel("backrooms:room_forge")
	let slice1_pos = level.getBlock(pos_x,0,pos_z).getPos()
	let slice2_pos = level.getBlock(pos_x,12,pos_z).getPos()
	let slice3_pos = level.getBlock(pos_x,24,pos_z).getPos()
	let slice4_pos = level.getBlock(pos_x,36,pos_z).getPos()
	room_forge_procedure_place_slice(1,"room_forge_empty_room",slice1_pos,player)
	room_forge_procedure_place_slice(2,"room_forge_empty_room",slice2_pos,player)
	room_forge_procedure_place_slice(3,"room_forge_empty_room",slice3_pos,player)
	room_forge_procedure_place_slice(4,"room_forge_empty_room",slice4_pos,player)
	room_forge_procedure_place_slice(1,room_id,slice1_pos,player)
	room_forge_procedure_place_slice(2,room_id,slice2_pos,player)
	room_forge_procedure_place_slice(3,room_id,slice3_pos,player)
	room_forge_procedure_place_slice(4,room_id,slice4_pos,player)
}
/**
* @param {Number} slice
* @param {String} room_id
* @param {BlockPos_} block_pos
* @param {Internal.Player} player
*/
function room_forge_procedure_place_slice(slice,room_id,block_pos,player){
	let server = player.getServer()
	let level = server.getLevel("backrooms:room_forge")
	try {
		let manager = server.getStructureManager()
		let room_schematic = manager.get(`backrooms:slice${slice}/${room_id}`)
		let default_empty = room_schematic.isEmpty()
		if (!default_empty) {
			room_schematic.ifPresent(e => {
       	 		e.placeInWorld(level, block_pos, block_pos, new $StructurePlaceSettings(), level.getRandom(), 3)
    		})
		}
		//needs to tell the player if it doesnt find a room schematic
	} catch (error) {
		player.tell(`Error placing slice: "backrooms:slice${slice}/${room_id}": ${error}`)
	}
}
/**
* @param {String} room_id
* @param {Internal.Player} player
*/
function can_room_forge_procedure_place_slices(room_id,player){
	let server = player.getServer()
	let manager = server.getStructureManager()
	if (manager.get(`backrooms:slice1/${room_id}`).isEmpty()) {return false}
	if (manager.get(`backrooms:slice2/${room_id}`).isEmpty()) {return false}
	if (manager.get(`backrooms:slice3/${room_id}`).isEmpty()) {return false}
	if (manager.get(`backrooms:slice4/${room_id}`).isEmpty()) {return false}
	return true
}
/**
* @param {Internal.JsonObject} file_data
*/
function room_forge_get_procedure_rooms(file_data){
	let rooms = file_data.get("rooms").asJsonArray
	let return_rooms = rooms.deepCopy()
	for (let index = 0; index < rooms.size(); index++) {
		let room_check = rooms.get(index).asString
		if (room_check.startsWith("#")) {
			try {
				let room_group_id = room_check.substring(1)
				let room_group_data = JsonIO.readJson(`kubejs/config/room_forge/room_groups/${room_group_id}.json`).asJsonObject
				let new_rooms = room_group_data.get("rooms").asJsonArray
				return_rooms.remove(index)
				return_rooms.addAll(new_rooms)
			} catch (error) {}
		}
	}
	return return_rooms
}




/**
* @param {Internal.JsonObject} file_data
* @param {Internal.MinecraftServer} server
*/
function run_all_room_forge_procedures(file_data,server){
	console.log("run_all_room_forge_procedures")
	try {
		let procedures = file_data.get("procedures").asJsonArray
		console.log("has procedures")
		for (let index = 0; index < procedures.size(); index++) {
			let procedure = procedures.get(index).asJsonObject
			console.log("has procedure")
			run_room_forge_procedure(procedure,server)
		}
	} catch (error) {console.log(error)}
}


/**
* @param {Internal.JsonObject} procedure
* @param {Internal.MinecraftServer} server
*/
function run_room_forge_procedure(procedure,server){
	let type = procedure.get("type").asString
	if (type == "command") {
		let command = procedure.get("command").asString
		server.runCommandSilent(command)
	} else if (type == "command_each_slice") {
		let command = procedure.get("command").asString
		run_room_forge_command_each_slice(command)
	} else if (type == "module") {
		let name = procedure.get("name").asString
		if (name == "replace_furniture_with_node") {
			console.log("replace_furniture_with_node")
			run_replace_furniture_with_node_procedure(server)
		}
	}
}
/**
* @param {Internal.MinecraftServer} server
*/
function run_replace_furniture_with_node_procedure(server){
	let loot_table = "minecraft:chests/simple_dungeon"
	let replace_one_direction = (block_id,direction) => {
		run_room_forge_command_each_slice(server,`fill ~ ~ ~ ~46 ~11 ~46 ${block_id}[facing=${direction}]{"LootTable":${loot_table}} replace ${block_id}[facing=${direction}]`)
	}
	let replace_sides = (block_id) => {
		replace_one_direction(block_id,"north")
		replace_one_direction(block_id,"south")
		replace_one_direction(block_id,"east")
		replace_one_direction(block_id,"west")
	}
	replace_sides("refurbished_furniture:oak_drawer")
	replace_sides("refurbished_furniture:spruce_drawer")
	replace_sides("refurbished_furniture:birch_drawer")
	replace_sides("refurbished_furniture:jungle_drawer")
	replace_sides("refurbished_furniture:dark_oak_drawer")
	replace_sides("refurbished_furniture:mangrove_drawer")
	replace_sides("refurbished_furniture:cherry_drawer")
	replace_sides("refurbished_furniture:crimson_drawer")
	replace_sides("refurbished_furniture:warped_drawer")
}
/**
* @param {Internal.MinecraftServer} server
* @param {String} command
*/
function run_room_forge_command_each_slice(server,command){
	console.log(command)
	server.runCommandSilent(`execute in backrooms:room_forge positioned 69 12 -23 run ${command}`)
	server.runCommandSilent(`execute in backrooms:room_forge positioned 69 24 -23 run ${command}`)
	server.runCommandSilent(`execute in backrooms:room_forge positioned 69 36 -23 run ${command}`)
	server.runCommandSilent(`execute in backrooms:room_forge positioned 69 48 -23 run ${command}`)
}


/*ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event

	event.register(
        Commands.literal("room_forge")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("procedure")
		.then(Commands.literal("test_save")
		    .executes(ctx => {
				room_forge_procedure_test_save(ctx.source.getPlayer())
				return 1
            })
        )
    ))
})*/
/**
* @param {Internal.Player} player
*/
function room_forge_procedure_test_save(player){
	let server = player.getServer()
	let level = server.getLevel("backrooms:room_forge")
	try {
		let manager = server.getStructureManager()
		let room_schematic = manager.getOrCreate(`backrooms:test`)
		let size = room_schematic.getSize()
		size.setX(47)
		size.setY(12)
		size.setZ(47)
		room_schematic.setSize(size)
		let block_pos = level.getBlock(69,0,-23).getPos()
		player.tell(size)
		player.tell(room_schematic)
		room_schematic.save("backrooms:test")
	} catch (error) {
		player.tell("error:" + error)
	}
}