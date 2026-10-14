// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('Hello, World! (Loaded startup scripts)')

StartupEvents.registry('fluid', event => {


	event.create('blue_almond_water')
	.displayName('Cocunut Almond Water')
	.thinTexture(Color.BLUE)
	.noBucket()

	event.create('green_almond_water')
	.displayName('Mint Almond Water')
	.thinTexture(Color.GREEN)
	.noBucket()

	event.create('red_almond_water')
	.displayName('Strawberry Almond Water')
	.thinTexture(Color.RED)
	.noBucket()
})

