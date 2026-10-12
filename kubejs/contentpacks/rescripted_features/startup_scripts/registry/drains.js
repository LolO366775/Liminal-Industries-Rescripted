/**
* @param {Registry.Block} event
*/
function block_registry_drains(event) {
	event.create('drain').displayName('Drain (Permanent)')
	.fullBlock(true)
	.material("lantern")
	.soundType("lantern")
	.unbreakable()
	.tagBlock('wither_immune')
	.fullBlock(false)
	.waterlogged()
	.box(0, 0, 0, 16, 15, 16)

	event.create('drain_breakable').displayName('Drain')
	.fullBlock(true)
	.mapColor("metal")
	.soundType("lantern")
	.unbreakable()
	.noDrops()
	.tagBlock('wither_immune')
	.fullBlock(false)
	.waterlogged()
	.box(0, 0, 0, 16, 15, 16)
	.model('kubejs:block/drain')
	.property(BlockProperties.AGE_3)
	.randomTick(tick => { //might be able to do this as a function
    	let block = tick.block
		let properties = block.properties
		let age = Number(properties.age)
	    if (age == 3) {
      		block.set('kubejs:carpet')
		} else {
        	block.set(block.getId(), {
          		age: `${age+1}`
			})
        }
	})
}