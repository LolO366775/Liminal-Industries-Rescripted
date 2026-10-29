BlockEvents.rightClicked(event => {
	let item = event.getItem()
	let wallpaper = event.getBlock()
	let can_crowbar = (item.hasTag("kubejs:crowbars") || item.hasTag("forge:tools/pickaxes"))
	if (wallpaper.getId() == "kubejs:stripped_wallpaper") {
		if (item.getId() == "kubejs:power_box") {
			install_power_box(wallpaper,item,event.getFacing())
		}
	} else if (wallpaper.getId() == "kubejs:controller_wallpaper") {
		if (can_crowbar) {
			if (event.getFacing().toString() == wallpaper.properties.get("facing")) {
				let player = event.getPlayer()
				if (player.isCrouching()) {
					yoink_power_box(wallpaper,"full")
				} else {
					expose_power_box(wallpaper)
				}
			}
		}
	} else if (wallpaper.getId() == "kubejs:exposed_controller_wallpaper") {
		if (can_crowbar) {
			if (event.getFacing().toString() == wallpaper.properties.get("facing")) {
				let player = event.getPlayer()
				if (player.isCrouching()) {
					yoink_power_box(wallpaper,"wires")
				}
			}
		} else if (item.hasTag("forge:tools/shears")) {
			if (event.getFacing().toString() == wallpaper.properties.get("facing")) {
				cut_power_box_wires(wallpaper)
			}
		} else if (item.getId() == "kubejs:scrap") {
			if (event.getFacing().toString() == wallpaper.properties.get("facing")) {
				repair_power_box(wallpaper,item)
			}
		}
	} else if (wallpaper.getId() == "kubejs:controller_wallpaper_dead") {
		if (can_crowbar) {
			if (event.getFacing().toString() == wallpaper.properties.get("facing")) {
				let player = event.getPlayer()
				if (player.isCrouching()) {
					yoink_power_box(wallpaper,"battery")
				}
			}
		} else if (item.getId() == "immersiveengineering:wire_copper") {
			if (event.getFacing().toString() == wallpaper.properties.get("facing")) {
				repair_power_box_wires(wallpaper,item)
			}
		}
	}
})
/**
* @param {Internal.BlockContainerJS} wallpaper
* @param {String} parts
*/
function yoink_power_box(wallpaper,parts){
	let [pos_x,pos_y,pos_z] = [wallpaper.getX(),wallpaper.getY(),wallpaper.getZ()]
	let facing = wallpaper.properties.get("facing")
	wallpaper.set("kubejs:stripped_wallpaper")
	wallpaper.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.metal.break","blocks",1,1)
	if (parts == "battery") {
		wallpaper.popItemFromFace("kubejs:battery",facing)
	} else if (parts == "wires") {
		wallpaper.popItemFromFace("kubejs:battery",facing)
		wallpaper.popItemFromFace("immersiveengineering:wire_copper",facing)
	} else if (parts == "full") {	
		wallpaper.popItemFromFace("kubejs:power_box",facing)
	}
}
/**
* @param {Internal.BlockContainerJS} wallpaper
*/
function expose_power_box(wallpaper){
	let [pos_x,pos_y,pos_z] = [wallpaper.getX(),wallpaper.getY(),wallpaper.getZ()]
	let facing = wallpaper.properties.get("facing")
	wallpaper.set("kubejs:exposed_controller_wallpaper",{"facing":facing})
	wallpaper.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.metal.break","blocks",1,1)
	wallpaper.popItemFromFace("kubejs:scrap",facing)
}
/**
* @param {Internal.BlockContainerJS} wallpaper
*/
function cut_power_box_wires(wallpaper){
	let facing = wallpaper.properties.get("facing")
	let [pos_x,pos_y,pos_z] = [wallpaper.getX(),wallpaper.getY(),wallpaper.getZ()]
	wallpaper.set("kubejs:controller_wallpaper_dead",{"facing":facing})
	wallpaper.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.sheep.shear","blocks",1,1)
	wallpaper.popItemFromFace("immersiveengineering:wire_copper",facing)
}
/**
* @param {Internal.BlockContainerJS} wallpaper
* @param {Internal.ItemStack} item
*/
function repair_power_box(wallpaper,item){
	let [pos_x,pos_y,pos_z] = [wallpaper.getX(),wallpaper.getY(),wallpaper.getZ()]
	let facing = wallpaper.properties.get("facing")
	wallpaper.set("kubejs:controller_wallpaper",{"facing":facing})
	wallpaper.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.metal.place","blocks",1,1)
	item.shrink(1)
}
/**
* @param {Internal.BlockContainerJS} wallpaper
* @param {Internal.ItemStack} item
*/
function repair_power_box_wires(wallpaper,item){
	let [pos_x,pos_y,pos_z] = [wallpaper.getX(),wallpaper.getY(),wallpaper.getZ()]
	let facing = wallpaper.properties.get("facing")
	wallpaper.set("kubejs:exposed_controller_wallpaper",{"facing":facing})
	wallpaper.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.bundle.insert","blocks",1,1)
	item.shrink(1)
}
/**
* @param {Internal.BlockContainerJS} wallpaper
* @param {Internal.ItemStack} item
*/
function install_backup_generator(wallpaper,item){
	let [pos_x,pos_y,pos_z] = [wallpaper.getX(),wallpaper.getY(),wallpaper.getZ()]
	let facing = wallpaper.properties.get("facing")
	wallpaper.set("kubejs:backup_generator",{"facing":facing})
	wallpaper.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.metal.place","blocks",1,1)
	item.shrink(1)
}
/**
* @param {Internal.BlockContainerJS} wallpaper
* @param {Internal.ItemStack} item
* @param {Internal.Direction} facing
*/
function install_power_box(wallpaper,item,facing){
	let [pos_x,pos_y,pos_z] = [wallpaper.getX(),wallpaper.getY(),wallpaper.getZ()]
	wallpaper.set("kubejs:controller_wallpaper",{"facing":facing})
	wallpaper.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.metal.place","blocks",1,1)
	item.shrink(1)
}

//cant do item application recipe for backup generator: rotation issues


//This could be a possible feature
/*BlockEvents.rightClicked("kubejs:stripped_wallpaper",event => {
	if (event.item.getId() == "immersiveengineering:toolupgrade_powerpack_induction") {
		const [pos_x,pos_y,pos_z] = [event.block.getX(),event.block.getY(),event.block.getZ()]
		event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.bundle.insert","blocks",1,1)
		event.item.shrink(1)
		const facing = event.getFacing()
		event.block.set("kubejs:controller_wallpaper_dead",{"facing":facing})
	}
})*/


ServerEvents.recipes(event => {
	event.shapeless('kubejs:power_box', ['kubejs:battery','immersiveengineering:wirecoil_copper','kubejs:scrap'])
	event.recipes.create.milling([
			Item.of("kubejs:battery"),
			Item.of("kubejs:scrap"),
			Item.of("immersiveengineering:wire_copper").withCount(3),
			Item.of("immersiveengineering:wire_copper").withChance(0.5)
		],
		"kubejs:power_box"
		)
})