/**
* @param {Registry.Block} event
*/
function block_registry_bordered_wallpapers(event) {
	let bordered_wallpapers = (id,display_name,type) => {
		event.create(id).displayName(display_name)
		.fullBlock(true)
		.mapColor("color_yellow")
		.soundType("cherry_wood")
		.unbreakable()
		.tagBlock('wither_immune')
		.tagBlock('kubejs:border_wallpapers')
		.noDrops()
		.property(BlockProperties.DOWN)
		.property(BlockProperties.UP)
		.placementState(c =>{
			c.set(BlockProperties.DOWN, false)
			c.set(BlockProperties.UP, false)
		})
		.defaultState(c =>{
			c.set(BlockProperties.DOWN, false)
			c.set(BlockProperties.UP, false)
		})
		.item(item => 
			item.modelJson({
				"parent": `kubejs:block/wallpapers/${type}/default`
			})
		)
		.blockstateJson = {
        	"variants": {
				"down=false,up=false": {
                	"model": `kubejs:block/wallpapers/${type}/default`
            	},
				"down=false,up=true": {
                	"model": `kubejs:block/wallpapers/${type}/bordered_top`
            	},
				"down=true,up=false": {
                	"model": `kubejs:block/wallpapers/${type}/bordered_bottom`
            	},
				"down=true,up=true": {
                	"model": `kubejs:block/wallpapers/${type}/bordered_both`
           	 	}
    		}
		}
	}
	bordered_wallpapers("wallpaper1", "Wallpaper", "yellow1")
	bordered_wallpapers("wallpaper2", "Wallpaper (Large Dots)", "yellow2")
	bordered_wallpapers("wallpaper3", "Wallpaper (Small Dots)", "yellow3")
	bordered_wallpapers("wallpaper4", "Wallpaper (Plain)", "yellow4")
	bordered_wallpapers("wallpaper5", "Wallpaper (Hotel)", "hotel")
	bordered_wallpapers("wallpaper6", "Wallpaper (Striped)", "yellow5")
	bordered_wallpapers("wallpaper7", "Wallpaper (Pink)", "pink")
	bordered_wallpapers("wallpaper_manila1", "Wallpaper (Manila)", "manilla")
	//to be deleted, eventually
	bordered_wallpapers("wallpaper_manila2", "Wallpaper (Manila, Depricated)", "manilla")
	bordered_wallpapers("wallpaper_manila3", "Wallpaper (Manila, Depricated)", "manilla")

	let soft_bordered_wallpapers = (id,display_name,type) => {
		event.create(id).displayName(display_name)
		.fullBlock(true)
		.mapColor("color_yellow")
		.soundType("cherry_wood")
		.tagBlock('wither_immune')
		.tagBlock('kubejs:border_wallpapers')
		.noDrops()
		.property(BlockProperties.DOWN)
		.property(BlockProperties.UP)
		.placementState(c =>{
			c.set(BlockProperties.DOWN, false)
			c.set(BlockProperties.UP, false)
		})
		.defaultState(c =>{
			c.set(BlockProperties.DOWN, false)
			c.set(BlockProperties.UP, false)
		})
		.noCollision()
		.item(item => 
			item.modelJson({
				"parent": `kubejs:block/wallpapers/${type}/default`
			})
		)
		.blockstateJson = {
        	"variants": {
				"down=false,up=false": {
                	"model": `kubejs:block/wallpapers/${type}/default`
            	},
				"down=false,up=true": {
                	"model": `kubejs:block/wallpapers/${type}/bordered_top`
            	},
				"down=true,up=false": {
                	"model": `kubejs:block/wallpapers/${type}/bordered_bottom`
            	},
				"down=true,up=true": {
                	"model": `kubejs:block/wallpapers/${type}/bordered_both`
           	 	}
    		}
		}
	}
	soft_bordered_wallpapers("wallpaper_soft", "Wallpaper", "yellow1")
	soft_bordered_wallpapers("wallpaper2_soft", "Wallpaper (Large Dots)", "yellow2")
	soft_bordered_wallpapers("wallpaper3_soft", "Wallpaper (Small Dots)", "yellow3")
	soft_bordered_wallpapers("wallpaper4_soft", "Wallpaper (Plain)", "yellow4")
	soft_bordered_wallpapers("wallpaper5_soft", "Wallpaper (Hotel)", "hotel")
	soft_bordered_wallpapers("wallpaper6_soft", "Wallpaper (Striped)", "yellow5")
	soft_bordered_wallpapers("wallpaper7_soft", "Wallpaper (Pink)", "pink")
	soft_bordered_wallpapers("wallpaper_manila_soft", "Wallpaper (Manila)", "manilla")
	//blue taped
	soft_bordered_wallpapers("blue_taped_wallpaper", "Wallpaper (Taped)", "blue_tape")
	
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
	unbreakable_slab("wallpaper1_slab","Wallpaper Slab","color_yellow","cherry_wood")
	unbreakable_slab("wallpaper2_slab","Wallpaper Slab (Large Dots)","color_yellow","cherry_wood")
	unbreakable_slab("wallpaper3_slab","Wallpaper Slab (Small Dots)","color_yellow","cherry_wood")
	unbreakable_slab("wallpaper4_slab","Wallpaper Slab (Plain)","color_yellow","cherry_wood")
	unbreakable_slab("wallpaper5_slab","Wallpaper Slab (Hotel)","color_yellow","cherry_wood")
	unbreakable_slab("wallpaper6_slab","Wallpaper Slab (Striped)","color_yellow","cherry_wood")
	unbreakable_slab("wallpaper7_slab","Wallpaper Slab (Pink)","color_yellow","cherry_wood")

	unbreakable_stairs("wallpaper1_stairs","Wallpaper Stairs","color_yellow","cherry_wood")
	unbreakable_stairs("wallpaper2_stairs","Wallpaper Stairs (Large Dots)","color_yellow","cherry_wood")
	unbreakable_stairs("wallpaper3_stairs","Wallpaper Stairs (Small Dots)","color_yellow","cherry_wood")
	unbreakable_stairs("wallpaper4_stairs","Wallpaper Stairs (Plain)","color_yellow","cherry_wood")
	unbreakable_stairs("wallpaper5_stairs","Wallpaper Stairs (Hotel)","color_yellow","cherry_wood")
	unbreakable_stairs("wallpaper6_stairs","Wallpaper Stairs (Striped)","color_yellow","cherry_wood")
	unbreakable_stairs("wallpaper7_stairs","Wallpaper Stairs (Pink)","color_yellow","cherry_wood")

	let stripped_blocksates = (type) => {
		let model = {
        	"variants": {
				"down=false,up=false,age=0": {
                	"model": `kubejs:block/stripped_wallpaper/${type}/default/age_0`
            	},
				"down=false,up=false,age=1": {
                	"model": `kubejs:block/stripped_wallpaper/${type}/default/age_1`
            	},
				"down=false,up=false,age=2": {
                	"model": `kubejs:block/stripped_wallpaper/${type}/default/age_2`
            	},
				"down=false,up=false,age=3": {
               		"model": `kubejs:block/stripped_wallpaper/${type}/default/age_3`
            	},
				"down=false,up=true,age=0": {
                	"model": `kubejs:block/stripped_wallpaper/${type}/bordered_top/age_0`
            	},
				"down=false,up=true,age=1": {
                	"model": `kubejs:block/stripped_wallpaper/${type}/bordered_top/age_1`
            	},
				"down=false,up=true,age=2": {
                	"model": `kubejs:block/stripped_wallpaper/${type}/bordered_top/age_2`
            	},
				"down=false,up=true,age=3": {
               		"model": `kubejs:block/stripped_wallpaper/${type}/bordered_top/age_3`
            	},
				"down=true,up=false,age=0": {
                	"model": `kubejs:block/stripped_wallpaper/${type}/bordered_bottom/age_0`
            	},
				"down=true,up=false,age=1": {
                	"model": `kubejs:block/stripped_wallpaper/${type}/bordered_bottom/age_1`
            	},
				"down=true,up=false,age=2": {
                	"model": `kubejs:block/stripped_wallpaper/${type}/bordered_bottom/age_2`
            	},
				"down=true,up=false,age=3": {
               		"model": `kubejs:block/stripped_wallpaper/${type}/bordered_bottom/age_3`
            	},
				"down=true,up=true,age=0": {
                	"model": `kubejs:block/stripped_wallpaper/${type}/bordered_both/age_0`
            	},
				"down=true,up=true,age=1": {
                	"model": `kubejs:block/stripped_wallpaper/${type}/bordered_both/age_1`
            	},
				"down=true,up=true,age=2": {
                	"model": `kubejs:block/stripped_wallpaper/${type}/bordered_both/age_2`
            	},
				"down=true,up=true,age=3": {
               		"model": `kubejs:block/stripped_wallpaper/${type}/bordered_both/age_3`
            	}
    		}
		}
		return model
	}
	let bordered_stripped_wallpapers = (id,display_name,type,result_id,perm) => {
		let created = event.create(id)
		created.displayName(display_name)
		created.fullBlock(true)
		created.mapColor("wood")
		created.soundType("cherry_wood")
		created.unbreakable()
		created.tagBlock('wither_immune')
		created.tagBlock('kubejs:border_wallpapers')
		created.property(BlockProperties.AGE_3)
		created.property(BlockProperties.DOWN)
		created.property(BlockProperties.UP)
		created.placementState(c =>{
			c.set(BlockProperties.DOWN, false)
			c.set(BlockProperties.UP, false)
		})
		created.defaultState(c =>{
			c.set(BlockProperties.DOWN, false)
			c.set(BlockProperties.UP, false)
		})
		created.item(item => 
			item.modelJson({
				parent: `kubejs:block/stripped_wallpaper/${type}/default/age_0`
			})
		)
		if (!perm) {
			created.blockEntity(entityInfo => {
				entityInfo.serverTick(20, 0, entity => {
					global.tick_stripped_wallpaper(entity,result_id)
				})
			})
		}
		created.blockstateJson = stripped_blocksates(type)
	}
	bordered_stripped_wallpapers("stripped_wallpaper","Stripped Wallpaper","yellow1","kubejs:wallpaper1",false)
	bordered_stripped_wallpapers("stripped_wallpaper_perm","Stripped Wallpaper (Permanent)","yellow1","kubejs:wallpaper1",true)
	bordered_stripped_wallpapers("stripped_wallpaper2","Stripped Wallpaper","yellow2","kubejs:wallpaper2",false)
	bordered_stripped_wallpapers("stripped_wallpaper2_perm","Stripped Wallpaper (Permanent)","yellow2","kubejs:wallpaper2",true)
	bordered_stripped_wallpapers("stripped_wallpaper3","Stripped Wallpaper","yellow3","kubejs:wallpaper3",false)
	bordered_stripped_wallpapers("stripped_wallpaper3_perm","Stripped Wallpaper (Permanent)","yellow3","kubejs:wallpaper3",true)
	bordered_stripped_wallpapers("stripped_wallpaper4","Stripped Wallpaper","yellow4","kubejs:wallpaper4",false)
	bordered_stripped_wallpapers("stripped_wallpaper4_perm","Stripped Wallpaper (Permanent)","yellow4","kubejs:wallpaper4",true)
	bordered_stripped_wallpapers("stripped_wallpaper5","Stripped Wallpaper","white","kubejs:wallpaper5",false)
	bordered_stripped_wallpapers("stripped_wallpaper5_perm","Stripped Wallpaper (Permanent)","white","kubejs:wallpaper5",true)
	bordered_stripped_wallpapers("stripped_wallpaper6","Stripped Wallpaper","yellow5","kubejs:wallpaper6",false)
	bordered_stripped_wallpapers("stripped_wallpaper6_perm","Stripped Wallpaper (Permanent)","yellow5","kubejs:wallpaper6",true)
	bordered_stripped_wallpapers("stripped_wallpaper7","Stripped Wallpaper","pink","kubejs:wallpaper7",false)
	bordered_stripped_wallpapers("stripped_wallpaper7_perm","Stripped Wallpaper (Permanent)","pink","kubejs:wallpaper7",true)
}