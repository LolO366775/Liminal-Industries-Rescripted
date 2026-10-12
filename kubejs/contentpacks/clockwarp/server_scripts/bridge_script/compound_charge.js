BlockEvents.rightClicked("kubejs:compound_charge", event => {
	if (event.item.getId() == "kubejs:unstable_compound") {
		global.right_click_charge_with_compound(event,"unstable")
	} else if (event.item.getId() == "kubejs:perfectly_stablised_compound") {
		global.right_click_charge_with_compound(event,"perfect")
	}
})
BlockEvents.rightClicked("kubejs:empty_compound_charge", event => {
	if (event.item.getId() == "kubejs:unstable_compound") {
		global.right_click_charge_with_compound(event,"unstable")
	} else if (event.item.getId() == "kubejs:perfectly_stablised_compound") {
		global.right_click_charge_with_compound(event,"perfect")
	}
})
BlockEvents.rightClicked("minecraft:sand", event => {
	if (event.item.getId() == "kubejs:unstable_compound") {
		global.right_click_sand_with_compound(event,"sand")
	}
})
BlockEvents.rightClicked("minecraft:red_sand", event => {
	if (event.item.getId() == "kubejs:unstable_compound") {
		global.right_click_sand_with_compound(event,"red_sand")
	}
})
BlockEvents.rightClicked("minecraft:soul_sand", event => {
	if (event.item.getId() == "kubejs:unstable_compound") {
		global.right_click_sand_with_compound(event,"soul_sand")
	}
})
LootJS.modifiers((event) => {
	event.addBlockLootModifier("kubejs:compound_charge").replaceLoot("kubejs:compound_charge", "kubejs:empty_compound_charge")
})