BlockEvents.rightClicked("kubejs:wooden_silverfish_cage", event => {
	global.silverfish_cage_click(event)
})
BlockEvents.rightClicked("kubejs:empty_wooden_silverfish_cage", event => {
	global.empty_silverfish_cage_click(event)
})

ServerEvents.recipes(event => {
	event.shaped(
	'kubejs:empty_wooden_silverfish_cage',
	[ 
		'TTT', 
		'S S',
		'TTT'  
	],{
		T: 'minecraft:stick',
		S: 'minecraft:string'
	})
})