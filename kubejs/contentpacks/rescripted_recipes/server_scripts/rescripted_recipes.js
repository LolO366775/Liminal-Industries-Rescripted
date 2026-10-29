/**
* @param {Internal.RecipesEventJS} event
*/
global.rescripted_recipes = (event) => {
	let errored = false
	let error_model = (module_id) => {
		errored = true
		console.log(`Recipe Module: '${module_id}' was not loaded!`)
	}
	try {rescripted_recipes_1_17(event)} 
	catch (error) {error_model("rescripted_recipes_1_17")}
	try {rescripted_recipes_1_19(event)} 
	catch (error) {error_model("rescripted_recipes_1_19")}
	try {rescripted_recipes_actuallyadditions_laser(event)} 
	catch (error) {error_model("rescripted_recipes_actuallyadditions_laser")}
	try {rescripted_recipes_ae2(event)} 
	catch (error) {error_model("rescripted_recipes_ae2")}
	try {rescripted_recipes_alloying(event)} 
	catch (error) {error_model("rescripted_recipes_alloying")}
	try {rescripted_recipes_antimatter(event)} 
	catch (error) {error_model("rescripted_recipes_antimatter")}
	try {rescripted_recipes_arc_furnace(event)} 
	catch (error) {error_model("rescripted_recipes_arc_furnace")}
	try {rescripted_recipes_books(event)} 
	catch (error) {error_model("rescripted_recipes_books")}
	try {rescripted_recipes_botania(event)} 
	catch (error) {error_model("rescripted_recipes_botania")}
	try {rescripted_recipes_chalk(event)} 
	catch (error) {error_model("rescripted_recipes_chalk")}
	try {rescripted_recipes_cooking(event)} 
	catch (error) {error_model("rescripted_recipes_cooking")}
	try {rescripted_recipes_create_machine_deploying(event)} 
	catch (error) {error_model("rescripted_recipes_create_machine_deploying")}
	try {rescripted_recipes_dirt(event)} 
	catch (error) {error_model("rescripted_recipes_dirt")}
	try {rescripted_recipes_eidolon(event)} 
	catch (error) {error_model("rescripted_recipes_eidolon")}
	try {rescripted_recipes_empowerer(event)} 
	catch (error) {error_model("rescripted_recipes_empowerer")}
	try {rescripted_recipes_enrichment(event)} 
	catch (error) {error_model("rescripted_recipes_enrichment")}
	try {rescripted_recipes_extruder(event)} 
	catch (error) {error_model("rescripted_recipes_extruder")}
	try {rescripted_recipes_eyes(event)} 
	catch (error) {error_model("rescripted_recipes_eyes")}
	try {rescripted_recipes_fiberboard(event)} 
	catch (error) {error_model("rescripted_recipes_fiberboard")}
	try {rescripted_recipes_immersive_tool_nerf(event)} 
	catch (error) {error_model("rescripted_recipes_immersive_tool_nerf")}
	try {rescripted_recipes_item_nerfs(event)} 
	catch (error) {error_model("rescripted_recipes_item_nerfs")}
	try {rescripted_recipes_keg(event)} 
	catch (error) {error_model("rescripted_recipes_keg")}
	try {rescripted_recipes_light_nerfs(event)} 
	catch (error) {error_model("rescripted_recipes_light_nerfs")}
	try {rescripted_recipes_log_replacement(event)} 
	catch (error) {error_model("rescripted_recipes_log_replacement")}
	try {rescripted_recipes_low_heated_sources(event)} 
	catch (error) {error_model("rescripted_recipes_low_heated_sources")}
	try {rescripted_recipes_material_nerfs(event)} 
	catch (error) {error_model("rescripted_recipes_material_nerfs")}
	try {rescripted_recipes_mekanism_machines(event)} 
	catch (error) {error_model("rescripted_recipes_mekanism_machines")}
	try {rescripted_recipes_metal_furniture(event)} 
	catch (error) {error_model("rescripted_recipes_metal_furniture")}
	try {rescripted_recipes_metal_working(event)} 
	catch (error) {error_model("rescripted_recipes_metal_working")}
	try {rescripted_recipes_misc_item_gen(event)} 
	catch (error) {error_model("rescripted_recipes_misc_item_gen")}
	try {rescripted_recipes_multiservo_press(event)} 
	catch (error) {error_model("rescripted_recipes_multiservo_press")}
	try {rescripted_recipes_neapolitan(event)} 
	catch (error) {error_model("rescripted_recipes_neapolitan")}
	try {rescripted_recipes_pigments(event)} 
	catch (error) {error_model("rescripted_recipes_pigments")}
	try {rescripted_recipes_power(event)} 
	catch (error) {error_model("rescripted_recipes_power")}
	try {rescripted_recipes_qol(event)} 
	catch (error) {error_model("rescripted_recipes_qol")}
	try {rescripted_recipes_radio(event)} 
	catch (error) {error_model("rescripted_recipes_radio")}
	try {rescripted_recipes_saplings(event)} 
	catch (error) {error_model("rescripted_recipes_saplings")}
	try {rescripted_recipes_sequenced_assembly(event)} 
	catch (error) {error_model("rescripted_recipes_sequenced_assembly")}
	try {rescripted_recipes_spores(event)} 
	catch (error) {error_model("rescripted_recipes_spores")}
	try {rescripted_recipes_storageshelves(event)} 
	catch (error) {error_model("rescripted_recipes_storageshelves")}
	try {rescripted_recipes_tconstruct_slime(event)} 
	catch (error) {error_model("rescripted_recipes_tconstruct_slime")}
	try {rescripted_recipes_thermal_machine_fix(event)} 
	catch (error) {error_model("rescripted_recipes_thermal_machine_fix")}
	try {rescripted_recipes_tier1(event)} 
	catch (error) {error_model("rescripted_recipes_tier1")}
	try {rescripted_recipes_tier2(event)} 
	catch (error) {error_model("rescripted_recipes_tier2")}
	try {rescripted_recipes_tier3(event)} 
	catch (error) {error_model("rescripted_recipes_tier3")}
	try {rescripted_recipes_tier4(event)} 
	catch (error) {error_model("rescripted_recipes_tier4")}
	try {rescripted_recipes_tier5(event)} 
	catch (error) {error_model("rescripted_recipes_tier5")}
	try {rescripted_recipes_tinker_changes(event)} 
	catch (error) {error_model("rescripted_recipes_tinker_changes")}
	try {rescripted_recipes_wooden_furniture(event)} 
	catch (error) {error_model("rescripted_recipes_wooden_furniture")}
	try {rescripted_recipes_porcelain_furniture(event)} 
	catch (error) {error_model("rescripted_recipes_porcelain_furniture")}
	try {rescripted_recipes_low_heated_fix(event)} 
	catch (error) {error_model("rescripted_recipes_low_heated_fix")}
}