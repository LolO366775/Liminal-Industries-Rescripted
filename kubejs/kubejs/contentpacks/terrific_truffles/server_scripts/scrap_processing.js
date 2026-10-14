let BLACK_PLATE_CUTTING_RESITANCE_CHANCE = 0.9


ServerEvents.recipes(event => {
    
    event.recipes.create.cutting(
        [
            'minecraft:quartz',
            Item.of('kubejs:light_plate').withChance(0.9)
        ],
        'kubejs:light_plate'
    )

    event.recipes.create.cutting(
        [
            'actuallyadditions:black_quartz',
            Item.of('kubejs:dark_plate').withChance(BLACK_PLATE_CUTTING_RESITANCE_CHANCE)
        ],
        'kubejs:dark_plate'
    )
}
)


ServerEvents.recipes(event => {

	let melting = (Input, Output, Amount) => {
		event.custom({"type": "tconstruct:melting",

			"ingredient": {
			"item": Input
			},
			"result": {
			"amount": Amount,
			"tag": Output
			},
			"temperature": 800,
			"time": 100
		})
	}


    melting ('kubejs:gold_scrap', 'tconstruct:molten_gold', 90 )

    melting ('kubejs:nickel_scrap', 'tconstruct:molten_nickel', 90 )
    
    melting ('kubejs:tin_scrap', 'tconstruct:molten_tin', 90 )

    melting ('kubejs:aluminum_scrap', 'tconstruct:molten_aluminum', 90 )

    }
)