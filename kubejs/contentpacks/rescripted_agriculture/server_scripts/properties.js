BlockEvents.rightClicked(event => {

    if (event.player.mainHandItem.id != 'kubejs:uncanny_shroom_seeds')
        return

    if (event.block.id != 'kubejs:rotten_wallpaper_block')
        return

    let x = event.block.x
    let y = event.block.y
    let z = event.block.z

    if (event.facing == 'north') z--
    if (event.facing == 'south') z++
    if (event.facing == 'east') x++
    if (event.facing == 'west') x--

    let target = event.level.getBlock(x, y, z)

    if (target.id != 'minecraft:air')
        return

    event.server.runCommandSilent(
        `setblock ${x} ${y} ${z} kubejs:uncanny_shroom_crop[age=0,facing=${event.facing}]`
    )

    if (!event.player.creativeMode) {
        event.player.mainHandItem.shrink(1)
    }
})
BlockEvents.rightClicked(event => {

    if (event.player.mainHandItem.id != 'miners_delight:cave_carrot')
        return

    if (event.block.id != 'kubejs:rotten_wallpaper_block')
        return

    let x = event.block.x
    let y = event.block.y
    let z = event.block.z

    if (event.facing == 'north') z--
    if (event.facing == 'south') z++
    if (event.facing == 'east') x++
    if (event.facing == 'west') x--

    let target = event.level.getBlock(x, y, z)

    if (target.id != 'minecraft:air')
        return

    event.server.runCommandSilent(
        `setblock ${x} ${y} ${z} kubejs:wall_cave_carrot_crop[age=0,facing=${event.facing}]`
    )

    if (!event.player.creativeMode) {
        event.player.mainHandItem.shrink(1)
    }
})