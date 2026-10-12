/*BlockEvents.rightClicked('kubejs:stripped_wallpaper', event => {
	if (event.item.id == 'kubejs:wallpaper') {
		event.item.count--
        event.block.set("kubejs:wallpaper1")
	}
})*/
ServerEvents.recipes(event => {
    let create = (block, item, result) => {
	    event.custom({
            "type": "create:item_application",
		    "ingredients":[
			    {"item": block},
			    {"item": item}
            ],
		    "results": [
			    {"item": result}
            ]
	    })
    }
	//create("kubejs:wallpaper_nest_perm","kubejs:wallpaper","kubejs:wallpaper1")
    //create("kubejs:wallpaper_nest","kubejs:wallpaper","kubejs:wallpaper1")
	create("kubejs:stripped_wallpaper","kubejs:wallpaper","kubejs:wallpaper1")
	create("kubejs:stripped_wallpaper_perm","kubejs:wallpaper","kubejs:wallpaper1")
	create("kubejs:stripped_wallpaper2","kubejs:wallpaper","kubejs:wallpaper2")
	create("kubejs:stripped_wallpaper2_perm","kubejs:wallpaper","kubejs:wallpaper2")
	create("kubejs:stripped_wallpaper3","kubejs:wallpaper","kubejs:wallpaper3")
	create("kubejs:stripped_wallpaper3_perm","kubejs:wallpaper","kubejs:wallpaper3")
	create("kubejs:stripped_wallpaper4","kubejs:wallpaper","kubejs:wallpaper4")
	create("kubejs:stripped_wallpaper4_perm","kubejs:wallpaper","kubejs:wallpaper4")
	create("kubejs:stripped_wallpaper5","kubejs:wallpaper","kubejs:wallpaper5")
	create("kubejs:stripped_wallpaper5_perm","kubejs:wallpaper","kubejs:wallpaper5")
	create("kubejs:stripped_wallpaper6","kubejs:wallpaper","kubejs:wallpaper6")
	create("kubejs:stripped_wallpaper6_perm","kubejs:wallpaper","kubejs:wallpaper6")
	//floor tile transmution
	/*create("kubejs:stripped_wallpaper","kubejs:concrete_piece","kubejs:floor_tiles_full")
	create("kubejs:stripped_wallpaper_perm","kubejs:concrete_piece","kubejs:floor_tiles_full")
	create("kubejs:stripped_wallpaper2","kubejs:concrete_piece","kubejs:floor_tiles_full")
	create("kubejs:stripped_wallpaper2_perm","kubejs:concrete_piece","kubejs:floor_tiles_full")
	create("kubejs:stripped_wallpaper3","kubejs:concrete_piece","kubejs:floor_tiles_full")
	create("kubejs:stripped_wallpaper3_perm","kubejs:concrete_piece","kubejs:floor_tiles_full")
	create("kubejs:stripped_wallpaper4","kubejs:concrete_piece","kubejs:floor_tiles_full")
	create("kubejs:stripped_wallpaper4_perm","kubejs:concrete_piece","kubejs:floor_tiles_full")
	create("kubejs:stripped_wallpaper5","kubejs:concrete_piece","kubejs:floor_tiles_full")
	create("kubejs:stripped_wallpaper5_perm","kubejs:concrete_piece","kubejs:floor_tiles_full")
	create("kubejs:stripped_wallpaper6","kubejs:concrete_piece","kubejs:floor_tiles_full")
	create("kubejs:stripped_wallpaper6_perm","kubejs:concrete_piece","kubejs:floor_tiles_full")*/
})