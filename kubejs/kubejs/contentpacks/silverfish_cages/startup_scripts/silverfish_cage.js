StartupEvents.registry('block', event => {
	let empty_cage = event.create('empty_wooden_silverfish_cage','cardinal')
	empty_cage.fullBlock(true)
	empty_cage.mapColor("wood")
	empty_cage.soundType("wood")
	empty_cage.displayName('Wooden Silverfish Cage (Empty)')
	empty_cage.transparent(true)
	empty_cage.defaultCutout()
	empty_cage.box(1, 1, 1, 15, 15, 15)
	let cage = event.create('wooden_silverfish_cage','cardinal')
	cage.fullBlock(true)
	cage.mapColor("wood")
	cage.soundType("wood")
	cage.displayName('Wooden Silverfish Cage (Filled)')
	cage.transparent(true)
	cage.defaultCutout()
	cage.box(1, 1, 1, 15, 15, 15)
	cage.blockEntity(entityInfo => {
		entityInfo.serverTick(40, 0, entity => {
			global.tick_silverfish_cage(entity)
		})
	})
})
/**
* @param {Internal.BlockEntityJS} entity
*/
global.tick_silverfish_cage = entity => {
	let cage = entity.block
	let floor = cage.getDown()
	silverfish_squeak(cage,0.1)
	silverfish_drop_caviar(cage,0.005)
	silverfish_cage_pickup_food_on_ground(cage)
	if (floor == "kubejs:floor_tiles" || floor == "kubejs:floor_tiles_full") {
		silverfish_fullness_check(cage,"concrete")
	} else if (floor == "kubejs:carpet") {
		silverfish_fullness_check(cage,"carpet")
	} else if (floor == "kubejs:red_carpet") {
		silverfish_fullness_check(cage,"carpet")
	} else if (floor == "kubejs:pool_tiles") {
		silverfish_fullness_check(cage,"pool_tiles")
	} else if (floor == "kubejs:missing_tiles_half") {
		silverfish_fullness_check(cage,"pool_tiles")
	} else if (floor == "kubejs:missing_tiles_half_perm") {
		silverfish_fullness_check(cage,"pool_tiles_perm")
	}
}
/**
* @param {Internal.BlockContainerJS} cage
* @param {String} type
*/
function silverfish_fullness_check(cage,type){
	let cage_data = cage.getEntityData().getCompound("data")
	let fullness = cage_data.getInt("fullness")
	if (fullness > 0) {
		fullness--
		cage_data.put("fullness",fullness)
		silverfish_activate_cage(cage,type)
	} else {
		if (0.3 >= Math.random()) {
			silverfish_activate_cage(cage,type)
		}
	}
    return 1
}
/**
* @param {Internal.BlockContainerJS} cage
* @param {String} type
*/
function silverfish_activate_cage(cage,type){
	let floor = cage.getDown()
	if (type == "concrete") {
		silverfish_chip_concrete(floor,0.5)
	} else if (type == "carpet") {
		silverfish_sweep_carpet(floor)
	} else if (type == "pool_tiles") {
		silverfish_chip_pool_tiles(floor,0.75)
	} else if (type == "pool_tiles_perm") {
		silverfish_chip_pool_tiles(floor,0.25)
	}
    return 1
}
/**
* @param {Internal.BlockContainerJS} floor
* @param {Number} chance
*/
function silverfish_chip_concrete(floor,chance){
    let [pos_x,pos_y,pos_z] = [floor.getX() + 0.5,floor.getY() + 1,floor.getZ() + 0.5]
    floor.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.deepslate_bricks.break","blocks",1,0)
    floor.level.spawnParticles("block kubejs:floor_tiles",false,pos_x,pos_y,pos_z,0,0,0,10,0.1)
    if (chance >= Math.random()) {
		Utils.rollChestLoot('minecraft:gameplay/silverfish_chip_concrete').forEach(item => {
        	floor.popItemFromFace(item,'up')
		})
    }
    return 1
}
/**
* @param {Internal.BlockContainerJS} floor
* @param {Number} chance
*/
function silverfish_chip_pool_tiles(floor,chance){
    let [pos_x,pos_y,pos_z] = [floor.getX() + 0.5,floor.getY() + 1,floor.getZ() + 0.5]
    floor.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.deepslate_bricks.break","blocks",1,0)
    floor.level.spawnParticles("block kubejs:pool_tiles",false,pos_x,pos_y,pos_z,0,0,0,10,0.1)
    if (chance >= Math.random()) {
		let floor_id = floor.getId()
		if (floor_id == "kubejs:pool_tiles") {
			floor.set("kubejs:missing_tiles_half")
			Utils.rollChestLoot('minecraft:gameplay/silverfish_chip_pool_tiles').forEach(item => {
        		floor.popItemFromFace(item,'up')
			})
		}
		if (floor_id == "kubejs:missing_tiles_half") {
			floor.set("kubejs:missing_tiles_empty")
			Utils.rollChestLoot('minecraft:gameplay/silverfish_chip_pool_tiles').forEach(item => {
        		floor.popItemFromFace(item,'up')
			})
		}
		if (floor_id == "kubejs:missing_tiles_half_perm") {
			Utils.rollChestLoot('minecraft:gameplay/silverfish_chip_pool_tiles').forEach(item => {
        		floor.popItemFromFace(item,'up')
			})
		}
		
    }
    return 1
}
/**
* @param {Internal.BlockContainerJS} cage
* @param {Number} chance
*/
function silverfish_drop_caviar(cage,chance){
    if (chance >= Math.random()) {
		let [pos_x,pos_y,pos_z] = [cage.getX() + 0.5,cage.getY() + 1,cage.getZ() + 0.5]
    	cage.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.sniffer_egg.crack","blocks",1,2)
        Utils.rollChestLoot('minecraft:gameplay/silverfish_eggs').forEach(item => {
        	cage.popItemFromFace(item,'up')
		})
    }
    return 1
}
/**
* @param {Internal.BlockContainerJS} cage
* @param {Number} chance
*/
function silverfish_squeak(cage,chance){
	if (chance >= Math.random()) {
		let [pos_x,pos_y,pos_z] = [cage.getX() + 0.5,cage.getY() + 1,cage.getZ() + 0.5]
		cage.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.silverfish.ambient","blocks",1,1)
	}
    return 1
}
/**
* @param {Internal.BlockContainerJS} carpet
*/
function silverfish_sweep_carpet(carpet){
	let [pos_x,pos_y,pos_z] = [carpet.getX(),carpet.getY(),carpet.getZ()]
	carpet.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.brush.brushing.generic","blocks",1,1)
	carpet.level.spawnParticles("minecraft:campfire_signal_smoke",false,pos_x,pos_y + 1.3,pos_z,1,0.1,1,2,0.001)
	if (0.5 >= Math.random()) {
		Utils.rollChestLoot('minecraft:gameplay/silverfish_sweep_carpet').forEach(item => {
        	carpet.popItemFromFace(item,'up')
		})
	}
    return 1
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
global.silverfish_cage_click = event => {
	let cage = event.getBlock()
	let [pos_x,pos_y,pos_z] = [cage.getX(),cage.getY(),cage.getZ()]
	if (event.item.getId() == "kubejs:cut_carpet" || event.item.getId() == "kubejs:wallpaper") {
		feed_silverfish_cage(cage,event.item)
	} if (event.player.isCrouching()) {
		if (event.item.isEmpty()) {
			let above = cage.getUp()
			if (above.getId() == "minecraft:air") {
				let facing = cage.properties.get("facing")
				cage.level.spawnParticles("minecraft:cloud",false,pos_x,pos_y,pos_z,0.5,1,0.5,25,0)
				cage.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.beehive.exit","blocks",1,1)
				cage.set("kubejs:empty_wooden_silverfish_cage",{"facing":facing})
				let mob = cage.level.createEntity("minecraft:silverfish")
				mob.setPos(above.getX() + 0.5,above.getY() + 1,above.getZ() + 0.5)
				mob.spawn()
			}
		}
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
global.empty_silverfish_cage_click = event => {
	if (!event.player.isCrouching()) {
		let cage = event.getBlock()
		let [pos_x,pos_y,pos_z] = [cage.getX(),cage.getY(),cage.getZ()]
		let aabb = AABB.of(pos_x - 2, pos_y - 1, pos_z - 2, pos_x + 2, pos_y + 1, pos_z + 2)
		event.level.getEntitiesWithin(aabb).forEach(entity => {
			if (entity.getType() == "minecraft:silverfish") {
				if (cage.getId() == "kubejs:empty_wooden_silverfish_cage") {
					let facing = cage.properties.get("facing")
					cage.level.spawnParticles("minecraft:cloud",false,pos_x,pos_y,pos_z,0.5,1,0.5,25,0)
					cage.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.beehive.exit","blocks",1,2)
					cage.set("kubejs:wooden_silverfish_cage",{"facing":facing})
					entity.discard()
				}
			}
		})
	}
}
/**
* @param {Internal.BlockContainerJS} cage
*/
function silverfish_cage_pickup_food_on_ground(cage){
	let [pos_x,pos_y,pos_z] = [cage.getX() + 0.5,cage.getY() + 0.5,cage.getZ() + 0.5]
	let level = cage.getLevel()
	let nearby_entities = level.getEntitiesWithin(AABB.of(pos_x - 2, pos_y - 2, pos_z - 2, pos_x + 2, pos_y + 2, pos_z + 2))
	nearby_entities.forEach(element => {
		if (element.getType() == "minecraft:item") {
			let item = element.getItem()
			if (item.getId() == "kubejs:cut_carpet" || item.getId() == "kubejs:wallpaper") {
				feed_silverfish_cage(cage,item)
			}
		}
	})	
}
/**
* @param {Internal.BlockContainerJS} cage
* @param {Internal.ItemStack} food
*/
function feed_silverfish_cage(cage,food){
	let level = cage.getLevel()
	let [pos_x,pos_y,pos_z] = [cage.getX() + 0.5,cage.getY() + 0.5,cage.getZ() + 0.5]
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.generic.eat","blocks",1,1)
	level.spawnParticles("minecraft:heart",false,pos_x,pos_y,pos_z,0.5,0.5,0.5,5,0)
	level.spawnParticles(`minecraft:item kubejs:cut_carpet`,false,pos_x,pos_y,pos_z,0.5,0.5,0.5,0.1,25)
	let cage_data = cage.getEntityData().getCompound("data")
	cage_data.putInt("fullness",10)
	food.shrink(1)
}