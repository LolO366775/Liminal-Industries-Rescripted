ForgeEvents.onEvent("net.minecraftforge.event.entity.ProjectileImpactEvent", event => {
	global.projectile_impact_event(event)
})
/**
* @param {Internal.ProjectileImpactEvent} event
*/
global.projectile_impact_event = (event) => {
	let projectile = event.getProjectile()
	let projectile_type = projectile.getType()
	if (projectile_type == "supplementaries:brick_projectile") {
		brick_projectile_impact(projectile)
	}
}
/**
* @param {Internal.Projectile} projectile
*/
function brick_projectile_impact(projectile){
	try {
		let level = projectile.getLevel()
		let position = projectile.getPos()
		let [pos_x,pos_y,pos_z] = [position.x() - 0.5,position.y() - 0.5,position.z() - 0.5]
		let hit_block = level.getBlock(pos_x,pos_y,pos_z)
		global.explode_lamps_in_radius_block(hit_block,1)
	} catch (error) {}
}