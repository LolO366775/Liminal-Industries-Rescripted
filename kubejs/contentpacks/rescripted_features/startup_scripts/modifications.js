BlockEvents.modification(event => {
	
	event.modify('supplementaries:book_pile', block => {
		block.destroySpeed = 0.0
	})

	event.modify('supplementaries:book_pile_horizontal', block => {
		block.destroySpeed = 0.0
	})

	let unbreakable = (block_id) => {
		event.modify(block_id, block => {
			block.explosionResistance = 10000.0
			block.destroySpeed = -1.0
		})
	}
	let antiblocks = (colour) => {
		unbreakable(`antiblocksrechiseled:bright_${colour}`)
		unbreakable(`antiblocksrechiseled:bright_${colour}_border`)
		unbreakable(`antiblocksrechiseled:slab_${colour}_bright`)
		unbreakable(`antiblocksrechiseled:stair_${colour}_bright`)
	}
	let wool_antiblocks = (colour) => {
		unbreakable(`antiblocksrechiseled:wool_${colour}`)
		unbreakable(`antiblocksrechiseled:wool_${colour}_border`)
	}
	antiblocks("red")
	antiblocks("orange")
	antiblocks("yellow")
	antiblocks("green")
	antiblocks("cyan")
	antiblocks("blue")
	antiblocks("magenta")
	antiblocks("white")
	antiblocks("black")
	wool_antiblocks("brown")
	wool_antiblocks("red")
	wool_antiblocks("orange")
	wool_antiblocks("yellow")
	wool_antiblocks("lime")
	wool_antiblocks("green")
	wool_antiblocks("cyan")
	wool_antiblocks("light_blue")
	wool_antiblocks("blue")
	wool_antiblocks("purple")
	wool_antiblocks("magenta")
	wool_antiblocks("pink")
	wool_antiblocks("white")
	wool_antiblocks("light_gray")
	wool_antiblocks("gray")
	wool_antiblocks("black")

	unbreakable("blockofsky:void_block")
	unbreakable("blockofsky:sky_block")
	unbreakable("immersiveengineering:fluid_placer")
	unbreakable("immersiveengineering:feedthrough")
	unbreakable("minecraft:suspicious_sand")
	unbreakable("minecraft:suspicious_gravel")

	// Dynamic Trees' rooty version of the soggy carpet: match the carpet's
	// unbreakable behavior so the backrooms floor stays consistent.
	event.modify('dynamictrees:rooty_soggy_carpet', block => {
		block.explosionResistance = 10000.0
		block.destroySpeed = -1.0
	})
})

ItemEvents.modification(event => {
 	event.modify('dustrial_decor:cardboard_box', item => {
   		item.setBurnTime(2000)
  	})

	event.modify('dustrial_decor:folded_cardboard', item => {
   		item.setBurnTime(2000)
  	})

	event.modify('dustrial_decor:smooth_cardboard', item => {
   		item.setBurnTime(2000)
  	})
})

//ForgeEvents.onEvent("net.minecraftforge.event.entity.player.PlayerEvent$BreakSpeed", event => global.breakSpeed(event))
/**
 * 
 * @param {Internal.PlayerEvent$BreakSpeed} event
 */
/*global.breakSpeed = event => {
    try {
        if (event.entity.level.getBlock(event.getPosition().get()).hasTag('kubejs:unbreakable'))
            event.setNewSpeed(0)
    } catch (error) {
        console.log(error)
    }
}*/