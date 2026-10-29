//Will be turned back on when the stairwell dimension is created
/*LevelEvents.tick("backrooms:infinite_staircase",event => {
	let level = event.getLevel()
	let players = level.getPlayers()
	players.forEach(element => {
		let pos_y = element.getY()
		if (!element.isSpectator()) {
			if (10 > pos_y) {
				stairwell_dimension_teleport_up(element)
			} else if (pos_y > 33) {
				stairwell_dimension_teleport_down(element)
			}
		}

	})
})*/
/**
* @param {Internal.ServerPlayer} player
*/
function stairwell_dimension_teleport_down(player) {
	if (!player.gameMode.isCreative()) {
		player.teleportRelative(0,-21,0)
	}
}
/**
* @param {Internal.ServerPlayer} player
*/
function stairwell_dimension_teleport_up(player) {
	if (!player.gameMode.isCreative()) {
		player.teleportRelative(0,21,0)
	}
}