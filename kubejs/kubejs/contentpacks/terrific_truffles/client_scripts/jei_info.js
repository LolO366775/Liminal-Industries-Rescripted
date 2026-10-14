const ToolActions = Java.loadClass('net.minecraftforge.common.ToolActions')
const HOE_TILL_ACTION = ToolActions.HOE_TILL
const VanillaTypes = Java.loadClass('mezz.jei.api.constants.VanillaTypes')

JEIEvents.information(event => {

   let truffle_jei_info = (Item, Strings) => {
      Strings[0] = Text.of('\uE000 ').white().append(Text.of(Strings[0]).black())
      event.addItem(Item, Strings)
   }

   truffle_jei_info('kubejs:carpet_truffle', [
      'A peculiar fungal critter that lives under the carpets.',
      'Can be useful if processed.',
      '',
      Text.gray('Its not the only entry.')
   ])

   truffle_jei_info(['kubejs:carpet_truffle', 'minecraft:spyglass'], [
      'You have to look using spyglass while SNEAKING or CRAWLING to analyze if there are traces of truffles under the carpet.',
      Text.lightPurple('This color means you can search.')
   ])

   truffle_jei_info(['kubejs:carpet_truffle', 'create:brass_hand'], [
      'Searching truffle by EMPTY hand will alert all the truffles in LARGE radius.',
      'You have to CRAWL.'
   ])

   truffle_jei_info(['kubejs:carpet_truffle', '#minecraft:hoes'], [
      'Searching truffle using TILLING TOOL will alert all the truffles in MEDIUM radius.',
      'You have to CRAWL.'
   ])

   truffle_jei_info(['kubejs:carpet_truffle', 'kubejs:putty_knife'], [
      'Searching truffle using PUTTY KNIFE will alert all the truffles in SMALL radius.',
      'You have to CRAWL.'
   ])

})