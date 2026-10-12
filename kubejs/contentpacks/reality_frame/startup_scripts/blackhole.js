StartupEvents.registry('block', event => {	
	event.create('black_hole').displayName('Mini Black Hole')
	.material("stone")
	.soundType("stone")
    .unbreakable()
	.tagBlock('wither_immune')
	.fullBlock(true)
	.noItem()
	.blockEntity(entityInfo => {
		entityInfo.serverTick(10, 0, entity => {
			global.tick_black_hole(entity)
		})
	})
})

/**
* @param {Internal.BlockRightClickedEventJS} event
*/
global.click_black_hole_event = event => {
	let hand = event.getHand()
	if (event.item.id == 'ae2:singularity' && hand == "main_hand") {
		let position = event.block.getPos()
		let pos_x = position.getX()
		let pos_y = position.getY()
		let pos_z = position.getZ()
		let block_data = event.block.getEntityData().getCompound("data")
		block_data.putInt("timer",0)
		event.level.playSound(null,pos_x,pos_y,pos_z,"actuallyadditions:reconstructor","blocks",10,0)
		event.item.count--
	}
}

/**
* @param {Internal.BlockEntityJS} entity
*/
global.tick_black_hole = entity => {
	let black_hole = entity.block
	let level = black_hole.getLevel()
	let dimension = level.getDimension()
	let server = level.getServer()
	let [pos_x,pos_y,pos_z] = [black_hole.getX() + 0.5,black_hole.getY() + 0.5,black_hole.getZ() + 0.5]
	let block_data = black_hole.getEntityData().getCompound("data")
	let timer = block_data.getInt("timer")
	timer++
	block_data.putInt("timer",timer)
	let burst_timestamps = [25,50,75,100,110,113,116,118]
	if (0.01 >= Math.random()) {
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.basalt_deltas.mood","blocks",1,1)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.basalt_deltas.mood","blocks",1,1)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.basalt_deltas.mood","blocks",1,1)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.basalt_deltas.mood","blocks",1,1)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.basalt_deltas.mood","blocks",1,0)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.basalt_deltas.mood","blocks",1,0)
		level.spawnParticles("minecraft:dripping_obsidian_tear",true,pos_x,pos_y,pos_z,2,2,2,50,0)
		level.spawnParticles("minecraft:dust_color_transition 1 0 1 10 0 0 0",true,pos_x,pos_y,pos_z,1,1,1,20,0.1)
		level.getBlock(pos_x + 1, pos_y - 1, pos_z - 2).popItem("mekanism:pellet_antimatter")
		level.getBlock(pos_x, pos_y + 1, pos_z + 2).popItem("mekanism:pellet_antimatter")
		level.getBlock(pos_x + 2, pos_y, pos_z + 1).popItem("mekanism:pellet_antimatter")
	}
	burst_timestamps.forEach((element) => {
		if (timer == element) {
			level.playSound(null,pos_x,pos_y,pos_z,"mekanism:item.geiger_medium","blocks",10,2)
			level.playSound(null,pos_x,pos_y,pos_z,"mekanism:item.geiger_medium","blocks",10,2)
			level.playSound(null,pos_x,pos_y,pos_z,"mekanism:item.geiger_medium","blocks",10,2)
			level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.generic.explode","blocks",10,2)
			level.spawnParticles("minecraft:explosion",true,pos_x,pos_y,pos_z,1,1,1,10,0)
			level.spawnParticles("mekanism:radiation",true,pos_x,pos_y,pos_z,1,1,1,50,0)
			level.spawnParticles("minecraft:flash",true,pos_x,pos_y,pos_z,0,0,0,1,0)
		}
	})
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.crimson_forest.mood","blocks",1,2)
	level.spawnParticles("minecraft:dust_color_transition 0 0 0 10 0 0 0",false,pos_x,pos_y,pos_z,0.75,0.75,0.75,10,0)
	server.runCommandSilent(`execute in ${dimension} positioned ${pos_x} ${pos_y} ${pos_z} run effect give @e[distance=..5] wither 1 9 true`)
	if (timer == 120) {
		black_hole.set("minecraft:air")
		level.playSound(null,pos_x,pos_y,pos_z,"botania:missile","blocks",10,0)
	}
	return 1
}