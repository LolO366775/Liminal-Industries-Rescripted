function get_random_waystone_name(){
	let name_list1 = ["Arran","Greaves","Paddocks","Sherborne","Herbert","Woodgate","Heywood","Chesham","Southwell","Northbury"]
	let name_list2 = ["Edinburgh","Ilfracombe","Bruton","Baldwin","Colchester","Baldwin","Moorings","Hills","Laverdene","Bassett"]
	let name_list3 = ["Beachmarsh","Lancaster","Bexley","Hafod","Openshaw","Bryn","Rugby","Cheshire","Mirstone","Brisbane"]
	let name_list4 = ["Pavv","Stamford","Winchester","Wallowdale","Shepards","Bournemouth","Wingston","Farnworth","Newlease","Edinburgh"]
	let name_list5 = ["Fernhill","Sherfield","Dale","Satbury","Edward","Cottage","Fallholt","Whitebeam","Gillamoor","Barncroft"]
	let name_list6 = ["Threestreams","Frostford","Grimsby","Bredon","Hewe","Alana","Lybster","Ridge","Cardended","Orchard"]
	let name_list7 = ["Willowdale","Llyne","Ventnor","Peterborough","Helmfirth","Aroonshire","Bleakburn","Wolfden","Silverkeep","Clacton"]
	let name_list8 = ["Oakwood","Carronhall","Asker","Drammen","Ski","Baxter","Kløfta","Fetsund","Hughes","Bailey"]
	let name_list9 = ["Årnes","Cambridge","Vestby","Gardens","Bergen","Oslo","Highgrove","Burnside","Haven","Leas"]
	let name_list10 = ["Highgrove","Golden","Meadow","Knoll","Reach","Reans","Sycamore","Acraman's","Approach","Milford"]
	let waystone_names = name_list1.concat(name_list2,name_list3,name_list4,name_list5,name_list6,name_list7,name_list8,name_list9,name_list10)
	let chosen_name = waystone_names[Math.round((Math.random() * (waystone_names.length -0.001))-0.5)]
	return chosen_name
}