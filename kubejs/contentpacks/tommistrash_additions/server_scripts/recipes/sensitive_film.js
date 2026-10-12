ServerEvents.recipes(event => {
	event.remove({output: 'exposure:high_sensitivity_black_and_white_film'})
	event.shapeless('exposure:high_sensitivity_black_and_white_film', [
		'minecraft:paper',
        'minecraft:white_dye'
	])
    event.remove({output: 'exposure:high_sensitivity_color_film'})
	event.shapeless('exposure:high_sensitivity_color_film', [
		'minecraft:paper',
        'minecraft:yellow_dye',
        'minecraft:white_dye'
	])
    event.remove({id: 'exposure:color_film_developing'})
	event.custom({
		"type": "exposure:film_developing",
		"film": {
		  "item": "exposure:high_sensitivity_color_film"
		},
		"ingredients": [
		  [
    		{
    		  "type": "forge:partial_nbt",
    		  "item": "minecraft:potion",
    		  "nbt": "{Potion:\"minecraft:water\"}"
    		},
    		{
    		  "type": "forge:partial_nbt",
    		  "item": "minecraft:potion",
    		  "nbt": "{Potion:\"water\"}"
    		}
		  ]
		],
		"result": {
		  "item": "exposure:developed_color_film"
		}
	})
})