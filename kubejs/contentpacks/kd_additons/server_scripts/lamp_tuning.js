BlockEvents.rightClicked('kubejs:ceilling_lamp', event => {
    const lamp = event.block
    if (!event.item.hasTag('forge:tools/wrench'))
        return
    const tuneLamp = block => {
        event.level.playSound(null,block.x,block.y,block.z,'block.lever.click','blocks',1.0,1.0)

        let below = block.down
        while (
            below.id === 'minecraft:air' ||
            below.id === 'torchmaster:invisible_light'
        ) {
            let groundCheck = below

            for (let i = 0; i < 5; i++) {
                groundCheck = groundCheck.down
            }
            if (
                groundCheck.id !== 'minecraft:air' &&
                groundCheck.id !== 'torchmaster:invisible_light'
            ) {
                break
            }
            if (below.id === 'minecraft:air') {
                below.set('torchmaster:invisible_light')
            }
            below = below.down
        }
    }
    tuneLamp(lamp)
    const touching = [
        lamp.north,
        lamp.south,
        lamp.east,
        lamp.west,
		lamp.north.east,
        lamp.north.west,
        lamp.south.east,
        lamp.south.west
    ]
    touching.forEach(block => {
        if (block.id !== 'kubejs:ceilling_lamp')
            return
        tuneLamp(block)
    })
})

BlockEvents.rightClicked('kubejs:crimsite_lamp', event => {
    const lamp = event.block
    if (!event.item.hasTag('forge:tools/wrench'))
        return
    const tuneLamp = block => {
        event.level.playSound(null,block.x,block.y,block.z,'block.lever.click','blocks',1.0,1.0)
        let below = block.down
        while (
            below.id === 'minecraft:air' ||
            below.id === 'torchmaster:invisible_light'
        ) {
            below = below.down
        }
        const ground = below
        below = block.down
        while (below.y > ground.y + 5) {
            if (below.id === 'minecraft:air') {
                below.set('torchmaster:invisible_light')
            }
            below = below.down
        }
        if (ground.id === 'kubejs:carpet') {
            ground.set('kubejs:sprouting_red_carpet', {
                age: '0',
                bloom: 'true'
            })
        }
        const carpetPositions = [
            ground.north,
            ground.south,
            ground.east,
            ground.west
        ]
        carpetPositions.forEach(carpet => {
            if (carpet.id === 'kubejs:carpet') {
                carpet.set('kubejs:sprouting_red_carpet', {
                    age: '0',
                    bloom: 'true'
                })
            }
        })
    }
    tuneLamp(lamp)
    const touching = [
        lamp.north,
        lamp.south,
        lamp.east,
        lamp.west,
        lamp.north.east,
        lamp.north.west,
        lamp.south.east,
        lamp.south.west
    ]
    touching.forEach(block => {
        if (block.id !== 'kubejs:crimsite_lamp')
            return

        tuneLamp(block)
    })
})