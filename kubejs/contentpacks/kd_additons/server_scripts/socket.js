BlockEvents.placed('minecraft:chain', event => {
	const ceiling = event.block.up
  if (ceiling.id === 'kubejs:ceilling_socket') {
        ceiling.set('kubejs:ceilling_socket', {
            occupied: 'true'
		})
    }
})
BlockEvents.broken('minecraft:chain', event => {
	const ceiling = event.block.up
  if (ceiling.id === 'kubejs:ceilling_socket') {
        ceiling.set('kubejs:ceilling_socket', {
            occupied: 'false'
		})
    }
})
BlockEvents.placed('kubejs:ceilling_scrap_fixed', event => {
	const ceiling = event.block.up
  if (ceiling.id === 'kubejs:ceilling_socket') {
        ceiling.set('kubejs:ceilling_socket', {
            occupied: 'true'
		})
    }
})
BlockEvents.broken('kubejs:ceilling_scrap_fixed', event => {
	const ceiling = event.block.up
  if (ceiling.id === 'kubejs:ceilling_socket') {
        ceiling.set('kubejs:ceilling_socket', {
            occupied: 'false'
		})
    }
})