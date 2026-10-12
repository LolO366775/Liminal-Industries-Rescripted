BlockEvents.rightClicked(event => {
	let loader = "rescripted" //rescripted-legacy-custom
	if (loader == "rescripted") {
		block_right_clicked_rescripted(event)
	}
})
BlockEvents.leftClicked(event => {
	let loader = "rescripted" //rescripted-legacy-custom
	if (loader == "rescripted") {
		block_left_clicked_rescripted(event)
	}
})
ServerEvents.recipes(event => {

})