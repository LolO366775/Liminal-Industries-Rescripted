/**
* @param {Registry.Item} event
*/
function item_registery_scrapped_signs(event) {
	let register_general = (id,display_name,model) => {
		event.create(id)
		.texture('layer0', `kubejs:item/signs/${model}`)
		.tag('kubejs:traffic_signs')
		.displayName(display_name)
	}
	register_general("arrow1_sign_item","Scrapped Sign","arrow1")
	register_general("arrow2_sign_item","Scrapped Sign","arrow2")
	register_general("box_sign_item","Scrapped Sign","box")
	register_general("cross_sign_item","Scrapped Sign","cross")
	register_general("exit_sign_item","Scrapped Sign","exit")
	register_general("exit_sign2_item","Scrapped Sign","exit2")
	register_general("explantion1_sign_item","Scrapped Sign","explantion1")
	register_general("explantion2_sign_item","Scrapped Sign","explantion2")
	register_general("hydrant_sign_item","Scrapped Sign","hydrant")
	register_general("infinity_sign_item","Scrapped Sign","infinity")
	register_general("inkblod_sign_item","Scrapped Sign","inkblod")
	register_general("left_arrow_sign_item","Scrapped Sign","left_arrow")
	register_general("leviathans_cross_sign_item","Scrapped Sign","leviathans_cross")
	register_general("liminal_warning_sign_item","Scrapped Sign","liminal_warning")
	register_general("liminal_warning2_sign_item","Scrapped Sign","liminal_warning2")
	register_general("monolith_sign_item","Scrapped Sign","monolith")
	register_general("nowhere_sign_item","Scrapped Sign","nowhere")
	register_general("radioactive_sign_item","Scrapped Sign","radioactive")
	register_general("right_arrow_sign_item","Scrapped Sign","right_arrow")
	register_general("skull_sign_item","Scrapped Sign","skull")
	register_general("stop_sign_item","Scrapped Sign","stop")
	register_general("tripple_sign_item","Scrapped Sign","tripple")
	register_general("turn_back_sign_item","Scrapped Sign","turn_back")
	register_general("unknown1_sign_item","Scrapped Sign","unknown1")
	register_general("witahdigroi_sign_item","Scrapped Sign","witahdigroi")
}