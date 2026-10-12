/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function place_sign_get_direction(event) {
	let facing = event.getFacing()
	if (facing == "north") {
		return "north"
	} else if (facing == "south") {
		return "south"
	} else if (facing == "west") {
		return "west"
	} else if (facing == "east") {
		return "east"
	}
	return "none"
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function place_sign_get_result_sign(event) {
	let item_id = event.getItem().getId()
	if (item_id == "kubejs:arrow1_sign_item") {
		return "kubejs:arrow1_sign"
	} else if (item_id == "kubejs:arrow2_sign_item") {
		return "kubejs:arrow2_sign"
	} else if (item_id == "kubejs:box_sign_item") {
		return "kubejs:box_sign"
	} else if (item_id == "kubejs:cross_sign_item") {
		return "kubejs:cross_sign"
	} else if (item_id == "kubejs:exit_sign_item") {
		return "kubejs:exit_sign"
	} else if (item_id == "kubejs:exit_sign2_item") {
		return "kubejs:exit_sign2"
	} else if (item_id == "kubejs:explantion1_sign_item") {
		return "kubejs:explantion1_sign"
	} else if (item_id == "kubejs:explantion2_sign_item") {
		return "kubejs:explantion2_sign"
	} else if (item_id == "kubejs:infinity_sign_item") {
		return "kubejs:infinity_sign"
	} else if (item_id == "kubejs:inkblod_sign_item") {
		return "kubejs:inkblod_sign"
	} else if (item_id == "kubejs:left_arrow_sign_item") {
		return "kubejs:left_arrow_sign"
	} else if (item_id == "kubejs:liminal_warning_sign_item") {
		return "kubejs:liminal_warning"
	} else if (item_id == "kubejs:liminal_warning2_sign_item") {
		return "kubejs:liminal_warning2"
	} else if (item_id == "kubejs:monolith_sign_item") {
		return "kubejs:monolith_sign"
	} else if (item_id == "kubejs:nowhere_sign_item") {
		return "kubejs:nowhere_sign"
	} else if (item_id == "kubejs:right_arrow_sign_item") {
		return "kubejs:right_arrow_sign"
	} else if (item_id == "kubejs:skull_sign_item") {
		return "kubejs:skull_sign"
	} else if (item_id == "kubejs:stop_sign_item") {
		return "kubejs:stop_sign"
	} else if (item_id == "kubejs:tripple_sign_item") {
		return "kubejs:tripple_sign"
	} else if (item_id == "kubejs:turn_back_sign_item") {
		return "kubejs:turn_back_sign"
	} else if (item_id == "kubejs:unknown1_sign_item") {
		return "kubejs:unknown1"
	} else if (item_id == "kubejs:witahdigroi_sign_item") {
		return "kubejs:witahdigroi_sign"
	}
	return "none"
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function place_sign_pre(event) {
	let result_id = place_sign_get_result_sign(event)
	if (result_id != "none") {
		let facing = place_sign_get_direction(event)
		if (facing != "none") {
			place_sign(event,result_id,facing)
		}
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} result_id
* @param {String} facing
*/
function place_sign(event,result_id,facing) {
	let player = event.getPlayer()
	let server_player = player.server.getPlayer(player.getUuid())
	let sign = event.getBlock()
	sign.set(result_id,{"facing":facing})
	if (!server_player.isCreative()) {
		event.item.shrink(1)
	}
	let [pos_x,pos_y,pos_z] = [sign.getX(),sign.getY(),sign.getZ()]
	event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.lantern.place","blocks",1,1)
}
BlockEvents.rightClicked("kubejs:traffic_pole",event => {
	place_sign_pre(event)
})
ServerEvents.recipes(event => {
	event.recipes.create.milling([Item.of('kubejs:scrap').withChance(0.75)],'minecraft:iron_ingot')
	event.recipes.minecraft.stonecutting("kubejs:traffic_pole", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:arrow1_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:arrow2_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:cross_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:exit_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:exit_sign2_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:explantion1_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:explantion2_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:infinity_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:inkblod_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:left_arrow_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:liminal_warning_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:liminal_warning2_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:monolith_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:nowhere_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:right_arrow_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:skull_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:stop_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:tripple_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:turn_back_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:unknown1_sign_item", "kubejs:scrap")
	event.recipes.minecraft.stonecutting("kubejs:witahdigroi_sign_item", "kubejs:scrap")
	event.shapeless('kubejs:scrap', ['kubejs:arrow1_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:arrow2_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:cross_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:exit_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:exit_sign2_item'])
	event.shapeless('kubejs:scrap', ['kubejs:explantion1_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:explantion2_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:infinity_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:inkblod_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:left_arrow_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:liminal_warning_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:liminal_warning2_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:monolith_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:nowhere_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:right_arrow_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:skull_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:stop_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:tripple_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:turn_back_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:unknown1_sign_item'])
	event.shapeless('kubejs:scrap', ['kubejs:witahdigroi_sign'])
})