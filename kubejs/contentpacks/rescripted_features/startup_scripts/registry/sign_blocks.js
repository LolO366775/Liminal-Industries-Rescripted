//Traffic Poles
/**
* @param {Registry.Block} event
*/
function block_registry_sign_blocks(event) {
	let traffic_poles = (id, name) => {
	event.create(id,"cardinal")
		.fullBlock(true)
		.mapColor("none")
		.soundType("lantern")
		.renderType("cutout")
		.fullBlock(false)
		.opaque(false)
		.hardness(1.0)
		.requiresTool(true)
		.waterlogged() //Poolrooms ADDITION
		.tagBlock('minecraft:mineable/pickaxe')
		.box(6, 0, 6, 10, 16, 10)
		.displayName(name)
        .blockstateJson = {
        	"variants": {
            	"facing=north": {
                	"model": `kubejs:block/${id}`,
                	"y": 0
            	},
            	"facing=east": {
                	"model": `kubejs:block/${id}`,
                	"y": 90
            	},
             	"facing=south": {
                	"model": `kubejs:block/${id}`,
                	"y": 180
            	},
				"facing=west": {
                	"model": `kubejs:block/${id}`,
                	"y": 270
            	}
        	}
		}
	}

	let traffic_pole_signs = (id, name) => {
	event.create(id,"cardinal")
		.fullBlock(true)
		.mapColor("none")
		.soundType("lantern")
		.renderType("cutout")
		.fullBlock(false)
		.opaque(false)
		.hardness(1.0)
		.requiresTool(true)
		.waterlogged() //Poolrooms ADDITION
		.tagBlock('minecraft:mineable/pickaxe')
		.noItem()
		.box(6, 0, 6, 10, 16, 10)
		.displayName(name)
        .blockstateJson = {
        	"variants": {
            	"facing=north": {
                	"model": `kubejs:block/${id}`,
                	"y": 0
            	},
            	"facing=east": {
                	"model": `kubejs:block/${id}`,
                	"y": 90
            	},
             	"facing=south": {
                	"model": `kubejs:block/${id}`,
                	"y": 180
            	},
				"facing=west": {
                	"model": `kubejs:block/${id}`,
                	"y": 270
            	}
        	}
		}
	}
	traffic_poles('traffic_pole', 		'sign')
	traffic_pole_signs('arrow1_sign', 		'sign')
	traffic_pole_signs('arrow2_sign', 		'sign')
	traffic_pole_signs('liminal_warning', 	'sign')
	traffic_pole_signs('liminal_warning2', 	'sign')
	traffic_pole_signs('box_sign', 			'sign')
	traffic_pole_signs('infinity_sign', 		'sign')
	traffic_pole_signs('skull_sign', 		'sign')
	traffic_pole_signs('stop_sign', 			'sign')
	traffic_pole_signs('explantion1_sign', 	'sign')
	traffic_pole_signs('explantion2_sign', 	'sign')
	traffic_pole_signs('unknown1', 			'sign')
	traffic_pole_signs('cross_sign', 		'sign')
	traffic_pole_signs('exit_sign', 			'sign')
	traffic_pole_signs('exit_sign2', 		'sign')
	traffic_pole_signs('left_arrow_sign', 	'sign')
	traffic_pole_signs('right_arrow_sign', 	'sign')
	traffic_pole_signs('nowhere_sign', 		'sign')
	traffic_pole_signs('monolith_sign', 		'sign')
	traffic_pole_signs('witahdigroi_sign', 	'sign')
	traffic_pole_signs('tripple_sign', 		'sign')
	traffic_pole_signs('turn_back_sign', 	'sign')
	traffic_pole_signs('inkblod_sign', 		'sign')
	traffic_pole_signs('hydrant_sign', 		'sign')
	traffic_pole_signs('leviathans_cross_sign','sign')
}