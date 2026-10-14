
ItemEvents.foodEaten('kubejs:carpet_truffle', event => {
    const player = event.player

    player.level.playSound(null, player.x, player.y, player.z, 'minecraft:entity.axolotl.death', 'players', 1, 1 + Math.random())

})


const RESISTANCE_EFFECTS = [
    'cofh_core:cold_resistance',
    'cofh_core:explosion_resistance',
    'cofh_core:lightning_resistance',
    'cofh_core:magic_resistance',
    'corrosive_sculk:sculk_resistance',
    'minecraft:fire_resistance',
    'minecraft:resistance',]

ItemEvents.foodEaten('kubejs:truffle_scented_potato_chips', event => {

})

ItemEvents.foodEaten('kubejs:bedazzled_truffle', event => {
    const player = event.player


    player.potionEffects.add(
        'minecraft:glowing',
        600)

    const randomEffect = RESISTANCE_EFFECTS[Math.floor(Math.random() * RESISTANCE_EFFECTS.length)]

    player.potionEffects.add(randomEffect, 600, 0)

    player.level.playSound(null, player.x, player.y, player.z, 'chalk:ambient.glowing', 'players', 2, Math.random())
    player.level.playSound(null, player.x, player.y, player.z, 'minecraft:blocks.note_block.chime', 'players', 0.5, Math.random())


})