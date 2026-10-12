ServerEvents.recipes(event => {

let spores = (input) => {
    event.custom({
        "type": "brewinandchewin:fermenting",
        "basefluid": {
            "count": 1000,
            "fluid": "minecraft:water"
        },
        "experience": 0.0,
        "fermentingtime": 6000,
        "ingredients": [
                {
                    "item": input
                }
        ],
        "recipe_book_tab": "meals",
        "result": {
        "count": 5,
        "item": input
        },
        "temperature": 4
    })
}
let double_spores = (input) => {
    event.custom({
        "type": "brewinandchewin:fermenting",
        "basefluid": {
            "count": 1000,
            "fluid": "minecraft:water"
        },
        "experience": 0.0,
        "fermentingtime": 4800,
        "ingredients": [
                {
                    "item": input
                },
                {
                    "item": input
                }
        ],
        "recipe_book_tab": "meals",
        "result": {
        "count": 5,
        "item": input
        },
        "temperature": 4
    })
}
let triple_spores = (input) => {
    event.custom({
        "type": "brewinandchewin:fermenting",
        "basefluid": {
            "count": 1000,
            "fluid": "minecraft:water"
        },
        "experience": 0.0,
        "fermentingtime": 3600,
        "ingredients": [
                {
                    "item": input
                },
                {
                    "item": input
                },
                {
                    "item": input
                }
        ],
        "recipe_book_tab": "meals",
        "result": {
        "count": 5,
        "item": input
        },
        "temperature": 4
    })
}
let quad_spores = (input) => {
    event.custom({
        "type": "brewinandchewin:fermenting",
        "basefluid": {
            "count": 1000,
            "fluid": "minecraft:water"
        },
        "experience": 0.0,
        "fermentingtime": 2400,
        "ingredients": [
                {
                    "item": input
                },
                {
                    "item": input
                },
                {
                    "item": input
                },
                {
                    "item": input
                }
        ],
        "recipe_book_tab": "meals",
        "result": {
        "count": 5,
        "item": input
        },
        "temperature": 4
    })
}

spores('thermal:redstone_mushroom_spores')
spores('thermal:glowstone_mushroom_spores')
spores('thermal:slime_mushroom_spores')
spores('thermal:gunpowder_mushroom_spores')

double_spores('thermal:redstone_mushroom_spores')
double_spores('thermal:glowstone_mushroom_spores')
double_spores('thermal:slime_mushroom_spores')
double_spores('thermal:gunpowder_mushroom_spores')

triple_spores('thermal:redstone_mushroom_spores')
triple_spores('thermal:glowstone_mushroom_spores')
triple_spores('thermal:slime_mushroom_spores')
triple_spores('thermal:gunpowder_mushroom_spores')

quad_spores('thermal:redstone_mushroom_spores')
quad_spores('thermal:glowstone_mushroom_spores')
quad_spores('thermal:slime_mushroom_spores')
quad_spores('thermal:gunpowder_mushroom_spores')

})