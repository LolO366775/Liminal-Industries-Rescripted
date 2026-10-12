/**
* @param {Registry.Block} event
*/
function block_registry_old_concrete(event) {
	let unbreakable = (id,display_name) => {
	event.create(id)
		.fullBlock(true)
		.material("stone")
		.soundType("stone")
		.unbreakable()
		.tagBlock('wither_immune')
		.displayName(display_name)
	}
	let unbreakable_slab = (id,display_name) => {
	event.create(id, 'slab')
		.fullBlock(true)
		.material("stone")
		.soundType("stone")
		.unbreakable()
		.tagBlock('wither_immune')
		.displayName(display_name)
	}
	let unbreakable_stairs = (id,display_name) => {
	event.create(id, 'stairs')
		.fullBlock(true)
		.material("stone")
		.soundType("stone")
		.unbreakable()
		.tagBlock('wither_immune')
		.displayName(display_name)
	}
	//Walls
	unbreakable('old_concrete_smooth','Smooth Old Concrete')
	unbreakable('old_concrete','Old Concrete')
	unbreakable('old_concrete_bordered','Old Concrete Bordered')
	unbreakable('old_concrete_plated','Old Concrete Plated')
	unbreakable('old_concrete_plated_pillar','Old Concrete Plated Pillar')
	//Floors
	unbreakable('asphalt_floor','Asphalt Floor')
	unbreakable('wet_asphalt_floor','Wet Asphalt Floor')
	unbreakable_slab('asphalt_floor_slab','Asphalt Floor Slab')
	unbreakable_stairs('asphalt_floor_stairs','Asphalt Floor Stairs')
	//Ceiling
	unbreakable('metal_ceilling','Metal Ceilling')
	unbreakable_slab('metal_ceilling_slab','Metal Ceiling Slab')
	unbreakable_stairs('metal_ceilling_stairs','Metal Ceiling Slab')

	//Unused, Depricated, Delete Later
	let wallpapers = (id,display_name) => {
	event.create(id)
		.fullBlock(true)
		.material("stone")
		.soundType("stone")
		.textureAll("kubejs:block/placeholder")
		.unbreakable()
		.tagBlock('wither_immune')
		.displayName(display_name)
	}
	wallpapers("wallpaper_concrete1","Old Concrete (Depricated)")
	wallpapers("wallpaper_concrete2","Old Concrete (Depricated)")
	wallpapers("wallpaper_concrete2_dark","Old Concrete (Dark, Depricated)")
	wallpapers("wallpaper_concrete_pillar1","Old Concrete Pillar (Depricated)")
	wallpapers("wallpaper_concrete_pillar_dark_hazard1","Old Concrete Pillar (Dark, Depricated)")
}