/**
* @param {Internal.BlockContainerJS} wallpaper
* @param {Internal.Player} player
*/
function right_click_hammer_on_wallpaper(wallpaper,player){
	let wallpaper_id = wallpaper.getId()
	let border_up = wallpaper.properties.get("up")
	let border_down = wallpaper.properties.get("down")
	let border_both = ((border_up == "true") && (border_down == "true"))
	let border_empty = ((border_up == "false") && (border_down == "false"))
	if (player.isCrouching()) {
		if (border_empty) {
			wallpaper.set(wallpaper_id,{"down":"false","up":"true"})
			build_border_on_wallpaper_common(wallpaper)
		} else if (!border_both) {
			wallpaper.set(wallpaper_id,{"down":"true","up":"true"})
			build_border_on_wallpaper_common(wallpaper)
		}
	} else {
		if (border_empty) {
			wallpaper.set(wallpaper_id,{"down":"true","up":"false"})
			build_border_on_wallpaper_common(wallpaper)
		}  else if (!border_both) {
			wallpaper.set(wallpaper_id,{"down":"true","up":"true"})
			build_border_on_wallpaper_common(wallpaper)
		}
	}
}
/**
* @param {Internal.BlockLeftClickedEventJS} event
*/
function left_click_hammer_on_wallpaper_event(event){
	let player = event.getPlayer()
	let wallpaper = event.getBlock()
	if (!player.isCreative()) {
		left_click_hammer_on_wallpaper_survival(wallpaper,player)
	} else {
		left_click_hammer_on_wallpaper(wallpaper,player)
	}
}
/**
* @param {Internal.BlockContainerJS} wallpaper
* @param {Internal.Player} player
*/
let hasAlreadyClicked = false //prevents the event from firing twice (false = first click; true = click release)
function left_click_hammer_on_wallpaper_survival(wallpaper,player){
	hasAlreadyClicked = !hasAlreadyClicked
	if (hasAlreadyClicked) {
		left_click_hammer_on_wallpaper(wallpaper,player)
	}
}
/**
* @param {Internal.BlockContainerJS} wallpaper
* @param {Internal.Player} player
*/
function left_click_hammer_on_wallpaper(wallpaper,player){
	let wallpaper_id = wallpaper.getId()
	let border_up = wallpaper.properties.get("up")
	let border_down = wallpaper.properties.get("down")
	let border_empty = ((border_up == "false") && (border_down == "false"))
	if (player.isCrouching()) {
		if (border_up == "true" && border_down == "true") {
			wallpaper.set(wallpaper_id,{"down":"true","up":"false"})
			remove_border_on_wallpaper_common(wallpaper)
		} else if (!border_empty) {
			wallpaper.set(wallpaper_id,{"down":"false","up":"false"})
			remove_border_on_wallpaper_common(wallpaper)
		}
	} else {
		if (border_down == "true" && border_up == "true") {
			wallpaper.set(wallpaper_id,{"down":"false","up":"true"})
			remove_border_on_wallpaper_common(wallpaper)
		} else if (!border_empty) {
			wallpaper.set(wallpaper_id,{"down":"false","up":"false"})
			remove_border_on_wallpaper_common(wallpaper)
		}
	}
}
/**
* @param {Internal.BlockContainerJS} wallpaper
*/
function build_border_on_wallpaper_common(wallpaper){
	let [pos_x,pos_y,pos_z] = [wallpaper.getX() + 0.5,wallpaper.getY() + 0.5,wallpaper.getZ() + 0.5]
	let level = wallpaper.getLevel()
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.wood.place", "blocks",1,1.6)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.villager.work_fletcher", "blocks",0.5,1.6)
}
/**
* @param {Internal.BlockContainerJS} wallpaper
*/
function remove_border_on_wallpaper_common(wallpaper){
	let [pos_x,pos_y,pos_z] = [wallpaper.getX() + 0.5,wallpaper.getY() + 0.5,wallpaper.getZ() + 0.5]
	let level = wallpaper.getLevel()
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.wood.break", "blocks",1,1.6)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.zombie.break_wooden_door", "blocks",0.5,1.6)
}