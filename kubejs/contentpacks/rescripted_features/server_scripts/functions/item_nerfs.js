//staff of travelling teleportation nerf
/**
* @param {Internal.BlockLeftClickedEventJS} event
*/
function staff_of_travelling_right_click_block_event(event) {
	if (event.player != null) {
		event.player.tell("§cThis item may not be used on a block!")
	}
	event.cancel()
}
//disruption grenade teleportation fix
ServerEvents.recipes(event => {
	event.remove({output:'thermal:ender_grenade'})
	event.remove({output:'thermal:ender_tnt'})
})
//changes the teleport to spawn instead of random
ItemEvents.foodEaten("minecraft:chorus_fruit", event => {
	let player = event.getPlayer()
	if (0.02 >= Math.random()) {
		player.teleportTo("backrooms:limbo",-1000,2,-1000,0,0)
	} else {
		player.teleportTo("minecraft:overworld",-1000,23,-1000,0,0)
	}
})