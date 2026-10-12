StartupEvents.registry('item', event => {
  //register food function, nice little helper
  //foodDef is either:
  // food => {}
  // hs(hunger, sat)
  // f => {fb(f, hunger, sat, ||effect[[]], ||returnItem)}
  // prebuilt call (comfortshort, etc)
  function regFood(id, displayName, maxStack, foodDef) {
    var toReturn = event.create('foods/' + id)
      .displayName(displayName)
      .maxStackSize(maxStack)
      .food(foodDef)
    return toReturn
  }

  // ------------------------- FOODS ------------------------------
  //strcuture (id, display_name, max_stack, food stat)

  //misc
  regFood('spices', "Toasted Spices", 64, hs(1, 0))
  regFood('mystery_meat', "Mystery Meat", 64, hs(6, 4))
  regFood('cream', "Cream", 64, hs(1, 0))
  regFood('frosting', "Frsoting", 64, hs(2, 0))
  regFood('sprinkles', "Sprinkles", 64, hs(1, 0))
  regFood('candy_ham', "Candied Ham", 64, hs(10, 12))
  //the candy petals are an easteregg, pelase leave them in
  regFood('candy_petal', "§dCandied Petals", 64, hs(1, 0)).tooltip("§8QTpye's Favorite")
  regFood('lava_chicken', "Lava Chicken", 64, hs(4, 6))


  //berries <3
  regFood('berry_bowl', "Berry Bowl", 16, f => fb(f, 8, 8 * 0.4, [], 'minecraft:bowl'))
  regFood('berries_and_cream', "Berries And Cream", 16, comfortShort('minecraft:bowl')).tooltip('§9Comfort (01:00)')


  //pemmikan
  regFood('cured_meat', "Cured Meat", 64, hs(4, 2))
  regFood('dried_meat', "Dried Meat", 64, hs(6, 6))
  regFood('meat_floss', "Meat Floss", 64, hs(3, 3))
  regFood('pemmican', "Pemmican", 64, comfortShort()).tooltip('§9Comfort (01:00)')
  regFood('honey_pemmican', "Honeyed Pemmican", 64, comfortMed()).tooltip('§9Comfort (03:00)')

  //curry
  regFood('curry_paste', "Curry Paste", 64, hs(2, 0))
  regFood('curry_fish', "Fish Curry", 64, nourishLong('minecraft:bowl')).tooltip('§9Nourishment (05:00)')
  regFood('curry_mushroom', "Mushroom Curry", 64, nourishLong('minecraft:bowl')).tooltip('§9Nourishment (05:00)')
  regFood('curry_meat', "Meat Curry", 64, nourishLong('minecraft:bowl')).tooltip('§9Nourishment (05:00)')
  regFood('curry_vegetable', "Vegetable Curry", 64, nourishLong('minecraft:bowl')).tooltip('§9Nourishment (05:00)')
  regFood('curry_carpet', "Carpet Curry", 64, nourishShort('minecraft:bowl')).tooltip('§9Nourishment (01:00)')

  //on a stick (+ cramel)
  //- raosted carrot
  regFood('caramel_carrot', "Caramel Carrot", 16, comfortShort('minecraft:stick')).tooltip('§9Comfort (01:00)')
  regFood('caramel_apple', "Caramel Apple", 16, comfortShort('minecraft:stick')).tooltip('§9Comfort (01:00)')
  regFood('caramel_cookie', "Caramel Cookie", 16, f => fb(f, 5, 3, [], 'minecraft:stick'))
  regFood('caramel_onion', "Caramel Onion", 16, comfortShort('minecraft:stick')).tooltip('§9Comfort (01:00)')
  regFood('caramel_pumpkin', "Caramel Pumpkin", 16, comfortShort('minecraft:stick')).tooltip('§9Comfort (01:00)')
  regFood('caramel_raw_cod', "Caramel Raw Cod", 16, f => fb(f, 5, 3, [], 'minecraft:stick'))

  //bagels
  regFood('bagel_raw', "Raw Bagel", 64, f => fb(f, 2, 1, [['minecraft:hunger', 600, 0]]))
  regFood('bagel', "Bagel", 64, hs(5, 6))
  regFood('bagel_cream', "Cream Cheese Bagel", 64, f => fb(f, 4, 6, [['farmersdelight:comfort', 600, 0, 1]])).tooltip('§9Comfort (00:30)')

  //clay cookies
  regFood('wet_clay_cookie', "Wet Clay Cookie", 64, f => fb(f, 1, 0, [['minecraft:hunger', 600, 0, 1]]))
  regFood('clay_cookie', "Clay Cookie", 64, hs(1, 0))

  //cookies
  regFood('sugar_cookie', "Sugar Cookie", 64, hs(2, 0.4))
  regFood('frosted_sugar_cookie', "Frosted Cookie", 64, f => fb(f, 5, 4, [['farmersdelight:comfort', 600, 0, 1]])).tooltip('§9Comfort (00:30)')
  regFood('giant_pink_sugar_cookie', "§dGiant Pink Sugar Cookie", 16, comfortShort()).tooltip('§9Comfort (01:00)')
  regFood('jam_cookie', "Cookie Jam Sandwhich", 64, f => fb(f, 10, 10, [['farmersdelight:comfort', 600, 0, 1]])).tooltip('§9Comfort (00:30)')

  //fermented items
  regFood('fermented_beetroot_paste', "Fermented Beetroot Paste", 64, f => fb(f, 4, 6, [['minecraft:hunger', 600, 0, 1]]))
  regFood('fermented_berry_paste', "Fermented Berry Paste", 64, f => fb(f, 4, 6, [['minecraft:hunger', 600, 0, 1]]))
  regFood('fermented_honey_paste', "Fermented Honey Paste", 64, f => fb(f, 4, 6, [['minecraft:hunger', 600, 0, 1]]))
  regFood('fermented_rice_paste', "Fermented Rice Paste", 64, f => fb(f, 4, 6, [['minecraft:hunger', 600, 0, 1]]))
  regFood('fermented_wheat_paste', "Fermented Wheat Paste", 64, f => fb(f, 4, 6, [['minecraft:hunger', 600, 0, 1]]))

  regFood('fermented_beetroot_drink', "Muddy Beetroot Ale", 16, f => fb(f, 6, 8, [['minecraft:poison', 100, 0, 1], ['minecraft:nausea', 300, 0, 1]], 'minecraft:glass_bottle')).useAnimation('drink')
  regFood('fermented_berry_drink', "Sour Wine", 16, f => fb(f, 6, 8, [['minecraft:poison', 60, 0, 1], ['minecraft:nausea', 300, 0, 1]], 'minecraft:glass_bottle')).useAnimation('drink')
  regFood('fermented_honey_drink', "Mead", 16, f => fb(f, 6, 8, [['minecraft:poison', 20, 0, 1], ['minecraft:nausea', 300, 0, 1]], 'minecraft:glass_bottle')).useAnimation('drink')
  regFood('fermented_rice_drink', "Cloudy Soju", 16, f => fb(f, 6, 8, [['minecraft:poison', 40, 0, 1], ['minecraft:nausea', 300, 0, 1]], 'minecraft:glass_bottle')).useAnimation('drink')
  regFood('fermented_wheat_drink', "Chunky Beer", 16, f => fb(f, 6, 8, [['minecraft:poison', 80, 0, 1], ['minecraft:nausea', 300, 0, 1]], 'minecraft:glass_bottle')).useAnimation('drink')

  //breads
  regFood('bread_cocoa', "Chocolate Bread", 64, nourishMed()).tooltip('§9Nourishment (03:00)')
  regFood('bread_honey', "Honey Bread", 64, nourishMed()).tooltip('§9Nourishment (03:00)')
  regFood('bread_berries', "Berry Bread", 64, f => fb(f, 10, 10))
  regFood('bread_pumpkin', "Pumpkin Bread", 64, nourishShort()).tooltip('§9Nourishment (01:00)')
  regFood('bread_vegetable', "Vegetable Bread", 64, nourishShort()).tooltip('§9Nourishment (01:00)')
  regFood('bread_almond', "Almond Bread", 64, f => fb(f, 8, 8, [['corrosive_sculk:sculk_resistance', 6000, 0]])).tooltip('§9Skulk Resistance (05:00)')
  regFood('bread_strawberry', "Strawberry Bread", 64, f => fb(f, 8, 8, [['minecraft:regeneration', 600, 0]])).tooltip('§9Regeneration (00:30)')
})

