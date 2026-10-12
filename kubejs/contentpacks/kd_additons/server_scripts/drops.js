BlockEvents.broken('kubejs:clothing_pile', event => {
    const block = event.block
    const layers = block.properties.layers
    event.block.popItem(Item.of(`${layers}x kubejs:clothing_pile`))
})
BlockEvents.broken('kubejs:clothing_pile_full', event => {
        event.block.popItem(Item.of('8x kubejs:clothing_pile'))
})