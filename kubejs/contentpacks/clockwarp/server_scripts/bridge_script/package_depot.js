BlockEvents.rightClicked("kubejs:dark_dimensional_package_depot",event => {
	if (event.getItem().hasTag("kubejs:location_cards")) {
		if (event.hand == "main_hand") {
			if (!event.player.isCrouching()) {
				global.dimensional_depot_right_click_event(event)
			}
		}
	}
})
BlockEvents.rightClicked("kubejs:rich_dimensional_package_depot",event => {
	if (event.getItem().hasTag("kubejs:location_cards")) {
		if (event.hand == "main_hand") {
			if (!event.player.isCrouching()) {
				global.dimensional_depot_right_click_event(event)
			}
		}
	}
})
BlockEvents.rightClicked("kubejs:pink_dimensional_package_depot",event => {
	if (event.getItem().hasTag("kubejs:location_cards")) {
		if (event.hand == "main_hand") {
			if (!event.player.isCrouching()) {
				global.dimensional_depot_right_click_event(event)
			}
		}
	}
})
BlockEvents.rightClicked("kubejs:location_terminal",event => {
	if (event.getItem().hasTag("kubejs:location_cards")) {
		if (event.hand == "main_hand") {
			if (!event.player.isCrouching()) {
				global.location_terminal_right_click_with_card_event(event)
			}
		}
	}
})