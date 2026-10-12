LevelEvents.loaded("backrooms:limbo", event => {
	let level = event.server.getLevel("backrooms:limbo")
	let first_flag = level.persistentData.getBoolean("generated")
	if (!first_flag) {
		begin_limbo_generation(level)
	}
})
/**
* @param {Internal.ServerLevel} level
*/
function begin_limbo_generation(level){
	let node = level.getBlock(0,48,0)
	level.persistentData.merge({"generated":true})
	if (!node.hasTag("backrooms:room_nodes")) {
		node.set("kubejs:room_node_block_spawn")
		let [node_x,node_y,node_z] = [node.getX(),node.getY(),node.getZ()]
		level.getBlock(node_x,node_y,node_z - 22).set("kubejs:room_node_connector",{"facing":"north"})
		level.getBlock(node_x,node_y,node_z + 22).set("kubejs:room_node_connector",{"facing":"south"})
		level.getBlock(node_x - 22,node_y,node_z).set("kubejs:room_node_connector",{"facing":"west"})
		level.getBlock(node_x + 22,node_y,node_z).set("kubejs:room_node_connector",{"facing":"east"})
	}
	return 1
}