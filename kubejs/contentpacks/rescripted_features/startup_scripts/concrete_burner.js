StartupEvents.registry('block', event => {
	event.create("concrete_burner",'cardinal')
	.fullBlock(true)
	.mapColor("metal")
	.soundType("metal")
	.tagBlock('minecraft:mineable/pickaxe')
	.property(BlockProperties.LIT)
	.placementState(c =>{
		c.set(BlockProperties.LIT, false)
	})
	.defaultState(c =>{
		c.set(BlockProperties.LIT, false)
	})
	.item(item => 
		item.modelJson({
			"parent": `kubejs:block/concrete_burner/off`
		})
	)
	.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_concrete_burner(entity)
		})
		entityInfo.inventory(1,1)
	})
	.displayName("Concrete Burner")
})
/**
* @param {Internal.BlockEntityJS} entity
*/
global.tick_concrete_burner = entity => {
	try {
		let burner = entity.getBlock()
		let level = entity.getLevel()
		let [pos_x,pos_y,pos_z] = [burner.getX() + 0.5,burner.getY() + 0.5,burner.getZ() + 0.5]
		let nearby_entities = level.getEntitiesWithin(AABB.of(pos_x - 2, pos_y - 2, pos_z - 2, pos_x + 2, pos_y + 2, pos_z + 2))
		nearby_entities.forEach(element => {
			if (element.getType() == "minecraft:item") {
				concrete_burner_pickup_fuel_on_ground(element,burner)
			}
		})
		concrete_burner_burn_up(burner)
	} catch (error) {/*entity.level.server.runCommandSilent("say " + error)*/}
	concrete_burner_burn_fuel(entity.getBlock())
}
/**
* @param {Internal.ItemEntity} item_entity
* @param {Internal.BlockContainerJS} burner
*/
function concrete_burner_pickup_fuel_on_ground(item_entity,burner){
	let item = item_entity.getItem()
	if (is_ground_item_concrete_burner_fuel(item)) {
		let [pos_x,pos_y,pos_z] = [burner.getX() + 0.5,burner.getY() + 0.5,burner.getZ() + 0.5]
		let level = item_entity.getLevel()
		if (concrete_burner_burn_ground_fuel(burner,item)) {
			//burner.inventory.setStackInSlot(0,item)
			level.spawnParticles("minecraft:flame",false,pos_x,pos_y,pos_z,1,1,1,50,0.01)
			level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.fire.ambient","blocks",1,2)
		}
	}
}
/**
* @param {Internal.BlockContainerJS} burner
*/
function concrete_burner_burn_fuel(burner){
	let lit = burner.properties.get("lit")
	if (lit == "true") {
		concrete_burner_create_ash(burner)
	} else {
		return false
	}
	let burner_id = burner.getId()
	let burner_data = burner.getEntityData().getCompound("data")
	let burner_fuel = burner_data.getInt("burner_fuel")
	if (burner_fuel >= 1) {
		burner_fuel--
		burner_data.putInt("burner_fuel",burner_fuel)
		concrete_burner_create_fire(burner)
		concrete_burner_burn_random(burner)
		return true
	}
	if (!burner_fuel >= 1) {
		let facing = burner.properties.get("facing")
		burner.set(burner_id,{"facing":facing,"lit":"false"})
	}
	return false
}
/**
* @param {Internal.BlockContainerJS} burner
*/
function concrete_burner_create_fire(burner){
	let above = burner.getUp()
	if (above.blockState.canBeReplaced()) {
		if (0.05 >= Math.random()) {
			above.set("minecraft:fire")
			level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.flintandsteel.use","blocks",1,1)
    	}
	}
}
/**
* @param {Internal.BlockContainerJS} burner
* @param {Internal.ItemStack} item
*/
global.concrete_burner_burn_ground_fuel_bridge = (burner,item) => {
	concrete_burner_burn_ground_fuel(burner,item)
}
/**
* @param {Internal.BlockContainerJS} burner
* @param {Internal.ItemStack} item
*/
function concrete_burner_burn_ground_fuel(burner,item){
	let burner_data = burner.getEntityData().getCompound("data")
	let burner_fuel = burner_data.getInt("burner_fuel")
	if (!burner_fuel >= 1) {
		//let item = burner.inventory.getStackInSlot(0)
		let burn_time = global.get_item_custom_burn_time(item)
		item.shrink(1)
		burner_fuel = burn_time
		burner_data.putInt("burner_fuel",burner_fuel)
		set_concrete_burner_burning(burner)
		return true
	}
	return false
}
/**
* @param {Internal.BlockContainerJS} burner
*/
function set_concrete_burner_burning(burner){
	let lit = burner.properties.get("lit")
	if (lit == "false") {
		let burner_data = burner.getEntityData().getCompound("data")
		let burner_fuel = burner_data.getInt("burner_fuel")
		if (burner_fuel >= 1) {
			let burner_id = burner.getId()
			let facing = burner.properties.get("facing")
			burner.set(burner_id,{"facing":facing,"lit":"true"})
		}
	}
}
/**
* @param {Internal.ItemStack} item
*/
function is_ground_item_concrete_burner_fuel(item){
	let burn_time = global.get_item_custom_burn_time(item)
	if (burn_time >= 1) {
		return true
	}
	return false
}
/**
* @param {Internal.ItemStack} item
*/
global.get_item_custom_burn_time = item => {
	if (item.getId() == "kubejs:cut_carpet") {
		return 3
	}
	if (item.getId() == "kubejs:wallpaper") {
		return 3
	}
	if (item.getId() == "kubejs:carpet_dust") {
		return 1
	}
	if (item.getId() == "immersiveengineering:dust_wood") {
		return 1
	}
	if (item.getId() == "kubejs:carpet_dust_block") {
		return 9
	}
	if (item.getId() == "dustrial_decor:cardboard") {
		return 1
	}
	if (item.getId() == "create:cardboard") {
		return 1
	}
	if (item.getId() == "dustrial_decor:cardboard_scrap") {
		return 9
	}
	if (item.hasTag("dustrial_decor:cardboard_blocks")) {
		return 9
	}
	if (item.getId() == "create:cardboard_block") {
		return 9
	}
	if (item.getId() == "create:bound_cardboard_block") {
		return 9
	}
	if (item.getId() == "storage_shelves:cardboard") {
		return 2
	}
	if (item.getId() == "kubejs:plywood_block") {
		return 18
	}
	return 0
}
/**
* @param {Internal.BlockContainerJS} burner
* @param {Internal.BlockContainerJS} random_block
* @param {Boolean} add_fuel
*/
function concrete_burner_burn_block(burner,random_block,add_fuel){
	let level = random_block.getLevel()
	let block_pos = random_block.getPos()
	let [pos_x,pos_y,pos_z] = [random_block.getX() + 0.5,random_block.getY() + 0.5,random_block.getZ() + 0.5]
	let pass = random_block.blockState.isFlammable(level,block_pos,"down")
	let burn_item = random_block.getItem()
	let burn_time = global.get_item_custom_burn_time(burn_item)
	let pass2 = (burn_time >= 1)
	if (!pass2) {
		burn_time = 1
	}
	if (pass || pass2) {
		if (add_fuel) {
			concrete_burner_add_fuel(burner,random_block,burn_time)
		}
		if (!add_fuel) {
			let layers = get_burned_out_ash_layers().toString()
			random_block.set("supplementaries:ash",{"layers":layers})
			level.spawnParticles("minecraft:smoke",false,pos_x,pos_y,pos_z,0.5,0.5,0.5,50,0)
			level.spawnParticles("minecraft:campfire_cosy_smoke",false,pos_x,pos_y,pos_z,0.5,0.3,0.5,10,0)
		}
	}
}
/**
* @param {Internal.BlockContainerJS} burner
* @param {Internal.BlockContainerJS} random_block
* @param {Number} burn_time
*/
function concrete_burner_add_fuel(burner,random_block,burn_time){
	try {
		let level = burner.getLevel()
		let [pos_x,pos_y,pos_z] = [burner.getX() + 0.5,burner.getY() + 0.5,burner.getZ() + 0.5]
		let burner_data = burner.getEntityData().getCompound("data")
		let burner_fuel = burner_data.getInt("burner_fuel")
		if (!burner_fuel >= 1) {
			level.spawnParticles("minecraft:flame",false,pos_x,pos_y,pos_z,1,1,1,50,0.01)
			level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.fire.ambient","blocks",1,2)
			random_block.set("minecraft:air")
			burner_fuel = burn_time
			burner_data.putInt("burner_fuel",burner_fuel)
			set_concrete_burner_burning(burner)
			return true
		}
		return false		
	} catch (error) {
		return false		
	}
}
/**
* @param {Internal.BlockContainerJS} burner
*/
function concrete_burner_burn_up(burner){
	let up = burner.getUp()
	concrete_burner_burn_block(burner,up,true)
}
/**
* @param {Internal.BlockContainerJS} burner
*/
function concrete_burner_burn_random(burner){
	let random = burner.getUp()
	/*if (0.3 > Math.random()) {
		random = burner
	} else if (0.3 > Math.random()) {
		random = burner.getDown()
	}*/
	let north = random.getNorth()
	let south = random.getSouth()
	let east = random.getEast()
	let west = random.getWest()
	let add_fuel = false
	if (0.10 > Math.random()) {
		concrete_burner_burn_block(burner,north,add_fuel)
	} else if (0.10 > Math.random()) {
		concrete_burner_burn_block(burner,south,add_fuel)
	} else if (0.10 > Math.random()) {
		concrete_burner_burn_block(burner,east,add_fuel)
	} else if (0.10 > Math.random()) {
		concrete_burner_burn_block(burner,west,add_fuel)
	} else if (0.10 > Math.random()) {
		concrete_burner_burn_block(burner,north.getEast(),add_fuel)
	} else if (0.10 > Math.random()) {
		concrete_burner_burn_block(burner,north.getWest(),add_fuel)
	} else if (0.10 > Math.random()) {
		concrete_burner_burn_block(burner,south.getEast(),add_fuel)
	} else if (0.10 > Math.random()) {
		concrete_burner_burn_block(burner,south.getWest(),add_fuel)
	} else {
		concrete_burner_burn_block(burner,random,true)
	}
}
/**
* @param {Internal.BlockContainerJS} burner
*/
function concrete_burner_create_ash(burner){
	if (0.2 >= Math.random()) {
		//in case I want it to be a loot_table
		/*Utils.rollChestLoot('minecraft:gameplay/silverfish_chip_concrete').forEach(item => {
        	floor.popItemFromFace(item,'up')
		})*/
		let facing = burner.properties.get("facing")
		burner.popItemFromFace("supplementaries:ash",facing)
		let [pos_x,pos_y,pos_z] = [burner.getX() + 0.5,burner.getY() + 0.5,burner.getZ() + 0.5]
		let level = burner.getLevel()
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.furnace.fire_crackle","blocks",1,1)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.fire.extinguish","blocks",0.1,1)
    }
}
function get_burned_out_ash_layers() {
	if (0.2 > Math.random()) {
		return "2"
	}
	if (0.2 > Math.random()) {
		return "3"
	}
	if (0.3 > Math.random()) {
		return "4"
	}
	if (0.3 > Math.random()) {
		return "5"
	}
	if (0.2 > Math.random()) {
		return "6"
	}
	if (0.2 > Math.random()) {
		return "7"
	}
	if (0.1 > Math.random()) {
		return "8"
	}
	return "1"
}