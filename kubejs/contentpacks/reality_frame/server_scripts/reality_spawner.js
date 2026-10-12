BlockEvents.rightClicked("kubejs:reality_spawner", event => {
	if (event.getHand() == "MAIN_HAND") {
		if (event.getItem().getId() == "create:blaze_cake") {
			event.getItem().shrink(1)
			let spawner = event.getBlock()
			let [pos_x,pos_y,pos_z] = [spawner.getX(),spawner.getY(),spawner.getZ()]
			let level = event.getLevel()
			let mob = level.createEntity("minecraft:blaze")
			mob.setPos(pos_x + 0.5,pos_y + 1,pos_z + 0.5)
			mob.spawn()
			level.spawnParticles("minecraft:flame",false,pos_x,pos_y,pos_z,1,1,1,25,0)
			level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.fire.ambient","blocks",1,2)
		}
		if (event.getItem().getId() == "kubejs:basalz_cake") {
			event.getItem().shrink(1)
			let spawner = event.getBlock()
			let [pos_x,pos_y,pos_z] = [spawner.getX(),spawner.getY(),spawner.getZ()]
			let level = event.getLevel()
			let mob = level.createEntity("thermal:basalz")
			mob.setPos(pos_x + 0.5,pos_y + 1,pos_z + 0.5)
			mob.spawn()
			level.spawnParticles("minecraft:flame",false,pos_x,pos_y,pos_z,1,1,1,25,0)
			level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.fire.ambient","blocks",1,2)
		}
		if (event.getItem().getId() == "kubejs:blizz_cake") {
			event.getItem().shrink(1)
			let spawner = event.getBlock()
			let [pos_x,pos_y,pos_z] = [spawner.getX(),spawner.getY(),spawner.getZ()]
			let level = event.getLevel()
			let mob = level.createEntity("thermal:blizz")
			mob.setPos(pos_x + 0.5,pos_y + 1,pos_z + 0.5)
			mob.spawn()
			level.spawnParticles("minecraft:flame",false,pos_x,pos_y,pos_z,1,1,1,25,0)
			level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.fire.ambient","blocks",1,2)
		}
		if (event.getItem().getId() == "kubejs:blitz_cake") {
			event.getItem().shrink(1)
			let spawner = event.getBlock()
			let [pos_x,pos_y,pos_z] = [spawner.getX(),spawner.getY(),spawner.getZ()]
			let level = event.getLevel()
			let mob = level.createEntity("thermal:blitz")
			mob.setPos(pos_x + 0.5,pos_y + 1,pos_z + 0.5)
			mob.spawn()
			level.spawnParticles("minecraft:flame",false,pos_x,pos_y,pos_z,1,1,1,25,0)
			level.playSound(null,pos_x,pos_y,pos_z,"minecraft:block.fire.ambient","blocks",1,2)
		}
	}
})
ServerEvents.recipes(event => {
	let basalz_cake = Item.exists("kubejs:basalz_cake")
	let blizz_cake = Item.exists("kubejs:basalz_cake")
	let blitz_cake = Item.exists("kubejs:basalz_cake")
	if (basalz_cake && blizz_cake && blitz_cake) {
		event.recipes.create.filling('kubejs:basalz_cake',['create:blaze_cake_base',Fluid.of('thermal:redstone', 250)])
		event.recipes.create.filling('kubejs:blizz_cake',['create:blaze_cake_base',Fluid.of('tconstruct:powdered_snow', 250)])
		event.recipes.create.filling('kubejs:blitz_cake',['create:blaze_cake_base',Fluid.of('thermal:glowstone', 250)])
	}
	event.remove("enderio:powered_spawner")
	event.recipes.create.mechanical_crafting("enderio:powered_spawner", [
			'SRS',
			'SES',
			'VZV'  
			],{
			"S": "enderio:soularium_ingot",
			"V": "enderio:vibrant_crystal",
			"Z": "enderio:z_logic_controller",
			"E": "enderio:ensouled_chassis",
			"R": "kubejs:reality_spawner"
		})
})
