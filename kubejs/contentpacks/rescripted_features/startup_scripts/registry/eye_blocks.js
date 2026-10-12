/**
* @param {Registry.Block} event
*/
function block_registry_eyes(event) {
let exotic_eye_model_elements = () => {
		let elements = [
			{
				"from": [4, 0, 4],
				"to": [12, 8, 12],
				"rotation": {"angle": 0, "axis": "y", "origin": [4, 0, 4]},
				"faces": {
					"north": {"uv": [0, 0, 16, 16], "texture": "#2"},
					"east": {"uv": [0, 0, 16, 16], "texture": "#0"},
					"south": {"uv": [0, 0, 16, 16], "texture": "#1"},
					"west": {"uv": [0, 0, 16, 16], "texture": "#2"},
					"up": {"uv": [0, 16, 16, 0], "texture": "#1"},
					"down": {"uv": [0, 0, 16, 16], "texture": "#2"}
				}
			},
			{
				"from": [10, 6, 10],
				"to": [10, 12, 16],
				"rotation": {"angle": 0, "axis": "y", "origin": [10, 6, 10]},
				"faces": {
					"north": {"uv": [0, 0, 0, 6], "texture": "#missing"},
					"east": {"uv": [0, 0, 16, 16], "texture": "#3"},
					"south": {"uv": [0, 0, 0, 6], "texture": "#missing"},
					"west": {"uv": [16, 0, 0, 16], "texture": "#3"},
					"up": {"uv": [0, 0, 0, 6], "texture": "#missing"},
					"down": {"uv": [0, 0, 0, 6], "texture": "#missing"}
				}
			},
			{
				"from": [8, 1, -1],
				"to": [8, 12, 4],
				"rotation": {"angle": 0, "axis": "y", "origin": [8, 1, -1]},
				"faces": {
					"north": {"uv": [0, 0, 0, 11], "texture": "#missing"},
					"east": {"uv": [0, 0, 7.3, 16], "texture": "#4"},
					"south": {"uv": [0, 0, 0, 11], "texture": "#missing"},
					"west": {"uv": [7.27273, 0, 0.02727, 16], "texture": "#4"},
					"up": {"uv": [0, 0, 0, 5], "texture": "#missing"},
					"down": {"uv": [0, 0, 0, 5], "texture": "#missing"}
				}
			},
			{
				"from": [5, 3, 3],
				"to": [5, 12, 12],
				"rotation": {"angle": 0, "axis": "y", "origin": [5, 3, 3]},
				"faces": {
					"north": {"uv": [0, 0, 0, 11], "texture": "#missing"},
					"east": {"uv": [0, 0, 16, 16], "texture": "#5"},
					"south": {"uv": [0, 0, 0, 11], "texture": "#missing"},
					"west": {"uv": [16, 0, 0, 16], "texture": "#5"},
					"up": {"uv": [0, 0, 0, 11], "texture": "#missing"},
					"down": {"uv": [0, 0, 0, 11], "texture": "#missing"}
				}
			}
		]
		return elements
	}
	let lost_eye_model_elements = () => {
		let elements = [
			{
				"from": [4, 0, 4],
				"to": [12, 8, 12],
				"rotation": {"angle": 0, "axis": "y", "origin": [4, 0, 4]},
				"faces": {
					"north": {"uv": [0, 0, 16, 16], "texture": "#2"},
					"east": {"uv": [0, 0, 16, 16], "texture": "#0"},
					"south": {"uv": [0, 0, 16, 16], "texture": "#1"},
					"west": {"uv": [0, 0, 16, 16], "texture": "#2"},
					"up": {"uv": [0, 16, 16, 0], "texture": "#1"},
					"down": {"uv": [0, 0, 16, 16], "texture": "#2"}
				}
			}
		]
		return elements
	}
	let register_generic_eye = (eye_id,display_name)  => {
		event.create(eye_id,"cardinal")
		.fullBlock(false)
		.mapColor("diamond")
		.soundType("shroomlight")
		.box (4, 0, 4, 12, 8, 12)
		.noItem()
		.displayName(display_name)
		.modelJson = {
			"textures": {
				"0": `kubejs:block/eyes/${eye_id}/front`,
				"1": `kubejs:block/eyes/${eye_id}/side1`,
				"2": `kubejs:block/eyes/${eye_id}/side2`,
				"particle": `kubejs:block/eyes/${eye_id}/front`
			},
			"elements": lost_eye_model_elements()
		}
	}
	register_generic_eye("lost_eye","Lost Eye")
	register_generic_eye("black_eye","Black Eye")
	register_generic_eye("cold_eye","Cold Eye")
	register_generic_eye("corrupted_eye","Corrupted Eye")
	register_generic_eye("cryptic_eye","Cryptic Eye")
	register_generic_eye("cursed_eye","Cursed Eye")
	register_generic_eye("evil_eye","Evil Eye")
	register_generic_eye("guardian_eye","Guardian Eye")
	register_generic_eye("magical_eye","Magical Eye")
	register_generic_eye("nether_eye","Forged Eye")
	register_generic_eye("old_eye","Old Eye")
	register_generic_eye("rogue_eye","Rogue Eye")
	register_generic_eye("undead_eye","Undead Eye")
	register_generic_eye("witch_eye","Witch Eye")
	register_generic_eye("wither_eye","Wither Eye")
	
	event.create('exotic_eye',"cardinal")
	.fullBlock(false)
	.mapColor("diamond")
	.soundType("shroomlight")
	.box (4, 0, 4, 12, 8, 12)
	.renderType("cutout")
	.opaque(false)
	.noItem()
	.displayName('Exotic Eye')
	.modelJson = {
		"textures": {
			"0": "kubejs:block/eyes/exotic_eye/front",
			"1": "kubejs:block/eyes/exotic_eye/side1",
			"2": "kubejs:block/eyes/exotic_eye/side2",
			"3": "kubejs:block/eyes/exotic_eye/red_coral",
			"4": "kubejs:block/eyes/exotic_eye/yellow_coral",
			"5": "kubejs:block/eyes/exotic_eye/blue_coral",
			"particle": "kubejs:block/eyes/exotic_eye/front"
		},
		"elements": exotic_eye_model_elements()
	}
}