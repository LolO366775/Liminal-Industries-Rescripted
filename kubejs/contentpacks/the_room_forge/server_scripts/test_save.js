/*const $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("test_save_block")
		.requires(source => source.hasPermission(2))
		.then(Commands.argument('node_pos', Arguments.BLOCK_POS.create(event))
		.requires(source => source.hasPermission(2))
            .executes(ctx => {
				/** @type {Internal.Vector3d} */
            	/*const position = Arguments.VEC3.getResult(ctx, "node_pos")
				let level = ctx.source.getLevel()
				let [pos_x,pos_y,pos_z] = [position.x(),position.y(),position.z()]
				save_schematic_layer(level.getBlock(pos_x,pos_y,pos_z))
				return 1
            })
        )
    ))
})
/**
* @param {Internal.BlockContainerJS} block
*/
function write_block(block) {
	let id = block.getId()
	try {
		let properties = block.getProperties()
		let nbt = block.getEntityData()
		let real_nbt = NBT.toJson(nbt)
		return {"id":id,"properties":properties,"nbt":real_nbt}
	} catch (error) {}
	try {
		let properties = block.getProperties()
		return {"id":id,"properties":properties}
	} catch (error) {}
	try {
		let nbt = block.getEntityData()
		let real_nbt = NBT.toJson(nbt)
		return {"id":id,"nbt":real_nbt}
	} catch (error) {
		return {"id":id}
	}
}


/**
* @param {Internal.BlockContainerJS} block
*/
function save_block_in_schematic2(block) {
	let server = block.getLevel().getServer()

	server.runCommandSilent(`say ${file_data}`)
}



/**
* @param {Internal.BlockContainerJS} block
*/
function save_schematic_layer(block) {
	let file_data = JsonIO.read("kubejs/config/test_schematic.json")
	let blocks = []
	let row_block = block
	for (let index = 0; index < 47; index++) {
		let add_block = row_block
		for (let index2 = 0; index2 < 47; index2++) {
			let id = add_block.getId()
			let properties = add_block.getProperties()
			let nbt = NBT.toJson(add_block.getEntityData())
			let add_block_data = {"id":id,"properties":properties,"nbt":nbt}
			blocks.push(add_block_data)
			add_block = add_block.getEast()
		}
		row_block = row_block.getSouth()
	}
	if (file_data == null) {
	} else {
		file_data.put("blocks",blocks)
		JsonIO.write("kubejs/config/test_schematic.json",file_data)
	}
	return 1
}

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event
	
	event.register(
        Commands.literal("backrooms")
		.requires(source => source.hasPermission(2))
		.then(Commands.literal("test44")
		.requires(source => source.hasPermission(2))
		    .executes(ctx => {
				global.test44(ctx.source.getServer())
				return 1
            })
        )
    )
})