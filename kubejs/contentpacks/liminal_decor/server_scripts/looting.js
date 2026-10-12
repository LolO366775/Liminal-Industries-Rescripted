BlockEvents.rightClicked('kubejs:loaded_closet', event => {
    if (event.block.id != 'kubejs:loaded_closet') return
    let bottom
    if (event.block.properties.get('half') == 'bottom') {
        bottom = event.block
    } else {
        bottom = event.block.down
    }
    let top = bottom.up
    const facing = bottom.properties.get('facing')
    const totalItems = 8 + Math.floor(Math.random() * 9) //total items 8-16
    const filledCans = 1 + Math.floor(Math.random() * 4) //of which 1-4 are filled cans
    const emptyCans = totalItems - filledCans
    let spawnX = bottom.x + 0.5
    let spawnY = bottom.y + 0.3
    let spawnZ = bottom.z + 0.5
    if (facing == 'north') spawnZ -= 1.1
    if (facing == 'south') spawnZ += 1.1
    if (facing == 'west')  spawnX -= 1.1
    if (facing == 'east')  spawnX += 1.1
    if (filledCans > 0) {
        let filledEntity = bottom.level.createEntity('item')
        filledEntity.x = spawnX
        filledEntity.y = spawnY
        filledEntity.z = spawnZ
        filledEntity.item = Item.of('kubejs:almond_water_can', filledCans)
        filledEntity.spawn()
    }
    if (emptyCans > 0) {
        let emptyEntity = bottom.level.createEntity('item')
        emptyEntity.x = spawnX
        emptyEntity.y = spawnY
        emptyEntity.z = spawnZ
        emptyEntity.item = Item.of('kubejs:empty_almond_water_can', emptyCans)
        emptyEntity.spawn()
    }
    event.server.runCommandSilent(`playsound minecraft:block.beehive.enter block @a ${bottom.x} ${bottom.y} ${bottom.z} 1 1`)
    bottom.set('kubejs:closet', { half: 'bottom', facing: facing })
    top.set('kubejs:closet', { half: 'top', facing: facing })
})
