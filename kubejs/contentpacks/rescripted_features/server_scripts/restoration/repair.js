/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function repair_tiles_event(event){
    let block_id = event.getBlock().getId()
    let has_pool_tile = (event.item.id == 'kubejs:pool_tile')
    let is_pool_tile = (block_id == "kubejs:missing_tiles_half" || block_id == "kubejs:missing_tiles_empty")
    let is_pool_tile_perm = (block_id == "kubejs:missing_tiles_half_perm" || block_id == "kubejs:missing_tiles_empty_perm")
    let is_pool_tile_all = (is_pool_tile || is_pool_tile_perm)
	if (is_pool_tile_all && has_pool_tile) {
        let [pos_x,pos_y,pos_z] = [event.block.getX(),event.block.getY(),event.block.getZ()]
        event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.deepslate_bricks.place","blocks",1,2)
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
global.restore_broken_lamp_event = (event) => {
	if (event.item == "kubejs:fluorescent_tube") {
		let lamp = event.block
		let level = lamp.getLevel()
		let [pos_x,pos_y,pos_z] = [lamp.getX() + 0.5,lamp.getY(),lamp.getZ() + 0.5]
		level.playSound(null,pos_x,pos_y,pos_z,"immersiveengineering:tesla","blocks",1,1.5)
		generate_light_collumn(lamp)
	}
}
/**
* @param {Internal.BlockContainerJS} lamp
*/
function generate_light_collumn(lamp){
    let below = lamp.getDown()
    let level = lamp.getLevel()
    let [pos_x,pos_y,pos_z] = [lamp.getX(),lamp.getY(),lamp.getZ()]
	while (pos_y > 0) {
		if (below.getId() != "minecraft:air") {
            break
        }
        if (Platform.isLoaded("torchmaster")) {
            below.set("torchmaster:invisible_light")
        } else {
            below.set("minecraft:light")
        }
		pos_y--
		below = below.getDown()
		if (level.getBlock(pos_x,pos_y - 6,pos_z).getId() != "minecraft:air") {
			break
		}
	}
}
ServerEvents.recipes(event => {
    let create = (block, item, result) => {
	    event.custom({
            "type": "create:item_application",
		    "ingredients":[
			    {"item": block},
			    {"item": item}
            ],
		    "results": [
			    {"item": result}
            ]
	    })
    }
    create("kubejs:missing_tiles_half","kubejs:pool_tile","kubejs:pool_tiles")
    create("kubejs:missing_tiles_empty","kubejs:pool_tile","kubejs:missing_tiles_half")
    create("kubejs:missing_tiles_half_perm","kubejs:pool_tile","kubejs:pool_tiles")
    create("kubejs:missing_tiles_empty_perm","kubejs:pool_tile","kubejs:missing_tiles_half_perm")
    create("kubejs:ceilling_lamp_broken","kubejs:fluorescent_tube","kubejs:ceilling_lamp")
    create("kubejs:ceilling_lamp2_broken","kubejs:fluorescent_tube","kubejs:ceilling_lamp2")
    create("kubejs:ceilling_lamp_red_broken","kubejs:fluorescent_tube","kubejs:ceilling_lamp_red")
})
