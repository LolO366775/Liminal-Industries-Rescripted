ServerEvents.recipes(event => {
	event.remove({id:"plushie_buddies:fabric"})
	event.remove({id:"plushie_buddies:stuffing"})
	event.remove({id:"plushie_buddies:sewing_needle"})
	event.recipes.farmersdelight.cutting(
        "kubejs:clothing_pile",
        "#forge:tools/knives", // tool
        [ // results
            Item.of("plushie_buddies:fabric"),
			Item.of("plushie_buddies:stuffing").withChance(0.3),
			Item.of("plushie_buddies:sewing_needle").withChance(0.05)
        ]
	)

	event.remove({ output: 'thermal:beekeeper_fabric' })
	event.remove({ output: 'thermal:diving_fabric' })
	event.remove({ output: 'thermal:hazmat_fabric' })
	event.custom({
		"type":"createaddition:rolling",
		"input": {
	      	"item": "plushie_buddies:fabric"
		},
		"result": {
			"item": "thermal:beekeeper_fabric",
			"count": 1
		}
	})
	event.custom({
    	"type": "eidolon:worktable",
    	"pattern": [
      		" f ",
      		"fpf",
      		" f "
    	],
    	"reagents": "2121",
    	"key": {
      		"f": {
        		"item": "thermal:beekeeper_fabric"
      		},
      		"p": {
        		"item": "minecraft:prismarine_crystals"
      		},
      		"1": {
        		"item": "eidolon:soul_shard"
      		},
      		"2": {
        		"item": "eidolon:lesser_soul_gem"
      		}
    	},
    	"result": {
      		"item": "thermal:diving_fabric",
			"count": 4
    	}
  	})
  	event.custom({
    	"type": "eidolon:worktable",
    	"pattern": [
      		" f ",
      		"fpf",
      		" f "
    	],
    	"reagents": "2121",
    	"key": {
      		"f": {
        		"item": "thermal:beekeeper_fabric"
      		},
      		"p": {
        		"item": "thermal:cured_rubber"
      		},
      		"1": {
        		"item": "eidolon:soul_shard"
      		},
      		"2": {
        		"item": "eidolon:lesser_soul_gem"
      		}
    	},
    	"result": {
      		"item": "thermal:hazmat_fabric",
			"count": 4
    	}
  	})
	let magic_modifiers = (output, input1, input2) => {
		event.custom({
    		"type": "eidolon:worktable",
    		"pattern": [
      			" r ",
      			"rfr",
      			" r "
    		],
    		"reagents": "2121",
    		"key": {
      			"f": {
        			"item": input1
      			},
      			"r": {
        			"item": input2
      			},
      			"1": {
        			"item": "eidolon:soul_shard"
      			},
      			"2": {
        			"item": "eidolon:lesser_soul_gem"
      			}
    		},
    		"result": {
      			"item": output
    		}
  		})
	}
	event.remove({output:"tconstruct:silky_cloth"})
	magic_modifiers("tconstruct:silky_cloth","thermal:beekeeper_fabric","tconstruct:rose_gold_nugget")
	event.remove({output:"tconstruct:seared_reinforcement"})
	magic_modifiers("tconstruct:seared_reinforcement","tconstruct:pattern","tconstruct:seared_brick")
	event.remove({output:"tconstruct:obsidian_reinforcement"})
	magic_modifiers("tconstruct:obsidian_reinforcement","tconstruct:pattern","create:powdered_obsidian")
	event.remove({output:"tconstruct:cobalt_reinforcement"})
	magic_modifiers("tconstruct:cobalt_reinforcement","tconstruct:pattern","enderio:powdered_cobalt")
	event.remove({output:"tconstruct:iron_reinforcement"})
	magic_modifiers("tconstruct:iron_reinforcement","tconstruct:pattern","kubejs:scrap")
	event.remove({output:"tconstruct:gold_reinforcement"})
	magic_modifiers("tconstruct:gold_reinforcement","tconstruct:pattern","kubejs:pool_tile_golden")
	event.remove({output:"tconstruct:slimesteel_reinforcement"})
	magic_modifiers("tconstruct:slimesteel_reinforcement","tconstruct:pattern","tconstruct:slimesteel_nugget")
	event.remove({output:"tconstruct:emerald_reinforcement"})
	magic_modifiers("tconstruct:emerald_reinforcement","tconstruct:pattern","minecraft:emerald")

	event.recipes.create.sequenced_assembly([
        'minecraft:elytra'
     ], 'beachparty:beach_towel', [
        event.recipes.create.deploying('beachparty:beach_towel', ['beachparty:beach_towel', 'plushie_buddies:sewing_needle']),
		event.recipes.create.deploying('beachparty:beach_towel', ['beachparty:beach_towel', 'beachparty:beach_towel']),
		event.recipes.create.deploying('beachparty:beach_towel', ['beachparty:beach_towel', 'plushie_buddies:thread']),
		event.recipes.create.deploying('beachparty:beach_towel', ['beachparty:beach_towel', 'beachparty:beach_towel']),
		event.recipes.create.deploying('beachparty:beach_towel', ['beachparty:beach_towel', 'plushie_buddies:thread']),
		event.recipes.create.deploying('beachparty:beach_towel', ['beachparty:beach_towel', 'beachparty:beach_towel'])
     ]).transitionalItem('beachparty:beach_towel').loops(10)
})