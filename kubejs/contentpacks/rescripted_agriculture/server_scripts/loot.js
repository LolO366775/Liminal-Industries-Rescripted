BlockEvents.broken('kubejs:uncanny_shroom_crop', event => {

    const age = Number(event.block.properties.age)

    if (age >= 3) {
        event.block.popItem(Item.of('kubejs:uncanny_shroom', 1 + Math.floor(Math.random() * 3)))
        event.block.popItem(Item.of('kubejs:uncanny_shroom_seeds', 1 + Math.floor(Math.random() * 2)))
    } else {
        event.block.popItem('kubejs:uncanny_shroom_seeds')
    }
})
BlockEvents.broken('kubejs:wall_cave_carrot_crop', event => {

    const age = Number(event.block.properties.age)

    if (age >= 2) {
        event.block.popItem(Item.of('miners_delight:cave_carrot', 1 + Math.floor(Math.random() * 3)))
        event.block.popItem(Item.of('miners_delight:cave_carrot', 1 + Math.floor(Math.random() * 2)))
    } else {
        event.block.popItem('miners_delight:cave_carrot')
    }
})