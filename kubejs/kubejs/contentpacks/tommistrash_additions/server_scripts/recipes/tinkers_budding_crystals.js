ServerEvents.recipes(event => {
    event.recipes.thermal.bottler('tconstruct:budding_earth_slime_crystal', [
	Fluid.of('actuallyadditions:crystallized_oil', 1000), 
	'tconstruct:earth_slime_crystal_block'])
    event.recipes.thermal.bottler('tconstruct:budding_sky_slime_crystal', [
	Fluid.of('actuallyadditions:crystallized_oil', 1000), 
	'tconstruct:sky_slime_crystal_block'])
    event.recipes.thermal.bottler('tconstruct:budding_ichor_slime_crystal', [
	Fluid.of('actuallyadditions:crystallized_oil', 1000), 
	'tconstruct:ichor_slime_crystal_block'])
    event.recipes.thermal.bottler('tconstruct:budding_ender_slime_crystal', [
	Fluid.of('actuallyadditions:crystallized_oil', 1000), 
	'tconstruct:ender_slime_crystal_block'])
})