BlockEvents.rightClicked('kubejs:stripped_wallpaper', event => {
	bonemeal_wallpaper(event,"kubejs:wallpaper1")
})
BlockEvents.rightClicked('kubejs:stripped_wallpaper2', event => {
	bonemeal_wallpaper(event,"kubejs:wallpaper2")
})
BlockEvents.rightClicked('kubejs:stripped_wallpaper3', event => {
	bonemeal_wallpaper(event,"kubejs:wallpaper3")
})
BlockEvents.rightClicked('kubejs:stripped_wallpaper4', event => {
	bonemeal_wallpaper(event,"kubejs:wallpaper4")
})
BlockEvents.rightClicked('kubejs:stripped_wallpaper5', event => {
	bonemeal_wallpaper(event,"kubejs:wallpaper5")
})
BlockEvents.rightClicked('kubejs:stripped_wallpaper6', event => {
	bonemeal_wallpaper(event,"kubejs:wallpaper6")
})
BlockEvents.rightClicked('kubejs:stripped_wallpaper7', event => {
	bonemeal_wallpaper(event,"kubejs:wallpaper7")
})
BlockEvents.rightClicked('kubejs:stripped_wallpaper_perm', event => {
	bonemeal_wallpaper(event,"kubejs:wallpaper1")
})
BlockEvents.rightClicked('kubejs:stripped_wallpaper2_perm', event => {
	bonemeal_wallpaper(event,"kubejs:wallpaper2")
})
BlockEvents.rightClicked('kubejs:stripped_wallpaper3_perm', event => {
	bonemeal_wallpaper(event,"kubejs:wallpaper3")
})
BlockEvents.rightClicked('kubejs:stripped_wallpaper4_perm', event => {
	bonemeal_wallpaper(event,"kubejs:wallpaper4")
})
BlockEvents.rightClicked('kubejs:stripped_wallpaper5_perm', event => {
	bonemeal_wallpaper(event,"kubejs:wallpaper5")
})
BlockEvents.rightClicked('kubejs:stripped_wallpaper6_perm', event => {
	bonemeal_wallpaper(event,"kubejs:wallpaper6")
})
BlockEvents.rightClicked('kubejs:stripped_wallpaper7_perm', event => {
	bonemeal_wallpaper(event,"kubejs:wallpaper7")
})
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} result_block
*/
function bonemeal_wallpaper(event,result_block){
	let {hand} = event
	if (hand == "main_hand") {
    	let item_id = event.item.getId()
  		if (item_id == "minecraft:bone_meal") {
			let wallpaper = event.getBlock()
			let age = wallpaper.properties.get("age")
			if (age == "0") {
				use_bonemeal_on_wallpaper(event)
				wallpaper.set(wallpaper.getId(),{"age":"1"})
			} else if (age == "1") {
				use_bonemeal_on_wallpaper(event)
				wallpaper.set(wallpaper.getId(),{"age":"2"})
			} else if (age == "2") {
				use_bonemeal_on_wallpaper(event)
				wallpaper.set(wallpaper.getId(),{"age":"3"})
			} else if (age == "3") {
				use_bonemeal_on_wallpaper(event)
				wallpaper.set(result_block)
			}
		}
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function use_bonemeal_on_wallpaper(event){
	let wallpaper = event.getBlock()
    let [pos_x,pos_y,pos_z] = [wallpaper.getX() + 0.5,wallpaper.getY(),wallpaper.getZ() + 0.5]
	let {player} = event
	let bone_meal = event.getItem()
    event.level.spawnParticles("minecraft:happy_villager",false,pos_x,pos_y,pos_z,0.5,0.5,0.5,25,0)
	event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.bone_meal.use","blocks",1,1)
   	bone_meal.shrink(1)
    player.addItemCooldown(bone_meal.getId(),10)
}