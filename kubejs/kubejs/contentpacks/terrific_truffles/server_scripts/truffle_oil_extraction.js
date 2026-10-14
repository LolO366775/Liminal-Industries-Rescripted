ServerEvents.recipes(event => {

    event.recipes.farmersdelight.cutting(
        'kubejs:carpet_truffle',
        '#forge:tools/knives',
        [ 
            Item.of('kubejs:carpet_truffle_piece', 4),
            'endrem:undead_soul'
        ],
        'minecraft:entity.axolotl.death'
       
    )


    event.custom({
        "type": "brewinandchewin:fermenting",
        "basefluid": {
            "count": 1000,
            "fluid": "createaddition:seed_oil"
        },
        "ingredients": [
            {
                "item": "kubejs:carpet_truffle"
            }
        ],
        "experience": 0.0,
        "fermentingtime": 2400,
        "recipe_book_tab": "drinks",
        "result": {
            "count": 1000,
            "fluid": "kubejs:truffle_oil"
        },

        "temperature": 1
    }).id("kubejs:simple_truffle_oil_fermenting")


    event.custom({
        "type": "brewinandchewin:fermenting",
        "basefluid": {
            "count": 1000,
            "fluid": "createaddition:seed_oil"
        },
        "ingredients": [
            {
                "item": "kubejs:carpet_truffle_piece"
                
            }, 
            {
                "tag" : "terrific_truffles:resin"
            }
        ],
        "experience": 0.0,
        "fermentingtime": 2400,
        "recipe_book_tab": "drinks",
        "result": {
            "count": 1000,
            "fluid": "kubejs:truffle_oil"
        },

        "temperature": 1
    }).id("kubejs:resin_truffle_oil_fermenting")


    event.custom({
        "type": "brewinandchewin:keg_pouring",
        "amount": 250,
        "filling": true,
        "container": {
            "item": "minecraft:glass_bottle"
        },
        "fluid": "kubejs:truffle_oil",
        "output": {
            "item": "kubejs:truffle_oil_bottle"
        },
        "strict": false
    }).id("kubejs:truffle_oil_keg_pouring")
})

