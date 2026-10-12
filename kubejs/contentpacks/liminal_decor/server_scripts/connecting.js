function updateWallpaper(block) {

    if (block.id != 'kubejs:wallpaper_manila')
        return

    const above = block.up
    const below = block.down

    const aboveWallpaper = above.id == 'kubejs:wallpaper_manila'
    const belowWallpaper = below.id == 'kubejs:wallpaper_manila'

    let age = 0
    //top
    if (!aboveWallpaper && belowWallpaper)
        age = 2
    //bottom
    else if (aboveWallpaper && !belowWallpaper)
        age = 1
    //mid
    else
        age = 0
    block.set(block.id, {
        age: age.toString()
    })
}
BlockEvents.placed('kubejs:wallpaper_manila', event => {

    updateWallpaper(event.block)

    if (event.block.up.id == 'kubejs:wallpaper_manila')
        updateWallpaper(event.block.up)

    if (event.block.down.id == 'kubejs:wallpaper_manila')
        updateWallpaper(event.block.down)
})
BlockEvents.broken('kubejs:wallpaper_manila', event => {

    if (event.block.up.id == 'kubejs:wallpaper_manila')
        updateWallpaper(event.block.up)

    if (event.block.down.id == 'kubejs:wallpaper_manila')
        updateWallpaper(event.block.down)
})