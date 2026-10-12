ServerEvents.recipes(event => {
    let actually_loaded = Platform.isLoaded("actuallyadditions")
    let thermal_loaded = Platform.isLoaded("thermal")
    let ae2_loaded = Platform.isLoaded("ae2")
    let neapolitan_loaded = Platform.isLoaded("neapolitan")
    let beachparty_loaded = Platform.isLoaded("beachparty")
    let supplementaries_loaded = Platform.isLoaded("supplementaries")

    let mana_infusion = (Input, Output, Mana) => {
        event.recipes.botania.mana_infusion(Output, Input, Mana)
    }

    event.replaceInput({ output: 'botania:apothecary_default' }, '#botania:petals', 'minecraft:cobblestone_slab')
    event.remove({id: 'botania:runic_altar'})
    event.remove({id: 'botania:mushroom_stew'})

    event.remove({output: 'botania:mana_spreader'})
    event.shaped('botania:mana_spreader', [
		'AAA', 
		'BC ',
		'AAA'  
		],{
		  A: 'botania:livingwood', 
		  B: 'minecraft:gold_ingot',
          C: '#botania:petals'
	})

    event.remove({output: 'botania:runic_altar'})
    event.shaped('botania:runic_altar', [
		'   ', 
		'ABA',
		'AAA'  
		],{
		  A: 'botania:livingrock', 
		  B: 'botania:manasteel_ingot'
	})

    event.remove({output: 'botania:diluted_pool'})
    event.shaped('botania:diluted_pool', [
		'   ', 
		'A A',
		'ABA'  
		],{
		  A: 'botania:livingrock', 
		  B: 'eidolon:pewter_ingot'
	})

    event.remove({id: 'botania:pure_daisy/livingwood'})
    event.recipes.botania.pure_daisy('botania:livingwood', '#forge:treated_wood')

    let runic_altar = (Input1, Input2, Input3, Input4, Input5, Mana, Output) => {
    event.recipes.botania.runic_altar(Output, [Input1, Input2, Input3, Input4, Input5], Mana)
    }

    if (actually_loaded) {
        event.remove({output: 'botania:rune_water'})
        runic_altar(
            "botania:mana_powder", 
            "botania:manasteel_ingot", 
            "minecraft:cod",
            "minecraft:sugar_cane",
            "actuallyadditions:water_bowl",
            5200,
            "2x botania:rune_water"
        )        
    }
    if (ae2_loaded && thermal_loaded) {
        mana_infusion(
            'thermal:quartz_dust',
            'ae2:certus_quartz_dust',
            200
        )
    }
    if (ae2_loaded && thermal_loaded) {
        mana_infusion(
            'thermal:quartz_dust',
            'ae2:certus_quartz_dust',
            200
        )
    }
    if (neapolitan_loaded && beachparty_loaded) {
        mana_infusion(
            'beachparty:coconut_open',
            '2x beachparty:coconut_open',
            600
        )
        mana_infusion(
            'neapolitan:banana_stalk',
            'beachparty:palm_log',
            200
        )
        mana_infusion(
            'beachparty:palm_log',
            'neapolitan:banana_stalk',
            200
        )
        mana_infusion(
            'neapolitan:carved_banana_stalk',
            'beachparty:stripped_palm_log',
            200
        )
        mana_infusion(
            'beachparty:stripped_palm_log',
            'neapolitan:carved_banana_stalk',
            200
        )
        mana_infusion(
            'beachparty:thatch',
            'neapolitan:frond_thatch',
            200
        )
        mana_infusion(
            'beachparty:thatch_stairs',
            'neapolitan:frond_thatch_stairs',
            200
        )
        mana_infusion(
            'beachparty:thatch_slab',
            'neapolitan:frond_thatch_slab',
            200
        )
        mana_infusion(
            'neapolitan:frond_thatch',
            'beachparty:thatch',
            200
        )
        mana_infusion(
            'neapolitan:frond_thatch_stairs',
            'beachparty:thatch_stairs',
            200
        )
        mana_infusion(
            'neapolitan:frond_thatch_slab',
            'beachparty:thatch_slab',
            200
        )
    }
    if (neapolitan_loaded) {
        event.remove({id: 'botania:mana_infusion/cocoa_beans_to_wheat_seeds'})
        mana_infusion(
            'minecraft:cocoa_beans',
            'neapolitan:adzuki_beans',
            200
        )
    }
    if (supplementaries_loaded) {
        event.remove({output: 'botania:fertilizer'})
        event.recipes.botania.petal_apothecary('botania:fertilizer', [
            'supplementaries:ash',
            '#forge:dyes',
            '#forge:dyes'
        ])
        event.remove({type: 'minecraft:crafting_shapeless', output: 'thermal:redstone_mushroom_spores'})
        event.recipes.botania.petal_apothecary('thermal:redstone_mushroom_spores', [
            '#botania:petals/red',
            'minecraft:sweet_berries',
            'supplementaries:ash'
        ])
        event.remove({type: 'minecraft:crafting_shapeless', output: 'thermal:gunpowder_mushroom_spores'})
        event.recipes.botania.petal_apothecary('thermal:gunpowder_mushroom_spores', [
            '#botania:petals/gray',
            'minecraft:gunpowder',
            'supplementaries:ash'
        ])
        event.recipes.botania.petal_apothecary('minecraft:red_mushroom', [
            '#botania:petals/red',
            'minecraft:bone_meal',
            'supplementaries:ash',
            'botania:mana_powder'
        ])
        event.recipes.botania.petal_apothecary('minecraft:brown_mushroom', [
            '#botania:petals/brown',
            'minecraft:bone_meal',
            'supplementaries:ash',
            'botania:mana_powder'
        ])
    }
    if (thermal_loaded) {
        event.recipes.botania.petal_apothecary('minecraft:bamboo', [
            'botania:rune_earth',
            'botania:livingwood_twig',
            'minecraft:sugar_cane',
            '#botania:petals/lime',
            '#botania:petals/lime',
            'thermal:rubber'
        ])
        event.shapeless('3x minecraft:redstone', [
		    'thermal:redstone_mushroom_spores'
	    ])
	    event.recipes.create.mixing('3x minecraft:redstone', [
		    'thermal:redstone_mushroom_spores'
	    ])
        event.replaceOutput(
            {id:"thermal:machines/centrifuge/centrifuge_redstone_mushroom"},
  		    "thermal:redstone_mushroom_spores",
  		    "3x thermal:redstone_mushroom_spores"
        )
        event.replaceOutput(
            {id:"thermal:machines/insolator/insolator_redstone_mushroom"},
  		    "thermal:redstone_mushroom_spores",
  		    "3x thermal:redstone_mushroom_spores"
        )
        event.remove({type: 'minecraft:crafting_shapeless', output: 'thermal:glowstone_mushroom_spores'})
        event.recipes.botania.petal_apothecary('thermal:glowstone_mushroom_spores', [
            '#botania:petals/yellow',
            'minecraft:gold_nugget',
            'thermal:sulfur_dust'
        ])
        event.remove({type: 'minecraft:crafting_shapeless', output: 'minecraft:slime_ball'})
        event.remove({type: 'minecraft:crafting_shapeless', output: 'thermal:slime_mushroom_spores'})
        event.recipes.botania.petal_apothecary('thermal:slime_mushroom_spores', [
            '#botania:petals/lime',
            'minecraft:sugar',
            'kubejs:carpet_dust'
        ])
        event.remove({type: 'minecraft:crafting_shapeless', output: 'thermal:gunpowder_mushroom_spores'})
    }
    event.recipes.botania.petal_apothecary('minecraft:sugar_cane', [
        '#botania:petals/green',
        '#botania:petals/lime',
        'neapolitan:vanilla_pods',
        'minecraft:paper'
    ])
})