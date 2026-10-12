/**
* @param {String} id
* @param {Internal.ItemStack} itemstack
* @param {Internal.LivingEntity} entity
*/
global.use_drinkable_item = (id,entity,itemstack) => {
	if (id == "carpet_fluid") {
		drink_carpet_fluid(entity,itemstack)
	} else if (id == "almond_water_can") {
		drink_almond_water(entity,itemstack,"yellow")
	} else if (id == "ice_cold_almond_water_can") {
		drink_ice_cold_almond_water(entity,itemstack,"yellow")		
	} else if (id == "liquid_pain_can_hidden") {
		drink_liquid_pain(entity,itemstack)		
	} else if (id == "unstable_compound") {
		smash_unstable_compound(entity,itemstack)		
	} else if (id == "blue_almond_water_can") {
		drink_almond_water(entity,itemstack,"blue")
	} else if (id == "ice_cold_blue_almond_water_can") {
		drink_ice_cold_almond_water(entity,itemstack,"blue")		
	} else if (id == "green_almond_water_can") {
		drink_almond_water(entity,itemstack,"green")
	} else if (id == "ice_cold_green_almond_water_can") {
		drink_ice_cold_almond_water(entity,itemstack,"green")		
	} else if (id == "red_almond_water_can") {
		drink_almond_water(entity,itemstack,"red")
	} else if (id == "ice_cold_red_almond_water_can") {
		drink_ice_cold_almond_water(entity,itemstack,"red")		
	}
}
/**
* @param {Internal.ItemStack} itemstack
* @param {Internal.LivingEntity} entity
*/
function drink_carpet_fluid(entity,itemstack) {
	drink_item_tipsy(entity)
	entity.potionEffects.add("minecraft:hunger",600)
	entity.potionEffects.add("minecraft:poison",200)
	entity.potionEffects.add("corrosive_sculk:sculk_resistance",600)
	drink_item_generic(entity,itemstack,"minecraft:glass_bottle")
}
/**
* @param {Internal.ItemStack} itemstack
* @param {Internal.LivingEntity} entity
* @param {String} colour
*/
function drink_almond_water(entity,itemstack,colour) {
	if (colour == "blue") {
		entity.potionEffects.add("minecraft:strength",1200)
		entity.potionEffects.add("minecraft:resistance",1200)
	} else if (colour == "green") {
		entity.potionEffects.add("minecraft:speed",1200)
		entity.potionEffects.add("minecraft:night_vision",1200)
	} else if (colour == "red") {
		entity.potionEffects.add("minecraft:regeneration",1200)
		entity.potionEffects.add("minecraft:absorption",1200)
	}
	drink_item_tipsy(entity)
	entity.potionEffects.add("minecraft:hunger",600)
	entity.potionEffects.add("corrosive_sculk:sculk_resistance",1200)
	drink_item_generic(entity,itemstack,"kubejs:empty_almond_water_can")
}
/**
* @param {Internal.ItemStack} itemstack
* @param {Internal.LivingEntity} entity
* @param {String} colour
*/
function drink_ice_cold_almond_water(entity,itemstack,colour) {
	if (colour == "blue") {
		entity.potionEffects.add("minecraft:strength",1800)
		entity.potionEffects.add("minecraft:resistance",1800)
	} else if (colour == "green") {
		entity.potionEffects.add("minecraft:speed",1800)
		entity.potionEffects.add("minecraft:night_vision",1800)
	} else if (colour == "red") {
		entity.potionEffects.add("minecraft:regeneration",1800)
		entity.potionEffects.add("minecraft:absorption",1800)
	}
	drink_item_tipsy(entity)
	let cold = entity.ticksFrozen
	entity.setTicksFrozen(cold + 150)
	entity.potionEffects.add("corrosive_sculk:sculk_resistance",1800)
	drink_item_generic(entity,itemstack,"kubejs:empty_almond_water_can")
}
function drink_liquid_pain(entity,itemstack) {
	drink_item_tipsy(entity)
	entity.potionEffects.add("minecraft:wither",200, 4)
	drink_item_generic(entity,itemstack,"kubejs:empty_almond_water_can")
}
function smash_unstable_compound(entity,itemstack) {
	if (entity.player) {
		unstable_compound_explode_chance(entity,1)
	}
	itemstack.shrink(1)
}
/**
* @param {Internal.ItemStack} itemstack
* @param {Internal.LivingEntity} entity
* @param {String} result_id
*/
function drink_item_generic(entity,itemstack,result_id){
	itemstack.shrink(1)
    if (entity.player) {
    	entity.addItem(Item.of(result_id))
    }
}
/**
* @param {Internal.LivingEntity} entity
*/
function drink_item_tipsy(entity){
	let tipsy = -1
	if (entity.hasEffect("brewinandchewin:tipsy")) {
		tipsy = entity.getEffect("brewinandchewin:tipsy").getAmplifier()
	}
	tipsy++
	if (tipsy > 3) {
		entity.attack(3 * tipsy)
	}
	entity.potionEffects.add("brewinandchewin:intoxication",600)
	entity.potionEffects.add("brewinandchewin:tipsy",600, tipsy)
}
StartupEvents.registry('item', event => {
	let register_drink = (id,display_name,use_animation,use_time,stack_size,model) => {
		event.create(id)
		.texture('layer0', `kubejs:item/${model}`)
		.maxStackSize(stack_size)
		.useAnimation(use_animation)
		.use((level, player, hand) => true)
		.useDuration(itemstack => use_time)
		.finishUsing((itemstack, level, entity) => {
			global.use_drinkable_item(id,entity,itemstack)
      		return itemstack
    	})
		.displayName(display_name)
	}
	register_drink("carpet_fluid","Carpet Fluid","drink",32,1,"carpet_fluid")
	register_drink("almond_water_can","Almond Water","drink",32,16,"almond_water/yellow")
	register_drink("ice_cold_almond_water_can","Almond Water (Ice Cold)","drink",32,16,"almond_water/yellow_cold")
	register_drink("blue_almond_water_can","Coconut Almond Water","drink",32,16,"almond_water/blue")
	register_drink("ice_cold_blue_almond_water_can","Coconut Almond Water (Ice Cold)","drink",32,16,"almond_water/blue_cold")
	register_drink("green_almond_water_can","Mint Almond Water","drink",32,16,"almond_water/green")
	register_drink("ice_cold_green_almond_water_can","Mint Almond Water (Ice Cold)","drink",32,16,"almond_water/green_cold")
	register_drink("red_almond_water_can","Strawberry Almond Water","drink",32,16,"almond_water/red")
	register_drink("ice_cold_red_almond_water_can","Strawberry Almond Water (Ice Cold)","drink",32,16,"almond_water/red_cold")
	register_drink("liquid_pain_can_hidden","Almond Water (Tampered)","drink",32,16,"almond_water/yellow")
	register_drink("unstable_compound","Unstable Compound","bow",16,1,"unstable_compound")
	event.create('empty_almond_water_can')
	.texture('layer0', `kubejs:item/almond_water/empty`)
	.maxStackSize(16)
	.displayName('Almond Water (Empty)')
	event.create('perfectly_stablised_compound').displayName('Perfectly Stable Compound').unstackable()
	event.create('cinder_dough').displayName('Cinder Dough')
})
//register all flavours of almond water
StartupEvents.registry('fluid', event => {
	event.create('carpet_fluid')
	.stillTexture('kubejs:block/carpet_fluid_still')
	.flowingTexture('kubejs:block/carpet_fluid_flow')
	//.bucketColor(0xAB8965)
	.noBlock()
	.noBucket()
	.displayName('Carpet Fluid')

	event.create('almond_water')
	.stillTexture('kubejs:block/almond_water_still')
	.flowingTexture('kubejs:block/almond_water_flow')
	//.bucketColor(0xFAD6AF)
	.noBlock()
	.noBucket()
	.displayName('Almond Water')

	event.create('unstable_compound')
	.stillTexture('kubejs:block/unstable_compound_still')
	.flowingTexture('kubejs:block/unstable_compound_flow')
	//.bucketColor(0xFF3636)
	.noBlock()
	.noBucket()
	.displayName('Unstable Compound')

  	event.create('liquid_pain')
	.stillTexture('kubejs:block/liquid_pain_still')
	.flowingTexture('kubejs:block/liquid_pain_flow')
	//.bucketColor(0xA80000)
	.noBlock()
	.noBucket()
	.displayName('Liquid Pain')
})