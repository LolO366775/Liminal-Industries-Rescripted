ServerEvents.recipes(event => {
	
event.custom({
        "type": "brewinandchewin:fermenting",
        "basefluid": {
            "count": 1000,
            "fluid": "kubejs:carpet_fluid"
        },
        "ingredients": [
            {
              "item": "minecraft:sponge"
            },
            {
              "item": "minecraft:charcoal"
            },
            {
              "item": "minecraft:charcoal"
            }
        ],
        "experience": 0.0,
        "fermentingtime": 2400,
        "recipe_book_tab": "drinks",
        "result": {
            "count": 1000,
            "fluid": "kubejs:bootleg_vodka"
        },

        "temperature": 2
    }).id("kubejs:carpet_fluid_purification")
	event.custom({
        "type": "brewinandchewin:keg_pouring",
        "amount": 250,
        "filling": true,
        "container": {
            "item": "brewinandchewin:tankard"
        },
        "fluid": "kubejs:bootleg_vodka",
        "output": {
            "item": "kubejs:bootleg_vodka"
        },
        "strict": false
    }).id("kubejs:bootleg_vodka_keg_pouring")
	
	event.custom({
        "type": "brewinandchewin:fermenting",
        "basefluid": {
            "count": 1000,
            "fluid": "minecraft:water"
        },
        "ingredients": [
            {
              "item": "kubejs:rotten_wallpaper"
            },
            {
              "item": "berry_good:sweet_berry_pips"
            },
            {
              "item": "berry_good:sweet_berry_pips"
            }
        ],
        "experience": 0.0,
        "fermentingtime": 2400,
        "recipe_book_tab": "drinks",
        "result": {
            "count": 1000,
            "fluid": "kubejs:wallpaper_kombucha"
        },

        "temperature": 3
    }).id("kubejs:kombucha_making")
	event.custom({
        "type": "brewinandchewin:keg_pouring",
        "amount": 250,
        "filling": true,
        "container": {
            "item": "minecraft:glass_bottle"
        },
        "fluid": "kubejs:wallpaper_kombucha",
        "output": {
            "item": "kubejs:wallpaper_kombucha"
        },
        "strict": false
    }).id("kubejs:wallpaper_kombucha_keg_pouring")

event.shapeless(
    Item.of('kubejs:carpet_dough'),
    [
        '3x kubejs:carpet_dust',
        'minecraft:sugar',
        'minecraft:water_bucket'
    ]
)
event.recipes.botania.petal_apothecary('kubejs:carpet_dough', [
        'kubejs:carpet_dust',
        'kubejs:carpet_dust',
        'kubejs:carpet_dust',
        'minecraft:sugar'
    ])
event.smoking('kubejs:carpet_loaf', 'kubejs:carpet_dough').xp(0.35)

    event.custom({
        "type": "brewinandchewin:fermenting",
        "basefluid": {
            "count": 1000,
            "fluid": "minecraft:water"
        },
        "ingredients": [
            {
              "item": "minecraft:sugar"
            },
            {
              "item": "kubejs:carpet_loaf"
            },
            {
              "item": "kubejs:carpet_loaf"
            }
        ],
        "experience": 0.0,
        "fermentingtime": 2400,
        "recipe_book_tab": "drinks",
        "result": {
            "count": 1000,
            "fluid": "kubejs:carpet_kvass"
        },

        "temperature": 3
    }).id("kubejs:kvass_making")
	event.custom({
        "type": "brewinandchewin:keg_pouring",
        "amount": 250,
        "filling": true,
        "container": {
            "item": "minecraft:glass_bottle"
        },
        "fluid": "kubejs:carpet_kvass",
        "output": {
            "item": "kubejs:carpet_kvass"
        },
        "strict": false
    }).id("kubejs:kvass_keg_pouring")
	
	event.custom({
        "type": "brewinandchewin:fermenting",
        "basefluid": {
            "count": 1000,
            "fluid": "kubejs:almond_water"
        },
        "ingredients": [
            {
              "item": "minecraft:sugar"
            },
            {
              "item": "neapolitan:vanilla_pods"
            },
            {
              "item": "farmersdelight:straw"
            }
        ],
        "experience": 0.0,
        "fermentingtime": 2400,
        "recipe_book_tab": "drinks",
        "result": {
            "count": 1000,
            "fluid": "kubejs:almond_beer"
        },

        "temperature": 4
    }).id("kubejs:almond_beer_making")
	event.custom({
        "type": "brewinandchewin:keg_pouring",
        "amount": 250,
        "filling": true,
        "container": {
            "item": "brewinandchewin:tankard"
        },
        "fluid": "kubejs:almond_beer",
        "output": {
            "item": "kubejs:almond_beer"
        },
        "strict": false
    }).id("kubejs:almond_beer_keg_pouring")
	
event.recipes.create.sequenced_assembly(
    [
        'kubejs:flaming_ale'
    ],
    'brewinandchewin:tankard',
    [
        event.recipes.create.filling('brewinandchewin:tankard',[Fluid.of('immersiveengineering:creosote', 250),'brewinandchewin:tankard']),
        event.recipes.create.deploying('brewinandchewin:tankard',['brewinandchewin:tankard','minecraft:sugar']),
        event.recipes.create.deploying('brewinandchewin:tankard',['brewinandchewin:tankard','minecraft:flint_and_steel'])
    ]
)
.transitionalItem('brewinandchewin:tankard')
.loops(1)
})