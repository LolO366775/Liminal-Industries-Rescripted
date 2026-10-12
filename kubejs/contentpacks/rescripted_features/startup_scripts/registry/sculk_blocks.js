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
	porous_stone("porous_stone","Porous Stone","stone","tuff","light")
	porous_stone("missing_tiles_empty_perm","Missing Pool Tiles (Permanent)","stone","deepslate","dark")

	let carapace = event.create('sculk_carapace')
	carapace.displayName('Sculk Carapace')
	carapace.mapColor("color_cyan")
	carapace.soundType("sculk_catalyst")
	carapace.hardness(10000)
	carapace.resistance(0)
	carapace.noDrops()

	let tendrils = event.create('sculk_tendrils')
	tendrils.displayName('Sculk Tendrils')
	tendrils.mapColor("color_cyan")
	tendrils.soundType("sculk_vein")
	tendrils.waterlogged() //Poolrooms ADDITION
	tendrils.renderType("cutout")
	tendrils.tag("minecraft:mineable/hoe")
	tendrils.box(0,0,0,16,4,16)
	tendrils.noCollision()
	tendrils.opaque(false)

	let sculk_slab = event.create('sculk_slab', 'slab')
	sculk_slab.displayName('Sculk Slab')
	sculk_slab.mapColor("color_cyan")
	sculk_slab.soundType("sculk")
	sculk_slab.unbreakable()
	sculk_slab.fullBlock(false)
	sculk_slab.opaque(false)
	sculk_slab.noDrops()

	let sculk_stairs = event.create('sculk_stairs', 'stairs')
	sculk_stairs.displayName('Sculk Stairs')
	sculk_stairs.mapColor("color_cyan")
	sculk_stairs.soundType("sculk")
	sculk_stairs.unbreakable()
	sculk_stairs.noDrops()
	sculk_stairs.tagBlock('wither_immune')
	sculk_stairs.fullBlock(false)
	sculk_stairs.opaque(false)

	let sculk_shroom = event.create('sculk_shroom')
	sculk_shroom.displayName('Sculk Shroom')
	sculk_shroom.mapColor("color_cyan")
	sculk_shroom.soundType("sculk_vein")
	sculk_shroom.waterlogged() //Poolrooms ADDITION
	sculk_shroom.renderType("cutout")
	sculk_shroom.tag("minecraft:mineable/hoe")
	sculk_shroom.box(4,0,4,12,16,12)
	sculk_shroom.noCollision()
	sculk_shroom.opaque(false)
}