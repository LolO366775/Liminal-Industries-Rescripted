ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	event.register(
        Commands.literal("structure").requires(source => source.hasPermission(2))
		.then(Commands.literal("save").requires(source => source.hasPermission(2))
		.then(Commands.argument("pos1", Arguments.BLOCK_POS.create(event)).requires(source => source.hasPermission(2))
		.then(Commands.argument("pos2", Arguments.BLOCK_POS.create(event)).requires(source => source.hasPermission(2))
		.then(Commands.argument("name", Arguments.STRING.create(event)).requires(source => source.hasPermission(2))
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				const pos1 = Arguments.BLOCK_POS.getResult(ctx, "pos1")
				const pos2 = Arguments.BLOCK_POS.getResult(ctx, "pos2")
				const name = Arguments.STRING.getResult(ctx, "name")
				let player = ctx.source.getPlayer()
				try {
					let level = ctx.source.getLevel()
					let server = level.getServer()
					let block1 = level.getBlock(pos1)
					let block2 = level.getBlock(pos2)
					let [pos1_x,pos1_y,pos1_z] = [block1.getX(),block1.getY(),block1.getZ()]
					let [pos2_x,pos2_y,pos2_z] = [block2.getX(),block2.getY(),block2.getZ()]
					let size_x = Math.abs(pos1_x - pos2_x) + 1
					let size_y = Math.abs(pos1_y - pos2_y) + 1
					let size_z = Math.abs(pos1_z - pos2_z) + 1
					let size = new Vec3i(size_x,size_y,size_z)
					let manager = server.getStructureManager()
					let structure_pos = block1.getPos()
					let schematic = manager.getOrCreate(name)
					schematic.fillFromWorld(level,structure_pos,size,true,"minecraft:structure_void")
					manager.save(name)
					player.tell(`§aSuccessfully saved schematic at: ${name}!`)
				} catch (error) {
					player.tell(`§cError while saving schematic at: ${name}`)
					player.tell(error)
				}
				return 1
            })
    )))))
})