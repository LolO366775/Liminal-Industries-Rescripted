BlockEvents.rightClicked('kubejs:strange_bricks', event => {

    if (event.hand != 'MAIN_HAND')
        return

    if (!event.player.mainHandItem.hasTag('minecraft:pickaxes'))
        return

    let age = Number(event.block.properties.age)

    if (age >= 2)
        return

    event.block.set(
        'kubejs:strange_bricks',
        {
            age: (age + 1).toString()
        }
    )
    event.server.runCommandSilent(
        `playsound minecraft:block.stone.break block @a ${event.block.x} ${event.block.y} ${event.block.z} 1 1`
    )
})
BlockEvents.rightClicked('kubejs:strange_bricks', event => {

    if (event.player.mainHandItem.id != 'kubejs:corrosive_fungi')
        return

    if (Number(event.block.properties.age) != 2)
        return

    event.block.set('kubejs:infected_strange_bricks')

    if (!event.player.creativeMode) {
        event.player.mainHandItem.shrink(1)
    }

    event.server.runCommandSilent(
        `playsound minecraft:block.roots.place block @a ${event.block.x} ${event.block.y} ${event.block.z} 1 0.8`
    )
	event.server.runCommandSilent(
    `particle dust 1 0.5 0 1 ${event.block.x + 0.5} ${event.block.y + 0.5} ${event.block.z + 0.5} 0.5 0.5 0.5 0 100 force`
)
})