ServerEvents.recipes(event => {
	event.remove({id:"minecraft:map"})
	event.remove({id:"supplementaries:altimeter"})
	event.remove({id:"supplementaries:slice_map"})
	event.remove({id:"minecraft:compass"})
	event.shaped(
		'supplementaries:altimeter',
		[ 
		' N ', 
		'NBN',
		' N '  
		],{
		  N: 'eidolon:arcane_gold_nugget',
		  B: 'kubejs:battery',
		}
	)
	event.shaped(
		'compass',
		[ 
		' S ', 
		'SBS',
		' S '  
		],{
		  S: 'kubejs:scrap',
		  B: 'kubejs:battery',
		}
	)
	event.shaped(
		'supplementaries:slice_map',
		[ 
		'WWW', 
		'WCW',
		'WWW'  
		],{
		  W: 'kubejs:wallpaper',
		  C: '#chalk:chalks',
		}
	)
	event.recipes.create.sequenced_assembly([
        'supplementaries:slice_map'
    ], 'kubejs:wallpaper', [
        event.recipes.createDeploying('kubejs:wallpaper', ['kubejs:wallpaper', '#chalk:chalks']),
    ]).transitionalItem('kubejs:wallpaper').loops(8)
	event.shaped(
		'supplementaries:globe',
		[ 
		' N ', 
		' CN',
		' I '  
		],{
		  I: 'eidolon:arcane_gold_ingot',
		  N: 'eidolon:arcane_gold_nugget',
		  C: 'minecraft:compass',
		}
	)
	event.remove({id:"pocketgps:gps"})
	event.remove({id:"map_atlases:craft_atlas"})
	event.shapeless('map_atlases:atlas', ['endrem:lost_eye','minecraft:book'])
})