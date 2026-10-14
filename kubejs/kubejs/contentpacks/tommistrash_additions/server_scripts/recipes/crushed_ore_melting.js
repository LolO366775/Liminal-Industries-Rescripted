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
			"time": 80
		})
	}

    melting(
	'create:crushed_raw_copper', 
	'tconstruct:molten_copper', 
	90
	)

    melting(
	'create:crushed_raw_zinc', 
	'tconstruct:molten_zinc', 
	90
	)

    melting(
	'create:crushed_raw_iron', 
	'tconstruct:molten_iron', 
	90
	)
	//almost forgot this one and a friend had to remind me lmao
	melting(
	'create:crushed_raw_aluminum', 
	'tconstruct:molten_aluminum',
	90
	)
	//these are technically obtainable via reality frame in case you really really want to crush them????
	//free will is a wonderful thing, i guess
	melting(
	'create:crushed_raw_gold', 
	'tconstruct:molten_gold',
	90
	)
	melting(
	'create:crushed_raw_uranium', 
	'tconstruct:molten_uranium',
	90
	)
	melting(
	'create:crushed_raw_osmium', 
	'tconstruct:molten_osmium', 
	90
	)
    })