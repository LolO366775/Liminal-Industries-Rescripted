BlockEvents.rightClicked('kubejs:porous_stone', event => {
	if (event.item.id == 'kubejs:wallpaper') {
        let face = event.getFacing()
        if (face != "up") {
            coverup_wallpaper(event,"kubejs:wallpaper1")
        }

	} else if (event.item.id == 'kubejs:cut_carpet') {
        let face = event.getFacing()
        if (face == "up") {
            coverup_carpet(event,"kubejs:carpet")
        }
	}
})
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} result_id
*/
function coverup_wallpaper(event,result_id){
    let [pos_x,pos_y,pos_z] = [event.block.getX(),event.block.getY(),event.block.getZ()]
	event.item.count--
    event.block.set(result_id)
    event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.cherry_wood.place","blocks",1,2)
    return 1
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} result_id
* @param {String} place_sound
*/
function coverup_carpet(event,result_id,place_sound){
    let [pos_x,pos_y,pos_z] = [event.block.getX(),event.block.getY(),event.block.getZ()]
	event.item.count--
    event.block.set(result_id)
    event.level.playSound(null,pos_x,pos_y,pos_z,place_sound,"blocks",1,2)
    return 1
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function coverup_carpet_event(event){
	if (event.item.id == 'kubejs:cut_carpet') {
		if (event.level.getDimension() != "backrooms:poolrooms") {
            coverup_carpet(event,"kubejs:carpet","minecraft:block.wool.place")
		}
	} else if (event.item.id == 'kubejs:concrete_tile') {
		if (event.level.getDimension() != "backrooms:poolrooms") {
            coverup_carpet(event,"kubejs:floor_tiles_full","minecraft:block.deepslate_bricks.place")
		}
	} else if (event.item.id == 'kubejs:concrete_piece') {
		if (event.level.getDimension() != "backrooms:poolrooms") {
            coverup_carpet(event,"kubejs:floor_tiles_full","minecraft:block.deepslate_bricks.place")
		}
	}
    return 1
}
BlockEvents.rightClicked('kubejs:drain_breakable', event => {
	coverup_carpet_event(event)
})
BlockEvents.rightClicked('kubejs:floor_tiles', event => {
    if (event.item.id == 'kubejs:drain_item') {
        let [pos_x,pos_y,pos_z] = [event.block.getX(),event.block.getY(),event.block.getZ()]
		event.item.count--
        event.block.set("kubejs:drain")
        event.block.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.lantern.hit","blocks",1,2)
	} else {
	    coverup_carpet_event(event)
    }
})