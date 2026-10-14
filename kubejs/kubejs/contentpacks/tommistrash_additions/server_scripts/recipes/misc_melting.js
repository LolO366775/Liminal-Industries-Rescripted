    ServerEvents.recipes(event => {
	let melting = (Input, Output, Amount, Time) => {
		event.custom({ "type": "tconstruct:melting",
  "ingredient": {
    "item": Input
  },
  "result": {
    "amount": Amount,
    "fluid": Output
  },
  "temperature": 800,
  "time": Time
		})
	}

    melting(
	'farmersdelight:skillet', 
	'tconstruct:molten_iron', 
	360,
	70
	)
    melting(
	'supplementaries:gold_door', 
	'tconstruct:molten_gold', 
	180,
	35
	)
    melting(
	'supplementaries:gold_trapdoor', 
	'tconstruct:molten_gold', 
	360,
	70
	)
    melting(
	'immersiveengineering:coil_lv', 
	'tconstruct:molten_copper', 
	1440,
	150
	)
    melting(
	'immersiveengineering:coil_mv', 
	'tconstruct:molten_electrum', 
	1440,
	150
	)
    /*melting(
	'immersiveengineering:coil_hv', 
	'tconstruct:molten_steel', 
	720,
	150
	)*/
		event.custom({ "type": "tconstruct:melting",
  "ingredient": {
    "tag": "create_vibrant_vaults:vaults"
  },
  "result": {
    "amount": 90,
    "fluid": 'tconstruct:molten_iron'
  },
  "temperature": 800,
  "time": 200
		})
})