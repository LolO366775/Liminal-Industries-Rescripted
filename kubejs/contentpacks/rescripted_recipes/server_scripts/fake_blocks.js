ServerEvents.recipes(event => {
	try {
		if (is_recipes_fake_blocks_enabled()) {recipes_fake_blocks(event)}
        if (is_recipes_fake_sculk_enabled()) {recipes_fake_sculk(event)}
	} catch (error) {
		console.log(`Error loading recipe config!`)
		console.log(`§c${error}`)
	}
})
function is_recipes_fake_blocks_enabled(){
	let file_data = JsonIO.readJson("kubejs/config/recipes.json").asJsonObject
	let enabled = file_data.get("fake_blocks").asBoolean
	return enabled
}
function is_recipes_fake_sculk_enabled(){
	let file_data = JsonIO.readJson("kubejs/config/recipes.json").asJsonObject
	let enabled = file_data.get("fake_sculk").asBoolean
	return enabled
}
/**
* @param {Internal.RecipesEventJS} event
*/
function recipes_fake_blocks(event){
    let create = (block, item, result) => {
	    event.remove({output: result})//this isnt needed for the new blocks
	    event.custom({"type": "create:item_application",
		"ingredients":[
			{"item": block},
			{"item": item}
        ],
		"results": [
			{"item": result}
        ]
	})
}
create("kubejs:brittle_porous_stone_dark", "kubejs:pool_tile", "kubejs:pool_tiles_missing_fake")
create("kubejs:pool_tiles_missing_fake", "kubejs:pool_tile", "kubejs:pool_tiles_fake")
create("kubejs:brittle_porous_stone_dark", "kubejs:pool_tile_golden", "kubejs:pool_tiles_golden_fake")
create("kubejs:pool_tiles_missing_fake", "kubejs:pool_tile_golden", "kubejs:pool_tiles_golden_half_fake")
create("supplementaries:timber_frame", "kubejs:wallpaper", "kubejs:wallpaper_fake")
//fake concrete
create("minecraft:gravel", "thermal:bitumen", "kubejs:brittle_asphalt")
event.recipes.create.filling('kubejs:brittle_asphalt',['minecraft:gravel',Fluid.of('thermal:crude_oil', 500)])
event.recipes.create.filling('kubejs:wet_brittle_asphalt',['kubejs:brittle_asphalt',Fluid.of('minecraft:water', 500)])
create("kubejs:brittle_old_concrete_pillar", "immersiveengineering:plate_steel", "kubejs:brittle_old_concrete_plated_pillar")
create("kubejs:brittle_old_concrete", "immersiveengineering:plate_steel", "kubejs:brittle_old_concrete_plated")
event.recipes.minecraft.stonecutting("kubejs:brittle_old_concrete_pillar", "kubejs:brittle_old_concrete")
create("immersiveengineering:concrete", "thermal:bitumen", "kubejs:brittle_old_concrete")
event.recipes.create.filling('kubejs:brittle_old_concrete',['immersiveengineering:concrete',Fluid.of('thermal:crude_oil', 500)])

let rock_gen = (output, adjacent, below) => {
    event.custom({
        "type": "thermal:rock_gen",
        "adjacent": adjacent,
        "below": below,
        "result": {
            "item": output
        }
      })
    }
	rock_gen('kubejs:brittle_porous_stone', 
        'minecraft:water',
        'kubejs:soul_carpet'
    )
    rock_gen('kubejs:brittle_porous_stone_dark', 
        'minecraft:packed_ice',
        'kubejs:soul_carpet'
    )
}
/**
* @param {Internal.RecipesEventJS} event
*/
function recipes_fake_sculk(event){
	event.replaceInput({id: 'corrosive_sculk:woven_sculk_vein'}, 'minecraft:sculk_vein', 'actuallyadditions:solidified_experience')
	event.replaceInput({id: 'corrosive_sculk:woven_sculk_vein_flipped'}, 'minecraft:sculk_vein', 'actuallyadditions:solidified_experience')
	event.replaceInput({id: 'corrosive_sculk:woven_sculk'}, 'minecraft:sculk', 'actuallyadditions:solidified_experience')
	event.replaceInput({id: 'corrosive_sculk:woven_sculk_flipped'}, 'minecraft:sculk', 'actuallyadditions:solidified_experience')
}
ServerEvents.recipes(event => {
	event.recipes.minecraft.stonecutting("kubejs:wallpaper2_fake", "kubejs:wallpaper_fake")
	event.recipes.minecraft.stonecutting("kubejs:wallpaper3_fake", "kubejs:wallpaper_fake")
	event.recipes.minecraft.stonecutting("kubejs:wallpaper4_fake", "kubejs:wallpaper_fake")
	event.recipes.minecraft.stonecutting("kubejs:wallpaper5_fake", "kubejs:wallpaper_fake")
	event.recipes.minecraft.stonecutting("kubejs:wallpaper6_fake", "kubejs:wallpaper_fake")
	event.recipes.minecraft.stonecutting("kubejs:wallpaper7_fake", "kubejs:wallpaper_fake")
	event.recipes.minecraft.stonecutting("kubejs:wallpaper_manila_fake", "kubejs:wallpaper_fake")
})