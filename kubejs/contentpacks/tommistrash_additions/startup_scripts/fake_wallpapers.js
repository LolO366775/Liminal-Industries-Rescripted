StartupEvents.registry('block', event => {
	let breakable_bordered_wallpapers = (id,display_name,type) => {
		event.create(id).displayName(display_name)
		.fullBlock(true)
		.mapColor("color_yellow")
		.soundType("cherry_wood")
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
				"parent": `kubejs:block/${type}`
			})
		)
		.blockstateJson = {
        	"variants": {
				"down=false,up=false": {
                	"model": `kubejs:block/${type}`
            	}
    		}
		}
	}
	breakable_bordered_wallpapers("wallpaper_fake_red", "Fake Red Wallpaper", "wallpaper_red_block")
	breakable_bordered_wallpapers("wallpaper_fake_orange", "Fake Orange Wallpaper", "wallpaper_orange_block")
	breakable_bordered_wallpapers("wallpaper_fake_lime", "Fake Lime Wallpaper", "wallpaper_lime_block")
	breakable_bordered_wallpapers("wallpaper_fake_green", "Fake Green Wallpaper", "wallpaper_green_block")
	breakable_bordered_wallpapers("wallpaper_fake_blue", "Fake Blue Wallpaper", "wallpaper_blue_block")
	breakable_bordered_wallpapers("wallpaper_fake_lblue", "Fake Light Blue Wallpaper", "wallpaper_lblue_block")
	breakable_bordered_wallpapers("wallpaper_fake_pink", "Fake Pink Wallpaper", "wallpaper_pink_block")
	breakable_bordered_wallpapers("wallpaper_fake_purple", "Fake Purple Wallpaper", "wallpaper_purple_block")
})