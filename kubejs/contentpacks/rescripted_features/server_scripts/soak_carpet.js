/**
* @param {Internal.BlockContainerJS} carpet
* @param {String} output_id
*/
function soak_carpet(carpet,output_id){
	let [pos_x,pos_y,pos_z] = [carpet.getX() + 0.5,carpet.getY() + 1.5,carpet.getZ() + 0.5]
	let carpet_id = carpet.getId()
	carpet.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.coral_block.place","blocks",1,0)
	carpet.level.spawnParticles("minecraft:falling_water",false,pos_x,pos_y + 0.1,pos_z,1,0,1,100,0)
	carpet.set(output_id)
	if (carpet.getNorth() == carpet_id) {
		carpet.getNorth().set(output_id)
	}
	if (carpet.getSouth() == carpet_id) {
		carpet.getSouth().set(output_id)
	}
	if (carpet.getEast() == carpet_id) {
		carpet.getEast().set(output_id)
	}
	if (carpet.getWest() == carpet_id) {
		carpet.getWest().set(output_id)
	}
    return 1
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} output_id
*/
function right_click_carpet_event2(event,output_id){
	let facing = event.facing
	if (facing == "up") {
		if (event.item.id == 'minecraft:wet_sponge') {
			let carpet = event.block
			if (carpet.getUp() == "minecraft:air") {
				soak_carpet(carpet,output_id)
				carpet.getUp().set("minecraft:sponge")
			}
			event.item.shrink(1)
			event.cancel()
		} else if (event.item.id == 'minecraft:water_bucket') {
			if (event.player.isCrouching()) {
				let carpet = event.block
				soak_carpet(carpet,output_id)
				event.cancel()
			}
		} else if (event.item.id == 'ceramicbucket:ceramic_bucket') {
			if (event.player.isCrouching()) {
				let bucket_fluid = event.item.nbt.getCompound("Fluid").getString("FluidName")
				let carpet = event.block
				if (bucket_fluid == "minecraft:water") {
					soak_carpet(carpet,output_id)
					event.cancel()
				}
			}
		}
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} output_id
*/
function right_click_soggy_carpet_event(event,output_id){
	let facing = event.facing
	if (facing == "up") {
		if (event.item.id == 'minecraft:sponge') {
			dry_carpet_event(event,output_id,"sponge")
		}
		if (event.item.id == 'minecraft:lava_bucket') {
			if (!event.player.isCrouching()) {
				dry_carpet_event(event,output_id,"lava")
			}
		}
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} output_id
* @param {String} source
*/
function dry_carpet_event(event,output_id,source){
	let carpet = event.block
	if (carpet.getUp() == "minecraft:air") {
		let [pos_x,pos_y,pos_z] = [carpet.getX() + 0.5,carpet.getY() + 1.5,carpet.getZ() + 0.5]
		carpet.level.spawnParticles("minecraft:cloud",false,pos_x,pos_y + 0.2,pos_z,0.5,0.1 ,0.5,5,0.001)
		carpet.set(output_id)
		if (source == "sponge") {
			carpet.getUp().set("minecraft:wet_sponge")
			carpet.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.coral_block.place","blocks",1,0)
			event.item.shrink(1)
			event.cancel()
		} else {
			carpet.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.fire.extinguish","blocks",1,0)
		}
		
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function right_click_oil_carpet_event(event){
	let facing = event.facing
	if (facing == "up") {
		if (event.hand == "MAIN_HAND") {
			if (event.item.id == "minecraft:sponge") {
				erupt_oil(event.block,true,event.item)
			} else if (event.item == "minecraft:air") {
				erupt_oil(event.block,false,event.item)
			}	
		}
	}
}
BlockEvents.rightClicked('kubejs:carpet', event => {
	right_click_carpet_event2(event,"kubejs:soggy_carpet")
})
BlockEvents.rightClicked('kubejs:red_carpet', event => {
	right_click_carpet_event2(event,"kubejs:red_soggy_carpet")
})
BlockEvents.rightClicked('kubejs:asphalt_floor', event => {
	right_click_carpet_event2(event,"kubejs:wet_asphalt_floor")
})
BlockEvents.rightClicked('kubejs:pool_tiles', event => {
	right_click_carpet_event2(event,"kubejs:pool_tiles_wet")
})
BlockEvents.rightClicked('kubejs:soggy_carpet', event => {
	right_click_soggy_carpet_event(event,"kubejs:carpet")
})
BlockEvents.rightClicked('kubejs:red_soggy_carpet', event => {
	right_click_soggy_carpet_event(event,"kubejs:red_carpet")
})
BlockEvents.rightClicked('kubejs:wet_asphalt_floor', event => {
	right_click_soggy_carpet_event(event,"kubejs:asphalt_floor")
})
BlockEvents.rightClicked('kubejs:pool_tiles_wet', event => {
	right_click_soggy_carpet_event(event,"kubejs:pool_tiles")
})
BlockEvents.rightClicked("kubejs:oil_carpet", event => {
	right_click_oil_carpet_event(event)
})
BlockEvents.rightClicked("kubejs:red_oil_carpet", event => {
	right_click_oil_carpet_event(event)
})
/**
* @param {Internal.BlockContainerJS} carpet
* @param {Boolean} with_sponge
* @param {Internal.ItemStack} item
*/
function erupt_oil(carpet,with_sponge,item){
	let above = carpet.getUp()
	if (above.blockState.canBeReplaced()) {
		let [pos_x,pos_y,pos_z] = [carpet.getX(),carpet.getY(),carpet.getZ()]
		let level = above.getLevel()
		level.playSound(null,pos_x,pos_y + 1,pos_z,"minecraft:block.lava.ambient","blocks",1,2)
		level.playSound(null,pos_x,pos_y + 1,pos_z,"minecraft:item.bucket.empty_lava","blocks",1,0)
		level.spawnParticles("minecraft:squid_ink",false,pos_x,pos_y + 1,pos_z,0.5,3,0.5,100,0.01)
		if (with_sponge) {
			above.set("kubejs:oil_sponge")
			item.shrink(1)
		} else {
			above.set("thermal:crude_oil_fluid")
			if (above.getUp().blockState.canBeReplaced()) {
				above.getUp().set("thermal:crude_oil_fluid")
			}
		}
	}
    return 1
}
ServerEvents.recipes(event => {
	event.shaped(
		Item.of('ceramicbucket:ceramic_bucket', '{Fluid:{Amount:1000,FluidName:"thermal:crude_oil"}}'),
		[ 
		' A ', 
		' B ',
		'   '  
		],{
		  A: 'kubejs:oil_sponge', 
		  B: 'ceramicbucket:ceramic_bucket'
	})
	.replaceIngredient({item: 'kubejs:oil_sponge'}, 'minecraft:sponge')
	.replaceIngredient({item: 'ceramicbucket:ceramic_bucket'}, 'minecraft:air')
	event.shaped(
		'kubejs:oil_sponge',
		[ 
		' B ', 
		' A ',
		'   '  
		],{
		  A: Item.of('ceramicbucket:ceramic_bucket', '{Fluid:{Amount:1000,FluidName:"thermal:crude_oil"}}').weakNBT(), 
		  B: 'minecraft:sponge'
	}).replaceIngredient({item: 'ceramicbucket:ceramic_bucket'}, 'ceramicbucket:ceramic_bucket')
	event.shaped(
		'thermal:crude_oil_bucket',
		[ 
		' A ', 
		' B ',
		'   '  
		],{
		  A: 'kubejs:oil_sponge', 
		  B: 'minecraft:bucket'
	}).replaceIngredient({item: 'kubejs:oil_sponge'}, 'minecraft:sponge')
	event.shaped(
		'kubejs:oil_sponge',
		[ 
		' B ', 
		' A ',
		'   '  
		],{
		  A: 'thermal:crude_oil_bucket',
		  B: 'minecraft:sponge'
	}).replaceIngredient({item: 'thermal:crude_oil_bucket'}, 'minecraft:bucket')

	event.recipes.create.filling('kubejs:oil_sponge',['minecraft:sponge',Fluid.of('thermal:crude_oil')])
	event.recipes.create.emptying(['minecraft:sponge',Fluid.of('thermal:crude_oil')],'kubejs:oil_sponge')

	event.recipes.create.filling('minecraft:wet_sponge',['minecraft:sponge',Fluid.of('minecraft:water')])
	event.recipes.create.emptying(['minecraft:sponge',Fluid.of('minecraft:water')],'minecraft:wet_sponge')
})