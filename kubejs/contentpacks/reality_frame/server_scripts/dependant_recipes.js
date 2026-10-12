ServerEvents.recipes(event => {

	event.remove({output: 'ae2:condenser'})
	event.shaped('ae2:condenser', [
		'ECE', 
		'BAB',
		'EDE'  
		],{
		A: 'mekanism:steel_casing', 
		B: 'mekanism:advanced_control_circuit',
		C: 'enderio:ender_resonator',
		D: 'mekanism:pressure_disperser',
		E: 'kubejs:reality_alloy'
	})

	let empowering = (output, Input, Input1, Input2, Input3, Input4, time, energy, colour) => {
    event.custom({
		"type": "actuallyadditions:empowering",
		"base": {
		  "item": Input
		},
		"color": colour,
		"energy": energy,
		"modifiers": [
		  {
			"item": Input1
		  },
		  {
			"item": Input2
		  },
		  {
			"item": Input3
		  },
		  {
			"item": Input4
		  }
		],
		"result": {
		  "item": output
		},
		"time": time
	  })
	}
	empowering(
		'kubejs:reality_charge',
		'kubejs:reality_charge_empty',

		'enderio:confusing_powder',
		'enderio:confusing_powder', 
		'enderio:confusing_powder',
		'enderio:confusing_powder',
		2000, 100000, 5439613
	)
	
	event.custom({
    "type": "immersiveengineering:arc_furnace",
    "additives": [
      {
        "item": "actuallyadditions:empowered_enori_crystal"
      },
      {
        "item": "botania:terrasteel_nugget"
      },
      {
        "item": "enderio:confusing_powder"
      }
    ],
    "energy": 51200,
    "input": {
      "item": "thermal:lead_ingot"
    },
    "results": [
      {
        "base_ingredient": {
          "item": "kubejs:reality_alloy"
        },
        "count": 3
      }
    ],
    "slag": {
        "item": "thermal:rich_slag"
    },
    "time": 100
  })
})