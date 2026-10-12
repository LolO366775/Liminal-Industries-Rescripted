BlockEvents.broken('kubejs:wire_vines', event => {
    const block = event.block
    let below = block.down
    let age = block.properties.age
    block.popItem(Item.of(`${age}x immersiveengineering:wire_copper`))
    while (below.id === 'kubejs:wire_vines') {
        age = below.properties.age
        below.popItem(Item.of(`${age}x immersiveengineering:wire_copper`))
        below.set('minecraft:air')
        below = below.down
    }
})