ServerEvents.recipes(event => {
    event.recipes.farmersdelight.cutting(
        '#dustrial_decor:padded_blocks',
        '#forge:tools/knives',
        [
            "3x minecraft:string",
            Item.of('minecraft:string')
            .withChance(0.5)
        ],
        'minecraft:block.wool.break'
    )
    event.recipes.farmersdelight.cutting(
        'dustrial_decor:mini_padded_slab',
        '#forge:tools/knives',
        [
            "1x minecraft:string",
            Item.of('minecraft:string')
            .withChance(0.7)
        ],
        'minecraft:block.wool.break'
    )
    event.recipes.farmersdelight.cutting(
        'dustrial_decor:padded_door',
        '#forge:tools/knives',
        [
            "5x minecraft:string",
            Item.of('minecraft:string')
            .withChance(0.5)
        ],
        'minecraft:block.wool.break'
    )
    event.recipes.farmersdelight.cutting(
        'dustrial_decor:padded_trapdoor',
        '#forge:tools/knives',
        [
            "15x minecraft:string",
            Item.of('5x minecraft:string')
            .withChance(0.5)
        ],
        'minecraft:block.wool.break'
    )
    event.recipes.farmersdelight.cutting(
        'dustrial_decor:mini_padded_stairs',
        '#forge:tools/knives',
        [
            "5x minecraft:string",
            Item.of('1x minecraft:string')
            .withChance(0.5)
        ],
        'minecraft:block.wool.break'
    )
})