//new stuff
//All this stuff really could be done via config. Probably easier.
ServerEvents.tags('block', event => {
	event.add('kubejs:soulfire_convertables/carpet', 'kubejs:carpet')
    event.add('kubejs:soulfire_convertables/carpet', 'kubejs:soggy_carpet')
    event.add('kubejs:soulfire_convertables/carpet', 'kubejs:soul_carpet')
    event.add('kubejs:soulfire_convertables/red_carpet', 'kubejs:red_carpet')
    event.add('kubejs:soulfire_convertables/red_carpet', 'kubejs:red_soggy_carpet')
    event.add('kubejs:soulfire_convertables/red_carpet', 'kubejs:red_soul_carpet')
    event.add('kubejs:soulfire_convertables/sand', 'minecraft:sand')
    event.add('kubejs:soulfire_convertables/sand', 'minecraft:red_sand')
    event.add('kubejs:soulfire_convertables/dirt', 'minecraft:dirt')
    event.add('kubejs:soulfire_convertables/stone', 'minecraft:cobblestone')
    event.add('kubejs:soulfire_convertables/bricks', 'minecraft:bricks')
    event.add('kubejs:soulfire_convertables/bricks', 'supplementaries:ash_bricks')
    event.add('kubejs:soulfire_convertables/soft', 'kubejs:red_carpet_soft')
    event.add('kubejs:soulfire_convertables/soft', 'kubejs:carpet_soft')
    event.add('kubejs:soulfire_convertables/soft', 'kubejs:pool_tiles_soft')
    event.add('kubejs:soulfire_convertables/soft', 'kubejs:long_pool_tiles_soft')
    event.add('kubejs:soulfire_convertables/soft', 'kubejs:wallpaper_soft')
    //wallpapers
    event.add('kubejs:soulfire_convertables/wallpaper1', 'kubejs:wallpaper1')
    event.add('kubejs:soulfire_convertables/wallpaper1', 'kubejs:stripped_wallpaper')
    event.add('kubejs:soulfire_convertables/wallpaper2', 'kubejs:wallpaper2')
    event.add('kubejs:soulfire_convertables/wallpaper2', 'kubejs:stripped_wallpaper2')
    event.add('kubejs:soulfire_convertables/wallpaper3', 'kubejs:wallpaper3')
    event.add('kubejs:soulfire_convertables/wallpaper3', 'kubejs:stripped_wallpaper3')
    event.add('kubejs:soulfire_convertables/wallpaper4', 'kubejs:wallpaper4')
    event.add('kubejs:soulfire_convertables/wallpaper4', 'kubejs:stripped_wallpaper4')
    event.add('kubejs:soulfire_convertables/wallpaper5', 'kubejs:wallpaper5')
    event.add('kubejs:soulfire_convertables/wallpaper5', 'kubejs:stripped_wallpaper5')
    event.add('kubejs:soulfire_convertables/wallpaper6', 'kubejs:wallpaper6')
    event.add('kubejs:soulfire_convertables/wallpaper6', 'kubejs:stripped_wallpaper6')
    event.add('kubejs:soulfire_convertables/wallpaper7', 'kubejs:wallpaper7')
    event.add('kubejs:soulfire_convertables/wallpaper7', 'kubejs:stripped_wallpaper7')
    //
    event.add('kubejs:soulfire_convertables/creates_soulfire', 'kubejs:carpet')
    event.add('kubejs:soulfire_convertables/creates_soulfire', 'kubejs:soggy_carpet')
    event.add('kubejs:soulfire_convertables/creates_soulfire', 'kubejs:soul_carpet')
    event.add('kubejs:soulfire_convertables/creates_soulfire', 'minecraft:sand')
    event.add('kubejs:soulfire_convertables/creates_soulfire', 'minecraft:red_sand')
    event.add('kubejs:soulfire_convertables/creates_soulfire', 'minecraft:dirt')
    event.add('kubejs:soulfire_convertables/creates_soulfire', 'kubejs:red_carpet')
    event.add('kubejs:soulfire_convertables/creates_soulfire', 'kubejs:red_soggy_carpet')
    event.add('kubejs:soulfire_convertables/creates_soulfire', 'kubejs:red_soul_carpet')
	event.add('minecraft:soul_fire_base_blocks', 'kubejs:soul_carpet')
	event.add('minecraft:soul_speed_blocks', 'kubejs:soul_carpet')
	event.add('minecraft:soul_fire_base_blocks', 'kubejs:red_soul_carpet')
	event.add('minecraft:soul_speed_blocks', 'kubejs:red_soul_carpet')
    event.add('kubejs:soulfire_convertables', '#kubejs:soulfire_convertables/carpet')
    event.add('kubejs:soulfire_convertables', '#kubejs:soulfire_convertables/red_carpet')
    event.add('kubejs:soulfire_convertables', '#kubejs:soulfire_convertables/sand')
    event.add('kubejs:soulfire_convertables', '#kubejs:soulfire_convertables/dirt')
    event.add('kubejs:soulfire_convertables', '#kubejs:soulfire_convertables/stone')
    event.add('kubejs:soulfire_convertables', '#kubejs:soulfire_convertables/bricks')
})
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function soulfire_convert_common_event(event){
    let player = event.getPlayer()
    let item = event.getItem()
    if (item.getId() == "eidolon:soulfire_wand") {
        if (!player.isFake() && !player.isShiftKeyDown()) {
            global.soulfire_convert_common(event.getBlock())
            soulfire_convert_damage_tool(event.getItem())
        } 
    } else if (item.getId() == "kubejs:soul_lighter") {
        global.soulfire_convert_common(event.getBlock())
        soulfire_convert_damage_tool(event.getItem())
    }
    return 1
}
/**
* @param {Internal.ItemStack} item
*/
function soulfire_convert_damage_tool(item){
    item.setDamageValue(item.getDamageValue() + 1)
	if (item.getDamageValue() >= item.getMaxDamage()) {
		item.shrink(1)
	}
}
/**
* @param {Internal.BlockContainerJS} block
*/
global.soulfire_convert_common = (block) => {
    let [pos_x,pos_y,pos_z] = [block.getX(),block.getY(),block.getZ()]
    let level = block.getLevel()
    level.spawnParticles("minecraft:soul_fire_flame",false,pos_x,pos_y,pos_z,1,1,1,10,0.01)
    level.spawnParticles("minecraft:sculk_soul",false,pos_x,pos_y,pos_z,1,1,1,10,0.1)
    level.playSound(null,pos_x,pos_y,pos_z,"minecraft:particle.soul_escape","blocks",5,0)
    level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.flintandsteel.use","blocks",1,1)
    let result_id = get_result_block(block)
    if (block.hasTag("kubejs:soulfire_convertables/wallpaper")) {
        soulfire_convert_perm_wallpaper(block,result_id)
    } else {
        block.set(result_id)
    }
    if (block.hasTag("kubejs:soulfire_convertables/creates_soulfire") && block.getUp().getId() == "minecraft:air") {
        block.getUp().set("minecraft:soul_fire")
    }
    global.soulfire_convert_generic(pos_x,pos_y,pos_z,level)
}
ItemEvents.rightClicked("eidolon:soulfire_wand", event => {
    let player = event.getPlayer()
    let [pos_x,pos_y,pos_z] = [player.getX(),player.getY(),player.getZ()]
    let level = player.getLevel()
    global.soulfire_convert_generic(pos_x,pos_y,pos_z,level)
    if (!player.isFake() && !player.isShiftKeyDown()) {
        event.cancel()
    }
})
BlockEvents.rightClicked(event => {
    let block = event.getBlock()
    if (block.hasTag("kubejs:soulfire_convertables")) {
        soulfire_convert_common_event(event)
    }
})
/**
* @param {Internal.BlockContainerJS} block
*/
function get_result_block(block){
    let block_id = block.getId()
    if (block_id == "kubejs:floor_tiles_infinite") {return "kubejs:floor_tiles"}
    if (block.hasTag("kubejs:soulfire_convertables/carpet")) {return "kubejs:soul_carpet"}
    if (block.hasTag("kubejs:soulfire_convertables/red_carpet")) {return "kubejs:red_soul_carpet"}
    if (block.hasTag("kubejs:soulfire_convertables/sand")) {return "minecraft:soul_sand"}
    if (block.hasTag("kubejs:soulfire_convertables/dirt")) {return "minecraft:soul_soil"}
    if (block.hasTag("kubejs:soulfire_convertables/stone")) {return "minecraft:blackstone"}
    if (block.hasTag("kubejs:soulfire_convertables/bricks")) {return "minecraft:nether_bricks"}
    if (block.hasTag("kubejs:soulfire_convertables/pool_tiles")) {return "kubejs:missing_tiles_empty_perm"}
    if (block.hasTag("kubejs:soulfire_convertables/floor_tiles")) {return "kubejs:floor_tiles_infinite"}
    if (block.hasTag("kubejs:soulfire_convertables/soft")) {return "minecraft:air"} //maybe these should convert into their fake variants?
}
/**
* @param {Internal.BlockContainerJS} block
* @param {String} result_id
*/
function soulfire_convert_perm_wallpaper(block,result_id){
    let [pos_x,pos_y,pos_z] = [block.getX(),block.getY(),block.getZ()]
    let level = block.getLevel()
    level.spawnParticles("minecraft:soul_fire_flame",false,pos_x,pos_y,pos_z,1,1,1,10,0.01)
    level.spawnParticles("minecraft:sculk_soul",false,pos_x,pos_y,pos_z,1,1,1,10,0.1)
    level.playSound(null,pos_x,pos_y,pos_z,"minecraft:particle.soul_escape","blocks",5,0)
    level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.flintandsteel.use","blocks",1,1)
    try {
        let age = block.properties.get("age")
        block.set(result_id,{"age":age})
    } catch (error) {
        block.set(result_id,{"age":"0"})
    }
}