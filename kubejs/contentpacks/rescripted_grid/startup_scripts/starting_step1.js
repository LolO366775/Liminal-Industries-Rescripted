/**
* @param {Internal.Player} player
*/
global.enter_backrooms = player => {
	enter_area("backrooms",player)
}
/**
* @param {Internal.Player} player
*/
global.enter_poolrooms = player => {
	if (!player.isFake()) {
		enter_area("poolrooms",player)
	}
}
/**
* @param {Internal.Player} player
* @param {String} area
*/
function enter_area(area, player){
    if (area == "backrooms") {
		player.teleportTo("minecraft:overworld",-999.5,23,-999.5,90,0)
        return 1
    } else if (area == "poolrooms") {
		player.teleportTo("backrooms:poolrooms",0.5,23,0.5,90,0)
		poolrooms_entry_sound(player,0.5,23,0.5)
        return 1
    }
    return 0
}
/**
* @param {Number} pos_x
* @param {Number} pos_y
* @param {Number} pos_z
* @param {Internal.Player} player
*/
function poolrooms_entry_sound(player,pos_x,pos_y,pos_z){
	let server = player.getServer()
	let level = server.getLevel("backrooms:poolrooms")
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.player.splash.high_speed","blocks",1,0)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.player.splash","blocks",1,1)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.player.splash","blocks",1,0)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.underwater.enter","blocks",1,0)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.cave","blocks",35,0)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.cave","blocks",35,0)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.cave","blocks",35,0)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.cave","blocks",35,0)
	level.playSound(null,pos_x,pos_y,pos_z,"minecraft:ambient.cave","blocks",35,0)
	level.spawnParticles("particular:water_splash_emitter",false,pos_x,pos_y,pos_z,0,0,0,30,1.5)
	level.spawnParticles("minecraft:bubble",false,pos_x,pos_y,pos_z,2,2,2,200,0)
	level.spawnParticles("minecraft:falling_water",false,pos_x,pos_y,pos_z,2,5,2,100,1)
}