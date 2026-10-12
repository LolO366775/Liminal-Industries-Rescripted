/**
* @param {Internal.BlockContainerJS} lamp
*/
function get_falling_lamp_conversion(lamp){
	try {
		let conversions = [
			["kubejs:yellow_ceilling_lamps_on", "kubejs:ceilling_scrap"],
			["kubejs:yellow_ceilling_lamps_off", "kubejs:ceilling_scrap"],
			["kubejs:yellow_ceilling_lamps_broken", "kubejs:broken_ceilling_scrap"],
			["kubejs:white_ceilling_lamps_on", "kubejs:ceilling_scrap"],
			["kubejs:white_ceilling_lamps_off", "kubejs:ceilling_scrap"],
			["kubejs:white_ceilling_lamps_broken", "kubejs:broken_white_ceilling_scrap"]
		]
		for (let index = 0; index < conversions.length; index++) {
			let check_id = conversions[index][0]
			if (lamp.hasTag(check_id)) {
				let result = conversions[index][1]
				return result
			}
		}
	} catch (error) {}
	return null
}
BlockEvents.rightClicked(event => {
	let lamp = event.getBlock()
	if (lamp.hasTag("kubejs:ceilling_lamps")) {
		if (event.getItem() == "kubejs:crowbar") {
			crowbar_ceiling_lamp_event(event)
		}
	} else if (lamp.getId() == "kubejs:crimsite_lamp") {
		rip_lamp_event(event,"kubejs:crimsite_lamp_falling")
	}
})
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function crowbar_ceiling_lamp_event(event){
	let lamp = event.getBlock()
	let [pos_x,pos_y,pos_z] = [lamp.getX() + 0.5,lamp.getY(),lamp.getZ() + 0.5]
	event.level.spawnParticles("minecraft:crit",false,pos_x,pos_y,pos_z,0.1,0.1,0.1,5,0.5)
	if (lamp.hasTag("kubejs:ceilling_lamps")) {
		if (lamp.down.id !== 'minecraft:air' &&
        lamp.down.id !== 'torchmaster:invisible_light')
        return
		if (0.2 >= Math.random()) {
			event.item.shrink(1)
			event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:item.shield.break","blocks",0.5,0)
			event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.zombie.attack_iron_door","blocks",0.5,1)
		} else {
			event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.zombie.attack_iron_door","blocks",0.5,2)
			let falling_id = get_falling_lamp_conversion(lamp)
			if (falling_id != null) {
				rip_lamp_event(event,falling_id)
			}
		}
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {string} falling_id
*/
//code copied from kd_additions to make it compatible with the nerf. The other script should be disabled.
function rip_lamp_event(event,falling_id){
    const lamp = event.block
    if (event.item.id !== 'kubejs:crowbar')
        return
    if (lamp.down.id !== 'minecraft:air' &&
        lamp.down.id !== 'torchmaster:invisible_light')
        return
    const ripLamp = block => {
        event.level.playSound(null,lamp.x,lamp.y,lamp.z,'immersiveengineering:tesla','blocks',0.3,1.2)
        event.level.playSound(null,lamp.x,lamp.y,lamp.z,'block.chain.break','blocks',1.0,1.0)
        let below = block.down
        while (below.id === 'torchmaster:invisible_light') {
            below.set('minecraft:air')
            below = below.down
        }
        block.down.set(falling_id)
        block.set('kubejs:ceilling_socket', {
            occupied: 'false'
        })
    }
    ripLamp(lamp)
	//removed due to being too restrictive
    /*const touching = [
        lamp.north,
        lamp.south,
        lamp.east,
        lamp.west,
		lamp.north.east,
        lamp.north.west,
        lamp.south.east,
        lamp.south.west
    ]
    touching.forEach(block => {
        if (block.id !== 'kubejs:ceilling_lamp')
            return

        if (block.down.id !== 'minecraft:air' &&
            block.down.id !== 'minecraft:light')
            return

        ripLamp(block)
    })*/
}