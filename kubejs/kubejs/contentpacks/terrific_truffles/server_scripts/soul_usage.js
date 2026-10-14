ServerEvents.recipes(event => {

    event.recipes.botania.mana_infusion(
        Item.of('eidolon:lesser_soul_gem', 1),
        'endrem:undead_soul',
        200,
        'minecraft:soul_campfire'
    )

    event.recipes.botania.mana_infusion(
        Item.of('eidolon:lesser_soul_gem', 1),
        'endrem:undead_soul',
        200,
        'decorative_blocks:soul_brazier'
    )
})


const UNDEAD_SOUL_TRANSFORMATION = {
    'minecraft:chiseled_stone_bricks': 'moyai:moyai',
    'minecraft:gravel': 'supplementaries:flint_block',
    'farmersdelight:organic_compost': 'farmersdelight:rich_soil',
    'minecraft:redstone_lamp': 'minecraft:shroomlight',
    'minecraft:warped_wart_block': 'minecraft:nether_wart_block',
    'minecraft:nether_wart_block': 'minecraft:warped_wart_block',
    'kubejs:sculked_sculk_scrubber': 'kubejs:sculk_scrubber',
}

ServerEvents.recipes(event => {
    Object.entries(UNDEAD_SOUL_TRANSFORMATION).forEach(([input, output]) => {
        event.custom({
            type: "create:item_application",
            ingredients: [
                { item: input },
                { item: "endrem:undead_soul" }
            ],
            results: [
                { item: output }
            ]
        }).id(`kubejs:${input.split(":")[1]}_undead_soul`)
    })
})

BlockEvents.rightClicked(event => {
    if (event.level.isClientSide()) return
    if (event.item.id !== "endrem:undead_soul") return

    if (event.block.id in UNDEAD_SOUL_TRANSFORMATION) {
        event.level.playSound(
            null,
            event.block.x + 0.5,
            event.block.y + 0.5,
            event.block.z + 0.5,
            "minecraft:entity.wither.hurt",
            "blocks",
            0.3 * Math.random(),
            1 + 0.5 * Math.random()
        )
        const x = event.block.x + 0.5
        const y = event.block.y + 0.6
        const z = event.block.z + 0.5

        event.server.runCommandSilent(`particle minecraft:soul ${x} ${y} ${z} 0.3 0.5 0.3 0.02 40 force`)
        event.server.runCommandSilent(`particle minecraft:ash ${x} ${y} ${z} 0.2 0.2 0.2 0.01 10 force`)
    }
})