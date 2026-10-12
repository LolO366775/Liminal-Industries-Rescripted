ServerEvents.recipes(event => {
  //see end of list for helper functions

  //-----------------crafting
  event.shapeless('kubejs:foods/berry_bowl', ['minecraft:bowl', '8x minecraft:sweet_berries'])
  event.shapeless('kubejs:foods/cured_meat', ['minecraft:rotten_flesh', '4x kubejs:foods/spices'])
  event.shapeless('kubejs:foods/cured_meat', ['#forge:foods/meat/raw', 'kubejs:foods/spices'])
  event.shapeless('kubejs:foods/pemmican', ['kubejs:foods/meat_floss', '2x minecraft:sweet_berries'])
  event.shapeless('kubejs:foods/honey_pemmican', ['kubejs:foods/pemmican', 'minecraft:honey_bottle'])
  event.shapeless(Item.of('kubejs:foods/curry_paste', 2), ['3x kubejs:foods/spices', '3x #minecraft:flowers'])
  event.shapeless(Item.of('kubejs:foods/wet_clay_cookie', 4), ['minecraft:clay_ball', 'minecraft:sugar'])
  event.shapeless(Item.of('kubejs:foods/frosting', 4), ['4x kubejs:foods/cream', 'minecraft:sugar'])
  event.shapeless(Item.of('kubejs:foods/bagel_cream', 2), ['2x kubejs:foods/cream', 'kubejs:foods/bagel'])
  event.shapeless('kubejs:foods/berries_and_cream', ['2x kubejs:foods/cream', 'kubejs:foods/berry_bowl'])
  event.shapeless(Item.of('kubejs:foods/sugar_cookie', 8), ['2x minecraft:wheat', 'minecraft:sugar'])
  event.shapeless(Item.of('kubejs:foods/frosted_sugar_cookie', 2), ['2x kubejs:foods/sugar_cookie', 'kubejs:foods/frosting', 'kubejs:foods/sprinkles'])
  event.shapeless('kubejs:foods/giant_pink_sugar_cookie', ['4x kubejs:foods/sugar_cookie', '2x kubejs:foods/frosting', '2x kubejs:foods/sprinkles', '#forge:dyes/pink'])
  event.shapeless('kubejs:foods/jam_cookie', ['2x #forge:foods/cookie', 'brewinandchewin:sweet_berry_jam'])


  //-----------------smelting------------------------

  cookableBuilder('#forge:seeds', 'kubejs:foods/spices', 40, 0.1)
  cookableBuilder('kubejs:foods/cured_meat', 'kubejs:foods/dried_meat')
  cookableBuilder('kubejs:foods/wet_clay_cookie', 'kubejs:foods/clay_cookie', 100, 0.1)
  cookableBuilder('kubejs:foods/bagel_raw', 'kubejs:foods/bagel')

  //-----------------cutting------------------------
  event.recipes.farmersdelight.cutting(
    'kubejs:foods/dried_meat',
    '#farmersdelight:tools/knives', // tool
    [ // results
      '2x kubejs:foods/meat_floss'
    ],
    'farmersdelight:block.cutting_board.knife' // sound
  )
  event.recipes.farmersdelight.cutting( //cream
    'minecraft:milk_bucket',
    'kubejs:whisk', // tool
    [ // results
      '8x kubejs:foods/cream',
      'minecraft:bucket'
    ],
    'farmersdelight:entity.rotten_tomato.hit' // sound
  )
  event.recipes.farmersdelight.cutting(
    'farmersdelight:milk_bottle',
    'kubejs:whisk', // tool
    [ // results
      '2x kubejs:foods/cream'
    ],
    'farmersdelight:entity.rotten_tomato.hit' // sound
  )
  event.recipes.farmersdelight.cutting(
    'neapolitan:milk_bottle',
    'kubejs:whisk', // tool
    [ // results
      '2x kubejs:foods/cream'
    ],
    'farmersdelight:entity.rotten_tomato.hit' // sound
  )
  event.recipes.farmersdelight.cutting(
    '#forge:dough',
    'minecraft:stick', // tool
    [ // results
      'kubejs:foods/bagel_raw'
    ],
    'farmersdelight:entity.rotten_tomato.hit' // sound
  )

  //-----------------------caramel--------------------
  CaramelBuilder('minecraft:apple', 'kubejs:foods/caramel_apple')
  CaramelBuilder('minecraft:carrot', 'kubejs:foods/caramel_carrot')
  CaramelBuilder('minecraft:cod', 'kubejs:foods/caramel_raw_cod')
  CaramelBuilder('farmersdelight:pumpkin_slice', 'kubejs:foods/caramel_pumpkin')
  CaramelBuilder('#forge:foods/cookie', 'kubejs:foods/caramel_cookie')
  CaramelBuilder('farmersdelight:onion', 'kubejs:foods/caramel_onion')

  //-------------------cooking pot-----------------------
  //all recepies that take 4 or less items support copper pot
  //use Item.empty for container for no container
  // cookingPot(inputs, output, count, exp, cooktime, container)

  cookingPotBuilder( //curry carpet
    [
      'kubejs:foods/curry_paste',
      'kubejs:carpet_dust',
      'neapolitan:strawberries',
      'brewinandchewin:sweet_berry_jam',
      'kubejs:foods/mystery_meat',
      'kubejs:almond_water_can'
    ], //input
    'kubejs:foods/curry_carpet', // output
    1, // count
    1, // exp
    200, // cooktime
    'minecraft:bowl' // container
  )

  cookingPotBuilder( //sprinkles
    [ //input
      'minecraft:honeycomb',
      'minecraft:sugar',
      '#forge:dyes'
    ],
    'kubejs:foods/sprinkles', // output
    4, //count
    0.1, // exp
    40, // cooktime
    Item.empty, // container
  )
  //lava chicken
  cookingPotBuilder(['minecraft:lava_bucket', 'minecraft:chicken'], 'kubejs:foods/lava_chicken')
  //candied ham
  cookingPotBuilder(['minecraft:sugar', 'farmersdelight:ham'], 'kubejs:foods/candy_ham')
  //mystery meat
  cookingPotBuilder(['minecraft:rotten_flesh', 'minecraft:bone', 'minecraft:kelp', 'minecraft:kelp',], 'kubejs:foods/mystery_meat')
  //candy petals
  cookingPotBuilder(['minecraft:sugar', 'botania:pink_petal', 'botania:pink_petal', 'botania:pink_petal', 'botania:pink_petal'], 'kubejs:foods/candy_petal', 4, 0.1, 100)

  //-------------------currys-------------------
  curryBuilder('#forge:foods/meat/raw', 'kubejs:foods/curry_meat')
  curryBuilder('#forge:foods/fish/raw', 'kubejs:foods/curry_fish')
  curryBuilder('#forge:mushrooms', 'kubejs:foods/curry_mushroom')
  curryBuilder('#forge:vegetables', 'kubejs:foods/curry_vegetable')

  //-----------------fermented drinks----------------
  fermentedDrinkBuilder('minecraft:beetroot', 'kubejs:foods/fermented_beetroot_paste', 'kubejs:foods/fermented_beetroot_drink')
  fermentedDrinkBuilder('minecraft:sweet_berries', 'kubejs:foods/fermented_berry_paste', 'kubejs:foods/fermented_berry_drink')
  fermentedDrinkBuilder('minecraft:honey_bottle', 'kubejs:foods/fermented_honey_paste', 'kubejs:foods/fermented_honey_drink')
  fermentedDrinkBuilder('#forge:crops/rice', 'kubejs:foods/fermented_rice_paste', 'kubejs:foods/fermented_rice_drink')
  fermentedDrinkBuilder('minecraft:wheat', 'kubejs:foods/fermented_wheat_paste', 'kubejs:foods/fermented_wheat_drink')

  //-----------------------breads---------------------
  breadBuilder('#forge:vegetables', 'kubejs:foods/bread_vegetable')
  breadBuilder('farmersdelight:pumpkin_slice', 'kubejs:foods/bread_pumpkin')
  breadBuilder('neapolitan:strawberries', 'kubejs:foods/bread_strawberry')
  breadBuilder('minecraft:honey_bottle', 'kubejs:foods/bread_honey')
  breadBuilder('minecraft:cocoa_beans', 'kubejs:foods/bread_cocoa')
  breadBuilder('kubejs:almond_water_can', 'kubejs:foods/bread_almond')
  breadBuilder('minecraft:sweet_berries', 'kubejs:foods/bread_berries')

  //---------------------helping functions------------
  //cooking builder (for items in furnices, smoking, and campfire)
  function cookableBuilder(input, output, cookingTime = 100, exp = 0.35) {
    event.smelting(output, input).cookingTime(cookingTime).xp(exp)
    event.smoking(output, input).cookingTime(cookingTime / 2).xp(exp)
    event.campfireCooking(output, input).cookingTime(cookingTime * 3).xp(exp)
  }


  //cooking pot helper function, does not support '2x item' notation
  //recepies with 4 or less ingredinets can be made in copper pot
  function cookingPotBuilder(inputs, output, count = 1, exp = 0.35, cooktime = 200, container = Item.empty) {
    //build json
    var json = {
      type: 'farmersdelight:cooking',
      ingredients: [
      ],
      result: {
        item: output,
        count: count
      },
      experience: exp,
      cookingtime: cooktime,
      container: {
        item: container
      }
    }
    //build ingredients list
    inputs.forEach(element => {
      //handle tags
      if (element.charAt(0) == '#') {
        json.ingredients.push({
          tag: element.substring(1, element.length)
        })
      } else { //handle items 
        json.ingredients.push({
          item: element
        })
      }
    });
    //remove container for recipies that dont use it
    if (container == Item.empty) { delete json.container }
    //return the registerd event to continue chaining
    return event.custom(json)
  }

  //caramel item builder
  function CaramelBuilder(mainItem, output) {
    cookingPotBuilder(
      [
        'minecraft:sugar',
        'minecraft:sugar',
        'minecraft:sugar',
        mainItem
      ],
      output,
      1,
      1,
      200,
      'minecraft:stick'
    )
  }

  //curry builder 
  function curryBuilder(mainItem, output) {
    cookingPotBuilder(
      [
        mainItem,
        '#kubejs:foods/curry_sause_base',
        'kubejs:foods/curry_paste',
        'kubejs:foods/curry_paste',
        '#forge:vegetables'
      ],
      output,
      4,
      1,
      200,
      'farmersdelight:cooked_rice'
    )
  }

  //fermented drink builder
  function fermentedDrinkBuilder(mainIngredient, fermentedItem, finalItem) {
    event.shapeless(fermentedItem, ['3x minecraft:sugar', mainIngredient, mainIngredient])
    cookingPotBuilder([fermentedItem, fermentedItem], finalItem, 3, 0.35, 200, 'minecraft:glass_bottle')
  }


  //bread builder
  function breadBuilder(mainIngredient, breadItem) {
    cookingPotBuilder(['#forge:dough', mainIngredient, mainIngredient, mainIngredient, mainIngredient], breadItem)
  }
})



