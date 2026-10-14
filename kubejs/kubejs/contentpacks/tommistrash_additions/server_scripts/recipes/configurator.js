ServerEvents.recipes(event => {
	event.remove({ id: 'mekanism:configurator' })
	event.shaped('mekanism:configurator', [
		' A ', 
		'CBC',
		' D '  
		],{
		  A: '#forge:rods/iron', 
		  B: 'minecraft:lapis_lazuli',
		  C: 'mekanism:basic_control_circuit',
          D: 'immersiveengineering:component_steel'
	})
})