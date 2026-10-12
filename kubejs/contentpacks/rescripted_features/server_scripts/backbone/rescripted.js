/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function block_right_clicked_rescripted(event) {
	let block = event.getBlock()
	let item = event.getItem()
	let player = event.getPlayer()
	//wallpaper borders
	if (block.hasTag("kubejs:border_wallpapers")) {
		if (item == "immersiveengineering:hammer") {
			right_click_hammer_on_wallpaper(block,player)
		}
	}
	//wall piercer
	if (block.getId() == "kubejs:wall_destroyer") {
		wall_destroyer_right_click(block)
	}
	//battery placement
	if (item.getId() == "kubejs:lithium_ion_battery") {
		batteries_placement_event(event,"kubejs:lithium_ion_batteries")
	}
	if (item.getId() == "kubejs:battery") {
		batteries_placement_event(event,"kubejs:batteries")
	}
	//sculk_scrubber
	if (block.getId() == "kubejs:sculk_scrubber") {
		scrubber_right_clicked_event(event)
	}
	//sculk replacement
	if (block.hasTag("kubejs:sculk")) {
		sculk_restrict_placement(event)
	}
	//cryptic_block
	if (block.getId() == "create:experience_block") {
		experience_block_right_click_event(event)
	}
	if (block.getId() == "kubejs:cryptic_block") {
		cryptic_block_right_click_event(event)
	}
	//magma buckets
	if (item.getId() == 'tconstruct:magma_bucket') {
		if (block.getId() == "supplementaries:cage") {
			magma_bucket_on_cage_event(event,"minecraft:bucket")
		} else {
			magma_bucket_event(event,"minecraft:bucket")
		}		
	}
	//carpet fluid
	if (block.hasTag("kubejs:soggy_carpets")) {//maybe a tag instead?
		soggy_carpet_right_clicked_event(event)
	}
	//item fixes
	if (item.getId() == 'miners_delight:copper_cup') {
		event.cancel()
	}
	if (item.getId() == "enderio:staff_of_travelling") {
		staff_of_travelling_right_click_block_event(event)
	}
	//item_tag check? (placeable_eyes)
	item_eye_place_event(event)
	//weird chairs
	if (block.hasTag("kubejs:weird_chairs")) {
		weird_chair_right_clicked(event)
	}
	if (block.getId() == "kubejs:backrooms_speaker_light") {
		toggle_speaker_event(event)
	}
	if (block.getId() == "kubejs:backrooms_speaker_dark") {
		toggle_speaker_event(event)
	}
	if (block.hasTag("kubejs:perm_convertable")) {
		perm_conversion_event(event)
	}
}
/**
* @param {Internal.BlockLeftClickedEventJS} event
*/
function block_left_clicked_rescripted(event) {
	let block = event.getBlock()
	let item = event.getItem()
	//wallpaper borders
	if (block.hasTag("kubejs:border_wallpapers")) {
		if (item == "immersiveengineering:hammer") {
			left_click_hammer_on_wallpaper_event(event)
			event.cancel()
		}
	}
	//weird chairs
	if (block.hasTag("kubejs:weird_chairs")) {
		weird_chair_left_clicked(event)
	}
}
LevelEvents.beforeExplosion(event => {
	global.explode_lamps_in_radius(event)
})