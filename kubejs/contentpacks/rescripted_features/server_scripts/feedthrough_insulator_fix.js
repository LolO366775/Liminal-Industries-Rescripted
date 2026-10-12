BlockEvents.rightClicked(event => {
	if (event.getBlock().getId() == "immersiveengineering:feedthrough") {
		if (event.getItem().getId() == "immersiveengineering:hammer") {
			revert_feedthrough_event(event)
		}
	}
})
/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function revert_feedthrough_event(event){
	let wall = event.getBlock()
	let wall_nbt = wall.getEntityData().getCompound("middle")
	let wall_id = wall_nbt.getString("Name")
	let offset = wall.getEntityData().getInt("offset")
	if (offset == 0) {
		try {
		let wall_properties = wall_nbt.getCompound("Properties")
			wall.set(wall_id,wall_properties)
		} catch (error) {
			wall.set(wall_id)
		}
	}
}