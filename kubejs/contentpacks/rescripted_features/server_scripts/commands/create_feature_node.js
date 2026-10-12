/**
* @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx
* @param {Internal.Vector3d} position
* @param {String} feature_type
* @param {String} sub_type_name
* @param {String} sub_type
*/
function create_feature_node_command(ctx,position,feature_type,sub_type_name,sub_type){
	const [pos_x, pos_y, pos_z] = [position.x(), position.y(), position.z()]
	const level = ctx.source.getLevel()
	let node = level.getBlock(pos_x,pos_y,pos_z)
	node.set("kubejs:feature_node")
	node.getEntityData().getCompound("data").putString("feature_type",feature_type)
	node.getEntityData().getCompound("data").putString(sub_type_name,sub_type)
    return 1
}

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event

	//The command for setting the feature node blocks. Could be used by players for schematics
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("create")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("feature_node")
		.requires(source => source.hasPermission(2))
		.then(Commands.argument('node_pos', Arguments.BLOCK_POS.create(event))
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("mob")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("warden")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"mob","mob_type","warden")
				return 1
            })
		).then(Commands.literal("ravager")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"mob","mob_type","ravager")
				return 1
            })
		).then(Commands.literal("blaze")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"mob","mob_type","blaze")
				return 1
            })
    	).then(Commands.literal("creaking")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"mob","mob_type","creaking")
				return 1
            })
    	)).then(Commands.literal("spawner")
		.then(Commands.literal("spider")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"spawner","mob_type","spider")
				return 1
            })
		).then(Commands.literal("cave_spider")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"spawner","mob_type","cave_spider")
				return 1
            })
		).then(Commands.literal("slime")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"spawner","mob_type","slime")
				return 1
            })
		).then(Commands.literal("creeper")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"spawner","mob_type","creeper")
				return 1
            })
		).then(Commands.literal("guardian")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"spawner","mob_type","guardian")
				return 1
            })
		).then(Commands.literal("husk")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"spawner","mob_type","husk")
				return 1
            })
		).then(Commands.literal("drowned")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"spawner","mob_type","drowned")
				return 1
            })
		)).then(Commands.literal("loot")
		.then(Commands.literal("common")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"loot","loot_type","common")
				return 1
            })
		).then(Commands.literal("common_sculk")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"loot","loot_type","common_sculk")
				return 1
            })
		).then(Commands.literal("rare")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"loot","loot_type","rare")
				return 1
            })
		).then(Commands.literal("epic")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"loot","loot_type","epic")
				return 1
            })
		).then(Commands.literal("water")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"loot","loot_type","water")
				return 1
            })
		)).then(Commands.literal("spawner")
		.then(Commands.literal("spider")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"spawner","mob_type","spider")
				return 1
            })
		).then(Commands.literal("cave_spider")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"spawner","mob_type","cave_spider")
				return 1
            })
		).then(Commands.literal("slime")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"spawner","mob_type","slime")
				return 1
            })
		).then(Commands.literal("creeper")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"spawner","mob_type","creeper")
				return 1
            })
		).then(Commands.literal("guardian")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"spawner","mob_type","guardian")
				return 1
            })
		).then(Commands.literal("husk")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"spawner","mob_type","husk")
				return 1
            })
		).then(Commands.literal("drowned")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"spawner","mob_type","drowned")
				return 1
            })
		)).then(Commands.literal("waystone")
		.requires(source => source.hasPermission(2))
			.executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"waystone","waystone_type","default")
				return 1
            })
		)
	))))
})

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	
	event.register(
        Commands.literal("gamerule")
		.then(Commands.literal("activeFeatureNodes")
		.then(Commands.argument("value", Arguments.BOOLEAN.create(event))
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				const value = Arguments.BOOLEAN.getResult(ctx, "value")
				const player = ctx.source.getPlayer()
				const server = ctx.source.getServer()
				server.persistentData.merge({"custom_gamerules":{"activeFeatureNodes":value}})
				if (player != null) {
					player.tell(`The gamerule activeFeatureNodes is now set to: ${value}`)
				}
				return 1
            })
        ))
    )
})

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	
	//The command for setting the feature node blocks. Could be used by players for schematics
	event.register(
        Commands.literal("backrooms")
		.then(Commands.literal("create")
		.then(Commands.literal("feature_node")
		.then(Commands.argument('node_pos', Arguments.BLOCK_POS.create(event))
		.then(Commands.literal("cube")
		.then(Commands.literal("red")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"cube","cube_colour","red")
				return 1
            })
		).then(Commands.literal("orange")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"cube","cube_colour","orange")
				return 1
            })
		).then(Commands.literal("yellow")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"cube","cube_colour","yellow")
				return 1
            })
    	).then(Commands.literal("green")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"cube","cube_colour","green")
				return 1
            })
    	).then(Commands.literal("cyan")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"cube","cube_colour","cyan")
				return 1
            })
    	).then(Commands.literal("blue")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"cube","cube_colour","blue")
				return 1
            })
    	).then(Commands.literal("magenta")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"cube","cube_colour","magenta")
				return 1
            })
    	).then(Commands.literal("white")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"cube","cube_colour","white")
				return 1
            })
    	).then(Commands.literal("black")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"cube","cube_colour","black")
				return 1
            })
    	).then(Commands.literal("random")
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	const position = Arguments.VEC3.getResult(ctx, "node_pos")
				create_feature_node_command(ctx,position,"cube","cube_colour","random")
				return 1
            })
    	))
	))))
})