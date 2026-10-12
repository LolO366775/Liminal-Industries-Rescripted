ServerEvents.recipes(event => {

	event.recipes.create.compacting('6x create:copper_nugget', [
		'create:fluid_pipe'
	  ]).heatLevel("LOWHEATED2")
})