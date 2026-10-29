//Server-Startup Bridge Functions
/**
* @param {Internal.BlockEntityJS} entity
*/
global.feature_locker_tick_event = entity => {
	let locker = entity.block
	feature_locker_tick(locker)
}
//Functions
/**
* @param {Internal.BlockContainerJS} locker
*/
function feature_locker_tick(locker){
	let level = locker.getLevel()
	let half = locker.properties.get("half")
	let facing = locker.properties.get("facing")
	let dimension = level.getDimension()
	if (dimension != "backrooms:room_forge") {
		if (half == "bottom") {
			if (Math.random() >= 0.02) {
				locker.set("kubejs:pool_locker_single",{"facing":facing,"half":"bottom"})
				locker.getUp().set("kubejs:pool_locker_single",{"facing":facing,"half":"top"})
			} else {
				locker.set("kubejs:locker_sculkling",{"facing":facing,"half":"bottom"})
				locker.set("kubejs:locker_sculkling",{"facing":facing,"half":"top"})
			}
		}
	}
}