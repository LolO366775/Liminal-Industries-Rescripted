ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	const command_arguments = {
		/** @param {String} name*/
		"literal_argument" : name => {
			return Commands.literal(name).requires(source => source.hasPermission(Commands.LEVEL_GAMEMASTERS))
		},
		/** @param {String} name*/
		"integer_argument" : name => {
			return Commands.argument(name, Arguments.INTEGER.create(event)).requires(source => source.hasPermission(Commands.LEVEL_GAMEMASTERS))
		}
	}
	const command_executors = {
		/** @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx @param {String} side*/
		"clone" : (ctx,side) => {
			if (side == "left") {
				let pos_x = 69
				let pos_z = -115
				room_forge_clone_room(ctx,pos_x,pos_z)
			} else if (side == "right") {
				let pos_x = 69
				let pos_z = 69
				room_forge_clone_room(ctx,pos_x,pos_z)
			} else {
				let pos_x = 161
				let pos_z = -23
				room_forge_clone_room(ctx,pos_x,pos_z)
			}
			return 1
   		},
		/** @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx @param {String} side*/
		"clone_w_offset" : (ctx,side) => {
			const offset = Arguments.INTEGER.getResult(ctx, "offset1")
			if (0 > offset) {
				ctx.source.player.tell(`§cYou may not use a negative offset!`) //lets do zero instead. so 1 would be the default
				return 0
			}
			let room_offset = 92 * offset
			if (side == "left") {
				let pos_x = 69
				let pos_z = -115 - room_offset
				room_forge_clone_room(ctx,"left",pos_x,pos_z)
			} else if (side == "right") {
				let pos_x = 69
				let pos_z = 69 + room_offset
				room_forge_clone_room(ctx,"right",pos_x,pos_z)
			} else {
				let pos_x = 161 + room_offset
				let pos_z = -23
				room_forge_clone_room(ctx,"back",pos_x,pos_z)
			}
			return 1
   		},
		/** @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx @param {String} side1 @param {String} side2*/
		"clone_double" : (ctx,side1,side2) => {
			if (side1 == "left") {
				let pos_x = 69
				let pos_z = -115
				room_forge_clone_room_double_step(ctx,side1,side2,pos_x,pos_z)
			} else if (side1 == "right") {
				let pos_x = 69
				let pos_z = 69
				room_forge_clone_room_double_step(ctx,side1,side2,pos_x,pos_z)
			} else {
				let pos_x = 161
				let pos_z = -23
				room_forge_clone_room_double_step(ctx,side1,side2,pos_x,pos_z)
			}
			return 1
   		},
		/** @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx @param {String} side1 @param {String} side2*/
		"clone_double_w_offset" : (ctx,side1,side2) => {
			const offset = Arguments.INTEGER.getResult(ctx, "offset")
			if (0 > offset) {
				ctx.source.player.tell(`§cYou may not use a negative offset!`) //lets do zero instead. so 1 would be the default
				return 0
			}
			let room_offset = 92 * offset
			if (side1 == "left") {
				let pos_x = 69
				let pos_z = -115 - room_offset
				room_forge_clone_room_double_step(ctx,side1,side2,pos_x,pos_z)
			} else if (side1 == "right") {
				let pos_x = 69
				let pos_z = 69 + room_offset
				room_forge_clone_room_double_step(ctx,side1,side2,pos_x,pos_z)
			} else {
				let pos_x = 161 + room_offset
				let pos_z = -23
				room_forge_clone_room_double_step(ctx,side1,side2,pos_x,pos_z)
			}
			return 1
   		}
	}

	let clone_left = command_arguments.literal_argument("room_forge")
		.then(command_arguments.literal_argument("room")
		.then(command_arguments.literal_argument("clone")
		.then(command_arguments.literal_argument("side")
		.then(command_arguments.literal_argument("left").executes(ctx => command_executors.clone(ctx,"left"))
		.then(command_arguments.integer_argument("offset1").executes(ctx => command_executors.clone_w_offset(ctx,"left"))
		.then(command_arguments.literal_argument("back").executes(ctx => command_executors.clone_double(ctx,"left","back"))
		.then(command_arguments.integer_argument("offset2").executes(ctx => command_executors.clone_double_w_offset(ctx,"left","back"))
	)))))))
	let clone_right = command_arguments.literal_argument("room_forge")
		.then(command_arguments.literal_argument("room")
		.then(command_arguments.literal_argument("clone")
		.then(command_arguments.literal_argument("side")
		.then(command_arguments.literal_argument("right").executes(ctx => command_executors.clone(ctx,"right"))
		.then(command_arguments.integer_argument("offset1").executes(ctx => command_executors.clone_w_offset(ctx,"right"))
		.then(command_arguments.literal_argument("back").executes(ctx => command_executors.clone_double(ctx,"right","back"))
		.then(command_arguments.integer_argument("offset2").executes(ctx => command_executors.clone_double_w_offset(ctx,"right","back"))
	)))))))
	let clone_back_left = command_arguments.literal_argument("room_forge")
		.then(command_arguments.literal_argument("room")
		.then(command_arguments.literal_argument("clone")
		.then(command_arguments.literal_argument("side")
		.then(command_arguments.literal_argument("back").executes(ctx => command_executors.clone(ctx,"back"))
		.then(command_arguments.integer_argument("offset1").executes(ctx => command_executors.clone_w_offset(ctx,"back"))
		.then(command_arguments.literal_argument("left").executes(ctx => command_executors.clone_double(ctx,"back","left"))
		.then(command_arguments.integer_argument("offset2").executes(ctx => command_executors.clone_double_w_offset(ctx,"back","left"))
	)))))))
	let clone_back_right = command_arguments.literal_argument("room_forge")
		.then(command_arguments.literal_argument("room")
		.then(command_arguments.literal_argument("clone")
		.then(command_arguments.literal_argument("side")
		.then(command_arguments.literal_argument("back").executes(ctx => command_executors.clone(ctx,"back"))
		.then(command_arguments.integer_argument("offset1").executes(ctx => command_executors.clone_w_offset(ctx,"back"))
		.then(command_arguments.literal_argument("right").executes(ctx => command_executors.clone_double(ctx,"back","right"))
		.then(command_arguments.integer_argument("offset2").executes(ctx => command_executors.clone_double_w_offset(ctx,"back","right"))
	)))))))
	event.register(clone_left)
	event.register(clone_right)
	event.register(clone_back_left)
	event.register(clone_back_right)
})

