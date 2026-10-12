/* Original script
BlockEvents.rightClicked('kubejs:ceilling_lamp', event => {
    const lamp = event.block
    if (event.item.id !== 'kubejs:crowbar')
        return
    if (lamp.down.id !== 'minecraft:air' && lamp.down.id !== 'minecraft:light')
        return

            event.level.playSound(null,lamp.x,lamp.y,lamp.z,'immersiveengineering:tesla','blocks',1.0,1.0)
            event.level.playSound(null,lamp.x,lamp.y,lamp.z,'block.chain.break','blocks',1.0,1.0)
            let block = lamp.down
            while (block.id === 'minecraft:light') {
                block.set('minecraft:air')
                block = block.down
            }
            lamp.down.set('kubejs:ceilling_scrap')
            lamp.set('kubejs:ceilling_socket', {
            occupied: 'false'
		})
})*/
// This one also rips off sorrounding lamps
/*BlockEvents.rightClicked('kubejs:ceilling_lamp', event => {
    const lamp = event.block
    if (event.item.id !== 'kubejs:crowbar')
        return
    if (lamp.down.id !== 'minecraft:air' &&
        lamp.down.id !== 'minecraft:light')
        return
    const ripLamp = block => {
        event.level.playSound(null,lamp.x,lamp.y,lamp.z,'immersiveengineering:tesla','blocks',0.3,1.2)
        event.level.playSound(null,lamp.x,lamp.y,lamp.z,'block.chain.break','blocks',1.0,1.0)
        let below = block.down
        while (below.id === 'minecraft:light') {
            below.set('minecraft:air')
            below = below.down
        }
        block.down.set('kubejs:ceilling_scrap')
        block.set('kubejs:ceilling_socket', {
            occupied: 'false'
        })
    }
    ripLamp(lamp)
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

        if (block.down.id !== 'minecraft:air' &&
            block.down.id !== 'minecraft:light')
            return

        ripLamp(block)
    })
})
BlockEvents.rightClicked('kubejs:ceilling_lamp2', event => {
    const lamp = event.block
    if (event.item.id !== 'kubejs:crowbar')
        return
    if (lamp.down.id !== 'minecraft:air' &&
        lamp.down.id !== 'minecraft:light')
        return
    const ripLamp = block => {
        event.level.playSound(null,lamp.x,lamp.y,lamp.z,'immersiveengineering:tesla','blocks',0.3,1.2)
        event.level.playSound(null,lamp.x,lamp.y,lamp.z,'block.chain.break','blocks',1.0,1.0)
        let below = block.down
        while (below.id === 'minecraft:light') {
            below.set('minecraft:air')
            below = below.down
        }
        block.down.set('kubejs:white_ceilling_scrap')
        block.set('kubejs:ceilling_socket', {
            occupied: 'false'
        })
    }
    ripLamp(lamp)
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
        if (block.id !== 'kubejs:ceilling_lamp2')
            return

        if (block.down.id !== 'minecraft:air' &&
            block.down.id !== 'minecraft:light')
            return

        ripLamp(block)
    })
})
BlockEvents.rightClicked('kubejs:ceilling_lamp_broken', event => {
    const lamp = event.block
    if (event.item.id !== 'kubejs:crowbar')
        return
    if (lamp.down.id !== 'minecraft:air' &&
        lamp.down.id !== 'minecraft:light')
        return
    const ripLamp = block => {
        event.level.playSound(null,lamp.x,lamp.y,lamp.z,'immersiveengineering:tesla','blocks',0.3,1.2)
        event.level.playSound(null,lamp.x,lamp.y,lamp.z,'block.chain.break','blocks',1.0,1.0)
        let below = block.down
        while (below.id === 'minecraft:light') {
            below.set('minecraft:air')
            below = below.down
        }
        block.down.set('kubejs:broken_ceilling_scrap')
        block.set('kubejs:ceilling_socket', {
            occupied: 'false'
        })
    }
    ripLamp(lamp)
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
        if (block.id !== 'kubejs:ceilling_lamp_broken')
            return

        if (block.down.id !== 'minecraft:air' &&
            block.down.id !== 'minecraft:light')
            return

        ripLamp(block)
    })
})
BlockEvents.rightClicked('kubejs:ceilling_lamp2_broken', event => {
    const lamp = event.block
    if (event.item.id !== 'kubejs:crowbar')
        return
    if (lamp.down.id !== 'minecraft:air' &&
        lamp.down.id !== 'minecraft:light')
        return
    const ripLamp = block => {
        event.level.playSound(null,lamp.x,lamp.y,lamp.z,'immersiveengineering:tesla','blocks',0.3,1.2)
        event.level.playSound(null,lamp.x,lamp.y,lamp.z,'block.chain.break','blocks',1.0,1.0)
        let below = block.down
        while (below.id === 'minecraft:light') {
            below.set('minecraft:air')
            below = below.down
        }
        block.down.set('kubejs:broken_white_ceilling_scrap')
        block.set('kubejs:ceilling_socket', {
            occupied: 'false'
        })
    }
    ripLamp(lamp)
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
        if (block.id !== 'kubejs:ceilling_lamp2_broken')
            return

        if (block.down.id !== 'minecraft:air' &&
            block.down.id !== 'minecraft:light')
            return

        ripLamp(block)
    })
})

BlockEvents.rightClicked('kubejs:crimsite_lamp', event => {
    const lamp = event.block
    if (event.item.id !== 'kubejs:crowbar')
        return
    if (lamp.down.id !== 'minecraft:air' &&
        lamp.down.id !== 'minecraft:light')
        return
    const ripLamp = block => {
        event.level.playSound(null,lamp.x,lamp.y,lamp.z,'immersiveengineering:tesla','blocks',0.3,1.2)
        event.level.playSound(null,lamp.x,lamp.y,lamp.z,'block.chain.break','blocks',1.0,1.0)
        let below = block.down
        while (below.id === 'minecraft:light') {
            below.set('minecraft:air')
            below = below.down
        }
        block.down.set('kubejs:crimsite_lamp_falling')
        block.set('kubejs:ceilling_socket', {
            occupied: 'false'
        })
    }
    ripLamp(lamp)
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

        if (block.down.id !== 'minecraft:air' &&
            block.down.id !== 'minecraft:light')
            return

        ripLamp(block)
    })
})*/