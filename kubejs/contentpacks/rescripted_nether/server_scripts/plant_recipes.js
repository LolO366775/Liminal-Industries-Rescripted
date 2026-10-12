ServerEvents.recipes(event => {
    event.recipes.botania.petal_apothecary('neapolitan:vanilla_pods', [
        'farmersdelight:straw',
        'minecraft:sugar',
        'minecraft:sugar'
    ])

    event.recipes.botania.petal_apothecary('minecraft:spore_blossom', [
        'miners_delight:moss',
        'miners_delight:moss',
        'minecraft:pink_petals',
        'minecraft:pink_petals'
    ])
    event.recipes.botania.petal_apothecary('minecraft:pink_petals', [
        '#botania:petals/pink',
        '#botania:petals/pink',
        '#botania:petals/lime'
    ])

    event.recipes.farmersdelight.cutting(
        "minecraft:small_dripleaf",
        "#forge:tools/knives",
        [
			Item.of('miners_delight:moss', 2)
        ]
	)
    event.recipes.farmersdelight.cutting(
        "minecraft:big_dripleaf",
        "#forge:tools/knives",
        [
			Item.of('miners_delight:moss', 4)
        ]
	)
    event.custom({
        "type": "thermal:insolator",
        "ingredient": {
            "item": "miners_delight:moss"
        },
        "result": [
            {
                "item": "minecraft:moss_block",
                "chance": 1
            }
        ],
        "experience": 0.15
    })
    event.remove({id:"farmersdelight:cutting/torchflower"})
    event.recipes.farmersdelight.cutting(
        "minecraft:torchflower",
        "#forge:tools/knives",
        [
            'minecraft:torchflower_seeds',
			Item.of("minecraft:torchflower_seeds")
                .withChance(0.5)
        ]
	)
    event.remove({id:"farmersdelight:cutting/pitcher_plant"})
    event.recipes.farmersdelight.cutting(
        "minecraft:pitcher_plant",
        "#forge:tools/knives",
        [
            'minecraft:pitcher_pod',
			Item.of("minecraft:pitcher_pod")
                .withChance(0.5)
        ]
	) 
})