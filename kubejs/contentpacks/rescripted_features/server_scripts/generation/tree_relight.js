// priority: 0
// Backrooms rooms are lit by a field of invisible `minecraft:light` blocks, not
// by the ceiling lamps (lamp block-light can't reach the floor). When a Dynamic
// Trees tree grows it overwrites those light blocks with trunk/branch/leaves, so
// after felling the tree those positions are plain air and the spot stays dark.
//
// On tree cut we refill the trunk column with `minecraft:light`, copying the
// level from a nearby existing light block in the same room (so it matches the
// room's current lights-on / lights-off state), mirroring the circuit-breaker
// lights system. If no room light block is found nearby (e.g. a tree grown
// outside the backrooms) we fall back to a plain vanilla relight instead.

const BlockPos = Java.loadClass('net.minecraft.core.BlockPos')

// Volume around the felled trunk base, in blocks.
const FILL_RADIUS = 4
const FILL_UP = 30
const FILL_DOWN = 2
// How far past FILL_RADIUS to look for an existing room light block to sample.
const SAMPLE_MAX_DIST = 6

/**
 * Find a `minecraft:light` block in the surrounding room and return its `level`
 * value (as a string), or null if none is nearby.
 * @param {Internal.Level} level
 */
function sampleRoomLightLevel(level, bx, by, bz) {
	const heights = [2, 5, 8, 12]
	for (let h = 0; h < heights.length; h++) {
		const y = by + heights[h]
		for (let d = FILL_RADIUS + 1; d <= FILL_RADIUS + SAMPLE_MAX_DIST; d++) {
			const candidates = [
				[bx + d, y, bz],
				[bx - d, y, bz],
				[bx, y, bz + d],
				[bx, y, bz - d]
			]
			for (let i = 0; i < candidates.length; i++) {
				const c = candidates[i]
				const b = level.getBlock(c[0], c[1], c[2])
				if (String(b.id) === 'minecraft:light') {
					const lvl = b.properties.get('level')
					return lvl == null ? '15' : String(lvl)
				}
			}
		}
	}
	return null
}

/** Re-check vanilla light over the trunk column so lamp light re-propagates. */
function vanillaRelight(level, bx, by, bz) {
	const lightEngine = level.getChunkSource().getLightEngine()
	for (let x = bx - FILL_RADIUS; x <= bx + FILL_RADIUS; x++) {
		for (let z = bz - FILL_RADIUS; z <= bz + FILL_RADIUS; z++) {
			for (let y = by - FILL_DOWN; y <= by + FILL_UP; y++) {
				lightEngine.checkBlock(new BlockPos(x, y, z))
			}
		}
	}
}

BlockEvents.broken(event => {
	const { level, block, server } = event
	if (level.isClientSide()) return

	const id = String(block.id)
	if (!id.startsWith('dynamictrees')) return
	if (id.indexOf('branch') === -1 && id.indexOf('trunk') === -1) return

	const bx = block.x
	const by = block.y
	const bz = block.z

	// Let Dynamic Trees finish tearing the tree down before restoring light.
	server.scheduleInTicks(2, () => {
		const lightLevel = sampleRoomLightLevel(level, bx, by, bz)

		if (lightLevel == null) {
			vanillaRelight(level, bx, by, bz)
			return
		}

		// Refill the tree's former column with the room's ambient light blocks.
		const dim = level.getDimension()
		server.runCommandSilent(
			`execute in ${dim} run fill ${bx - FILL_RADIUS} ${by - FILL_DOWN} ${bz - FILL_RADIUS} ${bx + FILL_RADIUS} ${by + FILL_UP} ${bz + FILL_RADIUS} minecraft:light[level=${lightLevel}] replace minecraft:air`
		)
	})
})
