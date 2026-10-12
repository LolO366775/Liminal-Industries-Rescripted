ServerEvents.recipes(event => {
	event.remove({output: 'simpleradio:copper_wire'})
	event.custom({
		"type":"createaddition:rolling",
		"input": {
	      	"item": "immersiveengineering:wire_copper"
		},
		"result": {
			"item": "simpleradio:copper_wire",
			"count": 1
		}
	})
	event.custom({
		"type":"createaddition:rolling",
		"input": {
	      	"item": "simpleradio:copper_wire"
		},
		"result": {
			"item": "immersiveengineering:wire_copper",
			"count": 1
		}
	})
	event.custom({
		"type":"createaddition:rolling",
		"input": {
	      	"item": "create:fluid_pipe"
		},
		"result": {
			"item": "simpleradio:copper_wire",
			"count": 2
		}
	})
	event.remove({output: 'simpleradio:spuddie_talkie'})
	event.shapeless("simpleradio:spuddie_talkie", ["kubejs:scrap","simpleradio:copper_wire","minecraft:potato"])
    event.remove({output: 'simpleradio:listener_module'})
	event.shapeless("simpleradio:listener_module", ["kubejs:scrap","simpleradio:copper_wire","#minecraft:wool"])
	event.remove({output: 'simpleradio:speaker_module'})
	event.shapeless("simpleradio:speaker_module", ["kubejs:scrap","simpleradio:copper_wire","minecraft:note_block"])
	event.remove({output: 'simpleradio:receiving_module'})
	event.shapeless("simpleradio:receiving_module", ["kubejs:scrap","simpleradio:copper_wire","minecraft:amethyst_shard"])
	event.remove({output: 'simpleradio:transmitting_module'})
	event.shapeless("simpleradio:transmitting_module", ["kubejs:scrap","simpleradio:copper_wire","minecraft:feather"])
	event.remove({output: 'simpleradio:transceiver'})
	event.shapeless("simpleradio:transceiver", ["kubejs:battery","kubejs:scrap","simpleradio:listener_module","simpleradio:receiving_module","simpleradio:speaker_module","simpleradio:transmitting_module"])

	event.recipes.create.milling([
		Item.of('simpleradio:listener_module').withChance(0.25),
		Item.of('simpleradio:receiving_module').withChance(0.25),
		Item.of('simpleradio:speaker_module').withChance(0.25),
		Item.of('simpleradio:transmitting_module').withChance(0.25)
	],
	'kubejs:backrooms_speaker_light'
	)
	event.recipes.create.milling([
		Item.of('simpleradio:listener_module').withChance(0.25),
		Item.of('simpleradio:receiving_module').withChance(0.25),
		Item.of('simpleradio:speaker_module').withChance(0.25),
		Item.of('simpleradio:transmitting_module').withChance(0.25)
	],
	'kubejs:backrooms_speaker_dark'
	)
	event.recipes.create.milling([
		Item.of('kubejs:scrap').withChance(0.75),
		Item.of('simpleradio:copper_wire').withChance(0.75)
	],
	'simpleradio:listener_module'
	)
	event.recipes.create.milling([
		Item.of('kubejs:scrap').withChance(0.75),
		Item.of('simpleradio:copper_wire').withChance(0.75)
	],
	'simpleradio:speaker_module'
	)
	event.recipes.create.milling([
		Item.of('kubejs:scrap').withChance(0.75),
		Item.of('simpleradio:copper_wire').withChance(0.75),
		Item.of('minecraft:amethyst_shard')
	],
	'simpleradio:receiving_module'
	)
	event.recipes.create.milling([
		Item.of('kubejs:scrap').withChance(0.75),
		Item.of('simpleradio:copper_wire').withChance(0.75)
	],
	'simpleradio:transmitting_module'
	)
})