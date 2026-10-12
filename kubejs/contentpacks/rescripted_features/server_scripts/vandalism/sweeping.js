/**
* @param {Internal.BlockContainerJS} carpet
*/
function sweep_carpet(carpet){
	let [pos_x,pos_y,pos_z] = [carpet.getX(),carpet.getY(),carpet.getZ()]
	carpet.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.brush.brushing.generic","blocks",1,1)
	carpet.level.spawnParticles("minecraft:campfire_signal_smoke",false,pos_x,pos_y + 1.3,pos_z,1,0.1,1,2,0.001)
	if (0.05 >= Math.random()) {
		let mob = carpet.level.createEntity("minecraft:silverfish")
		mob.setPos(pos_x + 0.5,pos_y + 1,pos_z + 0.5)
		mob.spawn()
	} else if (0.5 >= Math.random()) {
		Utils.rollChestLoot('kubejs:gameplay/sweep_carpet').forEach(item => {
        	carpet.popItemFromFace(item,'up')
		})
	}
    return 1
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function right_click_carpet_event(event){
	let carpet = event.block
	let {hand, player} = event
	if (event.item.id == 'minecraft:brush') {
		player.damageHeldItem(hand, 1)
		if (!player.isFake()) {
    		player.addItemCooldown('minecraft:brush',10)
		}
		sweep_carpet(carpet)
		event.cancel()
	} else if (event.item.id == 'kubejs:straw_brush') {
		player.damageHeldItem(hand, 1)
		if (!player.isFake()) {
    		player.addItemCooldown('kubejs:straw_brush',10)
		}
		sweep_carpet(carpet)
		event.cancel()
	} else if (event.item.id == 'kubejs:diamond_brush') {
		if (!player.isFake()) {
    		player.addItemCooldown('kubejs:diamond_brush',10)
		}
		sweep_carpet(carpet)
		event.cancel()
	}
}

BlockEvents.rightClicked('kubejs:carpet', event => {
	right_click_carpet_event(event)
})
BlockEvents.rightClicked('kubejs:red_carpet', event => {
	right_click_carpet_event(event)
})