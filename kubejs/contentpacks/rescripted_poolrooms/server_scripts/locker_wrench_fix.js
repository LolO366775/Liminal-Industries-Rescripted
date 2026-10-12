BlockEvents.rightClicked(event => {
	let item = event.getItem()
	if (item.getId() == "supplementaries:wrench") {
		event.cancel()
	}
})