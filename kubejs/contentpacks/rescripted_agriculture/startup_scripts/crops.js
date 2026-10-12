StartupEvents.registry('block', event => {
    event.create('uncanny_shroom_crop', 'cardinal')
        .displayName('Uncanny Shroom')
		.property(BlockProperties.HORIZONTAL_FACING)
        .material('plant')
        .hardness(0)
        .resistance(0)
        .notSolid()
        .noCollision()
		.noDrops()
        .noItem()
		.box(0, 0, 16, 16, 16, 13, true)
		//.box(4, 4, 4, 12, 12, 12, true)
        .defaultCutout()
        .property(BlockProperties.HORIZONTAL_FACING)
        .property(BlockProperties.AGE_3)
        .randomTick(tick => {
            const block = tick.block
            const currentAge = Number(block.properties.age)
            const facing = block.properties.facing

            if (currentAge < 3) {
                block.set(block.id, { 
                    age: (currentAge + 1).toString(), 
                    facing: facing 
                })
            }
        })
    event.create('wall_cave_carrot_crop', 'cardinal')
        .displayName('Cave Carrots')
		.property(BlockProperties.HORIZONTAL_FACING)
        .material('plant')
        .hardness(0)
        .resistance(0)
        .notSolid()
        .noCollision()
		.noDrops()
        .noItem()
		.box(0, 0, 16, 16, 16, 13, true)
		//.box(4, 4, 4, 12, 12, 12, true)
        .defaultCutout()
        .property(BlockProperties.HORIZONTAL_FACING)
        .property(BlockProperties.AGE_3)
        .randomTick(tick => {
            const block = tick.block
            const currentAge = Number(block.properties.age)
            const facing = block.properties.facing

            if (currentAge < 3) {
                block.set(block.id, { 
                    age: (currentAge + 1).toString(), 
                    facing: facing 
                })
            }
        })
		
//wire vines
event.create('wire_vines')
    .noItem()
    .material('metal')
    .notSolid()
    .noCollision()
	.hardness(0)
    .resistance(0)
    .defaultCutout()
    .property(BlockProperties.AGE_2)
    .randomTick(tick => {
        const block = tick.block
        const age = Number(block.properties.age)
        if (age < 2) {
            block.set(block.id, {
                age: (age + 1).toString()
            })
            return
        }
        if (block.down.id === 'minecraft:air') {
            block.down.set('kubejs:wire_vines', {
                age: '0'
            })
        }
    })
	
//red_carpet_growing
event.create('sprouting_red_carpet')
    .material('wool')
	.unbreakable()
    .notSolid()
    .noDrops()
    .noItem()
    .box(0, 0, 0, 16, 16, 16, true)
    .defaultCutout()
    .property(BlockProperties.AGE_3)
    .property(BlockProperties.BLOOM)
    .randomTick(tick => {
        const block = tick.block
        const age = Number(block.properties.age)
        const bloom = block.properties.bloom === 'true'
        if (age >= 3) {
            block.set('kubejs:red_carpet')
            return
        }
        block.set(block.id, {
            age: (age + 1).toString(),
            bloom: bloom.toString()
        })
        if (!bloom)
            return
        if (age < 1)
            return
        const positions = [
            block.north,
            block.south,
            block.east,
            block.west,
            block.north.east,
            block.north.west,
            block.south.east,
            block.south.west
        ]
        positions.forEach(neighbor => {
            if (neighbor.id === 'kubejs:carpet') {
                neighbor.set('kubejs:sprouting_red_carpet', {
                    age: '0',
                    bloom: 'false'
                })
            }
        })
    })
})