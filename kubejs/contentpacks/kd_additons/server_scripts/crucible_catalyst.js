

BlockEvents.broken('kubejs:crucible_catalyst_active', event => {
    global.pewter_catalyst_deactivation(event.level, event.block.pos)
})

BlockEvents.broken('kubejs:crucible_catalyst_stable', event => {
    global.pewter_catalyst_deactivation(event.level, event.block.pos)
})


ServerEvents.blockLootTables(event => {
    event.addBlock('kubejs:crucible_catalyst_active', table => {
        table.addPool(pool => {
            pool.addItem('kubejs:crucible_catalyst_dormant', 1, [1, 1]); // pool.addItem(block id, weight, [min amount, max amount])
        });
    });
    event.addBlock('kubejs:crucible_catalyst_stable', table => {
        table.addPool(pool => {
            pool.addItem('kubejs:crucible_catalyst_dormant', 1, [1, 1]); // pool.addItem(block id, weight, [min amount, max amount])
        });
    });
});

ServerEvents.recipes(event => {

    event.custom({
        type: "create:item_application",
        ingredients: [
            { item: 'botania:alchemy_catalyst' },
            { item: 'eidolon:crucible' }
        ],
        results: [
            { item: 'kubejs:crucible_catalyst_dormant' }
        ]
    }).id(`kubejs:caudron_on_alchemy_catalyst_application_manual_only`)

})

BlockEvents.rightClicked('kubejs:crucible_catalyst_active', event => {


})
// server_scripts/skull_to_candle.js
const HEAD_STABILIZER_BLOCKS = [
    'tconstruct:husk_head',
    'tconstruct:enderman_head',
    'tconstruct:blaze_head',
    'tconstruct:piglin_brute_head',
    'minecraft:piglin_head',
    'minecraft:creeper_head',
    'minecraft:zombie_head',
    'minecraft:player_head',
    'minecraft:wither_skeleton_skull',
    'tconstruct:stray_head',
    'minecraft:skeleton_skull',
    'tconstruct:cave_spider_head',
    'tconstruct:spider_head',
    'tconstruct:zombified_piglin_head',
    'neapolitan:chimpanzee_head',
    'tconstruct:drowned_head']

const EYE_STABILIZER_BLOCKS = [
    "kubejs:lost_eye",
    "kubejs:black_eye",
    "kubejs:cold_eye",
    "kubejs:corrupted_eye",
    "kubejs:cryptic_eye",
    "kubejs:cursed_eye",
    "kubejs:evil_eye",
    "kubejs:guardian_eye",
    "kubejs:magical_eye",
    "kubejs:nether_eye",
    "kubejs:old_eye",
    "kubejs:rogue_eye",
    "kubejs:undead_eye",
    "kubejs:witch_eye",
    "kubejs:wither_eye"
]

const STABILIZER_OFFSET_Y = 0

const STABILIZER_OFFSET_XZ = [
    [4, 0],
    [-4, 0],
    [0, 4],
    [0, -4],
    [3, -3],
    [-3, -3],
    [3, 3],
    [-3, 3]
]

global.crucible_catalyst_diagnostics = (event) => {
    let player = event.player
    if (player.mainHandItem.id != "create:wrench" || event.hand != 'MAIN_HAND') return
    let block = event.block
    let level = event.level
    let pos = block.getPos()

    let stability = global.crucible_catalyst_stabiliser_check (block, level)
    player.runCommandSilent(
  `title ${player.username} actionbar {"text":"Stability: ${stability}", "color":"aqua"}`
)

    let x = pos.getX()
    let y = pos.getY()
    let z = pos.getZ()

    player.swing()

    level.playSound(null, x, y, z, 'minecraft:block.bell.use', 'blocks', 0.1, 0.1)

    level.playSound(null, x, y, z, 'minecraft:block.bell.resonate', 'blocks', 1, 0.8)

    let _y = STABILIZER_OFFSET_Y + y

    //console.log("===== cycle =====")

    for (let [dx, dz] of STABILIZER_OFFSET_XZ) {
        let _x = dx + x
        let _z = dz + z

        let block = level.getBlock(_x, _y, _z)

        if (block.id == "minecraft:air") {
            level.spawnParticles('minecraft:campfire_signal_smoke', true, _x + 0.5, _y + 0.2, _z + 0.5, 0, 0.1, 0, 1, 0.0001)
        }

        if (HEAD_STABILIZER_BLOCKS.includes(block.id)) {

            //console.log(`===== ${_x}, ${_y}, ${_z} =====`)
            //console.log(`ID: ${block.id}`)
            //console.log(`STATE: ${block.blockState}`)
            //candle missings
            level.spawnParticles('minecraft:soul_fire_flame', true, _x + 0.5, _y + 0.5, _z + 0.4, 0, 0.5, 0, 10, 0.0001)
        }

        // Only skull_candle has these properties
        if (block.id == "amendments:skull_candle") {

            let state = block.blockState
            let definition = state.getBlock().getStateDefinition()

            let candles = state.getValue(definition.getProperty("candles"))
            let lit = state.getValue(definition.getProperty("lit"))

            //console.log(`CANDLES: ${candles}`)
            //spawn candles particle
            if (candles != 4) { //candle missings
                level.spawnParticles('minecraft:soul_fire_flame', true, _x + 0.5, _y + 0.5, _z + 0.4, 0, 0.5, 0, 10, 0.0001)
            }

            if (candles == 4 && !lit) { //unlit
                level.spawnParticles('minecraft:flame', true, _x + 0.5, _y + 0.5, _z + 0.4, 0, 0.7, 0, 20, 0.000001)
            }

            if (lit && candles == 4) {
                //green
                level.spawnParticles('minecraft:happy_villager', true, _x + 0.5, _y + 0.5, _z + 0.4, 0, 0.7, 0, 20, 0.000001)
            }

        }

        if (EYE_STABILIZER_BLOCKS.includes(block.id)) {
            //green
            level.spawnParticles('minecraft:happy_villager', true, _x + 0.5, _y + 0.5, _z + 0.4, 0, 0.7, 0, 20, 0.000001)
        }


    }
    return

}

BlockEvents.rightClicked('kubejs:crucible_catalyst_dormant', event => global.crucible_catalyst_diagnostics(event))
BlockEvents.rightClicked('kubejs:crucible_catalyst_active', event => global.crucible_catalyst_diagnostics(event))
BlockEvents.rightClicked('kubejs:crucible_catalyst_stable', event => global.crucible_catalyst_diagnostics(event))
