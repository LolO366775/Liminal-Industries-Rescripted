ServerEvents.recipes(event => {
    event.shaped('4x kubejs:concrete_tile', [
		    'SS'
		],{
		    S: 'immersiveengineering:slab_concrete'
        }
    )
    event.recipes.create.pressing('kubejs:concrete_tile', 'kubejs:concrete_piece')
    // event.recipes.create.cutting('2x kubejs:oak_flooring', 'minecraft:oak_slab')
    // event.recipes.create.cutting('2x kubejs:spruce_flooring', 'minecraft:spruce_slab')
    // event.recipes.create.cutting('2x kubejs:birch_flooring', 'minecraft:birch_slab')
    // event.recipes.create.cutting('2x kubejs:jungle_flooring', 'minecraft:jungle_slab')
    // event.recipes.create.cutting('2x kubejs:acacia_flooring', 'minecraft:acacia_slab')
    // event.recipes.create.cutting('2x kubejs:dark_oak_flooring', 'minecraft:dark_oak_slab')
    // event.recipes.create.cutting('2x kubejs:mangrove_flooring', 'minecraft:mangrove_slab')
    // event.recipes.create.cutting('2x kubejs:cherry_flooring', 'minecraft:cherry_slab')
    // event.recipes.create.cutting('2x kubejs:bamboo_flooring', 'minecraft:bamboo_slab')
    // event.recipes.create.cutting('2x kubejs:crimson_flooring', 'minecraft:crimson_slab')
    // event.recipes.create.cutting('2x kubejs:warped_flooring', 'minecraft:warped_slab')
    // event.recipes.create.cutting('2x kubejs:treated_wood_flooring', '#forge:treated_wood_slab')
    // event.recipes.create.cutting('2x kubejs:checker_flooring', 'supplementaries:checker_slab')
    event.stonecutting('2x kubejs:concrete_tile', 'immersiveengineering:slab_concrete')
    event.stonecutting('4x kubejs:concrete_tile', 'immersiveengineering:concrete')


    
    const woodTypes = [
        'oak', 'spruce', 'birch', 'jungle', 'acacia', 
        'dark_oak', 'mangrove', 'cherry', 'bamboo', 
        'crimson', 'warped', 'treated_wood', 'checker'
    ]
    woodTypes.forEach(wood => {
        let slabInput = `minecraft:${wood}_slab`;
        if (wood === 'treated_wood') {
            slabInput = '#forge:treated_wood_slab';
        } else if (wood === 'checker') {
            slabInput = 'supplementaries:checker_slab'; 
        }
		//specific recipes
        if (wood == 'treated_wood') {
            event.stonecutting('4x kubejs:treated_wood_flooring', '#forge:treated_wood')
        } else if (wood == "checker"){
            event.stonecutting('4x kubejs:checker_flooring', 'supplementaries:checker_block')
        } else {
            event.stonecutting(`4x kubejs:${wood}_flooring`, `minecraft:${wood}_planks`)
        }
        event.stonecutting(`2x kubejs:${wood}_flooring`, slabInput)

	    
	    event.recipes.create.filling('kubejs:treated_wood_flooring', [Fluid.of('immersiveengineering:creosote', 250), `kubejs:${wood}_flooring`])
        event.shaped(`4x kubejs:${wood}_flooring`, [
		        'SS'
		    ],{
		        S: slabInput
            }
        )
    })

    event.recipes.create.sandpaper_polishing('kubejs:polished_wood_flooring', 'kubejs:treated_wood_flooring')
})
ServerEvents.recipes(event => {
    //closet
    event.shapeless('4x minecraft:spruce_planks', ['kubejs:closet'])
	event.shapeless('2x minecraft:spruce_planks', ['kubejs:closet_small'])
	event.shapeless('kubejs:closet', ['kubejs:closet_small', 'kubejs:closet_small'])
    //redstone
	event.remove({ output: 'minecraft:redstone', type: 'create:mixing' })
    //wallpaper update
    event.shapeless('kubejs:tiles_blue', ['minecraft:blue_dye', 'kubejs:pool_tile'])
    event.recipes.create.splashing('kubejs:wallpaper', '#backrooms:coloured_wallpapers')
})
//coloured wallpapers
ServerEvents.recipes(event => {
    const colourTypes = [
        'red', 'orange', 'green', 'lime', 'blue', 'lblue', 'pink', 'purple'
        // 'black', 'white', 'yellow'
    ]
    colourTypes.forEach(colour => {
        let dyeInput = colour == 'lblue'
            ? 'minecraft:light_blue_dye'
            : `minecraft:${colour}_dye`
		event.shapeless(
            `kubejs:wallpaper_${colour}`,
            [
                'kubejs:wallpaper', 
                dyeInput
            ]
		)
    })
})