/**
* @param {Internal.BlockContainerJS} carpet
* @param {Internal.ItemStack} item
* @param {Internal.Player} player
*/
function cut_carpet(carpet,item,player){
	let position = carpet.getPos()
	if (item.hasTag("forge:tools/knives")) {
		if (carpet.getUp().id == "minecraft:air" || carpet.getUp().id == "torchmaster:invisible_light") {
			if (item.nbt && item.nbt.getBoolean("tic_broken")) {
				return 0
			}
			if (player.isFake()) {
        		player.give("kubejs:cut_carpet")
    		} else {
        		carpet.offset(0,1,0).popItemFromFace("kubejs:cut_carpet","up")
    		}
			if (0.05 > Math.random()) {
				carpet.set("kubejs:drain_breakable")
				carpet.level.playSound(null,position.x,position.y,position.z,"minecraft:block.lantern.hit","blocks",1,0)
			} else {
				carpet.set("kubejs:floor_tiles")
				carpet.level.playSound(null,position.x,position.y,position.z,"minecraft:block.wool.break","blocks",1,1.5)
			}
		}
		if (item.getDamageValue() >= item.getMaxDamage()) {
			item.shrink(1)
		} else {
			item.setDamageValue(item.getDamageValue() + 1)
		}
	}
    return 1
}
BlockEvents.leftClicked("kubejs:carpet", event  => {
	cut_carpet(event.block,event.item,event.player)
})

BlockEvents.leftClicked("kubejs:soul_carpet", event  => {
	cut_carpet(event.block,event.item,event.player)
})

BlockEvents.leftClicked("kubejs:soggy_carpet", event  => {
	cut_carpet(event.block,event.item,event.player)
})

ServerEvents.recipes(event => {
	event.custom({
		"type": "lychee:block_interacting",
		"item_in": {
			"item": "kubejs:cut_carpet"
		},
		"block_in": "kubejs:floor_tiles",
		"post": [
			{
				"type": "execute",
				"command": "playsound minecraft:block.wool.place master @a ~ ~ ~ 1 1",
				"hide": "true"
			},
			{
				"type": "execute",
				"command": "execute as @a[distance=..0.7] at @s run tp @s ~ ~0.1 ~",
				"hide": "true"
			},
			{
				"type": "place",
				"block": "kubejs:carpet"
			}
		]
	})
})