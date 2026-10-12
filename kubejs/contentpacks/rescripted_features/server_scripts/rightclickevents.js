// Shadow gem → shadow steel: see shadow_conversion.js

ItemEvents.rightClicked('minecraft:lava_bucket', event => {
	if (event.item.count > 1) {
		event.cancel()
	}
})
