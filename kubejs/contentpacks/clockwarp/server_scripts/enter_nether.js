ServerEvents.recipes(event => {

	event.recipes.create.item_application('kubejs:empty_compound_charge',['create:fluid_tank','create:andesite_casing'])
	event.recipes.create.item_application('kubejs:location_terminal',['refurbished_furniture:computer','create:andesite_casing'])

	event.custom({
  		"type": "actuallyadditions:laser",
  		"energy": 20000,
  		"ingredient": {
    		"item": "kubejs:unstable_compound"
  		},
  		"result": {
    		"item": "kubejs:perfectly_stablised_compound"
  		}
	})
})
BlockEvents.rightClicked('supplementaries:clock_block', event => {
	global.clock_right_click_event(event)
})