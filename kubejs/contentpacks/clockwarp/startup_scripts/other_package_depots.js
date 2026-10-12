StartupEvents.registry('block', event => {
	let item_display = () => {
		let display = {
			"thirdperson_righthand": {
				"rotation": [75, -45, 0],
				"translation": [0, 2.5, 0],
				"scale": [0.375, 0.375, 0.375]
			},
			"thirdperson_lefthand": {
				"rotation": [75, -45, 0],
				"translation": [0, 2.5, 0],
				"scale": [0.375, 0.375, 0.375]
			},
			"firstperson_righthand": {
				"rotation": [0, -45, 0],
				"scale": [0.4, 0.4, 0.4]
			},
			"firstperson_lefthand": {
				"rotation": [0, -45, 0],
				"scale": [0.4, 0.4, 0.4]
			},
			"ground": {
				"translation": [0, 3, 0],
				"scale": [0.25, 0.25, 0.25]
			},
			"gui": {
				"rotation": [30, 45, 0],
				"translation": [0, -2.75, 0],
				"scale": [0.4, 0.4, 0.4]
			},
			"head": {
				"rotation": [0, -180, 0]
			},
			"fixed": {
				"rotation": [0, -180, 0],
				"translation": [0, -4, 0],
				"scale": [0.5, 0.5, 0.5]
			}
		}
		return display
	}
	let blockstate_variant = (type,colour) => {
		let variant = {
			"model": `kubejs:block/package_depot/${type}/${colour}`
		}
		return variant
	}
	let depot_blockstate_blockstate = (type) => {
		let model = {
			"age=0": blockstate_variant(type,"none"),
        	"age=1": blockstate_variant(type,"brown"),
			"age=2": blockstate_variant(type,"red"),
			"age=3": blockstate_variant(type,"orange"),
			"age=4": blockstate_variant(type,"yellow"),
			"age=5": blockstate_variant(type,"lime"),
			"age=6": blockstate_variant(type,"green"),
			"age=7": blockstate_variant(type,"cyan"),
			"age=8": blockstate_variant(type,"light_blue"),
			"age=9": blockstate_variant(type,"blue"),
			"age=10": blockstate_variant(type,"purple"),
			"age=11": blockstate_variant(type,"magenta"),
			"age=12": blockstate_variant(type,"pink"),
			"age=13": blockstate_variant(type,"white"),
			"age=14": blockstate_variant(type,"light_gray"),
			"age=15": blockstate_variant(type,"gray"),
			"age=16": blockstate_variant(type,"black"),
			"age=17": blockstate_variant(type,"none"),
			"age=18": blockstate_variant(type,"none"),
			"age=19": blockstate_variant(type,"none"),
			"age=20": blockstate_variant(type,"none"),
			"age=21": blockstate_variant(type,"none"),
			"age=22": blockstate_variant(type,"none"),
			"age=23": blockstate_variant(type,"none"),
			"age=24": blockstate_variant(type,"none"),
			"age=25": blockstate_variant(type,"none")
		}
		return model
	}

	event.create('dark_dimensional_package_depot')
	.fullBlock(false)
	.material("wood")
	.soundType("wood")
    .tagBlock('minecraft:mineable/pickaxe')
	.tagBlock('minecraft:mineable/axe')
	.box(0, 0, 0, 16, 12, 16)
	.item(item => 
		item.modelJson({
			"parent": "kubejs:block/package_depot/dark/none",
			"display": item_display()
		})
	)
	.property(BlockProperties.AGE_25)
	.placementState(state => {
		state.set(BlockProperties.AGE_25, 0)
    })
	.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_dimensional_package_depot("dark",entity)
		})
	})
	.blockstateJson = {
		"variants": depot_blockstate_blockstate("dark")
	}

	event.create('rich_dimensional_package_depot')
	.fullBlock(false)
	.material("wood")
	.soundType("wood")
    .tagBlock('minecraft:mineable/pickaxe')
	.tagBlock('minecraft:mineable/axe')
	.box(0, 0, 0, 16, 12, 16)
	.item(item => 
		item.modelJson({
			"parent": "kubejs:block/package_depot/rich/none",
			"display": item_display()
		})
	)
	.property(BlockProperties.AGE_25)
	.placementState(state => {
		state.set(BlockProperties.AGE_25, 0)
    })
	.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_dimensional_package_depot("rich",entity)
		})
	})
	.blockstateJson = {
		"variants": depot_blockstate_blockstate("rich")
	}

	event.create('pink_dimensional_package_depot')
	.fullBlock(false)
	.material("wood")
	.soundType("wood")
    .tagBlock('minecraft:mineable/pickaxe')
	.tagBlock('minecraft:mineable/axe')
	.box(0, 0, 0, 16, 12, 16)
	.item(item => 
		item.modelJson({
			"parent": "kubejs:block/package_depot/pink/none",
			"display": item_display()
		})
	)
	.property(BlockProperties.AGE_25)
	.placementState(state => {
		state.set(BlockProperties.AGE_25, 0)
    })
	.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_dimensional_package_depot("pink",entity)
		})
	})
	.blockstateJson = {
		"variants": depot_blockstate_blockstate("pink")
	}
})