StartupEvents.registry('block', event => {
	
	event.create('wallpaper_nest').displayName('Wallpaper Nest')
	.fullBlock(true)
	.material("wood")
	.soundType("cherry_wood")
	.unbreakable()
	.tagBlock('wither_immune')
	.property(BlockProperties.AGE_3)
	.property(BlockProperties.LEVEL_HONEY)
	.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_wallpaper_nest(entity)
		})
	})
    .placementState(c =>{
		c.set(BlockProperties.AGE_3, 0)
		c.set(BlockProperties.LEVEL_HONEY, 0)
	})
	.defaultState(c =>{
		c.set(BlockProperties.AGE_3, 0)
		c.set(BlockProperties.LEVEL_HONEY, 0)
	})
    .item(item => 
		item.modelJson({
			"parent": "kubejs:block/nest/nest_0"
		})
	)
    //these need facing values... so I probably should make this a bordered wallpaper variant with multi-part. maybe not have it rotatable for now?
	.blockstateJson = {
        "variants": {
			"age=0,honey_level=0": {
                "model": "kubejs:block/nest/nest_0"
            },
			"age=1,honey_level=0": {
                "model": "kubejs:block/nest/nest_1"
            },
			"age=2,honey_level=0": {
                "model": "kubejs:block/nest/nest_2"
            },
			"age=3,honey_level=0": {
                "model": "kubejs:block/nest/nest_3"
            },
			"age=0,honey_level=1": {
                "model": "kubejs:block/nest/nest_0"
            },
			"age=1,honey_level=1": {
                "model": "kubejs:block/nest/nest_1"
            },
			"age=2,honey_level=1": {
                "model": "kubejs:block/nest/nest_2"
            },
			"age=3,honey_level=1": {
                "model": "kubejs:block/nest/nest_3"
            },
			"age=0,honey_level=2": {
                "model": "kubejs:block/nest/nest_0"
            },
			"age=1,honey_level=2": {
                "model": "kubejs:block/nest/nest_1"
            },
			"age=2,honey_level=2": {
                "model": "kubejs:block/nest/nest_2"
            },
			"age=3,honey_level=2": {
                "model": "kubejs:block/nest/nest_3"
            },
			"age=0,honey_level=3": {
                "model": "kubejs:block/nest/nest_0"
            },
			"age=1,honey_level=3": {
                "model": "kubejs:block/nest/nest_1"
            },
			"age=2,honey_level=3": {
                "model": "kubejs:block/nest/nest_2"
            },
			"age=3,honey_level=3": {
                "model": "kubejs:block/nest/nest_3"
            },
			"age=0,honey_level=4": {
                "model": "kubejs:block/nest/nest_0"
            },
			"age=1,honey_level=4": {
                "model": "kubejs:block/nest/nest_1"
            },
			"age=2,honey_level=4": {
                "model": "kubejs:block/nest/nest_2"
            },
			"age=3,honey_level=4": {
                "model": "kubejs:block/nest/nest_3"
            },
			"age=0,honey_level=5": {
                "model": "kubejs:block/nest/nest_0_honey"
            },
			"age=1,honey_level=5": {
                "model": "kubejs:block/nest/nest_1_honey"
            },
			"age=2,honey_level=5": {
                "model": "kubejs:block/nest/nest_2_honey"
            },
			"age=3,honey_level=5": {
                "model": "kubejs:block/nest/nest_3_honey"
            }
    	}
	}
	event.create('wallpaper_nest_perm').displayName('Wallpaper Nest (Permanent)')
	.fullBlock(true)
	.material("wood")
	.soundType("cherry_wood")
	.unbreakable()
	.tagBlock('wither_immune')
	.property(BlockProperties.AGE_3)
	.property(BlockProperties.LEVEL_HONEY)
    .placementState(c =>{
		c.set(BlockProperties.AGE_3, 0)
		c.set(BlockProperties.LEVEL_HONEY, 0)
	})
	.defaultState(c =>{
		c.set(BlockProperties.AGE_3, 0)
		c.set(BlockProperties.LEVEL_HONEY, 0)
	})
    .item(item => 
		item.modelJson({
			"parent": "kubejs:block/nest/nest_0"
		})
	)
	.blockstateJson = {
        "variants": {
			"age=0,honey_level=0": {
                "model": "kubejs:block/nest/nest_0"
            },
			"age=1,honey_level=0": {
                "model": "kubejs:block/nest/nest_1"
            },
			"age=2,honey_level=0": {
                "model": "kubejs:block/nest/nest_2"
            },
			"age=3,honey_level=0": {
                "model": "kubejs:block/nest/nest_3"
            },
			"age=0,honey_level=1": {
                "model": "kubejs:block/nest/nest_0"
            },
			"age=1,honey_level=1": {
                "model": "kubejs:block/nest/nest_1"
            },
			"age=2,honey_level=1": {
                "model": "kubejs:block/nest/nest_2"
            },
			"age=3,honey_level=1": {
                "model": "kubejs:block/nest/nest_3"
            },
			"age=0,honey_level=2": {
                "model": "kubejs:block/nest/nest_0"
            },
			"age=1,honey_level=2": {
                "model": "kubejs:block/nest/nest_1"
            },
			"age=2,honey_level=2": {
                "model": "kubejs:block/nest/nest_2"
            },
			"age=3,honey_level=2": {
                "model": "kubejs:block/nest/nest_3"
            },
			"age=0,honey_level=3": {
                "model": "kubejs:block/nest/nest_0"
            },
			"age=1,honey_level=3": {
                "model": "kubejs:block/nest/nest_1"
            },
			"age=2,honey_level=3": {
                "model": "kubejs:block/nest/nest_2"
            },
			"age=3,honey_level=3": {
                "model": "kubejs:block/nest/nest_3"
            },
			"age=0,honey_level=4": {
                "model": "kubejs:block/nest/nest_0"
            },
			"age=1,honey_level=4": {
                "model": "kubejs:block/nest/nest_1"
            },
			"age=2,honey_level=4": {
                "model": "kubejs:block/nest/nest_2"
            },
			"age=3,honey_level=4": {
                "model": "kubejs:block/nest/nest_3"
            },
			"age=0,honey_level=5": {
                "model": "kubejs:block/nest/nest_0_honey"
            },
			"age=1,honey_level=5": {
                "model": "kubejs:block/nest/nest_1_honey"
            },
			"age=2,honey_level=5": {
                "model": "kubejs:block/nest/nest_2_honey"
            },
			"age=3,honey_level=5": {
                "model": "kubejs:block/nest/nest_3_honey"
            }
    	}
	}
})
/**
* @param {Internal.BlockEntityJS} entity
*/
global.tick_wallpaper_nest = (entity) => {
	let nest = entity.block
	let honey_level = nest.properties.get("honey_level")
	let facing = nest.properties.get("facing")
	if (honey_level == 5) {
		let [pos_x, pos_y, pos_z] = [nest.getX(),nest.getY(),nest.getZ()]
		let level = nest.getLevel()
		level.spawnParticles("minecraft:dripping_honey",false,pos_x,pos_y,pos_z,0.3,0.3,0.3,1,0)
	} else {
		if (0.1 >= Math.random()) {
			nest.set(nest.getId(),{"facing":facing,"honey_level":honey_level})
		}
	}
}