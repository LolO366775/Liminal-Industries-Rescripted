//reminder List. Change these to dictioarny with 'raw_name' : 'display_name' as entries for easier looping
const smeltery_map = {
  'seared_bricks':'Seared Brick Flooring',
  'seared_stone':'Seared Stone Flooring',
  'seared_cobble':'Seared Cobblestone Flooring',
  'seared_paver':'Seared Paver Flooring'
}
const foundary_map = {
  'scorched_bricks':"Scorched Brick Flooring",
  'scorched_road':"Scorched Road Flooring"}



StartupEvents.registry('block', event => {

  const smeltery_flooring = (block, displayName) => {
    event.create(block)
    .tagBlock('tconstruct:smeltery/floor')
    .tagBlock('tconstruct:smeltery')
    .fullBlock(true)
    .material("stone")
    .soundType("stone")
    .unbreakable()
    .tagBlock('wither_immune')
    .displayName(displayName)
    .model(`kubejs:block/${block}`)
    .property(Java.loadClass('slimeknights.tconstruct.smeltery.block.component.SearedBlock').IN_STRUCTURE)
  }

  Object.keys(smeltery_map).forEach(key => {
    const id = `${key}_flooring_block`
    const displayName = smeltery_map[key]
    smeltery_flooring(id, displayName)
  })


  const foundary_flooring = (block, displayName) => {
    event.create(block) // Create a new block with ID 'kubejs:example_block'
    .tagBlock('tconstruct:foundry/floor')
    .tagBlock('tconstruct:foundry/wall')
    .tagBlock('tconstruct:foundry')
    .fullBlock(true)
    .material("stone")
    .soundType("stone")
    .unbreakable()
    .tagBlock('wither_immune')
    .displayName(displayName)
    .model(`kubejs:block/${block}`)
    .property(Java.loadClass('slimeknights.tconstruct.smeltery.block.component.SearedBlock').IN_STRUCTURE)
  }

   Object.keys(foundary_map).forEach(key => {
    const id = `${key}_flooring_block`
    const displayName = foundary_map[key]
    foundary_flooring(id, displayName)
  })


})

StartupEvents.registry('item', event => {
    Object.keys(smeltery_map).forEach(key => {
    const id = `${key}_flooring`
    const displayName = smeltery_map[key]
    // texture=`tconstruct:block/smeltery/seared/${key.replace('seared_','')}`
    // smeltery_flooring(id, displayName)
    event.create(id).displayName(displayName).tag("kubejs:flooring")
  })
  Object.keys(foundary_map).forEach(key => {
    const id = `${key}_flooring`
    const displayName = foundary_map[key]
    // texture=`tconstruct:block/foundry/scorched/${}`
    // texture=`tconstruct:block/foundry/scorched/${key.replace('seared_','')}`
    event.create(id).displayName(displayName).tag("kubejs:flooring")
  })
// event.create('seared_brick_flooring').displayName("Seared Brick Flooring").tag("kubejs:flooring")
// event.create('seared_stone_flooring').displayName("Seared Stone Flooring").tag("kubejs:flooring")
// event.create('seared_cobblestone_flooring').displayName("Seared Cobblestone Flooring").tag("kubejs:flooring")
// event.create('seared_paver_flooring').displayName("Seared Paver Flooring").tag("kubejs:flooring")

// event.create('scorched_brick_flooring').displayName("Scorched Brick Flooring")
// event.create('scorched_road_flooring').displayName("Scorched Road Flooring").tag("kubejs:flooring")
})