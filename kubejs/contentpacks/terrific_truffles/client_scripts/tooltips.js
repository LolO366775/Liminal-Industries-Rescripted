// Shared tooltip component
const TERRIFIC_TRUFFLES_TOOLTIP_BLOCK = Text.of('\uE000 ').white().append(Text.of("Terrific Truffles").color('#BF5208'))

// SIMPLE TOOLTIPS
ItemEvents.tooltip(event => {
  const REGISTER_SIMPLY = [
    'kubejs:crinkle_cutter',
    'kubejs:potato_chips',
    'kubejs:potato_slice',
    'kubejs:truffle_oil_bottle',
    'kubejs:tin_scrap',
    'kubejs:nickel_scrap',
    'kubejs:gold_scrap',
    'kubejs:aluminum_scrap',
    'kubejs:light_plate',
    'kubejs:dark_plate',
    'kubejs:carpet_truffle_piece',
    'kubejs:mechanical_toolbox'
  ]

  for (let itemId of REGISTER_SIMPLY) {
    event.addAdvanced(itemId, (item, advanced, text) => {
      text.add(1, TERRIFIC_TRUFFLES_TOOLTIP_BLOCK)
    })
  }
})

// SPECIAL TOOLTIPS
ItemEvents.tooltip(event => {
  event.addAdvanced('kubejs:carpet_truffle', (item, advanced, text) => {
    text.add(1, Text.of('Health Boost (1:00)').blue())
    text.add(2, Text.of('Invisibility (0:10)').blue())
    text.add(3, Text.of('Speed (0:10)').blue())
    text.add(4, Text.of('Speed (0:10)').blue())
    text.add(5, TERRIFIC_TRUFFLES_TOOLTIP_BLOCK)
  })

  event.addAdvanced('kubejs:bedazzled_truffle', (item, advanced, text) => {
    text.add(1, Text.of('Glowing (0:30)').blue())
    text.add(2, Text.of('Random Resistance (0:30)').lightPurple())
    text.add(3, TERRIFIC_TRUFFLES_TOOLTIP_BLOCK)
  })

  event.addAdvanced('kubejs:truffle_scented_potato_chips', (item, advanced, text) => {
    text.add(1, Text.of('Extends all effects duration by (0:10)').lightPurple())
    text.add(2, TERRIFIC_TRUFFLES_TOOLTIP_BLOCK)
  })
})