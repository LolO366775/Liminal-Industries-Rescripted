ServerEvents.tags('item', event => {
  // Get the #forge:cobblestone tag collection and add Diamond Ore to it
  event.add('terrific_truffles:resin', 'thermal:rosin')
  event.add('terrific_truffles:resin', 'eidolon:merammer_resin')
  event.add('terrific_truffles:resin', 'palegardenbackport:resin_clump')

  event.add('forge:mushrooms', 'kubejs:carpet_truffle_piece')

 /* event.add('forge:tools/knives', "kubejs:putty_knife")
  event.add('forge:tools/knives', "kubejs:crinkle_cutter")*/

})