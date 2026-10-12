ServerEvents.recipes(event => {
	event.shaped('minecraft:hopper', [
		'I I', 
		'IWI',
		' I '  
		],{
		I: 'minecraft:iron_ingot',
		W: 'woodenhopper:wooden_hopper'
	})
	event.shaped('uppers:upper', [
		' I ',
		'IWI',
		'I I'  
		],{
		I: 'minecraft:iron_ingot',
		W: 'woodenhopper:wooden_hopper'
	})
})