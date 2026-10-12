/**
* @param {Registry.Block} event
*/
function block_registry_ceilings(event) {
	let ceilling_frame = (id,display_name,map_colour,sound_type,main_texture) => {
		event.create(id)
		.fullBlock(false)
		.mapColor(map_colour)		
		.soundType(sound_type)
		.unbreakable()
		.tagBlock('wither_immune')
		.box(0, 0, 0, 16, 1, 1)
		.box(0, 0, 15, 16, 1, 16)
		.box(0, 0, 1, 1, 1, 15)
		.box(15, 0, 1, 16, 1, 15)
		.noDrops()
		.displayName(display_name)
		.modelJson = {
			"textures": {
				"0": main_texture,
				"particle": main_texture
			},
			"elements": [
				{
					"from": [0, 0, 0],
					"to": [16, 1, 1],
					"faces": {
						"north": {"uv": [0, 0, 4, 0.25], "texture": "#0"},
						"east": {"uv": [4.75, 5, 5, 5.25], "texture": "#0"},
						"south": {"uv": [0, 0.25, 4, 0.5], "texture": "#0"},
						"west": {"uv": [5, 4.75, 5.25, 5], "texture": "#0"},
						"up": {"uv": [4, 0.75, 0, 0.5], "texture": "#0"},
						"down": {"uv": [4, 0.75, 0, 1], "texture": "#0"}
					}
				},
				{
					"from": [0, 0, 15],
					"to": [16, 1, 16],
					"faces": {
						"north": {"uv": [0, 1, 4, 1.25], "texture": "#0"},
						"east": {"uv": [5, 5, 5.25, 5.25], "texture": "#0"},
						"south": {"uv": [0, 1.25, 4, 1.5], "texture": "#0"},
						"west": {"uv": [5.25, 0, 5.5, 0.25], "texture": "#0"},
						"up": {"uv": [4, 1.75, 0, 1.5], "texture": "#0"},
						"down": {"uv": [4, 1.75, 0, 2], "texture": "#0"}
					}
				},
				{
					"from": [0, 0, 1],
					"to": [1, 1, 15],
					"faces": {
						"north": {"uv": [5.25, 0.25, 5.5, 0.5], "texture": "#0"},
						"east": {"uv": [0.75, 4, 4.25, 4.25], "texture": "#0"},
						"south": {"uv": [5.25, 0.5, 5.5, 0.75], "texture": "#0"},
						"west": {"uv": [4, 3.5, 7.5, 3.75], "texture": "#0"},
						"up": {"uv": [4.5, 3.5, 4.25, 0], "texture": "#0"},
						"down": {"uv": [1, 4.25, 0.75, 7.75], "texture": "#0"}
					}
				},
				{
					"from": [15, 0, 1],
					"to": [16, 1, 15],
					"faces": {
						"north": {"uv": [5.25, 0.75, 5.5, 1], "texture": "#0"},
						"east": {"uv": [4, 3.75, 7.5, 4], "texture": "#0"},
						"south": {"uv": [5.25, 1, 5.5, 1.25], "texture": "#0"},
						"west": {"uv": [1, 4.25, 4.5, 4.5], "texture": "#0"},
						"up": {"uv": [4.75, 3.5, 4.5, 0], "texture": "#0"},
						"down": {"uv": [1.25, 4.5, 1, 8], "texture": "#0"}
					}
				}
			],
			"display": {
				"thirdperson_righthand": {
					"rotation": [75, 45, 0],
					"translation": [0, 2.5, 0],
					"scale": [0.375, 0.375, 0.375]
				},
				"thirdperson_lefthand": {
					"rotation": [75, 45, 0],
					"translation": [0, 2.5, 0],
					"scale": [0.375, 0.375, 0.375]
				},
				"firstperson_righthand": {
					"rotation": [0, 45, 0],
					"scale": [0.4, 0.4, 0.4]
				},
				"firstperson_lefthand": {
					"rotation": [0, 225, 0],
					"scale": [0.4, 0.4, 0.4]
				},
				"ground": {
					"translation": [0, 3, 0],
					"scale": [0.25, 0.25, 0.25]
				},
				"gui": {
					"rotation": [30, 225, 0],
					"scale": [0.625, 0.625, 0.625]
				},
				"fixed": {
					"scale": [0.5, 0.5, 0.5]
				}
			},
			"groups": [
				{
					"name": "group",
					"origin": [0, 0, 0],
					"color": 0,
					"children": [0, 1, 2, 3]
				},
				{
					"name": "group",
					"origin": [0, 0, 0],
					"color": 0,
					"children": []
				}
			]
		}
	}
	let unbreakable = (id,display_name,map_colour,sound_type) => {
		event.create(id)
		.fullBlock(true)
		.mapColor(map_colour)
		.soundType(sound_type)
		.unbreakable()
		.tagBlock('wither_immune')
		.noDrops()
		.displayName(display_name)
	}
	let unbreakable_slab = (id,display_name,map_colour,sound_type) => {
		event.create(id, 'slab')
		.mapColor(map_colour)
		.soundType(sound_type)
		.unbreakable()
		.tagBlock('wither_immune')
		.waterlogged()
		.noDrops()
		.displayName(display_name)
	}
	let unbreakable_stairs = (id,display_name,map_colour,sound_type) => {
		event.create(id, 'stairs')
		.mapColor(map_colour)
		.soundType(sound_type)
		.unbreakable()
		.tagBlock('wither_immune')
		.waterlogged()
		.noDrops()
		.exploded(callback => { //this should fix the issue of stairs being explodable //it did not //make it a global function?
			let block = callback.getBlock()
			let block_id = block.getId()
			let block_properties = block.getProperties()
			block.set(block_id,block_properties)
		})
		.displayName(display_name)
	}
	unbreakable("ceilling","Ceiling","color_yellow","cherry_wood")
	unbreakable("ceilling2","Ceiling (White)","color_light_gray","stone")
	unbreakable("ceilling_edge","Ceiling Edge","color_yellow","cherry_wood")
	unbreakable_slab("ceilling_slab","Ceiling Slab","color_yellow","cherry_wood")
	unbreakable_stairs("ceilling_stairs","Ceiling Stairs","color_yellow","cherry_wood")
	unbreakable_slab("ceilling2_slab","Ceiling Slab (White)","color_yellow","cherry_wood")
	unbreakable_stairs("ceilling2_stairs","Ceiling Stairs (White)","color_yellow","cherry_wood")
	//frames for the other ceillings?
	ceilling_frame("ceilling_frame","Ceiling Frame","color_yellow","cherry_wood","kubejs:block/frame")
	ceilling_frame("ceilling_frame2","Ceiling Frame (White)","color_yellow","cherry_wood","kubejs:block/frame2")
}