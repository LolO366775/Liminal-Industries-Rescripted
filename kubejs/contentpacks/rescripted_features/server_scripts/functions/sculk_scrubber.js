ServerEvents.recipes(event => {
    event.shaped('kubejs:sculk_scrubber', [
		' C ', 
		'EDE',
		'ABA'  
		],{
		A: 'immersiveengineering:component_electronic',
		B: 'thermal:rf_coil',
		C: 'thermal:device_nullifier',
		D: 'immersiveengineering:light_engineering',
		E: 'minecraft:iron_bars'
	})
    
})
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function scrubber_right_clicked_event(event) {

	let scrubber = event.block
	let facing = scrubber.properties.get("facing")
	if (event.hand == "MAIN_HAND") {
		if (has_sculk_requirement_block(scrubber)) {
			let [pos_x,pos_y,pos_z] = [scrubber.getX() + 0.5,scrubber.getY() + 0.5,scrubber.getZ() + 0.5]
			event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.warden.death","blocks",1,0)
			event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.respawn_anchor.charge","blocks",1,0)
			event.level.spawnParticles("minecraft:sonic_boom",false,pos_x,pos_y,pos_z,0,0,0,1,0.1)
			scrubber.set("kubejs:sculked_sculk_scrubber", {"facing":facing})
		} else if (event.getPlayer() != null) {
			event.player.tell("You need to place the scrubber on sculk!")
		}
	}
}
/**
* @param {Internal.BlockContainerJS} scrubber
*/
function has_sculk_requirement_block(scrubber) {
	let facing = scrubber.properties.get("facing")
	if (facing == "north") {
		return (scrubber.getNorth().getId() == "minecraft:sculk" || scrubber.getNorth().getId() == "kubejs:sculk_spawner")
	}
	if (facing == "south") {
		return (scrubber.getSouth().getId() == "minecraft:sculk" || scrubber.getSouth().getId() == "kubejs:sculk_spawner")
	}
	if (facing == "east") {
		return (scrubber.getEast().getId() == "minecraft:sculk" || scrubber.getEast().getId() == "kubejs:sculk_spawner")
	}
	if (facing == "west") {
		return (scrubber.getWest().getId() == "minecraft:sculk" || scrubber.getWest().getId() == "kubejs:sculk_spawner")
	}
	if (facing == "up") {
		return (scrubber.getUp().getId() == "minecraft:sculk" || scrubber.getUp().getId() == "kubejs:sculk_spawner")
	}
	if (facing == "down") {
		return (scrubber.getDown().getId() == "minecraft:sculk" || scrubber.getDown().getId() == "kubejs:sculk_spawner")
	}
	return false
}