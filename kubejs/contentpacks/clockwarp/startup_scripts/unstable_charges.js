StartupEvents.registry('block', event => {

event.create('compound_sponge')
	.fullBlock(true)
	.mapColor("color_yellow")
	.soundType("wet_grass")
	.displayName('Compound Soaked Sponge')

event.create('compound_charge')
	.fullBlock(true)
	.mapColor("color_light_gray")
	.soundType("wood")
	.property(BlockProperties.RESPAWN_ANCHOR_CHARGES)
	.displayName('Compound Charge')

event.create('empty_compound_charge')
	.fullBlock(true)
	.mapColor("color_light_gray")
	.soundType("wood")
	.displayName('Empty Compound Charge')
})
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} item_type
*/
global.right_click_charge_with_compound = (event,item_type) => {
	let charge_block = event.block
	let charges = charge_block.properties.get("charges")
	if (item_type == "unstable") {
		if (charges != "3" && charges != "4") {
			fill_compound_charge(event,"3")
		}
	} else if (item_type == "perfect") {
		if (charges != "4") {
			fill_compound_charge(event,"4")
		}
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} item_type
*/
global.right_click_sand_with_compound = (event,block_type) => {
	if (block_type == "sand") {
		fill_compound_sand(event,"snad:snad")
	} else if (block_type == "red_sand") {
		fill_compound_sand(event,"snad:red_snad")
	} else if (block_type == "soul_sand") {
		fill_compound_sand(event,"snad:suol_snad")
	}
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} charges_state
*/
function fill_compound_charge(event,charges_state){
	let charge_block = event.block
	let [pos_x,pos_y,pos_z] = [charge_block.getX(),charge_block.getY(),charge_block.getZ()]
	charge_block.set("kubejs:compound_charge",{"charges":charges_state})
	charge_block.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.respawn_anchor.charge","blocks",1,2)
	event.item.shrink(1)
	event.player.give("minecraft:glass_bottle")
	return 1
}
/**
* @param {Internal.BlockRightClickedEventJS} event
* @param {String} result_id
*/
function fill_compound_sand(event,result_id){
	let charge_block = event.block
	let [pos_x,pos_y,pos_z] = [charge_block.getX(),charge_block.getY(),charge_block.getZ()]
	charge_block.set(result_id)
	charge_block.level.playSound(null,pos_x,pos_y,pos_z,"create:spout","blocks",1,2)
	charge_block.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.camel.step_sand","blocks",1,0)
	event.item.shrink(1)
	event.player.give("minecraft:glass_bottle")
	return 1
}