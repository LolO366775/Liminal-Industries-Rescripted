BlockEvents.rightClicked('kubejs:rotten_wallpaper_block', event => {

    if (event.hand != 'MAIN_HAND')
        return

    if (event.player.mainHandItem.id != 'minecraft:air')
        return
// please let me die I hate writing JS code
    const directions = [
        event.block.north,
        event.block.south,
        event.block.east,
        event.block.west
    ]

    for (let crop of directions) {

        // Cave Carrot
        if (crop.id == 'kubejs:wall_cave_carrot_crop') {

            let age = Number(crop.properties.age)

            if (age >= 3) {

                crop.popItem(Item.of('miners_delight:cave_carrot', 1 + Math.floor(Math.random() * 3)))
                crop.set(crop.id, {
                    age: '0',
                    facing: crop.properties.facing
                })

                event.server.runCommandSilent(
                    `playsound minecraft:block.crop.break block @a ${crop.x} ${crop.y} ${crop.z} 1 1`
                )

                return
            }
        }

        // Uncanny Shroom
        if (crop.id == 'kubejs:uncanny_shroom_crop') {

            let age = Number(crop.properties.age)

            if (age >= 3) {

                crop.popItem(Item.of('kubejs:uncanny_shroom', 1 + Math.floor(Math.random() * 3)))

                crop.set(crop.id, {
                    age: '0',
                    facing: crop.properties.facing
                })

                event.server.runCommandSilent(
                    `playsound minecraft:block.roots.break block @a ${crop.x} ${crop.y} ${crop.z} 1 1`
                )

                return
            }
        }
		if (crop.id == 'kubejs:glowstone_mushroom_wall') {

            let age = Number(crop.properties.age)

            if (age >= 4) {

                crop.popItem(Item.of('thermal:glowstone_mushroom', 1 + Math.floor(Math.random() * 3)))

                crop.set(crop.id, {
                    age: '0',
                    facing: crop.properties.facing
                })

                event.server.runCommandSilent(
                    `playsound minecraft:block.roots.break block @a ${crop.x} ${crop.y} ${crop.z} 1 1`
                )

                return
            }
        }
    }
})