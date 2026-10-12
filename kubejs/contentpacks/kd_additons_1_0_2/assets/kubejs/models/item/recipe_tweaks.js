ServerEvents.recipes(event => {
event.recipes.create.sequenced_assembly(
    [
        'immersiveengineering:rs_engineering'
    ],
    'kubejs:light_engineering_empty',
    [
        event.recipes.create.deploying(
            'kubejs:light_engineering_empty',
            [
                'kubejs:light_engineering_empty',
                'thermal:redstone_mushroom_spores'
            ]
        ),

        event.recipes.create.deploying(
            'kubejs:light_engineering_empty',
            [
                'kubejs:light_engineering_empty',
                'minecraft:redstone_wire'
            ]
        ),

        event.recipes.create.deploying(
            'kubejs:light_engineering_empty',
            [
                'kubejs:light_engineering_empty',
                'immersiveengineering:wire_copper'
            ]
        ),

        event.recipes.create.deploying(
            'kubejs:light_engineering_empty',
            [
                'kubejs:light_engineering_empty',
                'immersiveengineering:wire_copper'
            ]
        )
    ]
)
.transitionalItem('kubejs:light_engineering_empty')
.loops(1)
	})