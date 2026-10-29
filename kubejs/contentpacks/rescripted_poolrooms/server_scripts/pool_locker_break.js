BlockEvents.broken(event => {
	let locker = event.getBlock()
	if (locker.hasTag("kubejs:pool_lockers")) {
		global.pool_locker_break(locker)
	}
})
/**
* @param {Internal.BlockContainerJS} locker
*/
global.pool_locker_break = (locker) => {
	if (locker.hasTag("kubejs:pool_lockers")) {
		let half = locker.properties.get("half")
		if (half == "bottom") {
			let up = locker.getUp()
			let up_half = up.properties.get("half")
			if (up.hasTag("kubejs:pool_lockers") && up_half == "top") {
				locker.set("minecraft:air")
				up.set("minecraft:air")
			}
		} else if (half == "top") {
			let down = locker.getDown()
			let down_half = down.properties.get("half")
			if (down.hasTag("kubejs:pool_lockers") && down_half == "bottom") {
				locker.set("minecraft:air")
				down.set("minecraft:air")
			}
		}
	}
}