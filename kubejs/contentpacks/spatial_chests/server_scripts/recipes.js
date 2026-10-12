ServerEvents.recipes(event => {
	let spacial_component = "minecraft:ender_pearl"
	if (Platform.isLoaded("ae2")) {
		spacial_component = "ae2:spatial_cell_component_2"
	}
	if (Platform.isLoaded("enderchests")) {
    	event.remove({id: 'enderchests:ender_chest'})
		event.remove({id: 'enderchests:ender_bag'})
		event.shaped(
			'enderchests:ender_bag',
			[
				'R R',
				'SBS',
				'RSR'
			],{
		 		S: spacial_component,
		  		B: 'enderchests:ender_pouch',
		  		R: '#forge:ingots/reality_alloy'
			}
		)
		event.shaped(
			'2x enderchests:ender_chest',
			[ 
				'RSR', 
				'SCS',
				'RER'  
			],{
		  		S: spacial_component,
		  		R: '#forge:ingots/reality_alloy',
		  		C: 'minecraft:chest',
		  		E: 'minecraft:echo_shard'
			}
		)
	}
	if (Platform.isLoaded("endertanks")) {
		event.remove({id: 'endertanks:tank'})
		event.remove({id: 'endertanks:bucket'})
		event.shaped(
			'endertanks:ender_bucket',
			[
				'R R',
				'SBS',
				'RSR'
			],{
		  		S: spacial_component,
		  		B: 'minecraft:bucket',
		  		R: '#forge:ingots/reality_alloy'
			}
		)
		event.shaped(
			'2x endertanks:ender_tank',
			[ 
				'RSR', 
				'SCS',
				'RER'  
			],{
		  		S: spacial_component,
		  		R: '#forge:ingots/reality_alloy',
		  		C: 'minecraft:bucket',
		  		E: 'minecraft:echo_shard'
			}
		)
	}
})