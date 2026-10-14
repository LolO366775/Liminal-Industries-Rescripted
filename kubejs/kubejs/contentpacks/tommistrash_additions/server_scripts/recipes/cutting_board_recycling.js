ServerEvents.recipes(event => {
    event.recipes.farmersdelight.cutting(
        'create_connected:crank_wheel',
        '#minecraft:axes',
        [
            "create:cogwheel",
            "create:hand_crank"
        ],
        'item.axe.strip'
    )
    event.recipes.farmersdelight.cutting(
        'create_connected:large_crank_wheel',
        '#minecraft:axes',
        [
            "create:large_cogwheel",
            "create:hand_crank"
        ],
        'item.axe.strip'
    )
    event.recipes.farmersdelight.cutting(
        'minecraft:repeater',
        '#minecraft:pickaxes',
        [
            "minecraft:redstone",
            "2x minecraft:redstone_torch",
            "minecraft:cobblestone",
            Item.of('minecraft:cobblestone')
                .withChance(0.7)
        ],
        'block.stone.break'
    )
    event.remove({ id: 'minecraft:lectern' })
    event.recipes.farmersdelight.cutting(
        'minecraft:lectern',
        '#minecraft:axes',
        [
            "minecraft:oak_planks",
            Item.of('3x minecraft:book')
                .withChance(0.7),
            Item.of('minecraft:oak_planks')
                .withChance(0.2),
        ],
        'item.axe.strip'
    )
    event.recipes.farmersdelight.cutting(
        'immersiveengineering:wooden_barrel',
        '#minecraft:axes',
        [
            "3x immersiveengineering:treated_wood_horizontal",
            Item.of('2x immersiveengineering:treated_wood_horizontal')
                .withChance(0.5)
        ],
        'item.axe.strip'
    )
})