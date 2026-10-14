StartupEvents.registry('item', event => {

    event
    .create('kubejs:carpet_truffle')
    .texture('kubejs:item/carpet_truffle')
    .maxStackSize(16)
    .food(food => {
        food
        .hunger(5)
        .effect('minecraft:health_boost', 1200, 0 , 1)
        .effect('minecraft:invisibility', 200, 0 , 1)
        .effect('minecraft:speed', 200, 0 , 1)
        .saturation(0.5)
        .meat(false)
        .alwaysEdible(true)
        .fastToEat(true)
    })

    event.create('kubejs:carpet_truffle_piece')
    .texture('kubejs:item/carpet_truffle_piece')
    .maxStackSize(64)

    event.create('kubejs:bedazzled_truffle')
    .texture('kubejs:item/bedazzled_truffle')
    .maxStackSize(16).food(food => {
        food
        .hunger(0)
        .meat(false)
        .alwaysEdible(true)
    })

    event.create('kubejs:crinkle_cutter')
    .texture('kubejs:item/crinkle_cutter')
    .maxStackSize(1)
    .maxDamage(0)

    event.create('kubejs:potato_slice')
    .texture('kubejs:item/potato_slice')
    .maxStackSize(64)
    .food(food => {
        food
        .hunger(1)
        .meat(false)
        .alwaysEdible(true)
        .fastToEat(true)
    })

    event.create('kubejs:potato_chips')
    .texture('kubejs:item/potato_chips')
    .maxStackSize(64)
    .food(food => {
        food
        .hunger(2)
        .saturation(0.5)
        .meat(false)
        .alwaysEdible(true)
        .fastToEat(true)
    })

    event.create('kubejs:truffle_scented_potato_chips')
    .texture('kubejs:item/truffle_scented_potato_chips')
    .maxStackSize(64)
    .food(food => {
        food
        .hunger(2)
        .saturation(0.5)
        .meat(false)
        .alwaysEdible(true)
        .fastToEat(true)
    })

    
})

/*StartupEvents.registry('mob_effect', event => {
  event.create('kubejs:recently_found_truffle') // Create the effect under "kubejs:custom_effect"
    .beneficial() // Categorizes the Effect as Beneficial.
})*/


ItemEvents.modification(event => { 

    event.modify('endrem:undead_soul', item => {
    item.nameKey = 'Liminal Soul'
  })
})