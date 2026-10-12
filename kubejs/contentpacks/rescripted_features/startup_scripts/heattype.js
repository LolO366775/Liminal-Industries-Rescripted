CreateHeatJS.registerHeatEvent(event => {
    event.registerHeat("LOWHEATED2", builder => builder
        .color(0xB8B7A0)
        .addHeatSourceIf((level, pos) => {
            let source_block = level.getBlock(pos)
            return lowheat_source_block_is_on(source_block,"lit")
        },"kubejs:concrete_burner",Component.of("Low Heated").yellow())
        .addHeatSourceIf((level, pos) => {
            let source_block = level.getBlock(pos)
            return lowheat_source_block_is_on(source_block,"active")
        },"mekanism:fuelwood_heater",Component.of("Low Heated").yellow())
        .addHeatSourceIf((level, pos) => {
            let source_block = level.getBlock(pos)
            return lowheat_source_block_is_on(source_block,"lit")
        },"farmersdelight:stove",Component.of("Low Heated").yellow())
        .addHeatSourceIf((level, pos) => {
            let source_block = level.getBlock(pos)
            return lowheat_source_block_is_on(source_block,"lit")
        },"createlowheated:basic_burner",Component.of("Low Heated").yellow())
    )
    event.modifyHeat("HEATED", data => data
        /*.addHeatSourceIf((level, pos) => {
            let source_block = level.getBlock(pos)
            return lowheat_source_block_is_on(source_block,"active")
        },"mekanism:resistive_heater")*/
        .satisfies("LOWHEATED2")
    )
})
/**
* @param {Internal.BlockContainerJS} source_block
* @param {String} blockstate
*/
function lowheat_source_block_is_on(source_block,blockstate){
    let lit = source_block.properties.get(blockstate)
    if (lit == "true") {
        return true
    }
    return false
}