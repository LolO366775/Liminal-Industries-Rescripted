BlockEvents.rightClicked(event => {
	ceiling_lamp_right_clicked(event)
})
/**
* @param {Internal.BlockLeftClickedEventJS} event
*/
function ceiling_lamp_right_clicked(event) {
	let lamp = event.getBlock()
	if (lamp.getId() == "kubejs:ceilling_lamp_broken") {
		global.restore_broken_lamp_event(event)
	} else if (lamp.getId() == "kubejs:ceilling_lamp2_broken") {
		global.restore_broken_lamp_event(event)
	} else if (lamp.getId() == "kubejs:ceilling_lamp_red_broken") {
		global.restore_broken_lamp_event(event)
	}
}