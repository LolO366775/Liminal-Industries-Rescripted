/*StartupEvents.registry('item', event => {
	event.create('chapter_1_star').displayName('Hardcore Star (Chapter 1)')
  	event.create('chapter_2_star').displayName('Hardcore Star (Chapter 2)')
  	event.create('chapter_3_star').displayName('Hardcore Star (Chapter 3)')
  	event.create('chapter_4_star').displayName('Hardcore Star (Chapter 4)')
  	event.create('chapter_5_star').displayName('Hardcore Star (Chapter 5)')
})
/**
* @param {String} quest
*/
global.add_hardcore_add_checkpoint = quest => {
	hardcore_add_checkpoint(quest,true)
}
/**
* @param {String} quest
*/
global.remove_hardcore_add_checkpoint = quest => {
	hardcore_add_checkpoint(quest,true)
}
/**
* @param {String} quest
* @param {boolean} status
*/
function hardcore_add_checkpoint(quest,status) {
	let config = JsonIO.read("kubejs/config/hardcore_progress.json")
	if (config != null) {
		let unlocks = config.get("unlocks")
		unlocks.put(quest,status)
		JsonIO.write("kubejs/config/hardcore_progress.json",{"enabled":true,"unlocks":unlocks})
	}
	return 1
}
//unused
/**
* @param {Internal.ItemClickedEventJS} event
* @param {Number} chapter
*/
global.use_hardcore_star = (event,chapter) => {
	let player = event.getPlayer()
	event.item.shrink(1)
	if (event.server.isHardcore()) {
		if (chapter == 1) {
			hardcore_add_checkpoint("chapter_1",true)
		} else if (chapter == 2) {
			hardcore_add_checkpoint("chapter_2",true)
		} else if (chapter == 3) {
			hardcore_add_checkpoint("chapter_3",true)
		} else if (chapter == 4) {
			hardcore_add_checkpoint("chapter_4",true)
		} else if (chapter == 5) {
			hardcore_add_checkpoint("chapter_5",true)
		}
		player.tell("Hardcore progress saved!")
	} if (player != null) {
		player.tell("This item may only be used in hardcore mode!")
	}
}
//unused
/**
* @param {Internal.ItemClickedEventJS} event
* @param {Number} chapter
*/
global.use_hardcore_star_save = (event,chapter) => {
	let player = event.getPlayer()
	event.item.shrink(1)
	if (event.server.isHardcore()) {
		if (chapter == 1) {
			hardcore_add_checkpoint("chapter_1",true)
		} else if (chapter == 2) {
			hardcore_add_checkpoint("chapter_2",true)
		} else if (chapter == 3) {
			hardcore_add_checkpoint("chapter_3",true)
		} else if (chapter == 4) {
			hardcore_add_checkpoint("chapter_4",true)
		} else if (chapter == 5) {
			hardcore_add_checkpoint("chapter_5",true)
		}
		player.tell("Hardcore progress saved!")
	} if (player != null) {
		player.tell("This item may only be used in hardcore mode!")
	}
}

//Unused
/**
* @param {Number} chapter
*/
function set_quest_progress(chapter) {
	if (chapter == 1) {
		server.runCommandSilent(`ftbquests change_progress @s complete 14F820A255718CC8`) //chapter_1
	}
	return 1
}