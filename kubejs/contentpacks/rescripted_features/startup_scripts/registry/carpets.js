/**
* @param {Internal.BasicBlockJS$Builder} carpet
*/
function modify_carpet_soaked(carpet) {
	carpet.tagBlock('kubejs:soggy_carpets')
}
/**
* @param {Registry.Block} event
* @param {String} id
* @param {String} map_colour
*/
function create_basic_carpet(event,id,sound_type,map_colour) {
	let carpet = event.create(id)
	carpet.fullBlock(true)
	carpet.mapColor(map_colour)
	carpet.soundType(sound_type)
	carpet.unbreakable()
	carpet.tagBlock('wither_immune')
	return carpet
}
/**
* @param {Registry.Block} event
*/
function block_registry_carpets(event) {
	let soft_block = (id,display_name,model,map_colour,sound_type) => {
		event.create(id).displayName(display_name)
		.model(model)
		.fullBlock(true)
		.mapColor(map_colour)
		.soundType(sound_type)
		.waterlogged() //Poolrooms ADDITION
		.noDrops()
		.noCollision()
	}
	let unbreakable = (id,display_name,map_colour,sound_type) => {
	event.create(id)
		.fullBlock(true)
		.mapColor(map_colour)
		.soundType(sound_type)
		.unbreakable()
		.tagBlock('wither_immune')
		.displayName(display_name)
	}
	let unbreakable_slab = (id,display_name,map_colour,sound_type) => {
	event.create(id, 'slab')
		.fullBlock(true)
		.mapColor(map_colour)
		.soundType(sound_type)
		.unbreakable()
		.tagBlock('wither_immune')
		.displayName(display_name)
	}
	let unbreakable_stairs = (id,display_name,map_colour,sound_type) => {
	event.create(id, 'stairs')
		.fullBlock(true)
		.mapColor(map_colour)
		.soundType(sound_type)
		.unbreakable()
		.tagBlock('wither_immune')
		.displayName(display_name)
	}
	//global.create_carpet_variants(event,"") //these carpet block builders work, so no need for the stuff below
	//global.create_carpet_variants(event,"red_")
	let soggy_carpet = create_basic_carpet(event,"soggy_carpet","coral_block","sand")
	soggy_carpet.displayName("Soggy Carpet")
	modify_carpet_soaked(soggy_carpet)
	let red_soggy_carpet = create_basic_carpet(event,"red_soggy_carpet","coral_block","color_red")
	red_soggy_carpet.displayName("Soggy Carpet (Red)")
	modify_carpet_soaked(red_soggy_carpet)
	soft_block("carpet_soft","Carpet","kubejs:block/carpet","sand","wool")
	unbreakable("carpet","Carpet","sand","wool")
	unbreakable_slab("carpet_slab","Carpet Slab","sand","wool")
	unbreakable_stairs("carpet_stairs","Carpet Stairs","sand","wool")
	soft_block("red_carpet_soft","Carpet (Red)","kubejs:block/red_carpet","color_red","wool")
	unbreakable("red_carpet","Carpet (Red)","color_red","wool")
	unbreakable_slab("red_carpet_slab","Carpet Slab (Red)","color_red","wool")
	unbreakable_stairs("red_carpet_stairs","Carpet Stairs (Red)","color_red","wool")
	unbreakable("soul_carpet","Soul Carpet","terracotta_yellow","wool")
	unbreakable("red_soul_carpet","Red Soul Carpet","color_red","wool")
	//carpet grass
	event.create('carpet_grass').displayName('Carpet Grass')
		.mapColor("none")
		.soundType("wool")
		.renderType("cutout")
		.fullBlock(false)
		.noCollision()
		.opaque(false)
		.noDrops()
		.hardness(0)
}