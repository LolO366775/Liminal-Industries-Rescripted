ServerEvents.recipes(event => {
    event.replaceInput({id: 'minecraft:chain'}, 'minecraft:iron_ingot', 'minecraft:iron_nugget')
    event.remove({output:"create_connected:item_silo"})
})