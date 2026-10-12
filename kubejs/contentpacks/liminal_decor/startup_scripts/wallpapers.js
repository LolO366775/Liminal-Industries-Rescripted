StartupEvents.registry('block', event => {

	let colored_wallpaper_blocks = (id,display_name) => {
	event.create(id)
		.fullBlock(true)
		.material("stone")
		.soundType("stone")
		.unbreakable()
		.tagBlock('wither_immune')
		.displayName(display_name)
	}
	colored_wallpaper_blocks("wallpaper_red_block","Red Wallpaper")
	colored_wallpaper_blocks("wallpaper_orange_block","Orange Wallpaper")
	colored_wallpaper_blocks("wallpaper_lime_block","Lime Wallpaper")
	colored_wallpaper_blocks("wallpaper_green_block","Green Wallpaper")
	colored_wallpaper_blocks("wallpaper_blue_block","Blue Wallpaper")
	colored_wallpaper_blocks("wallpaper_lblue_block","Light Blue Wallpaper")
	colored_wallpaper_blocks("wallpaper_pink_block","Pink Wallpaper")
	colored_wallpaper_blocks("wallpaper_purple_block","Purple Wallpaper")
	colored_wallpaper_blocks("tiles_blue_block","Blue Tiles")
})
StartupEvents.registry('item', event => {

	let colored_wallpapers = (id,display_name) => {
	event.create(id)
		.displayName(display_name)
	}
	colored_wallpapers("wallpaper_red","Red Wallpaper")
	colored_wallpapers("wallpaper_orange","Orange Wallpaper")
	colored_wallpapers("wallpaper_lime","Lime Wallpaper")
	colored_wallpapers("wallpaper_green","Green Wallpaper")
	colored_wallpapers("wallpaper_blue","Blue Wallpaper")
	colored_wallpapers("wallpaper_lblue","Light Blue Wallpaper")
	colored_wallpapers("wallpaper_pink","Pink Wallpaper")
	colored_wallpapers("wallpaper_purple","Purple Wallpaper")
	colored_wallpapers("tiles_blue","Blue Tile")
})