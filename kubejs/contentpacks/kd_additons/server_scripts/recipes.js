ServerEvents.recipes(event => {
  event.recipes.create.filling(
      [
        'minecraft:white_wool',
		'farmersdelight:straw',
		'minecraft:black_wool',
		'minecraft:brown_wool',
		'minecraft:red_wool',
		'minecraft:orange_wool',
		'minecraft:yellow_wool',
		'minecraft:lime_wool',
		'minecraft:blue_wool',
		'minecraft:purple_wool',
		'minecraft:pink_wool',
		'minecraft:feather',
		Item.of('minecraft:leather_leggings', '{Damage:0,display:{color:2460572}}'),
		'minecraft:leather_chestplate',
		],
[Fluid.of('minecraft:water', 500), 'kubejs:clothing_pile']
)

let scrap_outputs = [
	'2x kubejs:fluorescent_tube',
	'2x kubejs:scrap',
	 Item.of('kubejs:gold_scrap').withChance(0.35),
	'6x immersiveengineering:wire_copper'
]
let broken_scrap_outputs = [
	'2x kubejs:scrap',
	 Item.of('kubejs:gold_scrap').withChance(0.35),
	'6x immersiveengineering:wire_copper'
]

event.recipes.create.milling(
	scrap_outputs,
 	'kubejs:ceilling_scrap'
)
event.recipes.create.milling(
	scrap_outputs,
 	'kubejs:white_ceilling_scrap'
)
event.recipes.create.milling(
	broken_scrap_outputs,
 	'kubejs:broken_white_ceilling_scrap'
)
event.recipes.create.milling(
	broken_scrap_outputs,
 	'kubejs:broken_ceilling_scrap'
)

event.shaped('kubejs:ceilling_scrap_fixed',
  [
    ' A ',
    ' B ', 
    ' C '
  ],
  {
    A: 'minecraft:chain',
    B: 'kubejs:ceilling_scrap',
	C: 'minecraft:glowstone_dust'
  }
)
event.shaped('kubejs:ceilling_scrap',
  [
    'AAA',
    'BCB', 
    'DDD'
  ],
  {
    A: 'createaddition:copper_spool',
    B: 'create:iron_sheet',
	C: 'ae2:printed_logic_processor',
	D: 'kubejs:fluorescent_tube'
  }
)
event.shapeless('kubejs:ceilling_scrap',
  [
    'kubejs:ceilling_scrap_fixed'
  ]
)
 /*   event.recipes.thermal.crystallizer(
        'kubejs:rose_quartz_glass',
        ['mekanism:dust_quartz', 'minecraft:glass_pane', Fluid.of('immersiveengineering:redstone_acid')]
    ).energy(500)
*/
event.recipes.create.item_application('kubejs:ceilling_lamp', ['kubejs:ceilling_socket', 'kubejs:ceilling_scrap']).id('kubejs:lamp_screwing_manual_only')
event.recipes.create.item_application('kubejs:ceilling_lamp2', ['kubejs:ceilling_socket', 'kubejs:white_ceilling_scrap']).id('kubejs:lamp2_screwing_manual_only')
event.recipes.create.item_application('kubejs:ceilling_lamp_broken', ['kubejs:ceilling_socket', 'kubejs:broken_ceilling_scrap']).id('kubejs:broken_lamp_screwing_manual_only')
event.recipes.create.item_application('kubejs:ceilling_lamp2_broken', ['kubejs:ceilling_socket', 'kubejs:broken_white_ceilling_scrap']).id('kubejs:broken_lamp2_screwing_manual_only')
event.recipes.create.item_application('kubejs:crimsite_lamp', ['kubejs:ceilling_socket', 'kubejs:crimsite_lamp_falling']).id('kubejs:crimsite_lamp_screwing_manual_only')
event.recipes.create.item_application('kubejs:cable_nest', ['kubejs:ceilling_socket', 'minecraft:bone_meal']).id('kubejs:socket_infesting_manual_only')
event.recipes.create.item_application('kubejs:crimsite_lamp_falling', ['kubejs:ceilling_scrap', 'create:electron_tube'])
event.recipes.create.item_application('kubejs:ceilling_scrap', ['kubejs:crimsite_lamp_falling', 'kubejs:fluorescent_tube'])
let SCRAP_TYPES = {
	iron: "kubejs:scrap",
	tin: "kubejs:scrap_tin",
	gold: "kubejs:scrap_gold",
	nickel: "kubejs:scrap_nickel",
	aluminum: "kubejs:scrap_aluminum",
}
let truffle_oil_disassembly = (Input, Output) => {
	event.recipes.create.mixing(
		Output.concat([
			Fluid.of('immersiveengineering:creosote'),
			'kubejs:mechanical_toolbox',
		]),
		[
			Fluid.of('kubejs:truffle_oil'),
			'kubejs:mechanical_toolbox'
		].concat(Input),

	).heated().id("terrific_truffle_".concat(Input[0]))

	event.recipes.create.mixing(
		Output.concat([
			'kubejs:mechanical_toolbox',
		]),
		[
			Fluid.of('kubejs:truffle_oil', 250),
			'kubejs:mechanical_toolbox'
		].concat(Input),

	).superheated().id("terrific_truffle_superheat_".concat(Input[0]))
}
truffle_oil_disassembly( // Ceiling Scrap
	[
		'kubejs:ceilling_scrap'
	],
	[
		'kubejs:gold_scrap',
		Item.of('kubejs:scrap', 6),
		Item.of('immersiveengineering:wire_copper', 12),
		Item.of('kubejs:fluorescent_tube', 3),
		'minecraft:glass_pane'
	]
)
truffle_oil_disassembly(
	[
		'kubejs:white_ceilling_scrap'
	],
	[
		'kubejs:gold_scrap',
		Item.of('kubejs:scrap', 6),
		Item.of('immersiveengineering:wire_copper', 12),
		Item.of('kubejs:fluorescent_tube', 3),
		'minecraft:glass_pane'
	]
)
truffle_oil_disassembly(
	[
		'kubejs:broken_ceilling_scrap'
	],
	[
		'kubejs:gold_scrap',
		Item.of('kubejs:scrap', 6),
		Item.of('immersiveengineering:wire_copper', 12),
		Item.of('kubejs:fluorescent_tube', 2),
		'minecraft:glass_pane'
	]
)
truffle_oil_disassembly(
	[
		'kubejs:broken_white_ceilling_scrap'
	],
	[
		'kubejs:gold_scrap',
		Item.of('kubejs:scrap', 6),
		Item.of('immersiveengineering:wire_copper', 12),
		Item.of('kubejs:fluorescent_tube', 2),
		'minecraft:glass_pane'
	]
)
truffle_oil_disassembly( // Washing Machine
	[
		'kubejs:washing_machine'
	],
	[
		'immersiveengineering:metal_barrel',
		Item.of('kubejs:scrap', 10),
		Item.of('kubejs:aluminum_scrap', 4),
		'immersiveengineering:component_electronic',
		'create:shaft',
		'kubejs:light_plate'
	]
)
})