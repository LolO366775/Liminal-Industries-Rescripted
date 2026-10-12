//Step 4: Layered Room Node
let $StructurePlaceSettings = Java.loadClass('net.minecraft.world.level.levelgen.structure.templatesystem.StructurePlaceSettings')
/**
* @param {Internal.BlockEntityJS} entity
*/
global.tick_layered_node = entity => {
	let node = entity.block
	let level = entity.getLevel()
	if (!tick_slice(node,get_dimension_bottom(level))) {
		let room_data = node.getEntityData().getCompound("data")
		let room_name = room_data.getString("room")
		//console.log(`generated room: ${room_name}`)
		room_data.putString("room",room_name)
		node.set("kubejs:room_node_block")
		node.mergeEntityData({"data":room_data})
		//goes back to step 1
	}
}
/**
* @param {Internal.Level} level
*/
function get_dimension_bottom(level){
    return 0
}
/**
* @param {Number} node_y_bottom
* @param {Internal.BlockContainerJS} node
*/
function tick_slice(node,node_y_bottom){
	let server = node.getLevel().getServer()
	let dimension = node.getDimension()
	let [pos_x,pos_z] = [node.getX(),node.getZ()]
	let node_data = node.getEntityData().getCompound("data")
	let slice = node_data.getInt("slice")
	let room = node_data.getString("room")
	//node.level.server.runCommandSilent(`say template backrooms:slice1/${room}`)
	if (room == "") {
		node.level.server.runCommandSilent(`say Error generating room at ${pos_x}, ${pos_z}! Room type is empty!`)
	}
	if (slice > 0) {
		if (room != "nothing") {
			if (4 >=  slice) {
				let result = place_template_slice(slice,room,node)
				//server.runCommandSilent(`say slice${slice}!`)
				if (result == "false_empty") {
					return false
				}
				if (result == "true") {
					slice++
					node_data.putInt("slice",slice)
					return true
				}
			} else if (slice == 5) {
				//server.runCommandSilent(`say slice${slice}!`)
				if (dimension == "backrooms:room_forge") {
					server.runCommandSilent(`execute in ${dimension} positioned ${pos_x -23} ${node_y_bottom + 60} ${pos_z - 23} run place template backrooms:slice5/high_metal_ceiling_grid ~ ~ ~`)
				}
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x - 23} ${node_y_bottom} ${pos_z - 23} run fill ~ 1 ~ ~ 45 ~46 minecraft:air replace #kubejs:liminalstone`)
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x - 23} ${node_y_bottom} ${pos_z - 23} run fill ~ 1 ~ ~46 45 ~ minecraft:air replace #kubejs:liminalstone`)
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x - 23} ${node_y_bottom} ${pos_z - 23} run fill ~46 1 ~ ~46 45 ~46 minecraft:air replace #kubejs:liminalstone`)
				server.runCommandSilent(`execute in ${dimension} positioned ${pos_x - 23} ${node_y_bottom} ${pos_z - 23} run fill ~ 1 ~46 ~46 45 ~46 minecraft:air replace #kubejs:liminalstone`)
			} else {return false}
		}
	}
    return false
}
/**
* @param {Number} slice
* @param {String} room_id
* @param {Internal.BlockContainerJS} node
*/
function place_template_slice(slice,room_id,node){
	let level = node.getLevel()
	let server = level.getServer()
	try {
		let corner_y = get_slice_y(slice,node)
		let [corner_x,corner_z] = [node.getX() - 23, node.getZ() - 23]
		let slice_pos = level.getBlock(corner_x,corner_y,corner_z).getPos()
		let manager = server.getStructureManager()
		let room_schematic = manager.get(`backrooms:slice${slice}/${room_id}`)
		let default_empty = room_schematic.isEmpty()
		let pass = "false"
		if (default_empty) {
			return "false_empty"
		} else {
			room_schematic.ifPresent(e => {
       	 		pass = e.placeInWorld(level, slice_pos, slice_pos, new $StructurePlaceSettings(), level.getRandom(), 3)
    		})
			return pass.toString()
		}
	} catch (error) {
		//server.runCommandSilent("say " + error)
		return "false"
	}
}
/**
* @param {Number} slice
* @param {Internal.BlockContainerJS} node
*/
function get_slice_y(slice,node){
	let level = node.getLevel()
	let bottom_y = get_dimension_bottom(level)
	let offset = bottom_y + (12 * (slice - 1))
	return offset
}