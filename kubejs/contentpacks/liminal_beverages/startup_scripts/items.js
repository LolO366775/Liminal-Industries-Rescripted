StartupEvents.registry('item', event => {
  event.create('carpet_loaf').food(food => {
    food
      .hunger(7)
      .saturation(3)
  })
event.create('carpet_dough')
})
StartupEvents.registry('item', event => {
  function regFood(id, displayName, maxStack, foodDef) {
    var toReturn = event.create(id)
      .displayName(displayName)
      .maxStackSize(maxStack)
      .food(foodDef)
    return toReturn
  }
  regFood('bootleg_vodka',"Bootleg Vodka", 16, f => fb(f, 0, 0, [['brewinandchewin:tipsy', 1200, 0], ['brewinandchewin:intoxication', 1200, 0], ['brewinandchewin:raging', 1200, 3], ['corrosive_sculk:sculk_resistance', 300, 0]], 'brewinandchewin:tankard')).useAnimation('drink')
  regFood('wallpaper_kombucha',"Wallpaper Kombucha", 16, f => fb(f, 0, 0, [['brewinandchewin:sweet_heart', 300, 4], ['corrosive_sculk:sculk_resistance', 300, 0]], 'minecraft:glass_bottle')).useAnimation('drink')
  regFood('carpet_kvass',"Carpet Kvass", 16, f => fb(f, 0, 0, [['minecraft:resistance', 1200, 0], ['corrosive_sculk:sculk_resistance', 300, 0, 3]], 'minecraft:glass_bottle')).useAnimation('drink')
  regFood('almond_beer',"Almond Beer", 16, f => fb(f, 0, 0, [['brewinandchewin:tipsy', 1200, 0], ['brewinandchewin:intoxication', 1200, 0], ['brewinandchewin:raging', 600, 1], ['corrosive_sculk:sculk_resistance', 600, 0]], 'brewinandchewin:tankard')).useAnimation('drink')
  regFood('flaming_ale',"Flaming Ale", 16, f => fb(f, 0, 0, [['brewinandchewin:tipsy', 1200, 0], ['brewinandchewin:intoxication', 1200, 0], ['minecraft:fire_resistance', 1200, 2]], 'brewinandchewin:tankard')).useAnimation('drink')
})

function fb(refrence, hunger, saturation, effects = [], returnItem = Item.empty) {
  refrence.hunger(hunger).saturation(saturation / hunger / 2)
  if (effects.length != 0) {
    effects.forEach(eff => {
      refrence.effect(eff[0], eff[1], eff[2], 1)
    })
  }
  if (returnItem != Item.empty) {
    refrence.eaten(event => {
      let heldItem = event.player.getMainHandItem()
      if (heldItem.count == 1) {
        event.player.getSlot(event.player.selectedSlot).set(Item.of(returnItem, 1))
      } else {
        event.player.addItem(Item.of(returnItem, 1))
      }
    })
  }
  return refrence
}

function hs(hunger, sat) {
  return f => { fb(f, hunger, sat) }
}