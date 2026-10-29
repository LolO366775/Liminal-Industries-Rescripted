BlockEvents.rightClicked('kubejs:drain_breakable', event => {
	if (event.item.hasTag("kubejs:crowbars")) {
		let drain = event.block
		let [pos_x, pos_y, pos_z] = [drain.getX(),drain.getY(),drain.getZ()]
		drain.set("kubejs:poolrooms_portal")
		let level = drain.getLevel()
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.zombie.attack_iron_door","blocks",0.1,0)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.armor.equip_netherite","blocks",0.1,0)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.axe.scrape","blocks",0.1,0)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.underwater.loop.additions.ultra_rare","blocks",0.1,0)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.underwater.loop.additions.ultra_rare","blocks",0.1,0)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.underwater.loop.additions.ultra_rare","blocks",0.1,0)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.underwater.loop.additions.ultra_rare","blocks",0.1,0)
		level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.underwater.loop.additions.ultra_rare","blocks",0.1,0)
		level.spawnParticles("minecraft:campfire_cosy_smoke",false,pos_x,pos_y,pos_z,0.3,0.3,0.3,10,0.01)
		level.spawnParticles("minecraft:block kubejs:drain",false,pos_x,pos_y,pos_z,0.3,0.3,0.3,10,0.01)
		drain.popItemFromFace("kubejs:drain_item","up")
	}
})
BlockEvents.rightClicked('kubejs:drain', event => {
	if (event.item.hasTag("kubejs:crowbars")) {
		let drain = event.block
		if (event.level.getDimension() != "backrooms:poolrooms") {
			let [pos_x, pos_y, pos_z] = [drain.getX(),drain.getY(),drain.getZ()]
			drain.set("kubejs:floor_tiles")
			drain.popItemFromFace("kubejs:drain_item","up")
			drain.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.armor.equip_netherite","blocks",0.1,0)
			drain.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.axe.scrape","blocks",0.1,0)
		}
	}
})
//carpet.level.playSound(null,position.x,position.y,position.z,"minecraft:block.lantern.hit","blocks",1,2)