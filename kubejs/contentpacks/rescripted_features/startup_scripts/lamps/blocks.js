/**
* @param {Registry.Block} event
* @param {String} id
* @param {String} display_name
*/
function register_ceilling_lamp_basic(event,id,display_name,colour) {
	let register_lamp = event.create(id)
	register_lamp.displayName(display_name)
	register_lamp.unbreakable()
	register_lamp.tagBlock('wither_immune')
	register_lamp.soundType("glass")
	if (colour == "yellow") {
		register_lamp.mapColor('gold')
		register_lamp.tagBlock('yellow_ceiling_lamp')
	} else if (colour == "white") {
		register_lamp.mapColor('gold')
		register_lamp.tagBlock('white_ceiling_lamp')
	} else if (colour == "red") {
		register_lamp.mapColor('fire')
		register_lamp.tagBlock('red_ceiling_lamp')
	}
	return register_lamp
}
/**
* @param {Internal.BasicBlockJS$Builder} register_lamp
* @param {String} colour
*/
function modify_ceilling_lamp_waking(register_lamp,colour) {
	register_lamp.lightLevel(0.5)
	register_lamp.tagBlock('ceiling_lamp_on')
	register_lamp.item(item => 
		item.modelJson({
			parent: `kubejs:block/lamps/waking/${colour}`
		})
	)
	register_lamp.randomTick(tick => {
		global.tick_ceiling_lamp_waking(tick.block)
	})
	register_lamp.modelJson = {
  		"parent": "minecraft:block/cube_all",
  		"textures": {
   	 		"all": `kubejs:block/lamps/waking/${colour}`
  		}
	}
}
/**
* @param {Internal.BasicBlockJS$Builder} register_lamp
* @param {String} colour
*/
function modify_ceilling_lamp_breaking(register_lamp,colour) {
	register_lamp.lightLevel(1.0)
	register_lamp.noItem()
	register_lamp.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_breaking_lamp(entity,colour)
		})
	})
}
/**
* @param {Internal.BasicBlockJS$Builder} register_lamp
*/
function modify_ceilling_lamp_dying(register_lamp,colour) {
	register_lamp.lightLevel(1.0)
	register_lamp.tagBlock('ceiling_lamp_on')
	register_lamp.item(item => 
		item.modelJson({
			parent: `kubejs:block/lamps/dying/${colour}_on`
		})
	)
	register_lamp.blockEntity(entityInfo => {
		entityInfo.serverTick(5, 0, entity => {
			global.tick_dying_lamp(entity,colour)
		})
	})
	register_lamp.modelJson = {
  		"parent": "minecraft:block/cube_all",
  		"textures": {
   	 		"all": `kubejs:block/lamps/dying/${colour}_on`
  		}
	}
}
/**
* @param {Internal.BasicBlockJS$Builder} register_lamp
*/
function modify_ceilling_lamp_blinking(register_lamp,colour) {
	register_lamp.lightLevel(0.5)
	register_lamp.tagBlock('ceiling_lamp_on')
	register_lamp.property(BlockProperties.POWERED)
	register_lamp.item(item => 
		item.modelJson({
			parent: `kubejs:block/lamps/dying/${colour}_on`
		})
	)
	register_lamp.blockEntity(entityInfo => {
		entityInfo.serverTick(5, 0, entity => {
			global.tick_blinking_lamp(entity,"yellow")
		})
	})
	register_lamp.blockstateJson = {
        "variants": {
			"powered=true": {
                "model": `kubejs:block/lamps/dying/${colour}_on`
            },
			"powered=false": {
                "model": `kubejs:block/lamps/dying/${colour}_off`
            }
    	}
	}
}
/**
* @param {Internal.BasicBlockJS$Builder} register_lamp
*/
function modify_ceilling_lamp_buzzing(register_lamp,colour) {
	register_lamp.lightLevel(1.0)
	register_lamp.tagBlock('ceiling_lamp_on')
	register_lamp.model(`kubejs:block/lamps/buzzing/${colour}`)
	register_lamp.blockEntity(entityInfo => {
		entityInfo.serverTick(20, 0, entity => {
			global.tick_ceiling_lamp_buzzing(entity)
		})
	})
}
/**
* @param {Internal.BasicBlockJS$Builder} register_lamp
*/
function modify_ceilling_lamp_on(register_lamp) {
	register_lamp.lightLevel(1.0)
	register_lamp.tagBlock('ceiling_lamp_on')
}
/**
* @param {Internal.BasicBlockJS$Builder} register_lamp
*/
function modify_ceilling_lamp_off(register_lamp) {
	register_lamp.tagBlock('ceiling_lamp_off')
	//register_lamp.blockEntity(entityInfo => {})
	/*register_lamp.randomTick(tick => {
		global.tick_ceiling_lamp_off(tick.block)
	})*/
}
//this needs to be hooked up to the backbone
StartupEvents.registry('block', event => {
	//Yellow Lamps
	modify_ceilling_lamp_on(register_ceilling_lamp_basic(event,'ceilling_lamp','Ceiling Lamp','yellow'))
	modify_ceilling_lamp_waking(register_ceilling_lamp_basic(event,'ceilling_lamp_waking','Ceiling Lamp (Waking)','yellow'),"yellow")
	modify_ceilling_lamp_breaking(register_ceilling_lamp_basic(event,'ceilling_lamp_breaking','Ceiling Lamp (Breaking)','yellow'),"yellow")
	modify_ceilling_lamp_dying(register_ceilling_lamp_basic(event,'ceilling_lamp_dying','Ceiling Lamp (Dying)','yellow'),"yellow")
	modify_ceilling_lamp_blinking(register_ceilling_lamp_basic(event,'ceilling_lamp_blinking','Ceiling Lamp (Blinking)','yellow'),"yellow")
	modify_ceilling_lamp_buzzing(register_ceilling_lamp_basic(event,'ceilling_lamp_buzzing','Ceiling Lamp (Buzzing)','yellow'),"yellow")
	modify_ceilling_lamp_off(register_ceilling_lamp_basic(event,'ceilling_lamp_off','Ceiling Lamp (Off)','yellow'))
	register_ceilling_lamp_basic(event,'ceilling_lamp_broken','Ceiling Lamp (Broken)','yellow')
	//White Lamps
	modify_ceilling_lamp_on(register_ceilling_lamp_basic(event,'ceilling_lamp2','White Ceiling Lamp','white'))
	modify_ceilling_lamp_waking(register_ceilling_lamp_basic(event,'ceilling_lamp2_waking','White Ceiling Lamp (Waking)','white'),"white")
	modify_ceilling_lamp_breaking(register_ceilling_lamp_basic(event,'ceilling_lamp2_breaking','White Ceiling Lamp (Breaking)','white'),"white")
	modify_ceilling_lamp_dying(register_ceilling_lamp_basic(event,'ceilling_lamp2_dying','White Ceiling Lamp (Dying)','white'),"white")
	modify_ceilling_lamp_blinking(register_ceilling_lamp_basic(event,'ceilling_lamp2_blinking','White Ceiling Lamp (Blinking)','white'),"white")
	modify_ceilling_lamp_buzzing(register_ceilling_lamp_basic(event,'ceilling_lamp2_buzzing','White Ceiling Lamp (Buzzing)','white'),"white")
	modify_ceilling_lamp_off(register_ceilling_lamp_basic(event,'ceilling_lamp2_off','White Ceiling Lamp (Off)','white'))
	register_ceilling_lamp_basic(event,'ceilling_lamp2_broken','White Ceiling Lamp (Broken)','white')
	//Red Lamps
	modify_ceilling_lamp_on(register_ceilling_lamp_basic(event,'ceilling_lamp_red','Red Ceiling Lamp','red'))
	modify_ceilling_lamp_waking(register_ceilling_lamp_basic(event,'ceilling_lamp_red_waking','Red Ceiling Lamp (Waking)','red'),"red")
	modify_ceilling_lamp_breaking(register_ceilling_lamp_basic(event,'ceilling_lamp_red_breaking','Red Ceiling Lamp (Breaking)','red'),"red")
	modify_ceilling_lamp_dying(register_ceilling_lamp_basic(event,'ceilling_lamp_red_dying','Red Ceiling Lamp (Dying)','yellow'),"red")
	modify_ceilling_lamp_blinking(register_ceilling_lamp_basic(event,'ceilling_lamp_red_blinking','Red Ceiling Lamp (Blinking)','red'),"red")
	modify_ceilling_lamp_buzzing(register_ceilling_lamp_basic(event,'ceilling_lamp_red_buzzing','Red Ceiling Lamp (Buzzing)','red'),"red")
	modify_ceilling_lamp_off(register_ceilling_lamp_basic(event,'ceilling_lamp_red_off','Red Ceiling Lamp (Off)','Red'))
	register_ceilling_lamp_basic(event,'ceilling_lamp_red_broken','Red Ceiling Lamp (Broken)','red')
})