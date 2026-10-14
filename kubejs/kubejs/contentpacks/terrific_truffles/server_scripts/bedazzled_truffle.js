ServerEvents.recipes(event => {

    event.recipes.create.sequenced_assembly(
        [
            Item.of('kubejs:bedazzled_truffle')
        ],
        'kubejs:carpet_truffle',
        [
            event.recipes.create.filling(
                'kubejs:carpet_truffle',
                [
                    'kubejs:carpet_truffle',
                    Fluid.of('tconstruct:molten_iron', 10)
                ]
            ),

            event.recipes.create.filling(
                'kubejs:carpet_truffle',
                [
                    'kubejs:carpet_truffle',
                    Fluid.of('tconstruct:molten_copper', 10)
                ]
            ),

            event.recipes.create.filling(
                'kubejs:carpet_truffle',
                [
                    'kubejs:carpet_truffle',
                    Fluid.of('tconstruct:molten_gold', 10)
                ]
            ),

            event.recipes.create.filling(
                'kubejs:carpet_truffle',
                [
                    'kubejs:carpet_truffle',
                    Fluid.of('tconstruct:molten_nickel', 10)
                ]
            ),

            
            event.recipes.create.filling(
                'kubejs:carpet_truffle',
                [
                    'kubejs:carpet_truffle',
                    Fluid.of('tconstruct:molten_emerald', 10)
                ]
            ),

            event.recipes.create.filling(
                'kubejs:carpet_truffle',
                [
                    'kubejs:carpet_truffle',
                    Fluid.of('tconstruct:molten_tin', 10)
                ]
            ),

            event.recipes.create.filling(
                'kubejs:carpet_truffle',
                [
                    'kubejs:carpet_truffle',
                    Fluid.of('tconstruct:molten_lead', 10)
                ]
            ),

        ]
    )
        .transitionalItem('kubejs:carpet_truffle')
        .loops(5)

})