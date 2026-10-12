ServerEvents.recipes(event => {
    //kubejs immersive engineering compat is so shit that the arc furnace recipes from the actual modpack devs (not me) just use event.custom instead :face_holding_back_tears:
    event.custom({
        "type": "immersiveengineering:arc_furnace",
        "additives": [
        {
            "tag": "forge:glass/colorless"
        },
        {
            "tag": "forge:wires/electrum"
        }
        ],
        "energy": 30720,
        "input": {
        "tag": "forge:ingots/electrum"
        },
        "results": [
        {
            "base_ingredient": {
            "item": "immersiveengineering:electron_tube"
            },
            "count": 1
        }
        ],
        "slag": {
            "item": "immersiveengineering:slag"
        },
        "time": 60
    })
    event.custom({
        "type": "immersiveengineering:arc_furnace",
        "additives": [
        {
            "tag": "forge:glass/colorless"
        },
        {
            "tag": "forge:wires/copper"
        }
        ],
        "energy": 20480,
        "input": {
        "tag": "forge:ingots/copper"
        },
        "results": [
        {
            "base_ingredient": {
            "item": "kubejs:fluorescent_tube"
            },
            "count": 1
        }
        ],
        "slag": {
            "item": "immersiveengineering:slag"
        },
        "time": 40
    })
    event.custom({
        "type": "immersiveengineering:arc_furnace",
        "additives": [
        {
            "tag": "forge:dusts/iron"
        }
        ],
        "energy": 15360,
        "input": {
        "item": "minecraft:glass"
        },
        "results": [
        {
            "base_ingredient": {
            "item": "immersiveengineering:insulating_glass"
            },
            "count": 2
        }
        ],
        "slag": {
            "item": "immersiveengineering:slag"
        },
        "time": 60
    })
})