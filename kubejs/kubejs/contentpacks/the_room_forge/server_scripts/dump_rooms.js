ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event

	event.register(
        Commands.literal("room_forge")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("dump")
		.then(Commands.argument('sector', Arguments.STRING.create(event))
		.then(Commands.argument('filter', Arguments.STRING.create(event))
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				/** @type {String} */
				let sector_id = Arguments.STRING.getResult(ctx, "sector")
				/** @type {String} */
				let filter = Arguments.STRING.getResult(ctx, "filter")
				let player = ctx.source.getPlayer()
				let overall_count = 0
				let file_data = JsonIO.read(`kubejs/config/sectors/${sector_id}.json`)
				if (file_data == null) {
					player.tell(Text.of(`No sector with that id was found!`).red())
					return 0
				} else {
					overall_count = dump_sector_with_filter(sector_id,filter,player)
				}
				if (overall_count == 0) {
					player.tell(Text.of(`No rooms with that filter was found!`).red())
					return 0
				}
				return 1
            })
        ))
    ))
	event.register(
        Commands.literal("room_forge")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("dump")
		.then(Commands.argument('sector', Arguments.STRING.create(event))
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				/** @type {String} */
				let sector_id = Arguments.STRING.getResult(ctx, "sector")
				let player = ctx.source.getPlayer()
				let overall_count = 0
				let file_data = JsonIO.read(`kubejs/config/sectors/${sector_id}.json`)
				if (file_data == null) {
					player.tell(Text.of(`No sector with that id was found!`).red())
					return 0
				} else {
					overall_count = dump_sector(sector_id,player)
				}
				if (overall_count == 0) {
					player.tell(Text.of(`No rooms with that filter was found!`).red())
					return 0
				}
				return 1
            })
        )
    ))
	event.register(
        Commands.literal("room_forge")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("dump")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				let player = ctx.source.getPlayer()
				let sector0_count = dump_sector("sector0",player)
				let sector1_count = dump_sector("sector1",player)
				let sector2_count = dump_sector("sector2",player)
				let sector3_count = dump_sector("sector3",player)
				let sector4_count = dump_sector("sector4",player)
				let sector5_count = dump_sector("sector5",player)
				let sector6_count = dump_sector("sector6",player)
				let sector7_count = dump_sector("sector7",player)
				let overall_count = sector0_count + sector1_count + sector2_count + sector3_count + sector4_count + sector5_count + sector6_count + sector7_count
				if (overall_count = 0) {
					player.tell(`§cNo rooms were found!`)
					return 0
				}
				return 1
            })
        )
    )
	event.register(
        Commands.literal("room_forge")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("dump")
		.then(Commands.argument('filter', Arguments.STRING.create(event))
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				/** @type {String} */
				let filter = Arguments.STRING.getResult(ctx, "filter")
				let player = ctx.source.getPlayer()
				let overall_count = 0	
				let sector0_count = dump_sector_with_filter("sector0",filter,player)
				let sector1_count = dump_sector_with_filter("sector1",filter,player)
				let sector2_count = dump_sector_with_filter("sector2",filter,player)
				let sector3_count = dump_sector_with_filter("sector3",filter,player)
				let sector4_count = dump_sector_with_filter("sector4",filter,player)
				let sector5_count = dump_sector_with_filter("sector5",filter,player)
				let sector6_count = dump_sector_with_filter("sector6",filter,player)
				let sector7_count = dump_sector_with_filter("sector7",filter,player)
				overall_count = sector0_count + sector1_count + sector2_count + sector3_count + sector4_count + sector5_count + sector6_count + sector7_count
				if (overall_count == 0) {
					player.tell(`§cNo rooms with that filter were found!`)
					return 0
				}
				return 1
            })
        )
    ))
})
/**
* @param {String} sector_id
* @param {String} filter
* @param {Internal.ServerPlayer} player
*/
function dump_sector_with_filter(sector_id,filter,player){
	try {
		let file_data = JsonIO.readJson(`kubejs/config/sectors/${sector_id}.json`).getAsJsonObject()
		let room_list = file_data.get("rooms").asJsonArray
		let count = 0
		for (let index = 0; index < room_list.size(); index++) {
			let room_id = room_list.get(index).asString
			if (room_id.includes(filter)) {
				player.tell(`${room_id}`)
				count++
			}
		}
		return count
	} catch (error) {
		player.tell(Text.of(`File exception with kubejs/config/sectors/${sector_id}.json`).darkRed())
		player.tell(Text.of(error).red())
	}
	return 1
}
/**
* @param {String} sector_id
* @param {Internal.ServerPlayer} player
*/
function dump_sector(sector_id,player){
	try {
		let room_list = get_sector_room_list(sector_id)
		if (room_list != null) {
			let count = dump_sector_common(room_list,player)
			return count
		}
	} catch (error) {
		player.tell(Text.of(`File exception with kubejs/config/sectors/${sector_id}.json`).darkRed())
		player.tell(Text.of(error).red())
	}
	return 0
}
/**
* @param {Internal.JsonArray} room_list
* @param {Internal.ServerPlayer} player
*/
function dump_sector_common(room_list,player){
	let count = 0
	for (let index = 0; index < room_list.size(); index++) {
		let room_id = room_list.get(index).asString
		if (room_id.startsWith("#")) {
			let reference_rooms = get_sector_room_list(room_id)
			if (reference_rooms != null) {
				for (let index = 0; index < reference_rooms.size(); index++) {
					let referenced_room_id = reference_rooms.get(index).asString
					player.tell(`${referenced_room_id}`)
				}
			}
		} else {
			player.tell(`${room_id}`)
		}
		count++
	}
	return count
}
/**
* @param {String} sector_id
*/
function get_sector_room_list(sector_id){
	let file = JsonIO.readJson(`kubejs/config/sectors/${sector_id}.json`)
	if (file == null) {
		return null
	}
	let file_data = file.getAsJsonObject()
	let room_list = file_data.get("rooms").asJsonArray
	return room_list
}
/**
* @param {Internal.ServerPlayer} player
*/
function dump_common_rooms(player){
	try {
		let file_data = JsonIO.read(`kubejs/config/sectors/common_rooms.json`)
		/** @type {String[]} */
		let room_list = file_data.get("rooms")
		for (let index = 0; index < room_list.length; index++) {
			let room_id = room_list[index]
			player.tell(`${room_id}`)
		}
	} catch (error) {
		player.tell(Text.of(`File exception with kubejs/config/sectors/${sector_id}.json`).darkRed())
		player.tell(Text.of(error).red())
	}
}
/**
* @param {Internal.ServerPlayer} player
*/
function dump_community_rooms(player){
	try {
		let file_data = JsonIO.read(`kubejs/config/sectors/community_rooms.json`)
		/** @type {String[]} */
		let room_list = file_data.get("rooms")
		for (let index = 0; index < room_list.length; index++) {
			let room_id = room_list[index]
			player.tell(`${room_id}`)
		}
	} catch (error) {
		player.tell(`§cFile exception with kubejs/config/sectors/community_rooms.json`)
	}
}