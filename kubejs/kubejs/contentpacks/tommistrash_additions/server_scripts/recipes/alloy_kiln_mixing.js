ServerEvents.recipes(event => {

	event.recipes.createMixing('eidolon:pewter_ingot', [
		'minecraft:iron_ingot',
		'2x thermal:lead_ingot'
	]).heated()

    event.recipes.createMixing('4x thermal:bronze_ingot', [
		'3x minecraft:copper_ingot',
		'thermal:tin_ingot'
	]).heated()
    
    event.recipes.createMixing('3x thermal:invar_ingot', [
		'2x minecraft:iron_ingot',
		'thermal:nickel_ingot'
	]).heated()

	event.remove({ id: 'createaddition:compat/tconstruct/manyullyn' })
    event.recipes.createMixing('4x tconstruct:manyullyn_ingot', [
		'3x tconstruct:cobalt_ingot',
		'minecraft:netherite_scrap'
	]).heated()

    event.recipes.createMixing('2x immersiveengineering:insulating_glass', [
		'2x #forge:glass',
		'#forge:dusts/iron'
	]).heated()
})