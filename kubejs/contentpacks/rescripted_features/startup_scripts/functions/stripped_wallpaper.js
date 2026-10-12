/**
* @param {Internal.BlockEntityJS} entity
* @param {String} result_id
*/
global.tick_stripped_wallpaper = (entity,result_id) => {
	if (0.05 >= Math.random()) {
		let wallpaper = entity.block
		let above = wallpaper.getUp()
		let below = wallpaper.getDown()
		if (!above.hasTag("kubejs:stripped_wallpapers") || !below.hasTag("kubejs:stripped_wallpapers")) {
			let age = wallpaper.properties.get("age")
			let up = wallpaper.properties.get("up")
			let down = wallpaper.properties.get("down")
			if (age == "0") {
				wallpaper.set(wallpaper.getId(),{"age":"1","up":up,"down":down})
			} else if (age == "1") {
				wallpaper.set(wallpaper.getId(),{"age":"2","up":up,"down":down})
			} else if (age == "2") {
				wallpaper.set(wallpaper.getId(),{"age":"3","up":up,"down":down})
			} else {
				try {
					wallpaper.set(result_id,{"up":up,"down":down})
				} catch (error) {
					wallpaper.set(result_id)
				}
			}
		}
	}
}