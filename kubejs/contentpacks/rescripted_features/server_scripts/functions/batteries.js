/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} batteries_id
*/
function batteries_placement_event(event,batteries_id) {
	let item = event.getItem()
	if (item.getCount() >= 3) {
		if (event.facing == "up") {
			let above = event.block.getUp()
			if (above == "minecraft:air" || above.getUp() == "minecraft:light") {
				above.set(batteries_id)
				event.item.shrink(3)
				let [pos_x,pos_y,pos_z] = [above.getX(),above.getY(),above.getZ()]
				above.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.lantern.place","blocks",1,1)
			}
		}
	}
}
ServerEvents.recipes(event => {
	event.recipes.create.crushing([Item.of('enderio:powdered_cobalt', 3), 'mekanism:dust_lithium'], 'kubejs:lithium_ion_battery')
	event.recipes.create.crushing([Item.of('create:crushed_raw_zinc', 3), 'thermal:copper_dust'], 'kubejs:battery')
})
