ServerEvents.recipes(event => {
	event.shapeless('kubejs:brown_location_card', ['kubejs:brown_location_card'])
	event.shapeless('kubejs:red_location_card', ['kubejs:red_location_card'])
	event.shapeless('kubejs:orange_location_card', ['kubejs:orange_location_card'])
	event.shapeless('kubejs:yellow_location_card', ['kubejs:yellow_location_card'])
	event.shapeless('kubejs:lime_location_card', ['kubejs:lime_location_card'])
	event.shapeless('kubejs:green_location_card', ['kubejs:green_location_card'])
	event.shapeless('kubejs:cyan_location_card', ['kubejs:cyan_location_card'])
	event.shapeless('kubejs:light_blue_location_card', ['kubejs:light_blue_location_card'])
	event.shapeless('kubejs:blue_location_card', ['kubejs:blue_location_card'])
	event.shapeless('kubejs:purple_location_card', ['kubejs:purple_location_card'])
	event.shapeless('kubejs:magenta_location_card', ['kubejs:magenta_location_card'])
	event.shapeless('kubejs:pink_location_card', ['kubejs:pink_location_card'])
	event.shapeless('kubejs:white_location_card', ['kubejs:white_location_card'])
	event.shapeless('kubejs:light_gray_location_card', ['kubejs:light_gray_location_card'])
	event.shapeless('kubejs:gray_location_card', ['kubejs:gray_location_card'])
	event.shapeless('kubejs:black_location_card', ['kubejs:black_location_card'])
})
BlockEvents.rightClicked(event => {
	let player = event.getPlayer()
	if (event.getItem().hasTag("kubejs:location_cards")) {
		if (event.hand == "main_hand") {
			if (player.isCrouching()) {
				let block = event.getBlock()
				if (block.getId() != "kubejs:location_terminal") {
					use_location_card(event,block)
				}
			}
		}
	}
})
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function is_facing_up(event){
	let face = event.getFacing()
	if (face == "up") {
		return true
	}
	return false
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {Internal.BlockContainerJS} block
*/
function use_location_card(event,block){
	let player = event.getPlayer()
	let card = event.getItem()
	if (save_location_card(card,player)) {
		if (is_facing_up(event)) {
			let location_block = block.getUp()
			let level = player.getLevel()
			let name = card.getDisplayName().getString().replace("[","").replace("]","")
			let dimension = level.getDimension().toString()
			let [pos_x,pos_y,pos_z] = [location_block.getX() + 0.5,location_block.getY(),location_block.getZ() + 0.5]
			player.tell(`§aSet location "${name}" to: ${pos_x - 0.5} ${pos_y} ${pos_z - 0.5} in ${dimension}`)
			card.setNbt({"CustomModelData":1,"location":{"name":name,"levelKey":dimension,"blockpos":{"X":pos_x,"Y":pos_y,"Z":pos_z}}})
			card.setHoverName(Text.of("Location Card (Written)").italic(false))
			level.spawnParticles("supplementaries:air_burst",false,pos_x,pos_y,pos_z,0.5,0.1,0.5,25,0)
			level.playSound(null,pos_x,pos_y,pos_z,"patchouli:book_flip","players",1,2)
		}
	}
	return 1
}
/**
* @param {Internal.ItemStack} card
* @param {Internal.Player} player
*/
function save_location_card(card,player){
	try {
		let location_data = card.getNbt().getCompound("location")
		if (location_data.isEmpty()) {
			return true
		}
		/*let name = location_data.getString("name")
		let dimension = location_data.getString("levelKey")
		let position = location_data.getCompound("blockpos")
		let pos_x = position.getInt("X")
		let pos_y = position.getInt("Y")
		let pos_z = position.getInt("Z")
		player.tell(`§aCurrent location "${name}": ${pos_x} ${pos_y} ${pos_z} in ${dimension}`)*/
		return false
	} catch (error) {
		return true
	}
}