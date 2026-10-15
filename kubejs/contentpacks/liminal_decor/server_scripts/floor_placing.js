//placing
BlockEvents.rightClicked('kubejs:floor_tiles', event => {

    if (event.hand != 'MAIN_HAND')
        return

    const flooringMap = {
        'kubejs:oak_flooring': 'kubejs:oak_flooring_block',
        'kubejs:spruce_flooring': 'kubejs:spruce_flooring_block',
        'kubejs:birch_flooring': 'kubejs:birch_flooring_block',
        'kubejs:jungle_flooring': 'kubejs:jungle_flooring_block',
        'kubejs:acacia_flooring': 'kubejs:acacia_flooring_block',
        'kubejs:dark_oak_flooring': 'kubejs:dark_oak_flooring_block',
        'kubejs:mangrove_flooring': 'kubejs:mangrove_flooring_block',
        'kubejs:cherry_flooring': 'kubejs:cherry_flooring_block',
        'kubejs:bamboo_flooring': 'kubejs:bamboo_flooring_block',
        'kubejs:crimson_flooring': 'kubejs:crimson_flooring_block',
        'kubejs:warped_flooring': 'kubejs:warped_flooring_block',
        'kubejs:treated_wood_flooring': 'kubejs:treated_wood_flooring_block',
        'kubejs:polished_wood_flooring': 'kubejs:polished_wood_flooring_block',
        'kubejs:checker_flooring': 'kubejs:checker_flooring_block',
		'create:cardboard': 'kubejs:cardboard_flooring_block',
        'tconstruct:seared_brick':'kubejs:seared_flooring_block',
    }

    const heldItem = event.player.mainHandItem.id

    if (!(heldItem in flooringMap))
        return

    event.block.set(flooringMap[heldItem])

    if (!event.player.creativeMode) {
        event.player.mainHandItem.shrink(1)
    }

    event.server.runCommandSilent(
        `playsound minecraft:block.wood.place block @a ${event.block.x} ${event.block.y} ${event.block.z} 1 1`
    )
})
//scrapping
BlockEvents.rightClicked(event => {

    if (event.hand != 'MAIN_HAND')
        return
    const flooringBlocks = [
        'kubejs:oak_flooring_block',
        'kubejs:spruce_flooring_block',
        'kubejs:birch_flooring_block',
        'kubejs:jungle_flooring_block',
        'kubejs:acacia_flooring_block',
        'kubejs:dark_oak_flooring_block',
        'kubejs:mangrove_flooring_block',
        'kubejs:cherry_flooring_block',
        'kubejs:bamboo_flooring_block',
        'kubejs:crimson_flooring_block',
        'kubejs:warped_flooring_block',
        'kubejs:treated_wood_flooring_block',
        'kubejs:polished_wood_flooring_block',
        'kubejs:checker_flooring_block',
        'kubejs:cardboard_flooring_block',
        'kubejs:seared_flooring_block'
    ]	
    if (!flooringBlocks.includes(event.block.id))
        return

    const blockId = event.block.id
    let flooringItem;
    let breakSound = 'minecraft:block.wood.break';

    if (blockId === 'kubejs:cardboard_flooring_block') {
        if (!event.item.hasTag('minecraft:axes'))
            return
        flooringItem = 'create:cardboard'
        breakSound = 'minecraft:block.wool.break'
    } else if (blockId === 'kubejs:checker_flooring_block') {
        if (!event.item.hasTag('minecraft:pickaxes'))
            return
        flooringItem = blockId.replace('_block', '')
        breakSound = 'minecraft:block.stone.break'
    } else if (blockId =='kubejs:seared_flooring_block') {
        if (!event.item.hasTag('minecraft:pickaxes'))
            return
        flooringItem = 'tconstruct:seared_brick'
        breakSound = 'minecraft:block.stone.break'
    } else {
        if (!event.item.hasTag('minecraft:axes'))
            return
        flooringItem = blockId.replace('_block', '')
    }
    const x = event.block.x
    const y = event.block.y
    const z = event.block.z
    event.block.set('kubejs:floor_tiles')
    event.level.getBlock(x, y + 1, z).popItem(flooringItem)
    if (!event.player.creativeMode) {
        event.player.damageHeldItem(event.hand, 1)
    }
    event.server.runCommandSilent(
        `playsound ${breakSound} block @a ${event.block.x} ${event.block.y} ${event.block.z} 1 1`
    )
})
