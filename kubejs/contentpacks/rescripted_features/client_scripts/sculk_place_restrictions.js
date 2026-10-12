BlockEvents.rightClicked(event => {
	if (event.block.hasTag("kubejs:sculk")) {
		client_sculk_restrict_placement(event)
	}
})
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function client_sculk_restrict_placement(event) {
	let result = global.can_interact_with_sculk(event)
	if (!result) {
		event.cancel()
	}
}