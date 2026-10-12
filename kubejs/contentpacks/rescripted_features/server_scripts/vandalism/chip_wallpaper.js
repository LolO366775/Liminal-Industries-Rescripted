/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} result_block
* @param {String} result_item
*/
function chip_wallpaper_part(event,result_block,result_item){
    let {hand, player} = event
    let age = event.block.properties.get("age")
    if (age == "3") {
        let [pos_x,pos_y,pos_z] = [event.block.getX(),event.block.getY(),event.block.getZ()]
        event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.axe.strip","blocks",1,1)
        event.block.set(result_block)
        if (event.player.isFake()) {
            event.player.give(result_item)
        } else {
            event.block.popItemFromFace(result_item,event.facing)
        }  
        player.damageHeldItem(hand, 1)
    }
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} result_block
* @param {String} result_item
* @param {Boolean} can_have_nest
*/
function chip_wallpaper2(event,result_block,result_item,can_have_nest){
    let [pos_x,pos_y,pos_z] = [event.block.getX(),event.block.getY(),event.block.getZ()]
    event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.axe.strip","blocks",1,1)
    if (event.player.isFake()) {
        event.player.give(result_item)
        event.block.set(result_block)
    } else {
        if (can_have_nest && 0.05 >= Math.random()) {
            //create_wallpaper_nest(event.getBlock())
            event.block.set(result_block)
        } else {
            event.block.set(result_block)
        }
        event.block.popItemFromFace(result_item,event.facing)
    }
}
/**
* @param {Internal.BlockContainerJS} wallpaper
*/
function create_wallpaper_nest(wallpaper){
    if (0.2 >= Math.random()) {
        wallpaper.set("kubejs:wallpaper_nest",{"honey_level":"5"})
    } else if (0.1 >= Math.random()) {
        wallpaper.set("kubejs:wallpaper_nest",{"honey_level":"4"})
    } else if (0.1 >= Math.random()) {
        wallpaper.set("kubejs:wallpaper_nest",{"honey_level":"3"})
    } else if (0.1 >= Math.random()) {
        wallpaper.set("kubejs:wallpaper_nest",{"honey_level":"2"})
    } else if (0.1 >= Math.random()) {
        wallpaper.set("kubejs:wallpaper_nest",{"honey_level":"1"})
    } else {
        wallpaper.set("kubejs:wallpaper_nest",{"honey_level":"0"})
    }
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} result_block
* @param {Boolean} can_have_nest
*/
function click_wallpaper(event,result_block,can_have_nest){
    let {hand, player} = event
    if (hand == "main_hand") {
  	    if (event.item.id == "kubejs:putty_knife") {
            chip_wallpaper2(event,result_block,"kubejs:wallpaper",can_have_nest)
	    } else if (event.item.hasTag("minecraft:axes")) {
            chip_wallpaper2(event,result_block,"kubejs:wallpaper",can_have_nest)
            player.damageHeldItem(hand, 1)
        }
    }
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} result_block
*/
function click_stripped_wallpaper(event,result_block){
    let {hand} = event
    if (hand == "main_hand") {
  	    if (event.item.id == "kubejs:putty_knife") {
            chip_wallpaper_part(event,result_block,"kubejs:wallpaper")
	    } else if (event.item.hasTag("minecraft:axes")) {
            chip_wallpaper_part(event,result_block,"kubejs:wallpaper")
        }
    }
}
BlockEvents.rightClicked("kubejs:wallpaper1", event => {
    click_wallpaper(event,"kubejs:stripped_wallpaper",true)
})
BlockEvents.rightClicked("kubejs:stripped_wallpaper", event => {
    click_stripped_wallpaper(event,"kubejs:stripped_wallpaper")
})
BlockEvents.rightClicked("kubejs:wallpaper2", event => {
    click_wallpaper(event,"kubejs:stripped_wallpaper2",false)
})
BlockEvents.rightClicked("kubejs:stripped_wallpaper2", event => {
    click_stripped_wallpaper(event,"kubejs:stripped_wallpaper2")
})
BlockEvents.rightClicked("kubejs:wallpaper3", event => {
    click_wallpaper(event,"kubejs:stripped_wallpaper3",false)
})
BlockEvents.rightClicked("kubejs:stripped_wallpaper3", event => {
    click_stripped_wallpaper(event,"kubejs:stripped_wallpaper3")
})
BlockEvents.rightClicked("kubejs:wallpaper4", event => {
    click_wallpaper(event,"kubejs:stripped_wallpaper4",false)
})
BlockEvents.rightClicked("kubejs:stripped_wallpaper4", event => {
    click_stripped_wallpaper(event,"kubejs:stripped_wallpaper4")
})
BlockEvents.rightClicked("kubejs:wallpaper5", event => {
    click_wallpaper(event,"kubejs:stripped_wallpaper5",false)
})
BlockEvents.rightClicked("kubejs:stripped_wallpaper5", event => {
    click_stripped_wallpaper(event,"kubejs:stripped_wallpaper5")
})
BlockEvents.rightClicked("kubejs:wallpaper6", event => {
    click_wallpaper(event,"kubejs:stripped_wallpaper6",false)
})
BlockEvents.rightClicked("kubejs:stripped_wallpaper6", event => {
    click_stripped_wallpaper(event,"kubejs:stripped_wallpaper6")
})
BlockEvents.rightClicked("kubejs:wallpaper7", event => {
    click_wallpaper(event,"kubejs:stripped_wallpaper7",false)
})
BlockEvents.rightClicked("kubejs:stripped_wallpaper7", event => {
    click_stripped_wallpaper(event,"kubejs:stripped_wallpaper7")
})
