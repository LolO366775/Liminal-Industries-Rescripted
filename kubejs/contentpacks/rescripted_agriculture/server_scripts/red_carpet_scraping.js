BlockEvents.leftClicked("kubejs:red_carpet", event  => {
	const carpet = event.block
	if (event.item.id !== "kubejs:putty_knife")
		return
	if (carpet.up.id !== 'minecraft:air' && lamp.down.id !== 'minecraft:light')
        return
	carpet.set('kubejs:carpet')
    carpet.offset(0,1,0).popItemFromFace("kubejs:carpet_dust","up")
	event.cancel()
})