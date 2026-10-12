function is_clockwarp_module_loaded(){
	if (Platform.isLoaded("nonetherportal")) {
		return true
	}
	return false
}
/**
* @param {Internal.Player} player
* @param {Number} chance
*/
function unstable_compound_explode_chance(player,chance){
	if (player != null) {
		if (chance >= Math.random()) {
			let damage = 1
			let slot = -1
			unstable_compound_explode(player)
			for (let max = 0; max < 50; max++) {
				slot = player.inventory.find("kubejs:unstable_compound")
				if (slot == -1) {
					break
				}
				player.inventory.setStackInSlot(slot, "minecraft:air")
				damage++
			}
			player.attack(damage)
			return 1
		}
		return 0
	}
}
/**
* @param {Internal.Player} player
*/
function unstable_compound_explode(player){
	if (player != null) {
		let [pos_x,pos_y,pos_z] = [player.getX(),player.getY(),player.getZ()]
		let level = player.getLevel()
		unstable_compound_explode_radius(pos_x,pos_y,pos_z,level)
	}
	return 1
}
/**
* @param {Number} pos_x
* @param {Number} pos_y
* @param {Number} pos_z
* @param {Internal.Level} level
*/
function unstable_compound_explode_radius(pos_x,pos_y,pos_z,level){
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.generic.explode","blocks",1,2)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.glass.break","blocks",1,1)
	level.spawnParticles("minecraft:explosion",false,pos_x,pos_y,pos_z,1,1,1,25,0)
	level.spawnParticles("minecraft:crimson_spore",false,pos_x,pos_y,pos_z,1,0,1,100,0)
	level.spawnParticles("minecraft:crimson_spore",false,pos_x,pos_y,pos_z,1,0,1,100,0)
	if (level.getDimension() != "minecraft:the_nether") {
		let nearby_entities = level.getEntitiesWithin(AABB.of(pos_x - 1, pos_y - 1, pos_z - 1, pos_x + 1, pos_y + 1, pos_z + 1))
		nearby_entities.forEach(element => {
			if (element.living) {
				if (is_clockwarp_module_loaded()) {
					element.potionEffects.add("kubejs:drowsiness", 300)
				}
				element.potionEffects.add("minecraft:nausea", 300)
				element.potionEffects.add("brewinandchewin:tipsy", 300)
			}
		})
	}
}
/**
* @param {Internal.ItemEntityEventJS} event
*/
global.dropped_unstable_compound_event = event => {
	let item_entity = event.itemEntity
	if (item_entity.onGround()) {
		let [pos_x,pos_y,pos_z] = [item_entity.getX(),item_entity.getY(),item_entity.getZ()]
		let level = item_entity.getLevel()
		unstable_compound_explode_radius(pos_x,pos_y,pos_z,level)
		item_entity.remove("discarded")
	}
}
/**
* @param {Internal.ItemCraftedEventJS} event
*/
global.crafted_unstable_compound = event => {
	let player = event.getPlayer()
	let slot = player.inventory.find("kubejs:unstable_compound")
	if (slot != -1) {
		if (!player.isFake()) {
			unstable_compound_explode_chance(player,0.25)
		}
	}
}