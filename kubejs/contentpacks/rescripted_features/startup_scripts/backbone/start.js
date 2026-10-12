StartupEvents.registry('block', event => {
	let loader = "rescripted" //rescripted-legacy-custom
	if (loader == "rescripted") {
		block_registry_rescripted(event)
	}
})
StartupEvents.registry('item', event => {
	let loader = "rescripted" //rescripted-legacy-custom
	if (loader == "rescripted") {
		item_registry_rescripted(event)
	}
})
StartupEvents.registry('fluid', event => {
	event.create('liquid_time')
	.displayName('The Flow of Time')
	.stillTexture('kubejs:block/liquid_time_flow')
	.flowingTexture('kubejs:block/liquid_time_flow')
	.bucketColor(0xFFFFFF)
	.noBlock() 
  	event.create('ball_pit')
    .displayName('Ball Pit')
    .stillTexture('kubejs:block/ball_pit_still')
    .flowingTexture('kubejs:block/ball_pit_flow')
})