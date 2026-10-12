ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event

	event.register(
        Commands.literal("room_forge")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("room")
		.then(Commands.literal("clone")
		.then(Commands.literal("side")
		.then(Commands.literal("left")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				clone_room(ctx,"left",69,-115)
				return 1
            })
        ).then(Commands.literal("right")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				clone_room(ctx,"right",69,69)
				return 1
            })
        ).then(Commands.literal("back")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				clone_room(ctx,"back",161,-23)
				return 1
            })
        )
    ))))
})
/**
* @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx
* @param {String} side
* @param {Number} corner_x
* @param {Number} corner_z
*/
function clone_room(ctx,side,corner_x,corner_z){
	let player = ctx.source.getPlayer()
	let server = ctx.source.getServer()
	player.persistentData.merge({"room_forge":{"last_action":"cloning","side":side}})
	server.runCommandSilent(`execute in backrooms:room_forge run clone 69 1 -23 115 11 23 ${corner_x} 1 ${corner_z}`)
	server.runCommandSilent(`execute in backrooms:room_forge run clone 69 12 -23 115 23 23 ${corner_x} 12 ${corner_z}`)
	server.runCommandSilent(`execute in backrooms:room_forge run clone 69 24 -23 115 35 23 ${corner_x} 24 ${corner_z}`)
	server.runCommandSilent(`execute in backrooms:room_forge run clone 69 24 -23 115 35 23 ${corner_x} 24 ${corner_z}`)
	server.runCommandSilent(`execute in backrooms:room_forge run clone 69 36 -23 115 47 23 ${corner_x} 36 ${corner_z}`)
	if (side != "custom") {
		player.tell(`§aSuccessfully cloned room to the ${side}!`)
	} else {
		player.tell(`§aSuccessfully cloned room to ${corner_x}, ${corner_z}!`)
	}
	
}