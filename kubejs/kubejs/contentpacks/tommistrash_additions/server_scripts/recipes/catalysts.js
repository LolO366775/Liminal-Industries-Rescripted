ServerEvents.recipes(event => {
    //why doesnt kubejs have any FUCKING in world item application support
    //it has DEPLOYER support but not ITEM APPLICATION?????
    //this is worse than tinkers they ALMOST had it
    //GOD
    event.custom({
    "type": "create:item_application",
    "conditions": [
    {
        "type": "create_connected:feature_enabled",
        "feature": "create_connected:empty_fan_catalyst"
    }
    ],
    "ingredients": [
    {
        "item": "create_connected:empty_fan_catalyst"
    },
    {
        "item": "minecraft:campfire"
    }
    ],
    "results": [
    {
        "item": "create_connected:fan_smoking_catalyst"
    }
    ]
    })
    event.custom({
    "type": "create:item_application",
    "conditions": [
    {
        "type": "create_connected:feature_enabled",
        "feature": "create_connected:empty_fan_catalyst"
    }
    ],
    "ingredients": [
    {
        "item": "create_connected:empty_fan_catalyst"
    },
    {
        "item": "immersiveengineering:coal_coke"
    }
    ],
    "results": [
    {
        "item": "create_connected:fan_smoking_catalyst"
    }
    ]
    })
    event.custom({
    "type": "create:item_application",
    "conditions": [
    {
        "type": "create_connected:feature_enabled",
        "feature": "create_connected:empty_fan_catalyst"
    }
    ],
    "ingredients": [
    {
        "item": "create_connected:empty_fan_catalyst"
    },
    {
        "item": "eidolon:soulfire_wand"
    }
    ],
    "results": [
    {
        "item": "create_connected:fan_haunting_catalyst"
    }
    ]
    })
    event.custom({
    "type": "create:item_application",
    "conditions": [
    {
        "type": "create_connected:feature_enabled",
        "feature": "create_connected:empty_fan_catalyst"
    }
    ],
    "ingredients": [
    {
        "item": "create_connected:empty_fan_catalyst"
    },
    {
        "item": "kubejs:soul_lighter"
    }
    ],
    "results": [
    {
        "item": "create_connected:fan_haunting_catalyst"
    }
    ]
    })
})
