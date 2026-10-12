/**
* @param {Internal.BlockLeftClickedEventJS} event
*/
function weird_chair_left_clicked(event) {
	let chair = event.getBlock()
	if (chair.getId() == "kubejs:weird_chair") {
		global.left_click_weird_chair(event,"oak")
	} else if (chair.getId() == "kubejs:weird_chair_spruce") {
		global.left_click_weird_chair(event,"spruce")
	} else if (chair.getId() == "kubejs:weird_chair_birch") {
		global.left_click_weird_chair(event,"birch")
	} else if (chair.getId() == "kubejs:weird_chair_jungle") {
		global.left_click_weird_chair(event,"jungle")
	} else if (chair.getId() == "kubejs:weird_chair_acacia") {
		global.left_click_weird_chair(event,"acacia")
	} else if (chair.getId() == "kubejs:weird_chair_dark_oak") {
		global.left_click_weird_chair(event,"dark_oak")
	} else if (chair.getId() == "kubejs:weird_chair_mangrove") {
		global.left_click_weird_chair(event,"mangrove")
	} else if (chair.getId() == "kubejs:weird_chair_cherry") {
		global.left_click_weird_chair(event,"cherry")
	} else if (chair.getId() == "kubejs:weird_chair_crimson") {
		global.left_click_weird_chair(event,"crimson")
	} else if (chair.getId() == "kubejs:weird_chair_warped") {
		global.left_click_weird_chair(event,"warped")
	}
}
/**
* @param {Internal.BlockLeftClickedEventJS} event
*/
function weird_chair_right_clicked(event) {
	let chair = event.getBlock()
	if (chair.getId() == "kubejs:weird_chair") {
		global.right_click_weird_chair(event,"oak")
	} else if (chair.getId() == "kubejs:weird_chair_spruce") {
		global.right_click_weird_chair(event,"spruce")
	} else if (chair.getId() == "kubejs:weird_chair_birch") {
		global.right_click_weird_chair(event,"birch")
	} else if (chair.getId() == "kubejs:weird_chair_jungle") {
		global.right_click_weird_chair(event,"jungle")
	} else if (chair.getId() == "kubejs:weird_chair_acacia") {
		global.right_click_weird_chair(event,"acacia")
	} else if (chair.getId() == "kubejs:weird_chair_dark_oak") {
		global.right_click_weird_chair(event,"dark_oak")
	} else if (chair.getId() == "kubejs:weird_chair_mangrove") {
		global.right_click_weird_chair(event,"mangrove")
	} else if (chair.getId() == "kubejs:weird_chair_cherry") {
		global.right_click_weird_chair(event,"cherry")
	} else if (chair.getId() == "kubejs:weird_chair_crimson") {
		global.right_click_weird_chair(event,"crimson")
	} else if (chair.getId() == "kubejs:weird_chair_warped") {
		global.right_click_weird_chair(event,"warped")
	}
}