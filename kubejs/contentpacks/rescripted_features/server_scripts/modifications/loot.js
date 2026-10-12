LootJS.modifiers((event) => {

event.addLootTableModifier("minecraft:entities/silverfish").randomChance(0.1).addLoot("miners_delight:arthropod");
event.addLootTableModifier("minecraft:entities/husk").randomChance(0.5).addLoot("minecraft:bone");
event.addLootTableModifier("minecraft:entities/warden").removeLoot("minecraft:sculk_catalyst");
event.addLootTableModifier("minecraft:entities/ravager").removeLoot("minecraft:saddle");
event.addEntityLootModifier("eidolon:zombie_brute").addLoot("eidolon:zombie_heart");
event.addLootTableModifier("minecraft:entities/zombie").addLoot("minecraft:zombie_head");
event.addLootTableModifier("minecraft:entities/skeleton").addLoot("minecraft:skeleton_skull");
event.addLootTableModifier("minecraft:entities/wither_skeleton").addLoot("minecraft:wither_skeleton_skull");
event.addLootTableModifier("minecraft:entities/enderman").addLoot("enderio:enderman_head");
event.addLootTableModifier("minecraft:entities/blaze").addLoot("minecraft:blaze_rod");
event.addBlockLootModifier("snad:snad").addLoot("snad:snad");
event.addBlockLootModifier("kubejs:reality_controller_running").replaceLoot("kubejs:reality_controller_running", "kubejs:reality_controller");
event.addBlockLootModifier("kubejs:error").replaceLoot("kubejs:error", "kubejs:error_item");
event.addBlockLootModifier("kubejs:error_carpet").replaceLoot("kubejs:error_carpet", "kubejs:error_item");
event.addBlockLootModifier("kubejs:error_wallpaper").replaceLoot("kubejs:error_wallpaper", "kubejs:error_item");
//Traffic Signs
event.addBlockLootModifier("kubejs:traffic_pole").replaceLoot("kubejs:traffic_pole", "kubejs:scrap");
/*event.addBlockLootModifier("kubejs:arrow1_sign").addLoot("kubejs:arrow1_sign_item");
event.addBlockLootModifier("kubejs:arrow2_sign").addLoot("kubejs:arrow2_sign_item");
event.addBlockLootModifier("kubejs:liminal_warning").addLoot("kubejs:liminal_warning_sign_item");
event.addBlockLootModifier("kubejs:liminal_warning2").addLoot("kubejs:liminal_warning2_sign_item");
event.addBlockLootModifier("kubejs:box_sign").addLoot("kubejs:box_sign_item");
event.addBlockLootModifier("kubejs:infinity_sign").addLoot("kubejs:infinity_sign_item");
event.addBlockLootModifier("kubejs:skull_sign").addLoot("kubejs:skull_sign_item");
event.addBlockLootModifier("kubejs:stop_sign").addLoot("kubejs:stop_sign_item");
event.addBlockLootModifier("kubejs:explantion1_sign").addLoot("kubejs:explantion1_sign_item");
event.addBlockLootModifier("kubejs:explantion2_sign").addLoot("kubejs:explantion2_sign_item");
event.addBlockLootModifier("kubejs:unknown1").addLoot("kubejs:unknown1_sign_item");
event.addBlockLootModifier("kubejs:cross_sign").addLoot("kubejs:cross_sign_item");
event.addBlockLootModifier("kubejs:exit_sign").addLoot("kubejs:exit_sign_item");
event.addBlockLootModifier("kubejs:exit_sign2").addLoot("kubejs:exit_sign2_item");
event.addBlockLootModifier("kubejs:left_arrow_sign").addLoot("kubejs:left_arrow_sign_item");
event.addBlockLootModifier("kubejs:right_arrow_sign").addLoot("kubejs:right_arrow_sign_item");
event.addBlockLootModifier("kubejs:nowhere_sign").addLoot("kubejs:nowhere_sign_item");
event.addBlockLootModifier("kubejs:monolith_sign").addLoot("kubejs:monolith_sign_item");
event.addBlockLootModifier("kubejs:witahdigroi_sign").addLoot("kubejs:witahdigroi_sign_item");
event.addBlockLootModifier("kubejs:tripple_sign").addLoot("kubejs:tripple_sign_item");
event.addBlockLootModifier("kubejs:turn_back_sign").addLoot("kubejs:turn_back_sign_item");
event.addBlockLootModifier("kubejs:inkblod_sign").addLoot(LootEntry.of("inkblod_sign_item"));*/
//Poolrooms Railings
event.addBlockLootModifier("lipoolroomsadditions:pool_railing_mid_i").replaceLoot("lipoolroomsadditions:pool_railing_mid_i", "kubejs:scrap");
event.addBlockLootModifier("lipoolroomsadditions:pool_railing_mid_t").replaceLoot("lipoolroomsadditions:pool_railing_mid_t", "kubejs:scrap");
event.addBlockLootModifier("lipoolroomsadditions:pool_railing_end_l").replaceLoot("lipoolroomsadditions:pool_railing_end_l", "kubejs:scrap");
event.addBlockLootModifier("lipoolroomsadditions:pool_railing_end_r").replaceLoot("lipoolroomsadditions:pool_railing_end_r", "kubejs:scrap");
event.addBlockLootModifier("lipoolroomsadditions:pool_railing_bend_inner").replaceLoot("lipoolroomsadditions:pool_railing_bend_inner", "kubejs:scrap");
event.addBlockLootModifier("lipoolroomsadditions:pool_railing_bend_outer").replaceLoot("lipoolroomsadditions:pool_railing_bend_outer", "kubejs:scrap");
});
BlockEvents.broken(event => {
    let sign = event.getBlock()
    if (sign.hasTag("kubejs:traffic_signs")) {
        let drop = get_unique_sign_drop(sign)
        sign.popItem(drop)
        sign.popItem("kubejs:scrap")
    }
})
/**
* @param {Internal.BlockContainerJS} sign
*/
function get_unique_sign_drop(sign){
	try {
		let loot = [
			["kubejs:arrow1_sign", "kubejs:arrow1_sign_item"],
            ["kubejs:arrow2_sign", "kubejs:arrow2_sign_item"],
            ["kubejs:liminal_warning", "kubejs:liminal_warning_sign_item"],
            ["kubejs:liminal_warning2", "kubejs:liminal_warning2_sign_item"],
            ["kubejs:box_sign", "kubejs:box_sign_item"],
            ["kubejs:infinity_sign", "kubejs:infinity_sign_item"],
            ["kubejs:skull_sign", "kubejs:skull_sign_item"],
            ["kubejs:stop_sign", "kubejs:stop_sign_item"],
            ["kubejs:explantion1_sign", "kubejs:explantion1_sign_item"],
            ["kubejs:explantion2_sign", "kubejs:explantion2_sign_item"],
            ["kubejs:unknown1", "kubejs:unknown1_item"],
            ["kubejs:cross_sign", "kubejs:cross_sign_item"],
            ["kubejs:exit_sign", "kubejs:exit_sign_item"],
            ["kubejs:exit_sign2", "kubejs:exit_sign2_item"],
            ["kubejs:left_arrow_sign", "kubejs:left_arrow_sign_item"],
            ["kubejs:right_arrow_sign", "kubejs:right_arrow_sign_item"],
            ["kubejs:nowhere_sign", "kubejs:nowhere_sign_item"],
            ["kubejs:monolith_sign", "kubejs:monolith_sign_item"],
            ["kubejs:witahdigroi_sign", "kubejs:witahdigroi_sign_item"],
            ["kubejs:tripple_sign", "kubejs:tripple_sign_item"],
            ["kubejs:turn_back_sign", "kubejs:turn_back_sign_item"],
            ["kubejs:inkblod_sign", "kubejs:inkblod_sign_item"]
		]
		for (let index = 0; index < loot.length; index++) {
			let check_id = loot[index][0]
			if (sign.getId() == check_id) {
				let result = loot[index][1]
				return result
			}
		}
	} catch (error) {}
	return "kubejs:scrap"
}