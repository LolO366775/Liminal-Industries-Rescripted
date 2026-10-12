LootJS.modifiers((event) => {
    event.addLootTableModifier("minecraft:gameplay/fishing").removeLoot(/.*/)
    event.addLootTableModifier("minecraft:gameplay/fishing/junk").removeLoot(/.*/)
    event.addLootTableModifier("minecraft:gameplay/fishing/fish").removeLoot(/.*/)
    event.addLootTableModifier("minecraft:gameplay/fishing/treasure").removeLoot(/.*/)
    event.addLootTableModifier("thermal:gameplay/fishing/deep").removeLoot(/.*/)
})

LootJS.modifiers((event) => {
    event.addLootTableModifier("minecraft:gameplay/fishing")
    .anyDimension("backrooms:poolrooms")
    .addWeightedLoot([
        Item.of("minecraft:cod").withChance(30),
        Item.of("minecraft:tropical_fish").withChance(60),
        Item.of("minecraft:pufferfish").withChance(10)
    ])
    event.addLootTableModifier("minecraft:gameplay/fishing")
    .anyDimension("minecraft:overworld")
    .addWeightedLoot([
        Item.of("minecraft:cod").withChance(60),
        Item.of("minecraft:salmon").withChance(40)
    ])

    event.addLootTableModifier("minecraft:gameplay/fishing/fish")
    .anyDimension("minecraft:overworld")
    .addWeightedLoot([
        Item.of("minecraft:cod").withChance(60),
        Item.of("minecraft:salmon").withChance(40)
    ])
    event.addLootTableModifier("minecraft:gameplay/fishing/fish")
    .anyDimension("backrooms:poolrooms")
    .addWeightedLoot([
        Item.of("minecraft:cod").withChance(30),
        Item.of("minecraft:tropical_fish").withChance(60),
        Item.of("minecraft:pufferfish").withChance(10)
    ])

    event.addLootTableModifier("minecraft:gameplay/fishing/junk")
    .anyDimension("minecraft:overworld")
    .addWeightedLoot([
        Item.of("kubejs:cut_carpet").withChance(32),
        Item.of("kubejs:wallpaper").withChance(32),
        Item.of("miners_delight:arthropod").withChance(4),
        Item.of("createaddition:biomass").withChance(32)
    ])
    event.addLootTableModifier("minecraft:gameplay/fishing/junk")
    .anyDimension("backrooms:poolrooms")
    .addWeightedLoot([
        Item.of("kubejs:pool_tile").withChance(30),
        Item.of("kubejs:pool_tile_golden").withChance(10),
        Item.of("createaddition:biomass").withChance(60)
    ])

    event.addLootTableModifier("thermal:gameplay/fishing/deep")
    .anyDimension("backrooms:poolrooms")
    .addWeightedLoot([
        Item.of("minecraft:cod").withChance(25),
        Item.of("minecraft:tropical_fish").withChance(40),
        Item.of("minecraft:pufferfish").withChance(5),
        Item.of("miners_delight:glow_squid").withChance(30)
    ])
    event.addLootTableModifier("thermal:gameplay/fishing/deep")
    .anyDimension("minecraft:overworld")
    .addWeightedLoot([
        Item.of("minecraft:cod").withChance(40),
        Item.of("minecraft:salmon").withChance(30),
        Item.of("miners_delight:squid").withChance(30)
    ])
})


ServerEvents.recipes(event => {
    event.recipes.create.haunting('thermal:sapphire', 'thermal:ruby')
    event.recipes.create.haunting('thermal:sapphire_block', 'thermal:ruby_block')
    event.remove({output: 'thermal:device_fisher'})
	event.shaped('thermal:device_fisher', [
		'LSL', 
		'PFI',
		'LSL'  
		],{
		L: 'botania:livingwood',
		F: 'create:fluid_tank',
		P: 'create:mechanical_pump',
		I: 'create:portable_fluid_interface',
		S: 'thermal:sapphire'
	})
    event.shapeless('supplementaries:antique_ink', ['thermal:sulfur','minecraft:ink_sac','minecraft:glass_bottle'])
})

