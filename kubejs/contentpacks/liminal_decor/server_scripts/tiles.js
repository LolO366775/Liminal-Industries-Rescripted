BlockEvents.rightClicked('kubejs:missing_tiles_half', event => {

	if (event.item.id == 'kubejs:tiles_blue') {
		event.item.count--
        event.block.set("kubejs:tiles_blue_block")
	}
})
BlockEvents.rightClicked('kubejs:tiles_blue_block', event => {
    const { player, hand } = event
    if (!event.item.hasTag('minecraft:pickaxes'))
        return
    player.damageHeldItem(hand, 1)
    event.block.set('kubejs:missing_tiles_half')
    event.block.popItemFromFace('kubejs:tiles_blue', event.facing)
})