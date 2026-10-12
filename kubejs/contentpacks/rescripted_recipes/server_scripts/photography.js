ServerEvents.recipes(event => {
	event.remove({id:"actuallyadditions:lens"})
	event.shapeless('actuallyadditions:lens', ['minecraft:glass','kubejs:scrap'])
	event.remove({id:"exposure:camera"})
	event.shapeless('exposure:camera', ['kubejs:battery','kubejs:scrap',"actuallyadditions:lens"])
	event.shapeless('kubejs:battery', ["exposure:camera"])
	event.remove({id:"minecraft:recovery_compass"})
	event.shapeless('minecraft:recovery_compass', ['exposure:photograph','kubejs:scrap'])
})