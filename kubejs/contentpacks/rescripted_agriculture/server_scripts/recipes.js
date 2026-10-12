ServerEvents.recipes(event => {
event.custom({
  "type": "eidolon:crucible",
  "steps": [
    {
      "items": [
        { "item": "kubejs:wallpaper" }
      ]
    },
    {
      "stirs": 1,
      "items": [
        { "item": "minecraft:rotten_flesh" },
        { "item": "eidolon:enchanted_ash" }
      ]
    },
	{
      "stirs": 1,
      "items": [
        { "item": "botania:livingwood_twig" },
        { "item": "minecraft:brown_mushroom" }
      ]
    },
    {
      "items": [
        { "item": "minecraft:bone_meal" }
      ]
    }
  ],
  "result": {
    "item": "kubejs:rotten_wallpaper"
  }
})
})
ServerEvents.recipes(event => {

    event.custom({
        "type": "immersiveengineering:coke_oven",
        "input": {
            "item": "kubejs:uncanny_shroom"
        },
        "result": {
            "item": "actuallyadditions:tiny_charcoal"
        },
        "creosote": 0,
        "time": 300
    })
event.recipes.botania.petal_apothecary('miners_delight:cave_carrot', [
        'botania:brown_petal',
        'supplementaries:ash',
        'eidolon:enchanted_ash',
        'kubejs:carpet_dust',
		'kubejs:rotten_wallpaper',
		'botania:livingwood_twig'
    ])
event.recipes.botania.petal_apothecary('kubejs:uncanny_shroom_seeds', [
		'kubejs:rotten_wallpaper',
        'botania:brown_petal',
        'botania:red_petal',
		'#forge:mushrooms',
		'#backrooms:wooden_furniture',
		'#backrooms:wooden_furniture'
    ])
event.recipes.botania.petal_apothecary('kubejs:corrosive_fungi', [
		'minecraft:clay_ball',
        'minecraft:clay_ball',
        'botania:rune_earth',
		'botania:orange_petal',
		'botania:pink_petal',
		'kubejs:rotten_wallpaper'
    ])
//duplication
event.recipes.create.mixing('2x kubejs:corrosive_fungi', [Fluid.of('minecraft:water'), 'kubejs:corrosive_fungi', 'minecraft:clay_ball']).heated()
event.recipes.create.mixing('4x kubejs:rotten_wallpaper', [Fluid.of('minecraft:water'), 'kubejs:rotten_wallpaper', '3x kubejs:wallpaper', 'supplementaries:ash']).heated()
//mushroom chopping
event.shapeless('3x mekanism:sawdust', ['kubejs:uncanny_shroom'])

let chopping = (output, input) => {
		event.recipes.farmersdelight.cutting(
			input,
			"#forge:tools/knives",
			[
				output
			],
			"minecraft:block.wood.break");
	}
	chopping('4x mekanism:sawdust', 'kubejs:uncanny_shroom')
  chopping('4x minecraft:redstone', 'thermal:redstone_mushroom_spores')
})