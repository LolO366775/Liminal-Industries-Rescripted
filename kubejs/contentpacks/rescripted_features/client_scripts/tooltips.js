ItemEvents.tooltip(event => {
  event.add(
    [
      'beachparty:beach_hat', 
      'beachparty:sunglasses', 
      'beachparty:trunks', 
      'beachparty:bikini', 
      'beachparty:crocs', 
      'beachparty:swim_wings', 
      'beachparty:rubber_ring_blue', 
      'beachparty:rubber_ring_pink', 
      'beachparty:rubber_ring_stripped', 
      'beachparty:rubber_ring_axolotl', 
      'beachparty:rubber_ring_pelican'
    ],
    Text.of("This item is damaged, all magical properties are mundane").darkRed()
  )
  event.add(
    [
      'botania:tiny_potato'
    ],
    Text.of("Do not ponder this item, it will crash the game!").darkRed()
  )
  event.add(
    [
      'kubejs:foods/frosting'
    ],
    Text.of('Not to be confused with normal "Frosting"').darkPurple().italic()
  )
  event.add(
    [
      'kubejs:arrow1_sign_item',
      'kubejs:arrow2_sign_item',
      'kubejs:liminal_warning_sign_item',
      'kubejs:liminal_warning2_sign_item',
      'kubejs:box_sign_item',
      'kubejs:infinity_sign_item',
      'kubejs:skull_sign_item',
      'kubejs:stop_sign_item',
      'kubejs:explantion1_sign_item',
      'kubejs:explantion2_sign_item',
      'kubejs:unknown1_item',
      'kubejs:cross_sign_item',
      'kubejs:exit_sign_item',
      'kubejs:exit_sign2_item',
      'kubejs:left_arrow_sign_item',
      'kubejs:right_arrow_sign_item',
      'kubejs:nowhere_sign_item',
      'kubejs:monolith_sign_item',
      'kubejs:witahdigroi_sign_item',
      'kubejs:tripple_sign_item',
      'kubejs:turn_back_sign_item',
      'kubejs:inkblod_sign_item'
    ],
    Text.of('Can be placed on metal sign poles').darkPurple().italic()
  )
  event.add(
    [
      'torchmaster:frozen_pearl'
    ],
    Text.of('So cold that it freezes light from ceiling lamps').aqua().italic()
  )
})