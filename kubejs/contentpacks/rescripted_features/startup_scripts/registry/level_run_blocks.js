/**
* @param {Registry.Block} event
*/
function block_registry_level_run_blocks(event) {
	let wallpapers = (id) => {
	event.create(id).displayName("Wallpaper")
		.fullBlock(true)
		.material("stone")
		.soundType("stone")
		.unbreakable()
		.tagBlock('wither_immune')
	}
	wallpapers("wallpaper1_red")
	//Ceiling
	event.create('ceilling_red').displayName('Ceiling')
		.fullBlock(true)
		.material("wood")
		.soundType("cherry_wood")
		.unbreakable()
		.tagBlock('wither_immune')
}