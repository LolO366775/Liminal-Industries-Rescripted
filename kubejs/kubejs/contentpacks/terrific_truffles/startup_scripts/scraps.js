
StartupEvents.registry('item', event => {

    event
    .create('kubejs:gold_scrap')
    .texture('kubejs:item/scrap_gold')
    .maxStackSize(64)

    event
    .create('kubejs:aluminum_scrap')
    .texture('kubejs:item/scrap_aluminum')
    .maxStackSize(64)
    
    event
    .create('kubejs:nickel_scrap')
    .texture('kubejs:item/scrap_nickel')
    .maxStackSize(64)
        
    event
    .create('kubejs:tin_scrap')
    .texture('kubejs:item/scrap_tin')
    .maxStackSize(64)

    event
    .create('kubejs:light_plate')
    .texture('kubejs:item/light_plate')
    .maxStackSize(64)

    event
    .create('kubejs:dark_plate')
    .texture('kubejs:item/dark_plate')
    .maxStackSize(64)
    
})



ItemEvents.modification(event => { 

    event.modify('kubejs:scrap', item => {
    item.nameKey = 'Iron Scrap'
  })
})
