ServerEvents.tags('item', event => {
  //helper function
  function tagBuilder(tag, itemsToAdd) {
    itemsToAdd.forEach(element => {
      event.add(tag, element)
    });
  }

  //curry
  tagBuilder('kubejs:foods/curry_sause_base', [
    'minecraft:potato',
    'farmersdelight:tomato',
    'miners_delight:cave_carrot',
    'farmersdelight:pumpkin_slice',
    'kubejs:foods/cream'
  ])

  //msytery meat
  tagBuilder('forge:foods/meat/raw', [
    'kubejs:foods/mystery_meat'
  ])

  //other (non this content pack) item tagging
  //cookies for the caramel cookie
  tagBuilder('forge:foods/cookie', [
    'minecraft:cookie',
    'farmersdelight:sweet_berry_cookie',
    'farmersdelight:honey_cookie',
    'kubejs:foods/clay_cookie',
    'miners_delight:bat_cookie',
    'kubejs:foods/sugar_cookie',
    'kubejs:foods/frosted_sugar_cookie',
  ])

})