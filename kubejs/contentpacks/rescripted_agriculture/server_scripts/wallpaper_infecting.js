function chip_wallpaper(event,result_block,result_item){
    const [pos_x,pos_y,pos_z] = [event.block.getX(),event.block.getY(),event.block.getZ()]
    event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.axe.strip","blocks",1,1)
    event.block.set(result_block)
    if (event.player.isFake()) {
        event.player.give(result_item)
    } else {
        event.block.popItemFromFace(result_item,event.facing)
    }
    return 1
}

BlockEvents.rightClicked('kubejs:stripped_wallpaper', event => {

	if (event.item.id == 'kubejs:rotten_wallpaper') {
		event.item.count--
        event.block.set("kubejs:rotten_wallpaper_block")
	}
})

BlockEvents.rightClicked("kubejs:rotten_wallpaper_block", event => {
    const { hand, player, block, level } = event
    let isPuttyKnife = event.item.id === "kubejs:putty_knife"
    let isAxe = event.item.hasTag("minecraft:axes")

    if (isPuttyKnife || isAxe) {
        let offsets = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 }
        ]

        offsets.forEach(offset => {
            let adjBlock = level.getBlock(block.x + offset.x, block.y, block.z + offset.z)
            
            if (adjBlock.id.toString() === "kubejs:uncanny_shroom_crop") {
                adjBlock.popItem()
                event.server.runCommandSilent(`setblock ${adjBlock.x} ${adjBlock.y} ${adjBlock.z} minecraft:air destroy`)
            }
        })
		
		offsets.forEach(offset => {
            let adjBlock = level.getBlock(block.x + offset.x, block.y, block.z + offset.z)
            
            if (adjBlock.id.toString() === "kubejs:wall_cave_carrot_crop") {
                adjBlock.popItem()
                event.server.runCommandSilent(`setblock ${adjBlock.x} ${adjBlock.y} ${adjBlock.z} minecraft:air destroy`)
            }
        })

        if (isPuttyKnife) {
            chip_wallpaper(event, "kubejs:stripped_wallpaper", "kubejs:rotten_wallpaper")
        } else if (isAxe) {
            chip_wallpaper(event, "kubejs:stripped_wallpaper", "kubejs:rotten_wallpaper")
            player.damageHeldItem(hand, 1)
        }
    }
})
