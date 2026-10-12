let SCRAP_TYPES = {
	iron: "kubejs:scrap",
	tin: "kubejs:scrap_tin",
	gold: "kubejs:scrap_gold",
	nickel: "kubejs:scrap_nickel",
	aluminum: "kubejs:scrap_aluminum",
}


ServerEvents.recipes(event => {

let TOOLBOX_SOURCES = [
    {
        ingredient: { tag: "create:toolboxes" },
        id: "toolbox"
    },
    {
        ingredient: { tag: "refurbished_furniture:coolers" },
        id: "cooler"
    }
]

TOOLBOX_SOURCES.forEach(source => {
    event.custom({
        type: "immersiveengineering:no_container_item",
        baseRecipe: {
            type: "minecraft:crafting_shapeless",
            category: "misc",

            ingredients: [
                { item: "thermal:flux_saw" },
                { item: "kubejs:crowbar" },
                { item: "create:wrench" },
                { item: "immersiveengineering:wirecutter" },
                { item: "immersiveengineering:hammer" },
                { item: "immersiveengineering:screwdriver" },
                { tag: "forge:dyes/red" },
                { item: "minecraft:nether_brick" },
                source.ingredient
            ],

            result: {
                item: "kubejs:mechanical_toolbox"
            }
        }
    }).id(`kubejs:mechanical_toolbox_from_${source.id}`)
})

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

truffle_oil_disassembly( // LIGHT FRIDGE
	[
		'refurbished_furniture:light_fridge'
	],
	[
		'immersiveengineering:component_electronic',
		'thermal:blizz_powder',
		Item.of('kubejs:scrap', 24),
		'kubejs:light_plate'
	]
)

truffle_oil_disassembly( // DARK FRIDGE
	[
		'refurbished_furniture:dark_fridge'
	],
	[
		'immersiveengineering:component_electronic',
		'thermal:blizz_powder',
		Item.of('kubejs:scrap', 24),
		'kubejs:dark_plate'
	]
)

truffle_oil_disassembly( // MINI FRIDGE
	[
		'beachparty:mini_fridge'
	],
	[
		'immersiveengineering:component_electronic',
		'thermal:blizz_powder',
		Item.of('kubejs:scrap', 12),
		'kubejs:dark_plate'
	]
)

truffle_oil_disassembly( // LIGHT STOVE
	[
		'refurbished_furniture:light_stove'
	],
	[
		'immersiveengineering:component_electronic',
		'minecraft:blaze_powder',
		Item.of('kubejs:scrap', 10),
		'kubejs:light_plate'
	]
)

truffle_oil_disassembly( // DARK STOVE
	[
		'refurbished_furniture:dark_stove'
	],
	[
		'immersiveengineering:component_electronic',
		'minecraft:blaze_powder',
		Item.of('kubejs:scrap', 10),
		'kubejs:dark_plate'
	]
)

truffle_oil_disassembly( // LIGHT MICROWAVE
	[
		'refurbished_furniture:light_microwave'
	],
	[
		'immersiveengineering:component_electronic',
		'thermal:blitz_powder',
		Item.of('kubejs:tin_scrap', 10),
		'kubejs:light_plate'
	]
)

truffle_oil_disassembly( // DARK MICROWAVE
	[
		'refurbished_furniture:dark_microwave'
	],
	[
		'immersiveengineering:component_electronic',
		'thermal:blitz_powder',
		Item.of('kubejs:tin_scrap', 10),
		'kubejs:dark_plate'
	]
)


truffle_oil_disassembly( // LIGHT TOASTER
	[
		'refurbished_furniture:light_toaster'
	],
	[
		'immersiveengineering:component_electronic',
		'thermal:blitz_powder',
		Item.of('kubejs:nickel_scrap', 10),
		'kubejs:light_plate'
	]
)

truffle_oil_disassembly( // DARK TOASTER
	[
		'refurbished_furniture:dark_toaster'
	],
	[
		'immersiveengineering:component_electronic',
		'thermal:blitz_powder',
		Item.of('kubejs:nickel_scrap', 10),
		'kubejs:dark_plate'
	]
)

truffle_oil_disassembly( // RECYCLE BIN
	[
		'refurbished_furniture:recycle_bin'
	],
	[
		Item.of('kubejs:error_item').withChance(0.1),
		Item.of('actuallyadditions:void_crystal').withChance(0.1),
		Item.of('kubejs:aluminum_scrap', 5),
		'minecraft:cactus',
	]
)

truffle_oil_disassembly( // LIGHT LIGHTSWITCH
	[
		'refurbished_furniture:light_lightswitch'
	],
	[
		'immersiveengineering:component_electronic',
		'thermal:blitz_powder',
		Item.of('kubejs:tin_scrap', 10),
		'kubejs:light_plate'
	]
)

truffle_oil_disassembly( // DARK LIGHTSWITCH
	[
		'refurbished_furniture:dark_lightswitch'
	],
	[
		'immersiveengineering:component_electronic',
		'thermal:blitz_powder',
		Item.of('kubejs:tin_scrap', 10),
		'kubejs:dark_plate'
	]
)

truffle_oil_disassembly( // LIGHT CIRCUIT BREAKER
	[
		'cfm_wap:light_circuit_breaker'
	],
	[
		Item.of('immersiveengineering:component_electronic', 2),
		Item.of('thermal:blitz_powder', 3),
		Item.of('kubejs:gold_scrap', 25),
		Item.of('kubejs:light_plate', 2)
	]
)

truffle_oil_disassembly( // DARK CIRCUIT BREAKER
	[
		'cfm_wap:dark_circuit_breaker'
	],
	[
		Item.of('immersiveengineering:component_electronic', 2),
		Item.of('thermal:blitz_powder', 3),
		Item.of('kubejs:gold_scrap', 25),
		Item.of('kubejs:dark_plate', 2)
	]
)

truffle_oil_disassembly( // LIGHT CIRCUIT BREAKER
	[
		'refurbished_furniture:light_electricity_generator'
	],
	[
		Item.of('ae2:charged_certus_quartz_crystal', 1),
		Item.of('thermal:blitz_powder', 1),
		Item.of('kubejs:gold_scrap', 10),
		Item.of('kubejs:light_plate', 1)
	]
)

truffle_oil_disassembly( // LIGHT GENRATOR
	[
		'refurbished_furniture:dark_electricity_generator'
	],
	[
		Item.of('ae2:charged_certus_quartz_crystal', 1),
		Item.of('thermal:blitz_powder', 1),
		Item.of('kubejs:gold_scrap', 10),
		Item.of('kubejs:dark_plate', 1)
	]
)

}
)


/*

	melting(
		'farmersdelight:cooking_pot', 
		'tconstruct:molten_iron', 
		450
	)

	melting(
		'supplementaries:speaker_block', 
		'tconstruct:molten_emerald', 
		100
	)

	melting(
		'supplementaries:clock_block', 
		'tconstruct:molten_gold', 
		360
	)

	melting(
		'create:cuckoo_clock', 
		'tconstruct:molten_gold', 
		360
	)

	melting(
		'thermal:item_buffer', 
		'tconstruct:molten_tin', 
		360
	)

	melting(
		'supplementaries:spring_launcher', 
		'tconstruct:earth_slime', 
		2250
	)

	melting(
		'refurbished_furniture:dark_stove', 
		'tconstruct:molten_iron', 
		900
	)

	melting(
		'refurbished_furniture:dark_microwave', 
		'tconstruct:molten_tin', 
		900
	)

	melting(
		'refurbished_furniture:dark_toaster', 
		'tconstruct:molten_nickel', 
		900
	)

	melting(
		'refurbished_furniture:dark_electricity_generator', 
		'tconstruct:molten_gold', 
		900
	)

	melting(
		'refurbished_furniture:dark_fridge', 
		'tconstruct:molten_iron', 
		2160
	)

*/

