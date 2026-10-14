ServerEvents.recipes(event => {
    event.remove({id: 'tconstruct:smeltery/melting/metal/netherite/lodestone'})
    event.recipes.createCompacting('minecraft:netherite_ingot', 'minecraft:lodestone').superheated()
})