//Disabled for the time being

/*BlockEvents.rightClicked('refurbished_furniture:oak_drawer', event => {
	let item = event.getItem()
	if (item.getId() == "supplementaries:key") {
		let container = event.getBlock()
		let has_items = container.getInventory()
		if (has_items.isEmpty()) {
			container.mergeEntityData({"LootTable":"minecraft:chests/stronghold_library","data":{"loot_generated":true}})
			item.shrink(1)
		}
	}
})
/*LootJS.modifiers((event) => {
	event.addLootTableModifier("kubejs:drawer_loot")
    .addWeightedLoot([
		random_loot_item("miners_delight:bat_wing",1,1,3),
        random_loot_item("miners_delight:spider_leg",1,1,3),
		random_loot_item("miners_delight:cardboard",1,1,11),
		random_loot_item("minecraft:paper",1,10,32)
    ])
})*/
/**
* @param {String} item_id
* @param {number} chance
* @param {number} min_count
* @param {number} max_count
*/
function random_loot_item(item_id,chance,min_count,max_count) {
	let count_difference = max_count - min_count
	let random_buffer = 0
	if (count_difference > 0) {
		random_buffer = Math.round((Math.random() * (count_difference -0.001))-0.5)
	}
	let count = random_buffer + min_count
	return Item.of(item_id).withChance(chance).withCount(count)
}