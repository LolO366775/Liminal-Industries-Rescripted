ServerEvents.recipes(event => {
	event.replaceInput({id:"dustrial_decor:sheet_metal"},"minecraft:iron_ingot","create:iron_sheet")
  event.remove({id:"dustrial_decor:rusty_sheet_metal"})
  event.shaped('3x dustrial_decor:rusty_sheet_metal',
  [
    'SSS'
  ],
  {
    S: 'kubejs:scrap'
  }
)
})


