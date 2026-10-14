/**
* @param {Internal.RecipesEventJS} event
*/
function rescripted_recipes_neapolitan(event){
    event.custom({
        "type": "thermal:insolator",
        "ingredient": {
            "item": "minecraft:cocoa_beans"
        },
        "result": [
            {
                "item": "dynamictrees:cocoa_seed",
                "count": 1
            }
        ],
        "experience": 0.15
    })
    event.custom({
        "type": "thermal:insolator",
        "ingredient": {
            "item": "minecraft:apple"
        },
        "result": [
            {
                "item": "dynamictrees:apple_oak_seed",
                "count": 1
            }
        ],
        "experience": 0.15
    })
    event.custom({
        "type": "thermal:insolator",
        "ingredient": {
            "item": "neapolitan:strawberry_pips"
        },
        "result": [
            {
                "item":"neapolitan:strawberries",
                "count": 3
            },
            {
                "item":"neapolitan:white_strawberries",
                "chance":0.25,
                "count": 1
            }
        ],
        "experience": 0.15
    })
    event.remove({output: 'neapolitan:magic_beans'})
    event.custom({
        "type": "thermal:insolator",
        "ingredient": {
            "item": "neapolitan:adzuki_soil"
        },
        "result": [
            {
                "item":"minecraft:dirt",
                "count": 1
            },
            {
                "item":"neapolitan:adzuki_beans",
                "chance":0.25,
                "count": 3
            },
            {
                "item":"neapolitan:magic_beans",
                "chance":0.05,
                "count": 1
            }
        ],
        "experience": 0.15
    })
    event.custom({
        "type": "thermal:insolator",
        "ingredient": {
            "item": "neapolitan:magic_beans"
        },
        "result": [
            {
                "item":"neapolitan:beanstalk",
                "count": 5
            },
            {
                "item":"neapolitan:beanstalk_thorns",
                "chance":0.75,
                "count": 3
            }
        ],
        "experience": 0.15
    })
    event.custom({
        "type": "thermal:insolator",
        "ingredient": {
            "item": "neapolitan:vanilla_pod_block"
        },
        "result": [
            {
                "item": "neapolitan:dried_vanilla_pod_block",
                "count": 1
            },
            {
                "item": "neapolitan:vanilla_pods",
                "chance": 0.5,
                "count": 3
            }
        ],
        "experience": 0.15
    })
    event.custom({
        "type": "thermal:insolator",
        "ingredient": {
            "item": "neapolitan:vanilla_pods"
        },
        "result": [
            {
                "item": "neapolitan:vanilla_pods",
                "count": 1
            },
            {
                "item": "neapolitan:dried_vanilla_pods",
                "chance": 0.5,
                "count": 3
            }
        ],
        "experience": 0.15
    })
    event.recipes.botania.petal_apothecary('neapolitan:mint_leaves', [
        'botania:green_petal',
        'botania:green_petal',
        'botania:green_petal',
        'botania:green_petal',
        'botania:magenta_petal'
    ])
    event.custom({
        "type": "thermal:insolator",
        "ingredient": {
            "item": "neapolitan:mint_sprout"
        },
        "result": [
            {
                "item": "neapolitan:mint_leaves",
                "count": 3
            }
        ],
        "experience": 0.15
    })
    event.custom({
        "type": "thermal:insolator",
        "ingredient": {
            "item": "neapolitan:banana_frond"
        },
        "result": [
            {
                "item": "neapolitan:banana_stalk",
                "count": 5
            },
            {
                "item": "neapolitan:banana_frond"
            },
            {
                "item": "neapolitan:banana_bundle",
                "chance": 0.75
            },
            {
                "item": "dtneapolitan:banana_seed",
                "chance": 0.1
            }
        ],
        "experience": 0.15
    })
    event.custom({
        "type":"immersiveengineering:cloche",
        "input":{
            "item":"neapolitan:banana_bunch"
        },
        "render":{
            "type":"generic",
            "block":"neapolitan:banana_bundle"
        },
        "results":[
            {
                "item":"neapolitan:banana_bundle"
            }
        ],
        "soil":{
            "item":"minecraft:dirt"
        },
        "time":480
    })
    event.custom({
        "type":"immersiveengineering:cloche",
        "input":{
            "item":"neapolitan:mint_sprout"
        },
        "render":{
            "type":"generic",
            "block":"neapolitan:mint"
        },
        "results":[
            {
                "item":"neapolitan:mint_leaves",
                "count": 2
            }
        ],
        "soil":{
            "item":"minecraft:dirt"
        },
        "time":240
    })
    event.custom({
        "type":"immersiveengineering:cloche",
        "input":{
            "item":"neapolitan:vanilla_pods"
        },
        "render":{
            "type":"generic",
            "block":"neapolitan:vanilla_vines"
        },
        "results":[
            {
                "item":"neapolitan:vanilla_pods",
                "count": 2
            }
        ],
        "soil":{
            "item":"minecraft:dirt"
        },
        "time":240
    })
    event.custom({
        "type":"immersiveengineering:cloche",
        "input":{
            "item":"neapolitan:strawberry_pips"
        },
        "render":{
            "type":"generic",
            "block":"neapolitan:strawberry_bush"
        },
        "results":[
            {
                "item":"neapolitan:strawberries",
                "count": 2
            }
        ],
        "soil":{
            "item":"minecraft:dirt"
        },
        "time":240
    })
    event.custom({
        "type":"immersiveengineering:cloche",
        "input":{
            "item":"neapolitan:strawberry_pips"
        },
        "render":{
            "type":"generic",
            "block":"neapolitan:strawberry_bush"
        },
        "results":[
            {
                "item":"neapolitan:white_strawberries",
                "count": 2
            }
        ],
        "soil":{
            "item":"minecraft:snow_block"
        },
        "time":240
    })
    event.custom({
        "type":"immersiveengineering:cloche",
        "input":{
            "item":"neapolitan:adzuki_beans"
        },
        "render":{
            "type":"generic",
            "block":"neapolitan:adzuki_sprouts"
        },
        "results":[
            {
                "item":"neapolitan:adzuki_beans",
                "count": 2
            }
        ],
        "soil":{
            "item":"neapolitan:adzuki_soil"
        },
        "time":240
    })
    event.custom({
        "type": "brewinandchewin:fermenting",
        "basefluid": {
            "count": 1000,
            "fluid": "minecraft:water"
        },
        "experience": 1.0,
        "fermentingtime": 9600,
        "ingredients": [
                {
                    "item": "kubejs:cut_carpet"
                },
                {
                    "item": "kubejs:cut_carpet"
                },
                {
                    "item": "minecraft:sugar"
                },
                {
                    "item": "neapolitan:adzuki_beans"
                }
        ],
        "recipe_book_tab": "meals",
        "result": {
        "count": 8,
        "item": "neapolitan:adzuki_soil"
        },
        "temperature": 4
    })
    event.recipes.thermal.press("9x neapolitan:banana_bunch", ["neapolitan:banana_bundle","thermal:press_unpacking_die"])
    event.recipes.create.pressing("3x neapolitan:banana_bunch", "neapolitan:banana_bundle")
    event.recipes.farmersdelight.cutting("neapolitan:banana_bunch","#forge:tools/knives",["3x neapolitan:banana"])
}