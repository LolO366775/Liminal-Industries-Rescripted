// priority: 1000
// Mekanism validates fluid *tags* on server start and shows a login warning if any are empty.
// With allowAsyncStreams=true, KubeJS can race Forge tag building and leave minecraft:water empty.
// common.properties sets allowAsyncStreams=false; tags below are a backup.
ServerEvents.tags('fluid', event => {
	event.add('minecraft:water', 'minecraft:water')
	event.add('minecraft:water', 'minecraft:flowing_water')
	event.add('forge:water', 'minecraft:water')
	event.add('forge:water', 'minecraft:flowing_water')
	event.add('forge:brine', 'mekanism:brine')
	event.add('forge:brine', 'mekanism:flowing_brine')
})

ServerEvents.recipes(event => {
	// Empty tag forge:sulfur_dioxide (fluid) — rotary recipe is invalid and breaks MP recipe sync
	event.remove({ id: 'mekanism:rotary/sulfur_dioxide' })
	event.remove({ type: 'mekanism:rotary' })
	event.remove({ type: 'mekanism:evaporating' })

	const brokenIds = [
		'mekanism:reaction/wood_gasification/wooden_slabs',
		'mekanism:reaction/wood_gasification/wooden_stairs',
		'mekanism:reaction/wood_gasification/planks',
		'mekanism:reaction/wood_gasification/logs',
		'mekanism:reaction/wood_gasification/rods_wooden',
		'mekanism:reaction/wood_gasification/dusts_wood',
		'mekanism:reaction/coal_gasification/blocks_coals',
		'mekanism:reaction/coal_gasification/coals',
		'mekanism:reaction/coal_gasification/dusts_coals',
		'mekanism:evaporating/lithium',
		'mekanism:reaction/substrate/water_hydrogen',
		'mekanism:processing/lategame/polonium_pellet/from_reaction',
		'mekanism:processing/lategame/plutonium_pellet/from_reaction',
		'mekanism:processing/copper/slurry/clean',
		'mekanism:processing/gold/slurry/clean',
		'mekanism:processing/osmium/slurry/clean',
		'mekanism:processing/lead/slurry/clean',
		'mekanism:separator/water'
	]
	brokenIds.forEach(id => event.remove({ id: id }))

	// Substrate reactions can reference empty fluid tags in this pack
	let substrateReactions = []
	event.forEachRecipe({ type: 'mekanism:reaction', mod: 'mekanism' }, recipe => {
		let id = String(recipe.getId())
		if (id.indexOf('reaction/substrate/') >= 0) {
			substrateReactions.push(id)
		}
	})
	substrateReactions.forEach(id => event.remove({ id: id }))
})
