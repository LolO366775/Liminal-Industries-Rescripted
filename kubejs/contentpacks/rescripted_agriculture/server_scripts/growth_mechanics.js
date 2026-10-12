BlockEvents.rightClicked('kubejs:uncanny_shroom_crop', event => {
	bonemeal_shroom_crop(event)
})
BlockEvents.rightClicked('kubejs:wall_cave_carrot_crop', event => {
	bonemeal_shroom_crop(event)
})
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function bonemeal_shroom_crop(event){
	let {hand} = event
	if (hand == "main_hand") {
    	let item_id = event.item.getId()
  		if (item_id == "minecraft:bone_meal") {
  			let wallpaper = event.getBlock()
			let age = wallpaper.properties.get("age")
            let facing = wallpaper.properties.get("facing")
			if (age == "0") {
				use_bonemeal_on_shroom_crop(event)
                if (Math.random() < 0.75) {
				    wallpaper.set(wallpaper.getId(),{"age":"1","facing":facing})
                }
			} else if (age == "1") {
				use_bonemeal_on_shroom_crop(event)
                if (Math.random() < 0.75) {
				    wallpaper.set(wallpaper.getId(),{"age":"2","facing":facing})
                }
			} else if (age == "2") {
				use_bonemeal_on_shroom_crop(event)
                if (Math.random() < 0.75) {
				    wallpaper.set(wallpaper.getId(),{"age":"3","facing":facing})
                }
			}     
		}
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function use_bonemeal_on_shroom_crop(event){
    let wallpaper = event.getBlock()
    let [pos_x,pos_y,pos_z] = [wallpaper.getX() + 0.5,wallpaper.getY(),wallpaper.getZ() + 0.5]
	let {player} = event
	let bone_meal = event.getItem()
    event.level.spawnParticles("minecraft:happy_villager",false,pos_x,pos_y,pos_z,0.5,0.5,0.5,25,0)
	event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.bone_meal.use","blocks",1,1)
   	bone_meal.shrink(1)
    player.addItemCooldown(bone_meal.getId(),10)
}