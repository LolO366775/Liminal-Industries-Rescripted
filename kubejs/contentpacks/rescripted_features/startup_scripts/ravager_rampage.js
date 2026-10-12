ForgeEvents.onEvent("net.minecraftforge.event.entity.living.LivingChangeTargetEvent", event => {
	let entity = event.getEntity()
	if (entity.getType() == "minecraft:ravager") {
		global.ravager_give_rampage_effect(entity)
	}
})
StartupEvents.registry('mob_effect', event => {
	event.create('ravager_rampage')
	.harmful()
    .effectTick((entity, lvl) => {
		global.ravager_rampage_effect_tick(entity)
    })
})
/**
* @param {Internal.LivingEntity} entity
*/
global.ravager_rampage_effect_tick = entity => {
	let duration = entity.potionEffects.getDuration("kubejs:ravager_rampage")
	if (duration % 5 == 0) {
		if (entity.getType() == "minecraft:ravager") {
			let target = entity.getTarget()
			if (target != null) {
				global.ravager_give_rampage_effect(entity)
				ravager_destroy_check(entity)
			}
		}
	}
}
/**
* @param {Internal.LivingEntity} ravager
*/
global.ravager_give_rampage_effect = ravager => {
	let duration = ravager.potionEffects.getDuration("kubejs:ravager_rampage")
	if (20 >= duration) {
		ravager.potionEffects.add("kubejs:ravager_rampage",60,0,true,false)
	}
}
/**
* @param {Internal.Entity} ravager
*/
function ravager_destroy_check(ravager){
	let position = ravager.getPos()
	let level = ravager.getLevel()
	let [pos_x,pos_y,pos_z] = [position.x(),position.y(),position.z()]
	for (let x_offset = -3; x_offset < 3; x_offset++) {
		for (let z_offset = -3; z_offset < 3; z_offset++) {
			for (let y_offset = 0; y_offset < 3; y_offset++) {
				let [new_pos_x,new_pos_y,new_pos_z] = [pos_x + x_offset, pos_y + y_offset, pos_z + z_offset]
				let break_block = level.getBlock(new_pos_x,new_pos_y,new_pos_z)
				if (can_ravager_destroy(break_block)) {
					ravager_eat_block(ravager,break_block)
					return true
				}
			}
		}
	}
	return false
}
/**
* @param {Internal.BlockContainerJS} break_block
*/
function can_ravager_destroy(break_block){
	if (break_block.blockState.destroySpeed == -1) {
		return false
	}
	if (break_block.hasTag("minecraft:wither_immune")) {
		return false
	}
	if (break_block.blockState.air) {
		return false
	}
	if (break_block.getId() == "minecraft:light") {
		return false					
	}
	if (break_block.getId() == "torchmaster:invisible_light") {
		return false					
	}
	return true
}
/**
* @param {Internal.LivingEntity} ravager
* @param {Internal.BlockContainerJS} break_block
*/
function ravager_eat_block(ravager,break_block){
	let level = ravager.getLevel()
	let position = ravager.getPos()
	let [pos_x,pos_y,pos_z] = [position.x(),position.y(),position.z()]
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.wither.break_block","blocks",1,0)
	level.spawnParticles("minecraft:campfire_cosy_smoke",false,pos_x,pos_y,pos_z,2,2,2,50,0)
	ravager.potionEffects.add("minecraft:regeneration",1200,1,false,false)
	break_block.set("minecraft:air")
	ravager.swing()
}