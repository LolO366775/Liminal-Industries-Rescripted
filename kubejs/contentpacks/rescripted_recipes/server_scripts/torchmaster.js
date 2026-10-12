ServerEvents.recipes(event => {
    /*event.remove({output: 'torchmaster:frozen_pearl'})
    event.recipes.thermal.chiller('torchmaster:frozen_pearl',[Fluid.of("minecraft:water",100),'minecraft:ender_pearl'])*/
    event.remove({output: 'torchmaster:feral_flare_lantern'})
    event.custom({
  		"type": "actuallyadditions:laser",
  		"energy": 20000,
  		"ingredient": {
    		"item": "immersiveengineering:lantern"
  		},
  		"result": {
    		"item": "torchmaster:feral_flare_lantern"
  		}
	})
    event.remove({output: 'torchmaster:megatorch'})
    event.custom({
  		"type": "actuallyadditions:laser",
  		"energy": 20000,
  		"ingredient": {
    		"item": "minecraft:torch"
  		},
  		"result": {
    		"item": "torchmaster:megatorch"
  		}
	})
    event.remove({output: 'torchmaster:dreadlamp'})
    event.custom({
  		"type": "actuallyadditions:laser",
  		"energy": 20000,
  		"ingredient": {
    		"item": "minecraft:respawn_anchor"
  		},
  		"result": {
    		"item": "torchmaster:dreadlamp"
  		}
	})
})