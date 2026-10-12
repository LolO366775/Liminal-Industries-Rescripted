StartupEvents.registry('item', event => {
	event.create('basalz_cake').displayName('Basalz Cake')
	event.create('blizz_cake').displayName('Blizz Cake')
	event.create('blitz_cake').displayName('Blitz Cake')
})
StartupEvents.registry('block', event => {
	register_elemental_cake_block(event,"blaze_cake_block","Blaze Cake","blaze")
	register_elemental_cake_block(event,"basalz_cake_block","Basalz Cake","basalz")
	register_elemental_cake_block(event,"blizz_cake_block","Blizz Cake","blizz")
	register_elemental_cake_block(event,"blitz_cake_block","Blitz Cake","blitz")
})
/**
* @param {Registry.Block} event
* @param {string} cake_id
* @param {string} display_name
* @param {String} type
*/
function register_elemental_cake_block(event,cake_id,display_name,type) {
	let builder = event.create(cake_id)
    builder.soundType("wool")
	builder.displayName(display_name)
	builder.noItem()
	builder.defaultCutout()
	builder.transparent(true)
	builder.box(1,0,1,15,8,15)
	//builder.pickBlock()
	builder.property(BlockProperties.BITES)
	builder.placementState(state => {
        state.set(BlockProperties.BITES, 0)
    })
	modify_elemental_cake_blockstate_model(builder,type)
}
/**
* @param {Internal.BasicBlockJS$Builder} builder
* @param {String} type
*/
function modify_elemental_cake_blockstate_model(builder,type) {
	let blockstate_variant = (model) => {
		let variant = {
			"model": `kubejs:block/cakes/${type}/${model}`,
		}
		return variant
	}
	let model = {
		"bites=0": blockstate_variant("cake"),
		"bites=1": blockstate_variant("cake_slice1"),
		"bites=2": blockstate_variant("cake_slice2"),
		"bites=3": blockstate_variant("cake_slice3"),
		"bites=4": blockstate_variant("cake_slice4"),
		"bites=5": blockstate_variant("cake_slice5"),
		"bites=6": blockstate_variant("cake_slice6")
	}
	builder.blockstateJson = {
		"variants": model
	}
}