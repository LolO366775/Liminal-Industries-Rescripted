ItemEvents.crafted("kubejs:unstable_compound",event => {
	global.crafted_unstable_compound(event)
})
ItemEntityEvents.tick("kubejs:unstable_compound",event => {
	global.dropped_unstable_compound_event(event)
})