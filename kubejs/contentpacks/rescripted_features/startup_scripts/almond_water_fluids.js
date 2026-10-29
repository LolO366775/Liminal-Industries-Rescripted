StartupEvents.registry('fluid', event => {
	let register_red = event.create('red_almond_water')
	register_red.stillTexture("kubejs:block/almond_water/strawberry_still")
	register_red.flowingTexture("kubejs:block/almond_water/strawberry_flow")
	//register_red.noBlock()
	register_red.displayName('Strawberry Almond Water')
	register_red.bucketItem.modelJson({
    	"parent": "item/generated",
    	"textures": {
        	"layer0": "kubejs:item/almond_water/strawberry_bucket"
    	}
	})

	let register_blue = event.create('blue_almond_water')
	register_blue.stillTexture("kubejs:block/almond_water/coconut_still")
	register_blue.flowingTexture("kubejs:block/almond_water/coconut_flow")
	//register_blue.noBlock()
	register_blue.displayName('Coconut Almond Water')
	register_blue.bucketItem.modelJson({
    	"parent": "item/generated",
    	"textures": {
        	"layer0": "kubejs:item/almond_water/coconut_bucket"
    	}
	})

	let register_green = event.create('green_almond_water')
	register_green.stillTexture("kubejs:block/almond_water/mint_still")
	register_green.flowingTexture("kubejs:block/almond_water/mint_flow")
	//register_green.noBlock()
	register_green.displayName('Mint Almond Water')
	register_green.bucketItem.modelJson({
    	"parent": "item/generated",
    	"textures": {
        	"layer0": "kubejs:item/almond_water/mint_bucket"
    	}
	})
})