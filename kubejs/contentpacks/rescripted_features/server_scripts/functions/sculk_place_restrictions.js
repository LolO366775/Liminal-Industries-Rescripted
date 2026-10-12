/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function sculk_restrict_placement(event) {
	if (!can_place_on_sculk(event)) {
		let player = event.getPlayer()
		player.showActionbar("You cannot interact with sculk this way!")
		event.cancel()
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
global.can_interact_with_sculk = event => {
	let result = can_place_on_sculk(event)
	return result
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function can_place_on_sculk(event) {
	/** @type {Internal.ServerPlayer} */
	let player = event.getPlayer()
	if (player.isCreative()) {
		return true
	}
	if (event.getFacing() == "up") {
		if (event.item.getId() == "thermal:device_rock_gen") {
			return true
		}
		if (event.item.getId() == "kubejs:sculk_tendrils") {
			return true
		}
		if (event.item.getId() == "kubejs:sculk_shroom") {
			return true
		}
		if (event.block.getId() == "kubejs:sculk_spawner") {
			return true
		}
	}

	if (event.item.isEmpty()) {
		return true
	}
	if (event.item.getId() == 'kubejs:sculk_scrubber') {
		return true
	}
	return false
}