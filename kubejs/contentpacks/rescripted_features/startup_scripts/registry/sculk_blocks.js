/**
* @param {Registry.Block} event
*/
function block_registry_sculk_blocks(event) {
let porous_stone = (id,display_name,map_colour,sound_type,colour) => {
		event.create(id)
		.fullBlock(true)
		.mapColor(map_colour)
		.soundType(sound_type)
		.unbreakable()
		.tagBlock('wither_immune')
		.displayName(display_name)
		.item(item => item.modelJson({"parent": `kubejs:block/porous_stone/${colour}1`}))
		.blockstateJson = {
  			"variants": {
    			"": [{
      				"model": `kubejs:block/porous_stone/${colour}1`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/porous_stone/${colour}2`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/porous_stone/${colour}3`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/porous_stone/${colour}4`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/porous_stone/${colour}5`, "weight": 10
    			}]
  			}
		}
	}
	event.create('sculk_carapace').displayName('Sculk Carapace')
		.mapColor("color_cyan")
		.soundType("sculk_catalyst")
		.hardness(10000)
		.resistance(0)
		.noDrops()

	porous_stone("porous_stone","Porous Stone","stone","tuff","light")
	porous_stone("missing_tiles_empty_perm","Missing Pool Tiles (Permanent)","stone","deepslate","dark")
	
	event.create('sculk_tendrils').displayName('Sculk Tendrils')
		.mapColor("color_cyan")
		.soundType("sculk_vein")
		.waterlogged() //Poolrooms ADDITION
		.renderType("cutout")
		.fullBlock(false)
		.noCollision()
		.opaque(false)

	event.create('sculk_slab', 'slab').displayName('Sculk Slab')
		.mapColor("color_cyan")
		.soundType("sculk")
		.unbreakable()
		.fullBlock(false)
		.opaque(false)
		.noDrops()

	event.create('sculk_stairs', 'stairs').displayName('Sculk Stairs')
		.mapColor("color_cyan")
		.soundType("sculk")
		.unbreakable()
		.noDrops()
		.tagBlock('wither_immune')
		.fullBlock(false)
		.opaque(false)

	event.create('sculk_shroom').displayName('Sculk Shroom')
		.mapColor("color_cyan")
		.soundType("sculk_vein")
		.waterlogged() //Poolrooms ADDITION
		.renderType("cutout")
		.fullBlock(false)
		.noCollision()
		.opaque(false)
}