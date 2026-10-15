StartupEvents.registry('block', event => {
  event.create('seared_flooring_block') // Create a new block with ID 'kubejs:example_block'
  .tagBlock('tconstruct:smeltery/floor')
  .tagBlock('tconstruct:smeltery')
  .fullBlock(true)
  .material("stone")
  .soundType("stone")
  .unbreakable()
  .tagBlock('wither_immune')
  .displayName("Seared Carpet")
  .model('kubejs:block/seared_flooring_block')
  .property(Java.loadClass('slimeknights.tconstruct.smeltery.block.component.SearedBlock').IN_STRUCTURE)
})