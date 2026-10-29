//Server-Startup Bridge Functions
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
global.locker_sculkling_right_click = event => {
	let item = event.getItem()
	if (item.hasTag("kubejs:crowbars") && event.hand == "main_hand") {
		let open = event.block.properties.get("open")
		if (open != "true") {
			let hit_facing = event.getFacing()
			let half = event.block.properties.get("half")
			let locker = event.getBlock()
			if (half == "bottom") {
				pry_sculkling_with_crowbar(locker,hit_facing,item)	
			} else {
				if (half == "top") {
					let down_locker = event.getBlock().getDown()
					if (down_locker.getId() == "kubejs:locker_sculkling") {
						let down_half = down_locker.properties.get("half")
						if (down_half == "bottom") {
							pry_sculkling_with_crowbar(down_locker,hit_facing,item)
						}
					}
				}
			}
		}
	}
}
/**
* @param {Internal.BlockContainerJS} locker
* @param {Internal.Direction} hit_facing
* @param {Internal.ItemStack} item
*/
function pry_sculkling_with_crowbar(locker,hit_facing,item){
	if (is_sculkling_hit_front(locker,hit_facing)) {
		let [pos_x,pos_y,pos_z] = [locker.getX() + 0.5,locker.getY(),locker.getZ() + 0.5]
		locker.level.spawnParticles("minecraft:crit",false,pos_x,pos_y,pos_z,0.1,0.1,0.1,5,0.5)
		if (coin_flip(0.1) && item.getId() != "kubejs:dark_steel_crowbar") {
			item.shrink(1)
			locker.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.shield.break","players",1,0)
			locker.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.zombie.attack_iron_door","blocks",1,1)
		} else {
			try {
				locker_sculkling_hurt(locker,7)
				sculkling_open_doors_and_roar(locker)
				locker.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.zombie.attack_iron_door","blocks",1,2)
				locker.level.spawnParticles("minecraft:damage_indicator", false, pos_x + 0.5, pos_y, pos_z + 0.5, 0.5, 0.5, 0.5, 20, 0)			
			} catch (error) {
				//console.log(error)
			}
		}
	}
}
/**
* @param {Internal.BlockLeftClickedEventJS} event
*/
global.locker_sculkling_left_click = event => {
	let locker = event.getBlock()
	let hit_facing = event.getFacing()
	if (!is_sculkling_hit_front(locker,hit_facing)) {
		return false
	}
	if (sculkling_single_hit()) {
		let [pos_x,pos_y,pos_z] = [locker.getX(),locker.getY(),locker.getZ()]
		let locker_data = locker.getEntityData().getCompound("data")
		let is_invincible = (locker_data.getInt("invincible_frames") > 0)
		if (is_invincible) {
			event.level.spawnParticles("minecraft:instant_effect", false, pos_x + 0.5, pos_y, pos_z + 0.5, 0.5, 0.5, 0.5, 20, 0)
			event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.player.attack.weak","blocks",1,1)
			return false
		}
		let open = locker.properties.get("open")
		if (open == "true") {
			let locker_data = locker.getEntityData().getCompound("data")
			let death_timer = locker_data.getInt("death_timer")
			if (!death_timer > 0) {
				let is_attack_charged = (event.player.attackStrengthTicker > 15)
				let attack_damage = event.player.getAttributeTotalValue("minecraft:generic.attack_damage")
				if (!is_attack_charged) {
					event.level.spawnParticles("minecraft:instant_effect", false, pos_x + 0.5, pos_y, pos_z + 0.5, 0.5, 0.5, 0.5, 20, 0)
					event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.player.attack.weak","blocks",1,1)
				} else if (attack_damage >= 1) {
					locker_sculkling_hurt(locker,attack_damage)
					event.level.spawnParticles("minecraft:damage_indicator", false, pos_x + 0.5, pos_y, pos_z + 0.5, 0.5, 0.5, 0.5, 20, 0)
				}
			} else {
				event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.shulker.hurt_closed","blocks",1,0)
			}
		} else {
			event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.shulker.hurt_closed","blocks",1,0)
		}
	}
	return true
}
let hasAlreadyClicked = false //prevents the event from firing twice (false = first click; true = click release)
function sculkling_single_hit(){
	hasAlreadyClicked = !hasAlreadyClicked
	return hasAlreadyClicked
}
/**
* @param {Internal.BlockContainerJS} locker
* @param {Internal.Direction} hit_facing
*/
function is_sculkling_hit_front(locker,hit_facing){
	let facing = locker.properties.get("facing")
	let successful = (hit_facing == facing)
	return successful
}
/**
* @param {Internal.BlockContainerJS} locker
* @param {Number} damage
*/
function locker_sculkling_hurt(locker,damage){
	let half = locker.properties.get("half")
	let facing = locker.properties.get("facing")
	if (half == "bottom") {
		bestow_starting_health(locker)
		let [pos_x,pos_y,pos_z] = [locker.getX() + 0.5,locker.getY() + 0.5,locker.getZ() + 0.5]
		let locker_data = locker.getEntityData().getCompound("data")
		let health = locker_data.getInt("health")
		if (health > 0) {
			health = health - damage
			locker.level.playSound(null,pos_x ,pos_y,pos_z,"minecraft:entity.shulker.hurt","blocks",1,2)
			locker_data.putInt("health",health)
			locker_data.putInt("anger",30)
			locker_data.putInt("invincible_frames",2)
			/*if (coin_flip(0.25)) { //for some reason adding this broke him when he hid. fix this this bs later
				locker_sculkling_doors(locker,false,1)
			} else {

			}*/
			let above = locker.getUp()
			if (above.getId() == "kubejs:locker_sculkling") {
				above.set("kubejs:locker_sculkling",{"facing":facing,"half":"top","open":"true","triggered":"true"})
			}
			locker.set("kubejs:locker_sculkling",{"facing":facing,"half":"bottom","open":"true","triggered":"true"})
		} else {
			locker.level.playSound(null,pos_x ,pos_y,pos_z,"minecraft:entity.shulker.death","blocks",1,2)
			let above = locker.getUp()
			if (above.getId() == "kubejs:locker_sculkling") {
				above.set("kubejs:locker_sculkling",{"facing":facing,"half":"top","open":"true","triggered":"true"})
			}
			locker.set("kubejs:locker_sculkling",{"facing":facing,"half":"bottom","open":"true","triggered":"true"})
			locker_data.putInt("death_timer",2)
			locker_data.putInt("invincible_frames",2)
		}
	}
}
/**
* @param {Internal.BlockContainerJS} locker
*/
function bestow_starting_health(locker){
	let locker_data = locker.getEntityData().getCompound("data")
	if (is_locker_not_dead(locker)) {
		let health = locker_data.getInt("health")
		if (health == 0) {locker_data.putInt("health",20)}
	}
}
/*ForgeEvents.onEvent("net.minecraftforge.event.entity.ProjectileImpactEvent", event => {
	let hit_block_result = event.getRayTraceResult()
	let hit_pos = hit_block_result.getLocation()
})*/