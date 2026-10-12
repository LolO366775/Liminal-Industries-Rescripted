/*BlockEvents.rightClicked(event => {
	let burner = event.getBlock()
	if (burner.getId() == "kubejs:concrete_burner") {
		concrete_burner_clicked_event(event)
	}
})*/
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function concrete_burner_clicked_event(event) {
	let burner = event.getBlock()
	let item = event.getItem()
	if (is_hand_item_concrete_burner_fuel(item)) {
		global.concrete_burner_burn_ground_fuel_bridge(burner,item)
	}
}
/**
* @param {Internal.ItemStack} item
*/
function is_hand_item_concrete_burner_fuel(item){
	let burn_time = global.get_item_custom_burn_time(item)
	if (burn_time >= 1) {
		return true
	}
	return false
}