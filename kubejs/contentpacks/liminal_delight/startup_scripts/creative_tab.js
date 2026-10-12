const final_food_names = [] // all entries need fulll uri 

//adds a list of names to the final array, adding 'kubejs:foods/' to the start
function regFoods(food_list) {
  food_list.forEach(element => {
    final_food_names.push('kubejs:foods/' + element)
  });
}

//add food names here, auto generated 'kubejs:foods/' added
regFoods([
  //misc
  'mystery_meat',
  'cream',
  'frosting',
  'sprinkles',
  'lava_chicken',
  'candy_ham',
  'candy_petal',

  //berry bowl
  'berry_bowl',
  'berries_and_cream',

  //pemmican
  'spices',
  'cured_meat',
  'dried_meat',
  'meat_floss',
  'pemmican',
  'honey_pemmican',

  //curry
  'curry_paste',
  'curry_carpet',
  'curry_fish',
  'curry_vegetable',
  'curry_mushroom',
  'curry_meat',

  //on a stick
  'caramel_apple',
  'caramel_carrot',
  'caramel_onion',
  'caramel_cookie',
  'caramel_pumpkin',
  'caramel_raw_cod',

  //bagel
  'bagel_raw',
  'bagel',
  'bagel_cream',

  //cookies
  'wet_clay_cookie',
  'clay_cookie',
  'sugar_cookie',
  'frosted_sugar_cookie',
  'giant_pink_sugar_cookie',
  'jam_cookie',

  //fermented items
  'fermented_beetroot_paste',
  'fermented_berry_paste',
  'fermented_honey_paste',
  'fermented_rice_paste',
  'fermented_wheat_paste',

  'fermented_beetroot_drink',
  'fermented_berry_drink',
  'fermented_honey_drink',
  'fermented_rice_drink',
  'fermented_wheat_drink',

  //breads
  'bread_cocoa',
  'bread_honey',
  'bread_vegetable',
  'bread_pumpkin',
  'bread_strawberry',
  'bread_berries',
  'bread_almond'


])

//add all items to own creative mode tab
StartupEvents.registry('creative_mode_tab', event => {
  event.create('foods').icon(() => 'kubejs:foods/berry_bowl').content(() => final_food_names)
})

//remove from default
StartupEvents.modifyCreativeTab('kubejs:tab', event => {
  final_food_names.forEach(element => {
    event.remove(element)
  });
})

//set tab name
StartupEvents.modifyCreativeTab('kubejs:foods', event => {
  event.displayName = 'Liminal Delights'
})