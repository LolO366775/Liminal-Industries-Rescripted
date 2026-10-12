/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function elemental_cakes_placement_event_check(event) {
	let item = event.getItem()
	if (item.getId() == "create:blaze_cake") {
		elemental_cakes_placement_event(event,"kubejs:blaze_cake_block")
	} else if (item.getId() == "kubejs:basalz_cake") {
		elemental_cakes_placement_event(event,"kubejs:basalz_cake_block")
	} else if (item.getId() == "kubejs:blitz_cake") {
		elemental_cakes_placement_event(event,"kubejs:blitz_cake_block")
	} else if (item.getId() == "kubejs:blizz_cake") {
		elemental_cakes_placement_event(event,"kubejs:blizz_cake_block")
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} cake_block_id
*/
function elemental_cakes_placement_event(event,cake_block_id) {
	if (event.facing == "up") {
		let above = event.block.getUp()
		if (above.blockState.canBeReplaced()) {
			above.set(cake_block_id)
			event.item.shrink(1)
			let [pos_x,pos_y,pos_z] = [above.getX(),above.getY(),above.getZ()]
			above.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.wool.place","blocks",1,1)
		}
	}
}
BlockEvents.broken(event => {
	let cake = event.getBlock()
	let player = event.getPlayer()
	if (cake.getId() == "kubejs:blaze_cake_block") {
		elemental_cake_explode(cake)
		player.setSecondsOnFire(5)
	} else if (cake.getId() == "kubejs:basalz_cake_block") {
		elemental_cake_explode(cake)
	} else if (cake.getId() == "kubejs:blitz_cake_block") {
		elemental_cake_explode(cake)
	} else if (cake.getId() == "kubejs:blizz_cake_block") {
		elemental_cake_explode(cake)
	}
})
BlockEvents.rightClicked(event => {
	let cake = event.getBlock()
	let player = event.getPlayer()
	if (event.getHand() == "main_hand") {
		if (cake.getId() == "kubejs:blaze_cake_block") {
			elemental_cake_eat(cake,player)
		} else if (cake.getId() == "kubejs:basalz_cake_block") {
			elemental_cake_eat(cake,player)
		} else if (cake.getId() == "kubejs:blitz_cake_block") {
			elemental_cake_eat(cake,player)
		} else if (cake.getId() == "kubejs:blizz_cake_block") {
			elemental_cake_eat(cake,player)
		}
	}
})
/**
* @param {Internal.BlockContainerJS} cake
*/
function elemental_cake_explode(cake) {
	let level = cake.getLevel()
    let pos_x = cake.getX() + 0.5
    let pos_y = cake.getY() - 0.5
    let pos_z = cake.getZ() + 0.5
	if (cake.getId() == "kubejs:basalz_cake_block") {
		level.playSound(null,pos_x,pos_y,pos_z,"thermal:entity.basalz.ambient","blocks",1,0)
		level.spawnParticles("minecraft:ash",false,pos_x,pos_y,pos_z,1,1,1,50,0.1)
		cake.popItemFromFace(Item.of("thermal:basalz_powder").withCount(5),"up") //can be a loot table too for randomisation
	} else if (cake.getId() == "kubejs:blitz_cake_block") {
		level.playSound(null,pos_x,pos_y,pos_z,"thermal:entity.blitz.ambient","blocks",1,0)
		level.playSound(null,pos_x,pos_y,pos_z,"createaddition:electric_charge","blocks",1,2)
		level.spawnParticles("cofh_core:spark",false,pos_x,pos_y,pos_z,1,1,1,50,0.1)
		cake.popItemFromFace(Item.of("thermal:blitz_powder").withCount(5),"up")
	} else if (cake.getId() == "kubejs:blizz_cake_block") {
		level.playSound(null,pos_x,pos_y,pos_z,"thermal:entity.blizz.ambient","blocks",1,0)
		level.spawnParticles("minecraft:snowflake",false,pos_x,pos_y,pos_z,1,1,1,50,0.1)
		cake.popItemFromFace(Item.of("thermal:blizz_powder").withCount(5),"up")
	} else {
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.blaze.burn","blocks",1,0)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.blaze.ambient","blocks",1,0)
		level.spawnParticles("minecraft:flame",false,pos_x,pos_y,pos_z,1,1,1,50,0.1)
		cake.popItemFromFace(Item.of("minecraft:blaze_powder").withCount(5),"up")
	}
	level.spawnParticles("minecraft:explosion",false,pos_x,pos_y,pos_z,0.1,0.1,0.1,1,0)
	level.spawnParticles("minecraft:flash",false,pos_x,pos_y,pos_z,0.1,0.1,0.1,1,0)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.spider.step","blocks",1,2)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.firework_rocket.large_blast_far","blocks",1,2)
    level.playSound(null,pos_x,pos_y,pos_z,"mekanism:item.geiger_medium","blocks",1,2)
    level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.lava.extinguish","blocks",1,2)
	let mob = level.createEntity("area_effect_cloud")
    mob.setPos(pos_x,pos_y + 1,pos_z)
	mob.mergeNbt(get_elemental_cake_effect(cake))
	mob.spawn()
	/*if (0.1 >= Math.random()) { summon elemental?
		elemental_cake_explode(cake)
	}*/
}
/**
* @param {Internal.BlockContainerJS} cake
*/
function get_elemental_cake_effect(cake) {
	if (cake.getId() == "kubejs:basalz_cake_block") {
		return {"Particle":"minecraft:ash","Radius":1,"RadiusPerTick":0.3,"Duration":20,"Effects":[{"Id":53,"Amplifier":5,"Duration":120,"ShowParticles":true}]}
	} else if (cake.getId() == "kubejs:blitz_cake_block") {
		return {"Particle":"cofh_core:spark","Radius":1,"RadiusPerTick":0.3,"Duration":20,"Effects":[{"Id":52,"Amplifier":5,"Duration":120,"ShowParticles":true}]}
	} else if (cake.getId() == "kubejs:blizz_cake_block") {
		return {"Particle":"minecraft:snowflake","Radius":1,"RadiusPerTick":0.3,"Duration":20,"Effects":[{"Id":51,"Amplifier":5,"Duration":120,"ShowParticles":true}]}
	}
	return {"Particle":"minecraft:flame","Radius":1,"RadiusPerTick":0.3,"Duration":20,"Effects":[{"Id":72,"Amplifier":5,"Duration":120,"ShowParticles":true}]}
}
/**
* @param {Internal.BlockContainerJS} cake
* @param {Internal.Player} player
*/
function elemental_cake_eat(cake,player) {
	let bites = cake.properties.get("bites")
	let cake_id = cake.getId()
	let pos_x = cake.getX() + 0.5
    let pos_y = cake.getY() + 0.5
    let pos_z = cake.getZ() + 0.5
	if (bites == "0") {
		cake.set(cake_id,{"bites":"1"})
	} else if (bites == "1") {
		cake.set(cake_id,{"bites":"2"})
	} else if (bites == "2") {
		cake.set(cake_id,{"bites":"3"})
	} else if (bites == "3") {
		cake.set(cake_id,{"bites":"4"})
	} else if (bites == "4") {
		cake.set(cake_id,{"bites":"5"})
	} else if (bites == "5") {
		cake.set(cake_id,{"bites":"6"})
	} else {
		cake.set("minecraft:air")
	}
	player.addFood(2,1)
	cake.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.generic.eat","blocks",1,2)
	if (cake_id == "kubejs:basalz_cake_block") {
		cake.popItemFromFace(Item.of("thermal:basalz_powder"),"up") //can be a loot table too for randomisation
		player.potionEffects.add("cofh_core:sundered",30,0,true,true)
	} else if (cake_id == "kubejs:blitz_cake_block") {
		cake.popItemFromFace(Item.of("thermal:blitz_powder"),"up")
		player.potionEffects.add("cofh_core:shocked",30,0,true,true)
	} else if (cake_id == "kubejs:blizz_cake_block") {
		cake.popItemFromFace(Item.of("thermal:blizz_powder"),"up")
		player.potionEffects.add("cofh_core:chilled",30,0,true,true)
	} else {
		cake.popItemFromFace(Item.of("minecraft:blaze_powder"),"up")
		player.setSecondsOnFire(3)
	}
	if (0.1 >= Math.random()) {
		elemental_cake_explode(cake)
		cake.set("minecraft:air")
	}
}