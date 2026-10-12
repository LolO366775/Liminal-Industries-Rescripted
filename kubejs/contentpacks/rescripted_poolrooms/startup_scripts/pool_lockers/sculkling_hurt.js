//Server-Startup Bridge Functions
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
global.locker_sculkling_right_click = event => {
	if (event.item == "kubejs:crowbar" && event.hand == "main_hand") {
		let open = event.block.properties.get("open")
		if (open != "true") {
			const [pos_x,pos_y,pos_z] = [event.block.getX() + 0.5,event.block.getY(),event.block.getZ() + 0.5]
			event.level.spawnParticles("minecraft:crit",false,pos_x,pos_y,pos_z,0.1,0.1,0.1,5,0.5)
			if (coin_flip(0.1)) {
				event.item.shrink(1)
				event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.shield.break","players",1,0)
				event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.zombie.attack_iron_door","blocks",1,1)
			} else {
				event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.zombie.attack_iron_door","blocks",1,2)
				locker_sculkling_doors(event.block,true,3)
			}
		}
	}
}
/**
* @param {Internal.BlockLeftClickedEventJS} event
*/
let hasAlreadyClicked = false //prevents the event from firing twice (false = first click; true = click release)
global.locker_sculkling_left_click = event => {
	hasAlreadyClicked = !hasAlreadyClicked
	let locker = event.getBlock()
	if (hasAlreadyClicked) {
		let [pos_x,pos_y,pos_z] = [locker.getX(),locker.getY(),locker.getZ()]
		let open = locker.properties.get("open")
		let hurt_immune = locker.properties.get("triggered")
		if (open == "true") {
			let locker_data = locker.getEntityData().getCompound("data")
			let death_timer = locker_data.getInt("death_timer")
			if (hurt_immune != "true") {
				if (!death_timer > 0) {
					let attack_damage = event.player.getAttributeTotalValue("minecraft:generic.attack_damage")
					if (attack_damage >= 1) {
						locker_sculkling_hurt(locker,attack_damage)
					}
				}
			} else {
				event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.shulker.hurt_closed","blocks",1,0)
			}
		} else {
			event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.shulker.hurt_closed","blocks",1,0)
		}
	}
}
/**
* @param {Internal.BlockContainerJS} locker
* @param {Number} damage
*/
function locker_sculkling_hurt(locker,damage){
	let half = locker.properties.get("half")
	if (half == "bottom") {
		let [pos_x,pos_y,pos_z] = [locker.getX() + 0.5,locker.getY() + 0.5,locker.getZ() + 0.5]
		let locker_data = locker.getEntityData().getCompound("data")
		let health = locker_data.getInt("health")
		if (health > 0) {
			health = health - damage
			locker.level.playSound(null,pos_x ,pos_y,pos_z,"minecraft:entity.shulker.hurt","blocks",1,2)
			locker_data.putInt("health",health)
			locker_data.putInt("anger",30)
			if (coin_flip(0.25)) {locker_sculkling_doors(locker,false,1)}
		} else {
			locker.level.playSound(null,pos_x ,pos_y,pos_z,"minecraft:entity.shulker.death","blocks",1,2)
			locker_data.putInt("death_timer",2)
		}
	}
}

ForgeEvents.onEvent("net.minecraftforge.event.entity.ProjectileImpactEvent", event => {
	let hit_block_result = event.getRayTraceResult()
	let hit_pos = hit_block_result.getLocation()
})