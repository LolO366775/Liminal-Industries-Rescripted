// priority: 0
StartupEvents.registry('block', event => {

	let blockstate_variant = (model,y) => {
		let variant = {
			"model": `kubejs:block/${model}`,
    		"y": y
		}
		return variant
	}
	let locker_blockstate_model = (top,bottom) => {
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
		return model
	}
    
    event.create('pool_locker_single')
        .soundType("metal")
        .property(BlockProperties.FACING)
        .property(BlockProperties.HALF)
		.unbreakable()
		.tagBlock('wither_immune')
        .placementState(state => {
            state.set(BlockProperties.FACING, state.horizontalDirection.opposite)
            state.set(BlockProperties.HALF, 'bottom')
        })
		.displayName('Pool Locker')
        .blockEntity(entityInfo => {
		})
		.blockstateJson = {
			"variants": locker_blockstate_model("pool_locker_single_top","pool_locker_single_bottom")
		}
		
    event.create('pool_locker_double').displayName('Pool Locker')
        .soundType("metal")
        .property(BlockProperties.FACING)
        .property(BlockProperties.HALF)
		.unbreakable()
		.tagBlock('wither_immune')
        .placementState(state => {
            state.set(BlockProperties.FACING, state.horizontalDirection.opposite)
            state.set(BlockProperties.HALF, 'bottom')
        })
        .blockEntity(entityInfo => {
		})
		.blockstateJson = {
			"variants": locker_blockstate_model("pool_locker_double_top","pool_locker_double_bottom")
		}

	event.create('open_pool_locker_single').displayName('Pool Locker')
        .soundType("metal")
        .property(BlockProperties.FACING)
        .property(BlockProperties.HALF)
		.property(BlockProperties.CHISELED_BOOKSHELF_SLOT_0_OCCUPIED)
		.property(BlockProperties.CHISELED_BOOKSHELF_SLOT_1_OCCUPIED)
		.property(BlockProperties.CHISELED_BOOKSHELF_SLOT_2_OCCUPIED)
		.property(BlockProperties.CHISELED_BOOKSHELF_SLOT_3_OCCUPIED)
		.unbreakable()
		.tagBlock('wither_immune')
		.transparent(true)
		.defaultCutout()
        .placementState(state => {
            state.set(BlockProperties.FACING, state.horizontalDirection.opposite)
            state.set(BlockProperties.HALF, 'bottom')
			state.set(BlockProperties.CHISELED_BOOKSHELF_SLOT_0_OCCUPIED, true)
			state.set(BlockProperties.CHISELED_BOOKSHELF_SLOT_1_OCCUPIED, true)
			state.set(BlockProperties.CHISELED_BOOKSHELF_SLOT_2_OCCUPIED, true)
			state.set(BlockProperties.CHISELED_BOOKSHELF_SLOT_3_OCCUPIED, true)
        })
        .blockEntity(entityInfo => {
		})
		
    event.create('open_pool_locker_double').displayName('Pool Locker')
        .soundType("metal")
        .property(BlockProperties.FACING)
        .property(BlockProperties.HALF)
		.property(BlockProperties.CHISELED_BOOKSHELF_SLOT_0_OCCUPIED)
		.property(BlockProperties.CHISELED_BOOKSHELF_SLOT_1_OCCUPIED)
		.property(BlockProperties.CHISELED_BOOKSHELF_SLOT_2_OCCUPIED)
		.property(BlockProperties.CHISELED_BOOKSHELF_SLOT_3_OCCUPIED)
		.property(BlockProperties.AGE_25)
		.unbreakable()
		.tagBlock('wither_immune')
		.transparent(true)
		.defaultCutout()
        .placementState(state => {
            state.set(BlockProperties.FACING, state.horizontalDirection.opposite)
            state.set(BlockProperties.HALF, 'bottom')
			state.set(BlockProperties.CHISELED_BOOKSHELF_SLOT_0_OCCUPIED, true)
			state.set(BlockProperties.CHISELED_BOOKSHELF_SLOT_1_OCCUPIED, true)
			state.set(BlockProperties.CHISELED_BOOKSHELF_SLOT_2_OCCUPIED, true)
			state.set(BlockProperties.CHISELED_BOOKSHELF_SLOT_3_OCCUPIED, true)
			state.set(BlockProperties.AGE_25, 0)
        })
        .blockEntity(entityInfo => {
		})

	event.create('locker_sculkling').displayName('Pool Locker')
        .soundType("metal")
        .property(BlockProperties.FACING)
        .property(BlockProperties.HALF)
		.property(BlockProperties.OPEN)
        .property(BlockProperties.TRIGGERED)
		.unbreakable()
		.tagBlock('wither_immune')
		.transparent(true)
		.defaultCutout()
        .placementState(state => {
            state.set(BlockProperties.FACING, state.horizontalDirection.opposite)
            state.set(BlockProperties.HALF, 'bottom')
			state.set(BlockProperties.OPEN, false)
            state.set(BlockProperties.TRIGGERED, false)
        })
		.blockEntity(entityInfo => {
			entityInfo.serverTick(20, 0, entity => {
				global.locker_sculkling_tick_event(entity)
			})
		})
})
