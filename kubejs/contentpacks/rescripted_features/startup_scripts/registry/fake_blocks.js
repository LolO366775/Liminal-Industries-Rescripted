/**
* @param {Registry.Block} event
*/
function block_registry_fake_blocks(event) {
	let breakable_pickaxe = (id,display_name,map_colour,sound_type,model) => {
		event.create(id)
		.fullBlock(true)
		.mapColor(map_colour)
		.soundType(sound_type)
		.tagBlock('minecraft:mineable/pickaxe')
		.model(`kubejs:block/${model}`)
		.displayName(display_name)
	}
	let breakable_porous_stone = (id,display_name,map_colour,sound_type,colour) => {
		event.create(id)
		.fullBlock(true)
		.mapColor(map_colour)
		.soundType(sound_type)
		.tagBlock('minecraft:mineable/pickaxe')
		.displayName(display_name)
		.item(item => item.modelJson({"parent": `kubejs:block/porous_stone/${colour}1`}))
		.blockstateJson = {
  			"variants": {
    			"": [{
      				"model": `kubejs:block/porous_stone/${colour}1`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/porous_stone/${colour}2`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/porous_stone/${colour}3`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/porous_stone/${colour}4`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/porous_stone/${colour}5`, "weight": 10
    			}]
  			}
		}
	}
	let breakable_bordered_wallpapers = (id,display_name,type) => { //For old concrete, this needs to not be only yellow colour and cherry wood sounds
		event.create(id).displayName(display_name)
		.fullBlock(true)
		.mapColor("color_yellow")
		.soundType("cherry_wood")
		.defaultCutout()
		.tagBlock('minecraft:mineable/axe')
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
				"parent": `kubejs:block/fake_wallpaper/${type}/default`
			})
		)
		.blockstateJson = {
        	"variants": {
				"down=false,up=false": {
                	"model": `kubejs:block/fake_wallpaper/${type}/default`
            	},
				"down=false,up=true": {
                	"model": `kubejs:block/fake_wallpaper/${type}/bordered_top`
            	},
				"down=true,up=false": {
                	"model": `kubejs:block/fake_wallpaper/${type}/bordered_bottom`
            	},
				"down=true,up=true": {
                	"model": `kubejs:block/fake_wallpaper/${type}/bordered_both`
            	}
    		}
		}
	}
	breakable_bordered_wallpapers("wallpaper_fake", "Fake Wallpaper", "yellow1")
	breakable_bordered_wallpapers("wallpaper2_fake", "Fake Wallpaper (Large Dots)", "yellow2")
	breakable_bordered_wallpapers("wallpaper3_fake", "Fake Wallpaper (Small Dots)", "yellow3")
	breakable_bordered_wallpapers("wallpaper4_fake", "Fake Wallpaper (Plain)", "yellow4")
	breakable_bordered_wallpapers("wallpaper5_fake", "Fake Wallpaper (Hotel)", "hotel")
	breakable_bordered_wallpapers("wallpaper6_fake", "Fake Wallpaper (Striped)", "yellow5")
	breakable_bordered_wallpapers("wallpaper7_fake", "Fake Wallpaper (Pink)", "pink")
	breakable_bordered_wallpapers("wallpaper_manila_fake", "Fake Wallpaper (Manila)", "manilla")
	breakable_porous_stone("brittle_porous_stone","Brittle Porous Stone","stone","tuff","light")
	breakable_porous_stone("brittle_porous_stone_dark","Brittle Dark Porous Stone","stone","deepslate","dark")
	breakable_pickaxe("pool_tiles_fake","Fake Pool Tiles","stone","deepslate","pool_tiles")
	breakable_pickaxe("wet_pool_tiles_fake","Fake Pool Tiles (Wet)","stone","deepslate","pool_tiles_wet")

	//these have a model, remember
	breakable_pickaxe("pool_tiles_missing_fake","Fake Missing Pool Tiles","stone","deepslate","missing_tiles_half")
	breakable_pickaxe("pool_tiles_golden_half_fake","Fake Pool Tiles Golden Half","stone","deepslate","pool_tiles_golden_half")
	breakable_pickaxe("pool_tiles_golden_fake","Fake Pool Tiles Golden","stone","deepslate","pool_tiles_golden")

	breakable_pickaxe("brittle_asphalt","Brittle Asphalt","stone","stone","asphalt")
	breakable_pickaxe("wet_brittle_asphalt","Brittle Asphalt (Wet)","stone","stone","wet_asphalt")
	breakable_pickaxe("brittle_old_concrete","Brittle Old Concrete","stone","stone","old_concrete") //This would have a bordered tag like the wallpaper. The regular version also needs this
	//breakable_pickaxe("brittle_old_concrete_bordered","Brittle Old Concrete (Bordered)","stone","stone","old_concrete_bordered") //This is redundant with the bordered version
	breakable_pickaxe("brittle_old_concrete_pillar","Brittle Old Concrete Pillar","stone","stone","old_concrete_pillar")
	breakable_pickaxe("brittle_old_concrete_plated","Brittle Old Concrete (Plated)","stone","stone","old_concrete_plated")
	breakable_pickaxe("brittle_old_concrete_plated_pillar","Brittle Old Concrete Pillar (Plated)","stone","stone","old_concrete_plated_pillar")
}