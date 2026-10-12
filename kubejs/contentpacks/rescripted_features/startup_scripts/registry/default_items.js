/**
* @param {Registry.Item} event
*/
function item_registery_default_items(event) {
	let register_general = (id,display_name,model) => {
		event.create(id)
		.texture('layer0', `kubejs:item/${model}`)
		.displayName(display_name)
	}
	//basic items
	register_general("cut_carpet","Cut Carpet","cut_carpet")
	register_general("scrap","Scrap","scrap")
	register_general("putty_knife","Putty Knife","tools/putty_knife")
	register_general("carpet_dust","Carpet Dust","carpet_dust")
	register_general("moderate_soul_gem","Moderate Soul Gem","moderate_soul_gem")
	register_general("concrete_piece","Piece of Concrete","concrete_piece")
	register_general("party_popper","Party Popper","tools/party_popper")
	register_general("battery","Battery","battery")
	register_general("soul_fuse","Soul Fuse","soul_fuse")
	register_general("empty_fuse","Empty Fuse","empty_fuse")
	register_general("error_item","Error","error_item")
	register_general("wallpaper","Wallpaper","wallpaper")
	register_general("fluorescent_tube","Fluorescent Tube","fluorescent_tube")
	register_general("sentimental_thaumium","Sentimental Thaumium","sentimental_thaumium")
	register_general("overclocked_clock","Overclocked Clock","overclocked_clock")
	register_general("ai","Artificial Intelligence","ai")
	register_general("quantum_string","Quantum String","quantum_string")
	register_general("cobblestone_bucket","Bucket of Cobblestone","cobblestone_bucket")
	register_general("crowbar","Crowbar","tools/crowbar")
	register_general("power_box","Power Box","power_box")
	register_general("drain_item","Drain Grate","drain_item")
	//tools
	event.create('wooden_knife', 'sword')
	.texture('layer0', 'kubejs:item/tools/wooden_knife')
	.unstackable()
	.maxDamage(16)
	.tier('wood')
	.attackDamageBaseline(1)
	.displayName('Wooden Knife')
	event.create('diamond_brush', "basic")
	.texture('layer0', 'kubejs:item/tools/diamond_brush')
	.unstackable()
	.maxDamage(2048)
	.displayName('Diamond Brush')
}