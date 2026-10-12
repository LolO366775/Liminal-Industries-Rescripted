/*BlockEvents.rightClicked(event => {
	let burner = event.getBlock()
	if (burner.getId() == "createlowheated:basic_burner") {
		basic_burner_clicked_event(event)
	}
})*/
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function basic_burner_clicked_event(event) {
	let burner = event.getBlock()
	let is_empty = burner.inventory.isEmpty()
	if (!is_empty) {
		let ash_layers = get_burned_out_ash_layers()
		let [pos_x,pos_y,pos_z] = [burner.getX() + 0.5,burner.getY() + 0.5,burner.getZ() + 0.5]
		let level = burner.getLevel()
		burner.set("supplementaries:ash",{"layers": ash_layers})
		level.spawnParticles("supplementaries:ash",false,pos_x,pos_y,pos_z,0.5,0.5,0.5,50,0)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.fire.extinguish","blocks",1,1)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.netherite_block.break","blocks",1,1)
		event.cancel()
	}
}
//moved to concrete burner
/*function get_burned_out_ash_layers() {
	if (0.2 > Math.random()) {
		return "2"
	}
	if (0.2 > Math.random()) {
		return "3"
	}
	if (0.3 > Math.random()) {
		return "4"
	}
	if (0.3 > Math.random()) {
		return "5"
	}
	if (0.2 > Math.random()) {
		return "6"
	}
	if (0.2 > Math.random()) {
		return "7"
	}
	if (0.1 > Math.random()) {
		return "8"
	}
	return "1"
}*/