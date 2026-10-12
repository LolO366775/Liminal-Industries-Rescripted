BlockEvents.rightClicked(event => {
	if (event.getItem() == "enderio:staff_of_travelling") {
		if (event.player != null) {
			event.player.tell("This item may not be used on a block!")
		}
		event.cancel()
	}
})

ServerEvents.recipes(event => {
	event.remove({ output: "supplementaries:turn_table"})
})
BlockEvents.placed("supplementaries:turn_table",event => {
	event.player.tell("§cThis block is disabled due to critical issues!")
	event.cancel()
})
//tiny potato ponder crash (just prevents you from having him in your inventory, maybe eventually a seperate block if it doesnt get fixed)
LootJS.modifiers((event) => {
	event.addBlockLootModifier("botania:tiny_potato").replaceLoot("botania:tiny_potato", "minecraft:potato")
})
ServerEvents.recipes(event => {
	event.remove({ output: "botania:tiny_potato"})
})