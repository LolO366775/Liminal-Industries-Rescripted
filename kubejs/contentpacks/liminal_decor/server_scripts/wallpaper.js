function chip_wallpaper(event, result_block, result_item) {
    const [x, y, z] = [event.block.x, event.block.y, event.block.z]
    event.level.playSound(
        null,
        x, y, z,
        "minecraft:item.axe.strip",
        "blocks",
        1, 1
    )

    event.block.set(result_block)

    if (event.player.isFake()) {
        event.player.give(result_item)
    } else {
        event.block.popItemFromFace(result_item, event.facing)
    }
}
const wallpapers = {
    "kubejs:wallpaper_red": "kubejs:wallpaper_red_block",
    "kubejs:wallpaper_orange": "kubejs:wallpaper_orange_block",
    "kubejs:wallpaper_green": "kubejs:wallpaper_green_block",
    "kubejs:wallpaper_lime": "kubejs:wallpaper_lime_block",
    "kubejs:wallpaper_blue": "kubejs:wallpaper_blue_block",
    "kubejs:wallpaper_lblue": "kubejs:wallpaper_lblue_block",
    "kubejs:wallpaper_pink": "kubejs:wallpaper_pink_block",
    "kubejs:wallpaper_purple": "kubejs:wallpaper_purple_block"
	//"kubejs:wallpaper_black_block": "kubejs:wallpaper_black", future plans, night sky theme or just black stripes
	//"kubejs:wallpaper_white_block": "kubejs:wallpaper_white", future plans, bone theme
	//"kubejs:wallpaper_yellow_block": "kubejs:wallpaper_yellow" future plans, lemon theme, recoloured lime
}
const wallpaperItems = {
    "kubejs:wallpaper_red_block": "kubejs:wallpaper_red",
    "kubejs:wallpaper_orange_block": "kubejs:wallpaper_orange",
    "kubejs:wallpaper_green_block": "kubejs:wallpaper_green",
    "kubejs:wallpaper_lime_block": "kubejs:wallpaper_lime",
    "kubejs:wallpaper_blue_block": "kubejs:wallpaper_blue",
    "kubejs:wallpaper_lblue_block": "kubejs:wallpaper_lblue",
    "kubejs:wallpaper_pink_block": "kubejs:wallpaper_pink",
    "kubejs:wallpaper_purple_block": "kubejs:wallpaper_purple",
	"kubejs:wallpaper_black_block": "kubejs:wallpaper_black"
	//"kubejs:wallpaper_black_block": "kubejs:wallpaper_black", future plans, night sky theme or just black stripes
	//"kubejs:wallpaper_white_block": "kubejs:wallpaper_white", future plans, bone theme
	//"kubejs:wallpaper_yellow_block": "kubejs:wallpaper_yellow" future plans, lemon theme, recoloured lime
}
const wallpaperBlocks = Object.values(wallpapers)
BlockEvents.rightClicked("kubejs:stripped_wallpaper", event => {
    const result = wallpapers[event.item.id]
    if (!result) return
    event.item.shrink(1)
    event.block.set(result)
})
BlockEvents.rightClicked(wallpaperBlocks, event => {
    const { hand, player } = event
    const isPuttyKnife = event.item.id == "kubejs:putty_knife"
    const isAxe = event.item.hasTag("minecraft:axes")
    if (!isPuttyKnife && !isAxe)
        return
    chip_wallpaper(
        event,
        "kubejs:stripped_wallpaper",
        wallpaperItems[event.block.id]
    )
})