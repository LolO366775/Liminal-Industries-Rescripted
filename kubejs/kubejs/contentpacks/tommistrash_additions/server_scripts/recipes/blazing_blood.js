ServerEvents.recipes(event => {
	event.recipes.createCompacting([Fluid.of('tconstruct:blazing_blood', 10)], Ingredient.of('tconstruct:ichor_congealed_slime')).heated()
})