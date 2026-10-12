BlockEvents.placed('kubejs:closet', event => {
    let bottom = event.getBlock()
    let top = bottom.getUp()
    if (bottom.getId() == "kubejs:closet") {
        if (top.getId() == "minecraft:air") {
            let facing = bottom.properties.get("facing")
            bottom.set("kubejs:closet", {"half": "bottom","facing": facing})
            top.set("kubejs:closet",{"half": "top","facing": facing})} else {
            event.cancel()
        }
    }
})
BlockEvents.broken('kubejs:closet', event => {
    let block = event.getBlock()
    if (block.properties.get("half") == "bottom") {
        let top = block.getUp()
        if (top.getId() == "kubejs:closet") {
            top.set("minecraft:air")
        }
    } else if (block.properties.get("half") == "top") {
        let bottom = block.getDown()
        if (bottom.getId() == "kubejs:closet") {
            bottom.set("minecraft:air")
        }
    }
})
BlockEvents.placed('kubejs:loaded_closet', event => {
    let bottom = event.getBlock()
    let top = bottom.getUp()
    if (bottom.getId() == "kubejs:loaded_closet") {
        if (top.getId() == "minecraft:air") {
            let facing = bottom.properties.get("facing")
            bottom.set("kubejs:loaded_closet", {"half": "bottom","facing": facing})
            top.set("kubejs:loaded_closet",{"half": "top","facing": facing})} else {
            event.cancel()
        }
    }
})
BlockEvents.broken('kubejs:loaded_closet', event => {
    let block = event.getBlock()
    if (block.properties.get("half") == "bottom") {
        let top = block.getUp()
        if (top.getId() == "kubejs:loaded_closet") {
            top.set("minecraft:air")
        }
    } else if (block.properties.get("half") == "top") {
        let bottom = block.getDown()
        if (bottom.getId() == "kubejs:loaded_closet") {
            bottom.set("minecraft:air")
        }
    }
})