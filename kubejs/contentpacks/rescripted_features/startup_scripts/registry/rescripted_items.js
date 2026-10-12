/**
* @param {Registry.Item} event
*/
function item_registery_rescripted_items(event) {
	let register_location_card = (id,display_name,model) => {
		event.create(id)
		.modelJson({
			"parent": "item/generated",
			"textures": {
				"layer0": `kubejs:item/${model}`
			},
			"overrides": [
				{"predicate": {"custom_model_data":1}, "model": `kubejs:item/${model}_filled`},
			]
		})
		.displayName(display_name)
	}
	let register_general = (id,display_name,model) => {
		event.create(id)
		.texture('layer0', `kubejs:item/${model}`)
		.displayName(display_name)
	}
	//basic items
	register_general("lithium_ion_battery","Lithium-Ion Battery","lithium_ion_battery")
	register_general("copycat_alloy","Copycat Alloy","copycat_alloy")
	register_general("porcelain_shard","Porcelain Shard","porcelain_shard")
	register_general("porcelain_cup","Porcelain Cup","porcelain_cup")
	register_general("holographic_cube","Holographic Cube","holographic_cube")
	//location_cards
	register_location_card("brown_location_card","Brown Location Card","location_cards/brown")
	register_location_card("red_location_card","Red Location Card","location_cards/red")
	register_location_card("orange_location_card","Orange Location Card","location_cards/orange")
	register_location_card("yellow_location_card","Yellow Location Card","location_cards/yellow")
	register_location_card("lime_location_card","Lime Location Card","location_cards/lime")
	register_location_card("green_location_card","Green Location Card","location_cards/green")
	register_location_card("cyan_location_card","Cyan Location Card","location_cards/cyan")
	register_location_card("light_blue_location_card","Light Blue Location Card","location_cards/light_blue")
	register_location_card("blue_location_card","Blue Location Card","location_cards/blue")
	register_location_card("purple_location_card","Purple Location Card","location_cards/purple")
	register_location_card("magenta_location_card","Magenta Location Card","location_cards/magenta")
	register_location_card("pink_location_card","Pink Location Card","location_cards/pink")
	register_location_card("white_location_card","White Location Card","location_cards/white")
	register_location_card("light_gray_location_card","Light Gray Location Card","location_cards/light_gray")
	register_location_card("gray_location_card","Gray Location Card","location_cards/gray")
	register_location_card("black_location_card","Black Location Card","location_cards/black")
	//moth jelly
	register_general("red_moth_jelly","Red Moth Jelly","moth_jelly/red")
	register_general("orange_moth_jelly","Orange Moth Jelly","moth_jelly/orange")
	register_general("green_moth_jelly","Green Moth Jelly","moth_jelly/green")
	register_general("blue_moth_jelly","Blue Moth Jelly","moth_jelly/blue")
	register_general("purple_moth_jelly","Purple Moth Jelly","moth_jelly/purple")
	register_general("pink_moth_jelly","Pink Moth Jelly","moth_jelly/pink")
	register_general("gold_moth_jelly","Gold Moth Jelly","moth_jelly/gold")
	//tools
	event.create('straw_brush', "basic")
	.texture('layer0', 'kubejs:item/tools/straw_brush')
	.unstackable()
	.maxDamage(32)
	.displayName('Straw Brush')
	event.create('soul_lighter', "basic")
	.texture('layer0', 'kubejs:item/tools/soul_lighter')
	.unstackable()
	.maxDamage(32)
	.displayName('Soul Lighter')
	event.create('liminal_jam')
	.texture('layer0', 'kubejs:item/liminal_jam')
	.food(food => {
		food.hunger(6)
      	.saturation(5)
	})
	.displayName('Liminal Jam')
	event.create("soulcoal")
	.texture("layer0", "kubejs:item/soulcoal")
	.burnTime(240)
	.fireResistant()
	.displayName("Soulcoal")
}