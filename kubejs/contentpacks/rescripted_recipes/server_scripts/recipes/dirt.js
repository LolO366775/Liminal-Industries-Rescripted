ServerEvents.recipes(event => {
    event.custom({
            "type": "immersiveengineering:squeezer",
            "energy": 19200,
            "input": {
              "basePredicate": {
                "tag": "forge:dusts/coal_coke"
              },
              "count": 8
            },
            "result": {
              "tag": "forge:dusts/hop_graphite"
            }
          })

    let brushing_on_cutting_board = (input,brush,output) => {
      event.recipes.farmersdelight.cutting(
			input,
			brush,
      output,
			"minecraft:item.brush.brushing.generic")
    }
    let carpet_dust_outputs = [
      Item.of("minecraft:wheat_seeds").withChance(0.5),
      Item.of("minecraft:beetroot_seeds").withChance(0.5),
      Item.of("minecraft:melon_seeds").withChance(0.5),
      Item.of("minecraft:pumpkin_seeds").withChance(0.5)
    ]
    let dirt_outputs = [
      Item.of("farmersdelight:cabbage_seeds").withChance(0.5),
      Item.of("farmersdelight:tomato_seeds").withChance(0.5),
      Item.of("immersiveengineering:seed").withChance(0.5),
      Item.of("supplementaries:flax_seeds").withChance(0.5)
    ]
    let mud_outputs = [
      Item.of("minecraft:potato").withChance(0.5),
      Item.of("farmersdelight:onion").withChance(0.5),
      Item.of("minecraft:carrot").withChance(0.5),
      Item.of("farmersdelight:rice").withChance(0.5)
    ]
    brushing_on_cutting_board("kubejs:carpet_dust","minecraft:brush",carpet_dust_outputs)
    brushing_on_cutting_board("minecraft:dirt","minecraft:brush",dirt_outputs)
    brushing_on_cutting_board("minecraft:mud","minecraft:brush",mud_outputs)
    brushing_on_cutting_board("kubejs:carpet_dust","kubejs:straw_brush",carpet_dust_outputs)
    brushing_on_cutting_board("minecraft:dirt","kubejs:straw_brush",dirt_outputs)
    brushing_on_cutting_board("minecraft:mud","kubejs:straw_brush",mud_outputs)
    brushing_on_cutting_board("kubejs:carpet_dust","kubejs:diamond_brush",carpet_dust_outputs)
    brushing_on_cutting_board("minecraft:dirt","kubejs:diamond_brush",dirt_outputs)
    brushing_on_cutting_board("minecraft:mud","kubejs:diamond_brush",mud_outputs)
})