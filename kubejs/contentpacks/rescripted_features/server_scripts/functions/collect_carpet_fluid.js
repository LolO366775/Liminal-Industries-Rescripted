/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function soggy_carpet_right_clicked_event(event) {
	if (event.item.getId() == "minecraft:glass_bottle") {
		event.player.give("1x kubejs:carpet_fluid")
		event.item.shrink(1)
		let [pos_x,pos_y,pos_z] = [event.block.getX(),event.block.getY(),event.block.getZ()]
		event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.bottle.fill","blocks",1,1)
	}
}