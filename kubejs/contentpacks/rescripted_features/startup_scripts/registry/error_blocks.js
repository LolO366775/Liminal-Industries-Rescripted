/**
* @param {Registry.Block} event
*/
function block_registry_error_blocks(event) {
	event.create('error').displayName('Divided by Zero')
		.mapColor("color_purple")
		.soundType("shroomlight")
		.fullBlock(true)
		.hardness(10)

	event.create('error_carpet').displayName('Divided by Zero')
		.mapColor("color_purple")
		.soundType("shroomlight")
		.fullBlock(true)
		.hardness(10)

	event.create('error_wallpaper').displayName('Divided by Zero')
		.mapColor("color_purple")
		.soundType("shroomlight")
		.fullBlock(true)
		.hardness(10)
}