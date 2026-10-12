//Bridge Interaction Functions
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
global.right_click_locker_event = event => {
	if (event.hand == "main_hand") {
		let locker = event.getBlock()
		if (locker.getId() == "kubejs:pool_locker_single") {
			open_locker_with_crowbar(event)
		} else if (locker.getId() == "kubejs:pool_locker_double") {
			open_locker_with_crowbar(event)
		} else if (locker.getId() == "kubejs:open_pool_locker_single") {
			collect_locker_loot(event)
		} else if (locker.getId() == "kubejs:open_pool_locker_double") {
			collect_locker_loot(event)
		}
	}
	return 1
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function open_locker_with_crowbar(event){
	let [pos_x,pos_y,pos_z] = [event.block.getX() + 0.5,event.block.getY(),event.block.getZ() + 0.5]
	if (event.getItem() == "kubejs:crowbar") {
		event.level.spawnParticles("minecraft:crit",false,pos_x,pos_y,pos_z,0.1,0.1,0.1,5,0.5)
		if (coin_flip(0.1)) {
			event.item.shrink(1)
			event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.shield.break","blocks",0.5,0)
			event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.zombie.attack_iron_door","blocks",0.5,1)
		} else {
			event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.zombie.attack_iron_door","blocks",0.5,2)
			open_locker(event.getBlock(),false)
		}
	} else if (event.getItem() == "thermal:ruby") {
		let locker = event.getBlock()
		let block_half = locker.properties.get("half")
		if (block_half == "top") {
			if (use_ruby_on_locker(locker.getUp())) {
				event.getItem().shrink(1)
			}
		} else {
			if (use_ruby_on_locker(locker)) {
				event.getItem().shrink(1)
			}
		}

	}
	return 1
}
/**
* @param {Internal.BlockContainerJS} bottom
*/
function use_ruby_on_locker(bottom){
	if (bottom.getId() == "kubejs:pool_locker_single" || bottom.getId() == "kubejs:pool_locker_double") {
		let locker_data = bottom.getEntityData().getCompound("data")
		let luck = locker_data.getInt("luck")
		luck++
		if (5 >= luck) {
			locker_data.putInt("luck",luck)
			bottom.setEntityData({"data":locker_data})
			let [pos_x,pos_y,pos_z] = [bottom.getX() + 0.5,bottom.getY(),bottom.getZ() + 0.5]
			bottom.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.honeycomb.wax_on","blocks",0.5,2)
			bottom.level.playSound(null,pos_x,pos_y,pos_z,"eidolon:select_rune","blocks",0.5,2)
			bottom.level.spawnParticles("minecraft:wax_on",false,pos_x,pos_y,pos_z,0.5,1,0.5,25,0)
			return true
		}
	}
	return false
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function collect_locker_loot(event){
	let locker = event.getBlock()
	let luck = locker.getEntityData().getCompound("data").getInt("luck")
	let player = event.getPlayer()
	let [slot_0,slot_1,slot_2,slot_3] = [locker.properties.get("slot_0_occupied"),locker.properties.get("slot_1_occupied"),locker.properties.get("slot_2_occupied"),locker.properties.get("slot_3_occupied")]
	if (locker.getId() == "kubejs:open_pool_locker_single") {
		if (slot_0 == "true") {
			steal_locker_cardboard_box(player,locker,false,slot_1,slot_2,slot_3,"25")
		} else if (slot_1 == "true") {
			steal_locker_cardboard_box(player,locker,false,false,slot_2,slot_3,"25")
		} else if (slot_2 == "true") {
			steal_locker_cardboard_box(player,locker,false,false,false,slot_3,"25")
		} else if (slot_3 == "true") {
			steal_locker_cardboard_box(player,locker,false,false,false,false,"25")
		}
	} else if (locker.getId() == "kubejs:open_pool_locker_double") {
		let towel_colour = locker.properties.get("age")
		let half = locker.properties.get("half")
		if (slot_0 == "true") {
			steal_locker_cardboard_box(player,locker,false,slot_1,slot_2,slot_3,towel_colour)
		} else if (slot_1 == "true") {
			steal_locker_cardboard_box(player,locker,false,false,slot_2,slot_3,towel_colour)
		} else if (slot_2 == "true") {
			steal_locker_cardboard_box(player,locker,false,false,false,slot_3,towel_colour)
		} else if (slot_3 == "true") {
			steal_locker_cardboard_box(player,locker,false,false,false,false,towel_colour)
		} else if (half == "top") {
			if (is_towel_colour(towel_colour)) {
				steal_locker_towel(player,locker,luck)
			}
		}
	}
	return 1
}

//Functions

function get_towel_colour(){
	let colour = Math.round((Math.random() * (25 - 0.001))-0.5)
    return colour
}
/**
* @param {Number} chance
*/
function coin_flip(chance){
	if (chance >= Math.random()) {
		return true
	}
    return false
}
/**
* @param {Number} chance
* @param {Boolean} prereq
*/
function coin_flip_w_prereq(chance, prereq){
	if (prereq) {
		if (chance >= Math.random()) {
			return true
		}
	}
    return false
}
/**
* @param {Internal.BlockContainerJS} locker
* @param {Boolean} from_sculker
*/
function open_locker(locker,from_sculker){
	let luck = locker.getEntityData().getCompound("data").getInt("luck")
	let block_half = locker.properties.get("half")
	let bottom = locker
	let top = locker.getUp()
	let facing = bottom.properties.get("facing")
	let towel_colour = get_towel_colour()
	if (block_half == "top") {
		top = locker
		bottom = locker.getDown()
	}
	if (coin_flip(0.50)) {
		let box4 = coin_flip(0.50)
		let box3 = coin_flip_w_prereq(0.50,box4)
		let box2 = coin_flip_w_prereq(0.50,box3)
		let box1 = coin_flip_w_prereq(0.50,box2)
		top.set("kubejs:open_pool_locker_double",{"half":"top","facing":facing,"slot_0_occupied":coin_flip(0.25),"slot_1_occupied":coin_flip(0.25),"slot_2_occupied":false,"slot_3_occupied":false,"age":`${towel_colour}`})
		bottom.set("kubejs:open_pool_locker_double",{"half":"bottom","facing":facing,"slot_0_occupied":box1,"slot_1_occupied":box2,"slot_2_occupied":box3,"slot_3_occupied":box4})
	} else {
		top.set("kubejs:open_pool_locker_single",{"half":"top","facing":facing,"slot_0_occupied":coin_flip(0.25),"slot_1_occupied":coin_flip(0.25),"slot_2_occupied":coin_flip(0.25),"slot_3_occupied":coin_flip(0.25)})
		bottom.set("kubejs:open_pool_locker_single",{"half":"bottom","facing":facing,"slot_0_occupied":coin_flip(0.25),"slot_1_occupied":coin_flip(0.25),"slot_2_occupied":coin_flip(0.25),"slot_3_occupied":coin_flip(0.25)})
	}
	//locker.level.server.runCommandSilent(`say ${luck}`)
	if (from_sculker) {
		top.setEntityData({"data":{"from_sculker":true}})
		bottom.setEntityData({"data":{"from_sculker":true}})
	} else if (luck != undefined) {
		top.setEntityData({"data":{"luck":luck}})
		bottom.setEntityData({"data":{"luck":luck}})
	}

    return 1
}
/**
* @param {Number} luck
* @param {Boolean} from_sculker
*/
function get_random_loot_item(luck,from_sculker){
	if (from_sculker) {
		if (coin_flip(0.5)) {return "minecraft:shulker_shell"}
	}
	let common_categories = [loot_pool_floaties(),loot_pool_floaties(),loot_pool_floaties(),loot_clothing(),loot_clothing(),loot_picnic(),loot_games()]
	let rare_categories = [loot_armour_trims(),loot_beach_discs()]
	let loot_pool = rare_categories.concat(common_categories,common_categories,common_categories)
	let template_chance = 0.01 * (luck * 2)
	let chosen_loot = loot_pool[Math.round((Math.random() * (loot_pool.length -0.001))-0.5)]
	if (coin_flip(template_chance)) {
		chosen_loot = "minecraft:netherite_upgrade_smithing_template"
	}
	return chosen_loot
}
function get_random_cardboard_box(){
	if (coin_flip(0.5)) {return "create:cardboard_package_10x8"}
	else if (coin_flip(0.5)) {return "create:cardboard_package_12x10"}
    return "create:cardboard_package_10x12"
}
/**
* @param {Internal.BlockContainerJS} locker
* @param {Internal.Player} player
* @param {string} slot_0
* @param {string} slot_1
* @param {string} slot_2
* @param {string} slot_3
* @param {string} towel_colour
*/
function steal_locker_cardboard_box(player,locker,slot_0,slot_1,slot_2,slot_3,towel_colour){
	let luck = locker.getEntityData().getCompound("data").getInt("luck")
	let from_sculker = locker.getEntityData().getCompound("data").getBoolean("from_sculker")
	let cardboard_box = Item.of(get_random_cardboard_box(),1,{"Items":{"Items":[{"Slot":0,"id":get_random_loot_item(luck,from_sculker),"Count":1}]}})
	player.addItem(cardboard_box)
	let [pos_x,pos_y,pos_z] = [locker.getX() + 0.5,locker.getY(),locker.getZ() + 0.5]
	let half = locker.properties.get("half")
	let facing = locker.properties.get("facing")
	locker.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.bundle.remove_one","blocks",1,1)
	if (locker.getId() == "kubejs:open_pool_locker_double") {
		locker.set("kubejs:open_pool_locker_double",{"half":half,"facing":facing,"slot_0_occupied":slot_0,"slot_1_occupied":slot_1,"slot_2_occupied":slot_2,"slot_3_occupied":slot_3,"age":towel_colour})
	} else {
		locker.set("kubejs:open_pool_locker_single",{"half":half,"facing":facing,"slot_0_occupied":slot_0,"slot_1_occupied":slot_1,"slot_2_occupied":slot_2,"slot_3_occupied":slot_3})
	}
    return 1
}
/**
* @param {string} towel_colour
*/
function is_towel_colour(towel_colour){
	let colours = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]
	for (let colour = 0; colour < colours.length; colour++) {
		if (colours[colour] == towel_colour) {return true}
	}
	return false
}

/**
* @param {Internal.Player} player
* @param {Internal.BlockContainerJS} locker
* @param {Number} luck
*/
function steal_locker_towel(player,locker,luck){
	let template_chance = 0.01 * (luck * 2)
	if (coin_flip(template_chance)) {
		player.addItem(Item.of("minecraft:elytra",1))
	} else {
		player.addItem(Item.of("beachparty:beach_towel",1))
	}
	let [pos_x,pos_y,pos_z] = [locker.getX() + 0.5,locker.getY(),locker.getZ() + 0.5]
	let half = locker.properties.get("half")
	let facing = locker.properties.get("facing")
	locker.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.bundle.remove_one","blocks",1,1)
	locker.set("kubejs:open_pool_locker_double",{"half":half,"facing":facing,"slot_0_occupied":false,"slot_1_occupied":false,"slot_2_occupied":false,"slot_3_occupied":false,"age":"25"})
    return 1
}