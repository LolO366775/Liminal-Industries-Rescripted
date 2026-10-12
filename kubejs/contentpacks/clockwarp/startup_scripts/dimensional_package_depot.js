StartupEvents.registry('block', event => {

event.create('dark_casing')
	.fullBlock(true)
	.material("wood")
	.soundType("wood")
    .tagBlock('minecraft:mineable/pickaxe')
	.tagBlock('minecraft:mineable/axe')

event.create('rich_casing')
	.fullBlock(true)
	.material("wood")
	.soundType("wood")
    .tagBlock('minecraft:mineable/pickaxe')
	.tagBlock('minecraft:mineable/axe')

event.create('pink_casing')
	.fullBlock(true)
	.material("wood")
	.soundType("wood")
    .tagBlock('minecraft:mineable/pickaxe')
	.tagBlock('minecraft:mineable/axe')
})

/**
* @param {String} type
* @param {Internal.BlockEntityJS} entity
*/
global.tick_dimensional_package_depot = (type,entity) => {
	let depot = entity.block
	tick_dimensional_depot(type,depot)
}
/**
* @param {String} type
* @param {Internal.BlockContainerJS} depot
*/
function tick_dimensional_depot(type,depot){
	let level = depot.getLevel()
	let [pos_x,pos_y,pos_z] = [depot.getX(),depot.getY(),depot.getZ()]
	let aabb = AABB.of(pos_x - 0.1, pos_y, pos_z - 0.1, pos_x + 1.1, pos_y + 1.1, pos_z + 1.1)
	if (!level.getEntitiesWithin(aabb).isEmpty()) {
		depot_look_for_packages_simple(type,depot,aabb)
	}
	return 1
}
/**
* @param {String} type
* @param {Internal.BlockContainerJS} depot
* @param {Internal.AABB} aabb
*/
function depot_look_for_packages_simple(type,depot,aabb){
	try {
		let level = depot.getLevel()
		let nearby_entities = level.getEntitiesWithin(aabb)
		nearby_entities.forEach(element => {
			if (element.getType() == "create:package") {
				if (does_depot_have_package_address(depot,element)){
					let address = get_package_address_or_depot_default(depot,element)
					let destination = get_package_destination(depot,address)
					if (does_destination_respect_type(type,depot,destination)) {
						teleport_package(depot,destination,element)
					}
				}
			}
		})
	} catch (error) {}
}
/**
* @param {Internal.BlockContainerJS} depot
* @param {Internal.BlockContainerJS} destination
* @param {Internal.Entity} package
*/
function teleport_package(depot,destination,package_item){
	let level = depot.getLevel()
	let destination_level = destination.getLevel()
	let [pos_x,pos_y,pos_z] = [destination.getX(),destination.getY(),destination.getZ()]
	let [depot_x,depot_y,depot_z] = [depot.getX(),depot.getY(),depot.getZ()]
	let destination_dim = destination_level.getDimension()
	package_item.teleportTo(destination_dim,pos_x + 0.5,pos_y,pos_z + 0.5,0,0)
	level.playSound(null,depot_x,depot_y,depot_z,"minecraft:entity.enderman.teleport","players",1,0)
	level.spawnParticles("minecraft:reverse_portal",false,depot_x,depot_y,depot_z,0.5,0.5,0.5,100,0.1)
	destination_level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.enderman.teleport","players",1,0)
	destination_level.spawnParticles("minecraft:reverse_portal",false,pos_x,pos_y,pos_z,0.5,0.5,0.5,100,0.1)
	let last_package_location = {"dimension":destination_dim.toString(),"X":pos_x + 0.5,"Y":pos_y,"Z":pos_z + 0.5}
	depot.getEntityData().getCompound("data").put("last_package_location",last_package_location)
}
/**
* @param {Internal.BlockContainerJS} depot
* @param {String} address
*/
function get_package_destination(depot,address){
	let server = depot.getLevel().getServer()
	let depot_data = depot.getEntityData().getCompound("data")
	let address_list = depot_data.getCompound("address_list")
	let address_data = address_list.getCompound(address)
	let dimension = address_data.getString("dimension")
	let destination_level = server.getLevel(dimension)
	let position = address_data.getCompound("position")
	let [pos_x,pos_y,pos_z] = [position.getInt("X"),position.getInt("Y"),position.getInt("Z")]
	let destination = destination_level.getBlock(pos_x,pos_y,pos_z)
	return destination
}
/**
* @param {Internal.BlockContainerJS} depot
* @param {Internal.Entity} package_item
*/
function does_depot_have_package_address(depot,package_item){
	let address = get_package_address(package_item)
	if (address == "any") {
		return true
	}
	try {
		let depot_data = depot.getEntityData().getCompound("data")
		let address_list = depot_data.getCompound("address_list")
		address_list.getCompound(address)
		return true
	} catch (error) {
		return false
	}
}
/**
* @param {Internal.Entity} package_item
*/
function get_package_address(package_item){
	try {
		let package_data = package_item.getNbt().getCompound("Box").getCompound("tag")
		let address = package_data.getString("Address")
		if (address == "") {
			return "any"
		}
		return address
	} catch (error) {
		return "any"
	}
}
/**
* @param {Internal.BlockContainerJS} depot
* @param {Internal.Entity} package_item
*/
function get_package_address_or_depot_default(depot,package_item){
	try {
		let address = get_package_address(package_item)
		if (address == "any") {
			return get_depot_default_address(depot)
		}
		return address
	} catch (error) {
		let address = get_depot_default_address(depot)
		return address	
	}
}
/**
* @param {Internal.BlockContainerJS} depot
*/
function get_depot_default_address(depot){
	let colour = depot.properties.get("age")
	if (colour == "1") {
		return "Brown"
	}
	if (colour == "2") {
		return "Red"
	}
	if (colour == "3") {
		return "Orange"
	}
	if (colour == "4") {
		return "Yellow"
	}
	if (colour == "5") {
		return "Lime"
	}
	if (colour == "6") {
		return "Green"
	}
	if (colour == "7") {
		return "Cyan"
	}
	if (colour == "8") {
		return "Light Blue"
	}
	if (colour == "9") {
		return "Blue"
	}
	if (colour == "10") {
		return "Purple"
	}
	if (colour == "11") {
		return "Magenta"
	}
	if (colour == "12") {
		return "Pink"
	}
	if (colour == "13") {
		return "White"
	}
	if (colour == "14") {
		return "Light Gray"
	}
	if (colour == "15") {
		return "Gray"
	}
	if (colour == "16") {
		return "Black"
	}
	return "None"
}
//This is broken but I guess its fine for now
/**
* @param {Internal.BlockContainerJS} depot
* @param {Internal.BlockContainerJS} destination
*/
function is_destination_not_depot(depot,destination){
	let [pos_x,pos_y,pos_z] = [destination.getX(),destination.getY(),destination.getZ()]
	let [depot_x,depot_y,depot_z] = [depot.getX(),depot.getY(),depot.getZ()]
	let pass_x = (pos_x == depot_x)
	let pass_y = (pos_y == depot_y)
	let pass_z = (pos_z == depot_z)
	if (pass_x && pass_y && pass_z) {
		return false
	}
	return true
}
/**
* @param {String} type
* @param {Internal.BlockContainerJS} depot
* @param {Internal.BlockContainerJS} destination
*/
function does_destination_respect_type(type,depot,destination){
	if (type == "rich") {
		return does_destination_respect_type_nether(depot,destination)
	} else if (type == "pink") {
		return does_destination_respect_type_same_dim(depot,destination)
	}
	return true
}
/**
* @param {Internal.BlockContainerJS} depot
* @param {Internal.BlockContainerJS} destination
*/
function does_destination_respect_type_nether(depot,destination){
	let depot_dim = depot.getLevel().getDimension()
	let destination_dim = destination.getLevel().getDimension()
	if (depot_dim == "minecraft:overworld") {
		if (destination_dim == "minecraft:the_nether") {
			return true
		}
	} else if (depot_dim == "minecraft:the_nether") {
		if (destination_dim == "minecraft:overworld") {
			return true
		}
	}
	return false
}
/**
* @param {Internal.BlockContainerJS} depot
* @param {Internal.BlockContainerJS} destination
*/
function does_destination_respect_type_same_dim(depot,destination){
	let depot_dim = depot.getLevel().getDimension()
	let destination_dim = destination.getLevel().getDimension()
	if (depot_dim == destination_dim) {
		return true
	}
	return false
}