/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function sculk_restrict_placement(event) {
	if (!can_place_on_sculk(event)) {
		let player = event.getPlayer()
		player.showActionbar("You can't place blocks on sculk!")
		event.cancel()
	}
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
	if (event.item.getId() == 'kubejs:sculk_scrubber') {
		return true
	}
	if (event.block.getId() == "kubejs:sculk_spawner") {
		if (event.getFacing() == "up") {
			return true
		}
	}
	return false
}