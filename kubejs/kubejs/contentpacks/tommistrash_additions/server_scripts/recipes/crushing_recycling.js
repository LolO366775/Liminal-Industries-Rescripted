ServerEvents.recipes(event => {
    event.recipes.create.crushing([Item.of('5x minecraft:gunpowder').withChance(0.7)], 'minecraft:tnt')
    event.recipes.create.crushing([Item.of('5x minecraft:gunpowder').withChance(0.7)], 'thermal:fire_tnt')
})