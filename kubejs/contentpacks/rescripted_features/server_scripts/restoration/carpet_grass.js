BlockEvents.rightClicked("kubejs:carpet", event => {
	let {hand, player} = event
	if (hand == "main_hand") {
    	let item_id = event.item.id
    	let above = event.block.getUp()
    	let [pos_x,pos_y,pos_z] = [event.block.getX() + 0.5,event.block.getY() + 1,event.block.getZ() + 0.5]
  		if (item_id == "minecraft:bone_meal") {
        	event.level.spawnParticles("minecraft:happy_villager",false,pos_x,pos_y,pos_z,0.5,0.5,0.5,25,0)
			event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.bone_meal.use","blocks",1,1)
        	if (above.getId() == "minecraft:air") {
            above.set("kubejs:carpet_grass")
        	}
        	event.item.shrink(1)
        	player.addItemCooldown(item_id,10)
		}
	}
})

BlockEvents.leftClicked("kubejs:carpet_grass", event  => {
	let {player} = event
	let item = event.getItem()
	let carpet = event.getBlock()
	let position = carpet.getPos()
	if (item.hasTag("forge:tools/knives")) {
		if (0.5 > Math.random()) {
			if (player.isFake()) {
        		player.give("farmersdelight:straw")
    		} else {
        		carpet.offset(0,1,0).popItem("farmersdelight:straw")
    		}
		}
		carpet.level.playSound(null,position.x,position.y,position.z,"minecraft:block.wool.break","blocks",1,1.5)
		carpet.set("minecraft:air")
		if (item.getDamageValue() >= item.getMaxDamage()) {
			item.shrink(1)
		} else {
			item.setDamageValue(item.getDamageValue() + 1)
		}
	}
})

ServerEvents.recipes(event => {
	event.recipes.farmersdelight.cutting(
        "farmersdelight:straw",
        "#forge:tools/knives",
        [
            Item.of("minecraft:string")
        ]
	)
})
