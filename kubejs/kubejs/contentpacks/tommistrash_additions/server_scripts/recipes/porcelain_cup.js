ServerEvents.recipes(event => {
        event.custom({
        "type": "tconstruct:casting_table",
        "cast": [
            {
            "tag": "tconstruct:casts/multi_use/gem"
            }
        ],
        "cast_consumed": false,
        "cooling_time": 80,
        "fluid": {
            "amount": 300,
            "fluid": "tconstruct:molten_porcelain"
        },
        "result": "kubejs:porcelain_cup"
    })
            event.custom({
        "type": "tconstruct:casting_table",
        "cast": [
            {
            "tag": "tconstruct:casts/single_use/gem"
            }
        ],
        "cast_consumed": true,
        "cooling_time": 80,
        "fluid": {
            "amount": 300,
            "fluid": "tconstruct:molten_porcelain"
        },
        "result": "kubejs:porcelain_cup"
    })
	event.shaped('kubejs:porcelain_cup', [
		'   ', 
		'ABA',
		' A '  
		],{
		  A: 'kubejs:porcelain_shard',
          B: 'minecraft:clay_ball'
	})
})