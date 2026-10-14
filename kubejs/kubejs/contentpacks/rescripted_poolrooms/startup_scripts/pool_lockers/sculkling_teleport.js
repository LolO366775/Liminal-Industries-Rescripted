//Currently Unused
/**
* @param {Internal.BlockContainerJS} locker
*/
function sculkling_attempt_to_teleport(locker){
	let [pos_x,pos_y,pos_z] = [locker.getX(),locker.getY(),locker.getX()]
	let check_block = find_random_locker_nearby(locker)
	if (check_block.getId() == "kubejs:pool_locker_single") {
		locker.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.enderman.teleport","blocks",1,1)
		//locker_sculkling_doors(check_block,true,3)
		//convert_locker_to_shulker()
		//convert_shulker_to_locker()
		return true
	}
	return false
}
/**
* @param {Internal.BlockContainerJS} locker
*/
function find_random_locker_nearby(locker){
	let level = locker.getLevel()
	let [pos_x,pos_y,pos_z] = [locker.getX(),locker.getY(),locker.getX()]
	pos_x = pos_x + get_random_teleport_offset(15)
	pos_y = pos_y + get_random_teleport_offset(15)
	pos_z = pos_z + get_random_teleport_offset(15)
	let check_block = level.getBlock(pos_x,pos_y,pos_z)
	for (let check_limit = 0; check_limit < 15; check_limit++) {
		if (check_block.getId() == "kubejs:pool_locker_single") {
			return check_block
		}
	}
	return check_block
}
/**
* @param {Number} max_range
*/
function get_random_teleport_offset(max_range){
	let random_offset = Math.round((Math.random() * (max_range -0.001))-0.5)
	if (coin_flip(0.5)) {return random_offset * -1}
	return random_offset
}

