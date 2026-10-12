ServerEvents.recipes(event => {
	event.remove({output:"farmersdelight:rope"})
	event.remove({output:"supplementaries:rope"})
	event.shapeless("3x supplementaries:rope", ["farmersdelight:straw","farmersdelight:straw","farmersdelight:straw"])
	event.replaceInput({id:"farmersdelight:safety_net"},"farmersdelight:rope","supplementaries:rope")
	event.shaped('2x minecraft:arrow', [
    'C', 
    'S',
    'F'  
    ],{
      C: 'kubejs:concrete_piece', 
      S: 'minecraft:stick',
      F: 'minecraft:feather'
  })
})


