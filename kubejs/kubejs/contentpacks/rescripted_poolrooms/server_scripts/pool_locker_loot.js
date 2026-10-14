LootJS.modifiers((event) => {
	//floaties
	let uncommon_floaties = ["beachparty:floaty_boat","beachparty:rubber_ring_pelican","beachparty:rubber_ring_axolotl"]
	let common_floaties = ["beachparty:pool_noodle","beachparty:rubber_ring_pink","beachparty:rubber_ring_blue","beachparty:rubber_ring_pink","beachparty:rubber_ring_blue","beachparty:rubber_ring_stripped"]
	let floaties_loot = uncommon_floaties.concat(common_floaties,common_floaties,common_floaties)
	//clothing
	let common_clothing = ["beachparty:bikini","beachparty:trunks","beachparty:beach_hat"]
	let other_clothing = ["beachparty:crocs","beachparty:sunglasses","beachparty:swim_wings"]
	let personal_items = ["exposure:album","exposure:camera","supplementaries:wrench","supplementaries:key"]
	let clothing_loot = personal_items.concat(common_clothing,common_clothing,common_clothing,other_clothing,other_clothing)
	//batteries
	let batteries_loot = ["kubejs:battery","kubejs:battery","kubejs:battery","kubejs:lithium_ion_battery"]
	//picnic
	let common_appliances = ["beachparty:beach_sun_lounger","beachparty:beach_chair","beachparty:beach_parasol","beachparty:mini_fridge"]
	let coolers = ["refurbished_furniture:red_cooler","refurbished_furniture:white_cooler","refurbished_furniture:blue_cooler","refurbished_furniture:cyan_cooler"]
	let grills = ["refurbished_furniture:red_grill","refurbished_furniture:black_grill","refurbished_furniture:blue_grill","refurbished_furniture:cyan_grill"]
	let picnic_loot = grills.concat(coolers,coolers,common_appliances,common_appliances,common_appliances)
	//games
	let common_kids = ["beachparty:beach_ball","beachparty:sand_bucket_empty","supplementaries:bubble_blower","supplementaries:soap","supplementaries:soap","supplementaries:confetti_popper","chalk:chalk_box","beachparty:seashell","beachparty:coconut_open"]
	let other_activities = ["table_top_craft:tic_tac_toe","xercapaint:item_palette","table_top_craft:red_concrete_connect_four","minecraft:brush","minecraft:fishing_rod","supplementaries:flute","table_top_craft:chess_piece_figure"]
	let rare_activities = ["musketmod:pistol","supplementaries:slingshot","beachparty:message_in_a_bottle","kubejs:diamond_brush"]
	let games_loot = rare_activities.concat(other_activities,other_activities,common_kids,common_kids,common_kids)
	//music discs
	let discs_loot = ["beachparty:music_disc_beachparty","beachparty:music_disc_vocalista","beachparty:music_disc_wild_veins","beachparty:music_disc_pridelands","beachparty:music_disc_caribbean_beach","beachparty:overgrown_disc"]
	//armour trims
	let armour_trims_loot = ["minecraft:tide_armor_trim_smithing_template","minecraft:spire_armor_trim_smithing_template"]
	//all
	let common_categories = games_loot.concat(floaties_loot,floaties_loot,floaties_loot,clothing_loot,clothing_loot,picnic_loot,games_loot,batteries_loot,batteries_loot)
	let rare_categories = armour_trims_loot.concat(armour_trims_loot,discs_loot)
	let locker_loot = rare_categories.concat(common_categories,common_categories,common_categories)
    event.addLootTableModifier("backrooms:poolrooms/locker_loot")
    .addWeightedLoot(locker_loot)
})