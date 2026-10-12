//Disabled for now

/*ForgeEvents.onEvent("net.minecraftforge.event.level.BlockEvent$NeighborNotifyEvent", event => {
    global.flowing_liquid_event(event)
})*/
/**
* @param {Internal.BlockEvent$NeighborNotifyEvent} event
*/
global.flowing_liquid_event = (event) => {
    let block = event.state.getBlock()
    let block_id = block.getId()
    if (block_id == "minecraft:water") {
        
    } else if (block_id == "minecraft:lava") {
        
    }
}

/**
* @param {Internal.BlockEvent$NeighborNotifyEvent} event
*/
function liquid_interact_carpet(event) {}



/*ForgeEvents.onEvent('net.minecraftforge.event.level.BlockEvent$NeighborNotifyEvent', event => {
    let block = event.state.block
    if (block.id !== 'minecraft:lava') return;
    for (let dir of event.notifiedSides) {
        const pos = event.pos.relative(dir);
        const target = event.level.getBlockState(pos);
        if (target.is('kubejs:soggy_carpet')) {
            event.level.setBlock(pos, Block.getBlock('kubejs:carpet').defaultBlockState(), 3);
            doCommandForBlock(event.level.server, `/execute positioned ${pos.x} ${pos.y} ${pos.z} run playsound minecraft:block.lava.pop block @a ~ ~ ~ 0.5 0.75`)
            break;
        }
    }
})*/