/**
* @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx
* @param {String} side
* @param {Number} corner_x
* @param {Number} corner_z
*/
function room_forge_clone_room(ctx,side,corner_x,corner_z){
	let player = ctx.source.getPlayer()
	let server = ctx.source.getServer()
	player.persistentData.merge({"room_forge":{"last_action":"cloning","side":side}})
	//server.runCommandSilent(`execute in backrooms:room_forge run clone 69 1 -23 115 11 23 ${corner_x} 1 ${corner_z}`)
	//server.runCommandSilent(`execute in backrooms:room_forge run clone 69 12 -23 115 23 23 ${corner_x} 12 ${corner_z}`)
	//server.runCommandSilent(`execute in backrooms:room_forge run clone 69 24 -23 115 35 23 ${corner_x} 24 ${corner_z}`)
	//server.runCommandSilent(`execute in backrooms:room_forge run clone 69 24 -23 115 35 23 ${corner_x} 24 ${corner_z}`)
	//server.runCommandSilent(`execute in backrooms:room_forge run clone 69 36 -23 115 47 23 ${corner_x} 36 ${corner_z}`)
	player.tell(`§aSuccessfully cloned room to the ${side} at ${corner_x} ${corner_z}!`)
}
/**
* @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx
* @param {String} side1
* @param {String} side2
* @param {Number} corner_x
* @param {Number} corner_z
* @param {Number} offset2
*/
function room_forge_clone_room_double_step(ctx,side1,side2,corner_x,corner_z,offset2){
	if (0 > offset2) {
		ctx.source.player.tell(`§cYou may not use a negative offset!`) //lets do zero instead. so 1 would be the default
		return false
	}
	let room_offset = 92 * (offset2 + 1)
	let side = side1 + "/" + side2
	if (side2 == "left") {
		let pos_x = corner_x
		let pos_z = corner_z - room_offset
		room_forge_clone_room(ctx,"left",pos_x,pos_z)
	} else if (side == "right") {
		let pos_x = corner_x
		let pos_z = corner_z + room_offset
		room_forge_clone_room(ctx,"right",pos_x,pos_z)
	} else {
		let pos_x = corner_x + room_offset
		let pos_z = corner_z
		room_forge_clone_room(ctx,"back",pos_x,pos_z)
	}
	return true
}