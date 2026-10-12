// priority: 0


StartupEvents.registry('block', event => {

	let ticking_porous_stone = (id,display_name,map_colour,sound_type,colour) => {
		event.create(id)
		.fullBlock(true)
		.mapColor(map_colour)
		.soundType(sound_type)
		.unbreakable()
		.tagBlock('wither_immune')
		.property(BlockProperties.AGE_3)
		.randomTick(tick => {
    		let block = tick.block
			let properties = block.properties
			let age = Number(properties.age)
	    	if (age == 3) {
      			block.set('kubejs:missing_tiles_half')
			} else {
        		block.set(block.getId(), {
          			age: `${age+1}`
				})
			}
		})
		.displayName(display_name)
		.item(item => item.modelJson({"parent": `kubejs:block/porous_stone/${colour}1`}))
		.blockstateJson = {
  			"variants": {
    			"": [{
      				"model": `kubejs:block/porous_stone/${colour}1`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/porous_stone/${colour}2`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/porous_stone/${colour}3`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/porous_stone/${colour}4`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/porous_stone/${colour}5`, "weight": 10
    			}]
  			}
		}
	}

	event.create('pool_tiles_sky')
		.fullBlock(true)
		.material("stone")
		.soundType("deepslate")
		.unbreakable()
		.tagBlock('wither_immune')
		.transparent(true)
		.defaultCutout()
		.model('kubejs:block/pool_tiles')
		.displayName('Pool Tiles')

	event.create('pool_tiles_wet')
		.fullBlock(true)
		.material("stone")
		.soundType("deepslate")
		.unbreakable()
		.tagBlock('wither_immune')
		.slipperiness(0.99)
		.model('kubejs:block/pool_tiles_wet')
		.displayName('Wet Pool Tiles')

	event.create('pool_tiles_golden')
		.fullBlock(true)
		.material("stone")
		.soundType("metal")
		.unbreakable()
		.tagBlock('wither_immune')
		.displayName('Golden Pool Tiles')

	event.create('pool_tiles_golden_half').displayName('Golden Pool Tiles')
		.fullBlock(true)
		.material("stone")
		.soundType("metal")
		.unbreakable()
		.tagBlock('wither_immune')

	ticking_porous_stone("missing_tiles_empty","Missing Pool Tiles","stone","tuff","dark")

	event.create('missing_tiles_half').displayName('Missing Pool Tiles')
		.fullBlock(true)
		.material("stone")
		.soundType("deepslate")
		.unbreakable()
		.tagBlock('wither_immune')
		.property(BlockProperties.AGE_3)
		.randomTick(tick => {
    const block = tick.block
	const properties = block.properties
	const age = Number(properties.age)
	    if (age == 3) {
      		block.set('kubejs:pool_tiles')
		} else {
        	block.set(block.getId(), {
          	age: `${age+1}`
        })
	}})
})

StartupEvents.registry('item', event => {

	event.create('pool_tile').displayName('Pool Tile')
	event.create('pool_tile_golden').displayName('Golden Pool Tile')

})
