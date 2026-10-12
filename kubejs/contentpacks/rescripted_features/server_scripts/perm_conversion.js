const perm_conversions = [
    //wallpapers
    ["kubejs:wallpaper1","kubejs:stripped_wallpaper_perm"],
    ["kubejs:wallpaper2","kubejs:stripped_wallpaper2_perm"],
    ["kubejs:wallpaper3","kubejs:stripped_wallpaper3_perm"],
    ["kubejs:wallpaper4","kubejs:stripped_wallpaper4_perm"],
    ["kubejs:wallpaper5","kubejs:stripped_wallpaper5_perm"],
    ["kubejs:wallpaper6","kubejs:stripped_wallpaper6_perm"],
    ["kubejs:wallpaper7","kubejs:stripped_wallpaper7_perm"],
    ["kubejs:stripped_wallpaper","kubejs:stripped_wallpaper_perm"],
    ["kubejs:stripped_wallpaper2","kubejs:stripped_wallpaper2_perm"],
    ["kubejs:stripped_wallpaper3","kubejs:stripped_wallpaper3_perm"],
    ["kubejs:stripped_wallpaper4","kubejs:stripped_wallpaper4_perm"],
    ["kubejs:stripped_wallpaper5","kubejs:stripped_wallpaper5_perm"],
    ["kubejs:stripped_wallpaper6","kubejs:stripped_wallpaper6_perm"],
    ["kubejs:stripped_wallpaper7","kubejs:stripped_wallpaper7_perm"],
    ["kubejs:stripped_wallpaper_perm","kubejs:wallpaper1"],
    ["kubejs:stripped_wallpaper2_perm","kubejs:wallpaper2"],
    ["kubejs:stripped_wallpaper3_perm","kubejs:wallpaper3"],
    ["kubejs:stripped_wallpaper4_perm","kubejs:wallpaper4"],
    ["kubejs:stripped_wallpaper5_perm","kubejs:wallpaper5"],
    ["kubejs:stripped_wallpaper6_perm","kubejs:wallpaper6"],
    ["kubejs:stripped_wallpaper7_perm","kubejs:wallpaper7"],
    //floor tiles
    ["kubejs:floor_tiles","kubejs:floor_tiles_infinite"],
    ["kubejs:floor_tiles_infinite","kubejs:carpet"],
    //pool tiles
    ["kubejs:pool_tiles","kubejs:missing_tiles_empty_perm"],
    ["kubejs:pool_tiles_golden","kubejs:missing_tiles_empty_perm"],
    ["kubejs:pool_tiles_golden_half","kubejs:missing_tiles_empty_perm"],
    ["kubejs:pool_tiles_wet","kubejs:missing_tiles_empty_perm"],
    ["kubejs:pool_tiles","kubejs:missing_tiles_empty_perm"],
    ["kubejs:pool_tiles_sky","kubejs:missing_tiles_empty_perm"],
    ["kubejs:missing_tiles_half","kubejs:missing_tiles_empty_perm"],
    ["kubejs:missing_tiles_empty","kubejs:missing_tiles_empty_perm"],
    ["kubejs:missing_tiles_empty_perm","kubejs:pool_tiles"]
]
ServerEvents.recipes(event => {
    for (let index = 0; index < perm_conversions.length; index++) {
        try {
            let conversion_data = perm_conversions[index]
            let block_id = conversion_data[0]
            let result_id = conversion_data[1]
            add_perm_conversion_recipe(event,block_id,result_id)
        } catch (error) {
            console.log("Error adding permanent conversion recipe: " + error)
        }
    }  
})
ServerEvents.tags('block', event => {
    for (let index = 0; index < perm_conversions.length; index++) {
        try {
            let conversion_data = perm_conversions[index]
            let block_id = conversion_data[0]
            event.add('kubejs:perm_convertable', block_id)
        } catch (error) {
            console.log("Error adding permanent conversion tag: " + error)
        }
    }
})
/**
* @param {Internal.RecipesEventJS} event
* @param {String} block_id
* @param {String} item_id
* @param {String} result_id
*/
function add_perm_conversion_recipe(event,block_id,result_id){
    event.custom({
        "type": "create:item_application",
		"ingredients":[
			{"item": block_id},
			{"item": "eidolon:enchanted_ash"}
        ],
		"results": [
			{"item": result_id}
        ]
	})
}
//I could even copy growth stages here, getting the result id of the constant
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function perm_conversion_event(event){
    if (event.getItem() == "eidolon:enchanted_ash") {
        let block = event.getBlock()
        let [pos_x,pos_y,pos_z] = [block.getX() + 0.5,block.getY() + 0.5,block.getZ() + 0.5]
        let level = block.getLevel()
        level.spawnParticles("minecraft:soul_fire_flame",false,pos_x,pos_y,pos_z,0.75,0.75,0.75,10,0.0)
        level.spawnParticles("minecraft:sculk_soul",false,pos_x,pos_y,pos_z,0.75,0.75,0.75,10,0)
        level.spawnParticles("minecraft:enchant",false,pos_x,pos_y,pos_z,0.5,0.5,0.5,50,0)
        //level.playSound(null,pos_x,pos_y,pos_z,"minecraft:particle.soul_escape","blocks",5,0)
        level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.flintandsteel.use","blocks",1,1)
        level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.enchantment_table.use","blocks",1,2)
        //minecraft:item.axe.scrape block
    }
}