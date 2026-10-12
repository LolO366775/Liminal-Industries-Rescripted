StartupEvents.registry('mob_effect', event => {
	event.create('drowsiness')
	.harmful()
    .effectTick((entity, lvl) => {
		global.drowsy_mob_effect_tick(entity)
    })
})
/**
* @param {Internal.LivingEntity} entity
*/
global.drowsy_mob_effect_tick = entity => {
	let duration = entity.potionEffects.getDuration("kubejs:drowsiness")
	if (60 == duration) {
		enter_nether_drowsy(entity)
	} else if (285 == duration) {
		if (entity.getType() == "minecraft:player") {
			let [pos_x,pos_y,pos_z] = [entity.getX(),entity.getY(),entity.getZ()]
			entity.level.playSound(entity,pos_x,pos_y,pos_z,"minecraft:ambient.basalt_deltas.loop","players",1,0)
		}
	} else if (duration % 20 == 0) {
		if (entity.getType() == "minecraft:player") {
			let [pos_x,pos_y,pos_z] = [entity.getX(),entity.getY(),entity.getZ()]
			entity.level.playSound(entity,pos_x,pos_y,pos_z,"supplementaries:block.clock.tick_2","players",1,0)
		}
	} else if (duration % 10 == 0) {
		if (entity.getType() == "minecraft:player") {
			let [pos_x,pos_y,pos_z] = [entity.getX(),entity.getY(),entity.getZ()]
			entity.level.playSound(entity,pos_x,pos_y,pos_z,"supplementaries:block.clock.tick_1","players",1,0)
		}
	}
}
/**
* @param {Internal.LivingEntity} entity
*/
function enter_nether_drowsy(entity){
	let [pos_x,pos_y,pos_z] = [entity.getX(),entity.getY(),entity.getZ()]
	entity.removeEffect("kubejs:drowsiness")
	entity.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.enderman.teleport","players",1,0)
	entity.level.spawnParticles("minecraft:reverse_portal",false,pos_x,pos_y,pos_z,0.5,0.5,0.5,100,0.1)
	entity.teleportTo("minecraft:the_nether",0,50,0,0,0)
	if (entity.getType() == "minecraft:player") {
		let server = entity.getServer()
		let level = server.getLevel("minecraft:the_nether")
		level.playSound(null,0,50,0,"minecraft:ambient.nether_wastes.mood","players",100,0)
		level.playSound(null,0,50,0,"minecraft:ambient.nether_wastes.mood","players",100,0)
		level.playSound(null,0,50,0,"minecraft:ambient.nether_wastes.mood","players",100,0)
		level.playSound(null,0,50,0,"minecraft:ambient.nether_wastes.mood","players",100,0)
		level.playSound(null,0,50,0,"minecraft:ambient.nether_wastes.mood","players",100,0)
		level.playSound(null,0,50,0,"minecraft:custom.time_loop","players",100,0)
	}
	return 1
}