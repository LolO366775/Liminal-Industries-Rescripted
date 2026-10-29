//credit to the goblin
ServerEvents.recipes(event => {
    event.custom(
        {
            "type": "create:mixing",
            "ingredients": [
                {
                    "item": "kubejs:carpet_dust"
                },
                {
                    "item": "kubejs:carpet_dust"
                },
                {
                    "item": "kubejs:carpet_dust"
                },
                {
                    "item": "minecraft:sugar"
                },
                {
                "amount": 1000,
                "fluid": "minecraft:water",
                "nbt": {}
                }
            ],
            "results": [
                {
                "item": "kubejs:carpet_dough"
                }
            ]
        }
)
})