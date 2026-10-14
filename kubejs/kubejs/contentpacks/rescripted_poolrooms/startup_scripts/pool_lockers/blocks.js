// priority: 0
StartupEvents.registry('block', event => {
	register_locker(event,"pool_locker_single","single","Pool Locker (Single)")
	register_locker(event,"pool_locker_double","double","Pool Locker (Double)")
	register_locker(event,"open_pool_locker_single","open_single","Open Pool Locker (Single)")
	register_locker(event,"open_pool_locker_double","open_double","Open Pool Locker (Double)")
	register_locker(event,"locker_sculkling","sculkling","Pool Locker (Occupied)")
	register_locker(event,"feature_locker_single","feature_single","Feature Locker")
})
/**
* @param {Registry.Block} event
* @param {String} locker_id
* @param {String} type
* @param {String} display_name
*/
function register_locker(event,locker_id,type,display_name) {
	let builder = event.create(locker_id)
    builder.soundType("metal")
	builder.unbreakable()
	builder.tagBlock('wither_immune')
	builder.tagBlock('kubejs:pool_lockers')
	builder.displayName(display_name)
	builder.transparent(true)
	builder.defaultCutout()
	modify_locker_set_properties(builder,type)
	modify_locker_block_entity(builder,type)
	modify_locker_placement_state(builder,type)
	modify_locker_blockstate_model(builder,type)
}
/**
* @param {Internal.BasicBlockJS$Builder} builder
* @param {String} type
*/
function modify_locker_block_entity(builder,type) {
	if (type == "sculkling") {
		builder.blockEntity(entityInfo => {
			entityInfo.serverTick(20, 0, entity => {
				global.locker_sculkling_tick_event(entity)
			})
		})
	} else if (type == "feature_single") {
		builder.blockEntity(entityInfo => {
			entityInfo.serverTick(20, 0, entity => {
				global.feature_locker_tick_event(entity)
			})
		})
	} else {
		builder.blockEntity(entityInfo => {})
	}
}
/**
* @param {Internal.BasicBlockJS$Builder} builder
* @param {String} type
*/
function modify_locker_placement_state(builder,type) {
	builder.placementState(state => {
        state.set(BlockProperties.FACING, state.horizontalDirection.opposite)
        state.set(BlockProperties.HALF, 'bottom')
		if (type == "open_single") {
			modify_locker_set_open_placement_state(state,false)
		} else if (type == "open_double") {
			modify_locker_set_open_placement_state(state,true)
		} else if (type == "sculkling") {
			state.set(BlockProperties.OPEN, false)
            state.set(BlockProperties.TRIGGERED, false)
		}
    })
}
/**
* @param {Internal.BasicBlockJS$Builder} builder
* @param {String} type
*/
function modify_locker_blockstate_model(builder,type) {
	let top = `${type}_top`
	let bottom = `${type}_bottom`
	let blockstate_variant = (model,y) => {
		let variant = {
			"model": `kubejs:block/pool_lockers/${model}`,
    		"y": y
		}
		return variant
	}
	let model = {
		"facing=north,half=top": blockstate_variant(top,0),
        "facing=east,half=top": blockstate_variant(top,90),
        "facing=south,half=top": blockstate_variant(top,180),
        "facing=west,half=top": blockstate_variant(top,270),
        "facing=north,half=bottom": blockstate_variant(bottom,0),
        "facing=east,half=bottom": blockstate_variant(bottom,90),
        "facing=south,half=bottom": blockstate_variant(bottom,180),
        "facing=west,half=bottom": blockstate_variant(bottom,270)
	}
	builder.blockstateJson = {
		"variants": model
	}
}
/**
* @param {Internal.BasicBlockJS$Builder} builder
* @param {String} type
*/
function modify_locker_set_properties(builder,type) {
 	builder.property(BlockProperties.FACING)
    builder.property(BlockProperties.HALF)
	if (type == "open_single") {
		modify_locker_set_open_properties(builder,false)
	} else if (type == "open_double") {
		modify_locker_set_open_properties(builder,true)
	} else if (type == "sculkling") {
		builder.property(BlockProperties.OPEN)
        builder.property(BlockProperties.TRIGGERED)
	}
}
/**
* @param {Internal.BlockStateModifyPlacementCallbackJS} builder
* @param {Boolean} double
*/
function modify_locker_set_open_properties(builder,double) {
	builder.property(BlockProperties.CHISELED_BOOKSHELF_SLOT_0_OCCUPIED)
	builder.property(BlockProperties.CHISELED_BOOKSHELF_SLOT_1_OCCUPIED)
	builder.property(BlockProperties.CHISELED_BOOKSHELF_SLOT_2_OCCUPIED)
	builder.property(BlockProperties.CHISELED_BOOKSHELF_SLOT_3_OCCUPIED)
	if (double) {
		builder.property(BlockProperties.AGE_25)
	}
}
/**
* @param {Internal.BlockStateModifyPlacementCallbackJS} state
* @param {Boolean} double
*/
function modify_locker_set_open_placement_state(state,double) {
	state.set(BlockProperties.CHISELED_BOOKSHELF_SLOT_0_OCCUPIED, true)
	state.set(BlockProperties.CHISELED_BOOKSHELF_SLOT_1_OCCUPIED, true)
	state.set(BlockProperties.CHISELED_BOOKSHELF_SLOT_2_OCCUPIED, true)
	state.set(BlockProperties.CHISELED_BOOKSHELF_SLOT_3_OCCUPIED, true)
	if (double) {
		state.set(BlockProperties.AGE_25, 0)
	}
}