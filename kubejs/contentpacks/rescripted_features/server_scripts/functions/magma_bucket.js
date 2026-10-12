/**
* @param {Internal.BlockContainerJS} cage
*/
function does_cage_have_frog(cage) {
	try {
		let caged_entity_data = cage.getEntityData().getCompound("MobHolder").getCompound("EntityData")
		let mob_id = caged_entity_data.getString("id")
		if (mob_id == "minecraft:frog") {
			return true
		}
		return false
	} catch (error) {
		return false		
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} bucket
*/
function magma_bucket_on_cage_event(event,bucket){
	let cage = event.getBlock()
	if (does_cage_have_frog(cage)) {
		cage.popItemFromFace("minecraft:ochre_froglight","up")
		magma_bucket_event_common(event,bucket)
	}
	event.cancel()
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} bucket
*/
function magma_bucket_event_common(event,bucket){
	event.item.count--
	event.player.give(bucket)
	let [pos_x,pos_y,pos_z] = [event.block.getX() + 0.5,event.block.getY() + 1,event.block.getZ() + 0.5]
	event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.bucket.empty_lava","blocks",1,0)
	event.level.spawnParticles("minecraft:lava",false,pos_x,pos_y,pos_z,0,0,0,10,0.5)
}
/**
* @param {Internal.BlockContainerJS} block
*/
function spawn_magma_cube_from_bucket_event(block){
	let level = block.getLevel()
	let mob = level.createEntity("minecraft:magma_cube")
	let [pos_x,pos_y,pos_z] = [block.getX() + 0.5,block.getY() + 1,block.getZ() + 0.5]
	mob.mergeNbt({"Health":1,"Size":0})
	mob.setPos(pos_x,pos_y,pos_z)
	mob.spawn()
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} bucket
*/
function magma_bucket_event(event,bucket){
	let facing = event.getFacing()
	let block = event.getBlock()
	if (facing == "up") {
		spawn_magma_cube_from_bucket_event(block.getUp())
	} else if (facing == "down") {
		spawn_magma_cube_from_bucket_event(block.getDown())
	} else if (facing == "north") {
		spawn_magma_cube_from_bucket_event(block.getNorth())
	} else if (facing == "south") {
		spawn_magma_cube_from_bucket_event(block.getSouth())
	} else if (facing == "east") {
		spawn_magma_cube_from_bucket_event(block.getEast())
	} else if (facing == "west") {
		spawn_magma_cube_from_bucket_event(block.getWest())
	}
	magma_bucket_event_common(event,bucket)
	event.cancel()
}