//-------------------- helper functions ---------------------
/** advanced food builder
 * use as f => fb(f, hunger, sat, ||effect[], ||returnItem).otherfunc()
 * effect[] and return item are optinal
 * effect is an array of triplets like
 * [
 *  ['mod:effect', time, amp],
 *  ['mod:effect', time, amp]
 * ]
 * though can be left as [] and for no effects
*/
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
      if (heldItem.count == 1 && heldItem.getId() != "supplementaries:lunch_basket") {
        event.player.getSlot(event.player.selectedSlot).set(Item.of(returnItem, 1))
      } else {
        event.player.addItem(Item.of(returnItem, 1))
      }
    })
  }
  return refrence
}

//simple hunger sat food stat helper funciton
//cant be chained
function hs(hunger, sat) {
  return f => { fb(f, hunger, sat) }
}

//functions for food tiers (from farmers delight)
//cofort enables naterual health regen when out of saturation
//nourish prevent saturation loss from running, mining, etc, but not healing.
//short is 60 sec, med is 3 min, long is 5 min
//make sure to add tooltips for these
function comfortShort(returnItem = Item.empty) { return f => fb(f, 8, 8 * 2 * 0.7, [['farmersdelight:comfort', 1200, 0, 1]], returnItem) }
//.tooltip('§9Comfort (01:00)')
function nourishShort(returnItem = Item.empty) { return f => fb(f, 10, 10 * 2 * 0.7, [['farmersdelight:nourishment', 1200, 0, 1]], returnItem) }
//.tooltip('§9Nourishment (01:00)')
function comfortMed(returnItem = Item.empty) { return f => fb(f, 12, 12 * 2 * 0.6, [['farmersdelight:comfort', 3600, 0, 1]], returnItem) }
//.tooltip('§9Comfort (03:00)')
function nourishMed(returnItem = Item.empty) { return f => fb(f, 10, 10 * 2 * 0.6, [['farmersdelight:nourishment', 3600, 0, 1]], returnItem) }
//.tooltip('§9Nourishment (03:00)')
function comfortLong(returnItem = Item.empty) { return f => fb(f, 14, 14 * 2 * 0.75, [['farmersdelight:comfort', 6000, 0, 1]], returnItem) }
//.tooltip('§9Comfort (05:00)')
function nourishLong(returnItem = Item.empty) { return f => fb(f, 14, 14 * 2 * 0.75, [['farmersdelight:nourishment', 6000, 0, 1]], returnItem) }
//.tooltip('§9Nourishment (05:00)')