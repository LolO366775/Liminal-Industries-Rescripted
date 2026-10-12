/**
* @param {Internal.BlockRightClickedEventJS} event
*/
function toggle_speaker_event(event) {
	let hand = event.getHand()
	let facing = event.getFacing()
	if (hand == "main_hand" && facing == "down") {
		let speaker = event.getBlock()
		let speaker_id = speaker.getId()
		let facing = speaker.properties.get("facing")
		let powered = speaker.properties.get("powered")
		let level = speaker.getLevel()
		let [pos_x,pos_y,pos_z] = [speaker.getX(),speaker.getY(),speaker.getZ()]
		if (powered == "true") {
			speaker.set(speaker_id,{"facing":facing,"powered":false})
			level.playSound(null,pos_x,pos_y,pos_z,"refurbished_furniture:block.lightswitch.flick","blocks",1,0.8)
		} else {
			speaker.set(speaker_id,{"facing":facing,"powered":true})
			level.playSound(null,pos_x,pos_y,pos_z,"refurbished_furniture:block.lightswitch.flick","blocks",1,1)
		}
	}
}