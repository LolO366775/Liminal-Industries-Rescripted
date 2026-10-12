/**
* @param {Internal.BlockContainerJS} floor
* @param {Number} chance
* @param {Internal.Player} player
* @param {String} result_block
* @param {String} result_item
* @param {Internal.Direction} face
*/
function chip_tiles(floor,chance,player,result_block,result_item,face){
    let [pos_x,pos_y,pos_z] = [floor.getX() + 0.5,floor.getY() + 1,floor.getZ() + 0.5]
    let level = player.getLevel()
    level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.deepslate_bricks.break","blocks",1,0)
    level.spawnParticles(`block ${result_block}`,false,pos_x,pos_y,pos_z,0,0,0,10,0.1)
    if (chance > Math.random()) {
        floor.set(result_block)
        if (player.isFake()) {
            player.give(result_item)
        } else {
            floor.popItemFromFace(result_item,face)
        }
        return true
    }
    return false
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} result_block
* @param {String} result_item
* @param {Boolean} always
*/
function left_block_chipping_event(event,result_block,result_item,always){
    let floor = event.getBlock()
    let tool = event.getItem()
    let tool_id = tool.getId()
    let player = event.getPlayer()
    let chance = 1
    let face = event.facing
    if (!always) {
        if (player.isFake()) {
            chance = 0.25
        } else {
            chance = 0.75
        }
    }
    if (player.isFake()) {
  	    if (tool_id == "kubejs:crowbar") {
            chip_tiles(floor,chance,player,result_block,result_item,face)
	    } else if (tool.hasTag("minecraft:pickaxes")) {
            chip_tiles(floor,chance,player,result_block,result_item,face)
            chipping_damage_tool(tool,player,1)
        }
    } else if (player.attackStrengthTicker > 15) {
        if (tool_id == "kubejs:crowbar") {
            chip_tiles(floor,chance,player,result_block,result_item,face)
	    } else if (tool.hasTag("minecraft:pickaxes")) {
            chip_tiles(floor,chance,player,result_block,result_item,face)
            chipping_damage_tool(tool,player,3)
        }
    }
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} result_block
* @param {String} result_item
* @param {Boolean} always
*/
function right_block_chipping_event(event,result_block,result_item,always){
    let floor = event.getBlock()
    let tool = event.getItem()
    let tool_id = tool.getId()
    let player = event.getPlayer()
    let chance = 1
    let face = event.facing
    if (!always) {
        chance = 0.25
    }
    if (player.isFake()) {
  	    if (tool_id == "kubejs:crowbar") {
            chip_tiles(floor,chance,player,result_block,result_item,face)
	    } else if (tool.hasTag("minecraft:pickaxes")) {
            chip_tiles(floor,chance,player,result_block,result_item,face)
            chipping_damage_tool(tool,player,1)
        }
    } else {
        if (tool_id == "kubejs:crowbar") {
            chip_tiles(floor,chance,player,result_block,result_item,face)
            player.addItemCooldown(tool_id,20)
	    } else if (tool.hasTag("minecraft:pickaxes")) {
            chip_tiles(floor,chance,player,result_block,result_item,face)
            player.addItemCooldown(tool_id,20)
            chipping_damage_tool(tool,player,1)
        }
    }
}
/**
* @param {Internal.ItemStack} tool
* @param {Internal.Player} player
* @param {Number} damage
*/
function chipping_damage_tool(tool,player,damage){
    let [pos_x,pos_y,pos_z] = [player.getX(),player.getY(),player.getZ()]
    let level = player.getLevel()
    tool.setDamageValue(tool.getDamageValue() + damage)
    if (tool.getDamageValue() >= tool.getMaxDamage()) {
        level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.shield.break","players",1,1)
		tool.shrink(1)
	}
    return 1
}
BlockEvents.rightClicked("kubejs:floor_tiles_full", event => {
    right_block_chipping_event(event,"kubejs:floor_tiles","kubejs:concrete_piece",true)
})
BlockEvents.rightClicked("kubejs:floor_tiles", event => {
    right_block_chipping_event(event,"kubejs:floor_tiles","kubejs:concrete_piece",false)
})
BlockEvents.rightClicked("kubejs:floor_tiles_infinite", event => {
    right_block_chipping_event(event,"kubejs:floor_tiles_infinite","kubejs:concrete_piece",false)
})
BlockEvents.leftClicked("kubejs:floor_tiles", event => {
    left_block_chipping_event(event,"kubejs:floor_tiles","kubejs:concrete_piece",false)
})
BlockEvents.leftClicked("kubejs:floor_tiles_full", event => {
    left_block_chipping_event(event,"kubejs:floor_tiles","kubejs:concrete_piece",true)
})
BlockEvents.leftClicked("kubejs:floor_tiles_infinite", event => {
    left_block_chipping_event(event,"kubejs:floor_tiles_infinite","kubejs:concrete_piece",false)
})
BlockEvents.rightClicked("kubejs:pool_tiles", event => {
    right_block_chipping_event(event,"kubejs:missing_tiles_half","kubejs:pool_tile",true)
})
BlockEvents.leftClicked("kubejs:pool_tiles", event => {
    left_block_chipping_event(event,"kubejs:missing_tiles_half","kubejs:pool_tile",true)
})
BlockEvents.rightClicked("kubejs:missing_tiles_half", event => {
    right_block_chipping_event(event,"kubejs:missing_tiles_empty","kubejs:pool_tile",true)
})
BlockEvents.leftClicked("kubejs:missing_tiles_half", event => {
    left_block_chipping_event(event,"kubejs:missing_tiles_empty","kubejs:pool_tile",true)
})
BlockEvents.rightClicked("kubejs:missing_tiles_half_perm", event => {
    right_block_chipping_event(event,"kubejs:missing_tiles_empty_perm","kubejs:pool_tile",true)
})
BlockEvents.leftClicked("kubejs:missing_tiles_half_perm", event => {
    left_block_chipping_event(event,"kubejs:missing_tiles_empty_perm","kubejs:pool_tile",true)
})