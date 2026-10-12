const MobEffectInstance = Java.loadClass('net.minecraft.world.effect.MobEffectInstance')

ItemEvents.foodEaten('kubejs:truffle_scented_potato_chips', event => {
    const player = event.player

    player.getActiveEffects().forEach(effect => {
        player.addEffect(new MobEffectInstance(
            effect.getEffect(),
            Math.min(6000, effect.getDuration() + 200),
            effect.getAmplifier(),
            effect.isAmbient(),
            effect.isVisible(),
            effect.showIcon()
        ))
    })
})



ServerEvents.recipes(event => {

    /*event.custom({
        type: "createaddition:rolling",
        input: {
            item: "kubejs:putty_knife"
        },
        result: Item.of("kubejs:crinkle_cutter", '{Unbreakable:1b}').toJson()
    })*/

    event.recipes.farmersdelight.cutting(
        'minecraft:potato',
        '#farmersdelight:tools/knives', // tool
        [ // results
            Item.of('kubejs:potato_slice', 3)
        ],
        'farmersdelight:block.cutting_board.knife'
    ).id('kubejs:potato_cutting')

    event.recipes.create.cutting (
            Item.of('kubejs:potato_slice', 4), 
            "minecraft:potato"
    ).id('kubejs:potato_slicing')

    event.smoking(
        'kubejs:potato_chips',
        'kubejs:potato_slice',
        0.01,
        100
    );

    event.recipes.create.filling(Item.of('kubejs:truffle_scented_potato_chips'), [Fluid.of('kubejs:truffle_oil', 10), Item.of('kubejs:potato_chips')])


})

ServerEvents.recipes(event => {
    event.remove({ id: /.*using_deployer.*/ })
})


/*ServerEvents.recipes(event => {
    const ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries')

    ForgeRegistries.MOB_EFFECTS.getKeys().forEach(id => {
        console.log(id.toString()) // e.g. "minecraft:speed", "kubejs:custom_effect"
    })
})*/