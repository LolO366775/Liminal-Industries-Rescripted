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

	let unbreakable_large_bricks = (id,display_name,type) => {
	event.create(id)
		.fullBlock(true)
		.material("stone")
		.soundType("stone")
		.unbreakable()
		.tagBlock('wither_immune')
		.textureAll(`kubejs:block/level_1/large_old_concrete_bricks/${type}`)
		.displayName(display_name)
	}
	let unbreakable_large_brick_slab = (id,display_name,type) => {
	event.create(id, 'slab')
		.fullBlock(true)
		.material("stone")
		.soundType("stone")
		.unbreakable()
		.tagBlock('wither_immune')
		.textureAll(`kubejs:block/level_1/large_old_concrete_bricks/${type}`)
		.displayName(display_name)
	}
	let unbreakable_large_brick_stairs = (id,display_name,type) => {
	event.create(id, 'stairs')
		.fullBlock(true)
		.material("stone")
		.soundType("stone")
		.unbreakable()
		.tagBlock('wither_immune')
		.textureAll(`kubejs:block/level_1/large_old_concrete_bricks/${type}`)
		.displayName(display_name)
	}
	let unbreakable_large_brick_wall = (id,display_name,type) => {
	event.create(id, 'wall')
		.fullBlock(true)
		.material("stone")
		.soundType("stone")
		.unbreakable()
		.tagBlock('wither_immune')
		.textureAll(`kubejs:block/level_1/large_old_concrete_bricks/${type}`)
		.displayName(display_name)
	}
	//Blocks
	unbreakable_large_bricks('large_old_concrete_bricks','Large Old Concrete Bricks','normal')
	unbreakable_large_bricks('large_mossy_old_concrete_bricks','Large Mossy Old Concrete Bricks','mossy')
	unbreakable_large_bricks('large_cracked_old_concrete_bricks','Large Cracked Old Concrete Bricks','cracked')
	unbreakable_large_bricks('large_chiseled_old_concrete_bricks','Large Chiseled Old Concrete Bricks','chiseled')
	//Other
	unbreakable_large_brick_slab('large_old_concrete_brick_slab','Large Old Concrete Brick Slab','normal')
	unbreakable_large_brick_stairs('large_old_concrete_brick_stairs','Large Old Concrete Brick Stairs','normal')
	unbreakable_large_brick_wall('large_old_concrete_brick_wall','Large Old Concrete Brick Wall','normal')
	unbreakable_large_brick_slab('large_mossy_old_concrete_brick_slab','Large Mossy Old Concrete Brick Slab','mossy')
	unbreakable_large_brick_stairs('large_mossy_old_concrete_brick_stairs','Large Mossy Old Concrete Brick Stairs','mossy')
	unbreakable_large_brick_wall('large_mossy_old_concrete_brick_wall','Large Mossy Old Concrete Brick Wall','mossy')
}