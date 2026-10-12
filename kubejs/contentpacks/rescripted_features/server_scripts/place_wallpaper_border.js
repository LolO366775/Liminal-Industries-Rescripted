/**
* @param {Internal.BlockContainerJS} wallpaper
* @param {String} wallpaper_id
* @param {String} border
*/
function place_wallpaper_border(wallpaper, wallpaper_id, border) {
    if (border == "down") {
        if (wallpaper.getId() != wallpaper_id) {
            if (wallpaper.getDown().hasTag("minecraft:replaceable")) {
                wallpaper.getDown().set(wallpaper_id,{"up":"true","down":"false"})
            }
        }
    }
    if (border == "up") {
        if (wallpaper.getId() != wallpaper_id) {
            if (wallpaper.getUp().hasTag("minecraft:replaceable")) {
                wallpaper.getUp().set(wallpaper_id,{"up":"false","down":"true"})
            }
        }
    }
}
BlockEvents.rightClicked(event => {
    let item = event.getItem()
    if(item.getId() == "kubejs:wallpaper5") {
        let wallpaper = event.getBlock()
        if (event.facing == "up") {
            place_wallpaper_border(wallpaper,"kubejs:wallpaper5","up")
        }
    } else if(item.getId() == "kubejs:wallpaper_manila1") {
        let wallpaper = event.getBlock()
        if (event.facing == "down") {
            place_wallpaper_border(wallpaper,"kubejs:wallpaper_manila1","down")
        }
        if (event.facing == "up") {
            place_wallpaper_border(wallpaper,"kubejs:wallpaper_manila1","up")
        }
    }
})