const BlockPos = Java.loadClass('net.minecraft.core.BlockPos')

const DUST_ID = 'eidolon:enchanted_ash'
const REQUIRED_DUST = 8
const TICK_INTERVAL = 60 // block entity serverTick runs once per second
const MAX_DUST_EATEN_PER_TICK = 4 // eats a random amount from 0 up to this many, per blockEntity serverTick

const EYE_BLOCKS = []
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

const A_HEAD = "amendments:skull_candle"

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

const STABILIZERS_FOR_FULL_STABILITY = 8

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

CreateHeatJS.registerHeatEvent(event => {
  event.registerHeat("CRUCIBLECATALYST", builder => builder
    .color(0xB8B7A0)
    .addHeatSource("kubejs:crucible_catalyst_active")
    .addHeatSource("kubejs:crucible_catalyst_stable")
  )
})

global.crucible_catalyst_deactivation = (level, pos) => {
  level.spawnParticles(
    'minecraft:explosion', true,
    pos.getX() + 0.5, pos.getY() + 0.5, pos.getZ() + 0.5,
    0.4, 0.1, 0.4,
    20,
    0.2
  )

  level.playSound(
    null, pos.getX(), pos.getY(), pos.getZ(),
    'minecraft:block.beacon.deactivate',
    'blocks',
    1,
    0.5 + Math.random()
  )
}

global.crucible_catalyst_stabilisation = (level, pos) => {
  level.spawnParticles(
    'minecraft:enchant', true,
    pos.getX() + 0.5, pos.getY(), pos.getZ() + 0.5,
    1, 1, 1,
    100,

    1
  )

  level.playSound(
    null, pos.getX(), pos.getY(), pos.getZ(),
    'minecraft:block.beacon.activate',
    'blocks',
    1,
    0.5 + Math.random()
  )

}

global.crucible_catalyst_destabilisation = (level, pos) => {
  level.spawnParticles(
    'minecraft:sculk_soul', true,
    pos.getX() + 0.5, pos.getY() + 0.5, pos.getZ() + 0.5,
    0, 0, 0,
    10,
    0
  )

  level.playSound(
    null, pos.getX(), pos.getY(), pos.getZ(),
    'block.beacon.deactivate',
    'blocks',
    1,
    0.8
  )

  level.playSound(
    null, pos.getX(), pos.getY(), pos.getZ(),
    'minecraft:block.bell.use',
    'blocks',
    0.1,
    0.2
  )

  level.playSound(
    null, pos.getX(), pos.getY(), pos.getZ(),
    'minecraft:block.bell.resonate',
    'blocks',
    1,
    0.8
  )
}

function pickRandom(array, count) {
  let pool = array.slice()
  let picked = []
  let amount = Math.min(count, pool.length)
  for (let i = 0; i < amount; i++) {
    let index = Math.min(Math.floor(Math.random() * pool.length), pool.length - 1)
    picked.push(pool[index])
    pool.splice(index, 1)
  }
  return picked
}

function getDustNeighborPositions(level, x, y, z) {

  let candidates = []
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) {
      if (dx === 0 && dz === 0) continue // the sensor's own cell
      candidates.push(`${x + dx},${y},${z + dz}`)
    }
  }


  let positions = []
  for (let i = 0; i < candidates.length; i++) {
    let parts = candidates[i].split(',')
    let x = Number(parts[0])
    let y = Number(parts[1])
    let z = Number(parts[2])
    if (level.getBlock(x, y, z).id == DUST_ID) positions.push(candidates[i])
  }
  return positions
}

StartupEvents.registry('block', event => {

  // DORMANT
  event.create('crucible_catalyst_dormant')
    .displayName('Dormant Crucible Catalyst')
    .blockEntity(blockInfo => {

      // check if enoug dust if yes upgrade to active catalyst

      blockInfo.serverTick(TICK_INTERVAL, 0, (blockEntity) => {
        let level = blockEntity.getLevel()
        let pos = blockEntity.getBlockPos()
        let block = level.getBlock(pos)

        let dustCount = getDustNeighborPositions(level, pos.getX(), pos.getY(), pos.getZ()).length

        if (dustCount >= REQUIRED_DUST) {
          block.set('kubejs:crucible_catalyst_active')
        }
      })
    })

  // STABLE
  event.create('crucible_catalyst_stable')
    .displayName('Stable Crucible Catalyst')
    .lightLevel(1.0)
    .randomTick(tick => {

      let level = tick.getLevel()
      let pos = tick.block.getPos()

      level.playSound(null, pos.getX() + 0.5, pos.getY() + 0.5, pos.getZ() + 0.5, 'eidolon:wraith_ambient', 'blocks', 0.3 + Math.random() * 0.3, 0.5 + Math.random())
      level.playSound(null, pos.getX() + 0.5, pos.getY() + 0.5, pos.getZ() + 0.5, 'minecraft:block.conduit.ambient', 'blocks', 0.3 + Math.random() * 0.3, 0.5 + Math.random())
      level.spawnParticles('minecraft:soul_fire_flame', true, pos.getX() + 0.5, pos.getY() + 0.5, pos.getZ() + 0.5, 0.01, 0.02, 0.05, 20, 0.07)

    })
    .blockEntity(blockInfo => {

      //check if enough dust if fail decay into dormant
      //check if enoug hstabilisers if fail decay into active

      blockInfo.serverTick(TICK_INTERVAL * 5, 0, (blockEntity) => {
        let level = blockEntity.getLevel()
        let pos = blockEntity.getBlockPos()
        let block = level.getBlock(pos)

        //check for dust
        let dustCount = getDustNeighborPositions(level, pos.getX(), pos.getY(), pos.getZ()).length
        if (dustCount < REQUIRED_DUST) {

          global.crucible_catalyst_deactivation(level, pos)
          block.set('kubejs:crucible_catalyst_dormant')
          return

        }

        //check for stability
        let stabilizers_count =global.crucible_catalyst_stabiliser_check(block, level)
        if (stabilizers_count < STABILIZERS_FOR_FULL_STABILITY) {

          global.crucible_catalyst_destabilisation(level, pos)
          block.set('kubejs:crucible_catalyst_active')

          return
        }

      })
    })

  // ACTIVE
  event.create('crucible_catalyst_active')
    .displayName('Active Crucible Catalyst')
    .lightLevel(1.0)
    .randomTick(tick => {

      let level = tick.getLevel()
      let pos = tick.block.getPos()

      level.playSound(null, pos.getX() + 0.5, pos.getY() + 0.5, pos.getZ() + 0.5, 'minecraft:entity.skeleton.ambient', 'blocks', 0.3, 0.5)
      level.spawnParticles('minecraft:soul_fire_flame', true, pos.getX() + 0.5, pos.getY() + 0.5, pos.getZ() + 0.5, 0.01, 0.02, 0.05, 20, 0.07)

    })
    .blockEntity(blockInfo => {

      /* 
      1. check for enough dust if fail decay into dormant
      2. check for enough stabilisers if succeed upgrade into stable
      3. otherwise get dust to eat
      4. eat the dust
      */

      blockInfo.serverTick(TICK_INTERVAL * 5, 0, (blockEntity) => {
        let level = blockEntity.getLevel()
        let pos = blockEntity.getBlockPos()
        let block = level.getBlock(pos)

        //check for dust
        let dust_positions = getDustNeighborPositions(level, pos.getX(), pos.getY(), pos.getZ())
        let dustCount = dust_positions.length
        if (dustCount < REQUIRED_DUST) {

          global.crucible_catalyst_deactivation(level, pos)
          block.set('kubejs:crucible_catalyst_dormant')
          return

        }

        //check for stability
        let stabilizers_count =global.crucible_catalyst_stabiliser_check(block, level)
        console.log(stabilizers_count)
        let stability = stabilizers_count / STABILIZER_OFFSET_XZ.length

        if (stabilizers_count == STABILIZERS_FOR_FULL_STABILITY) {

          global.crucible_catalyst_stabilisation(level, pos)

          block.set('kubejs:crucible_catalyst_stable')
          return
        }

        //eat dust
        let amountToEat = Math.max(1, Math.floor((1 - stability) * Math.random() * (MAX_DUST_EATEN_PER_TICK + 1)))
        let positionsToEat = pickRandom(dust_positions, amountToEat)

        positionsToEat.forEach(positionKey => {
          let parts = positionKey.split(',')
          let x = Number(parts[0])
          let y = Number(parts[1])
          let z = Number(parts[2])

          //level.playSound()
          level.spawnParticles('minecraft:campfire_cosy_smoke', false, x + 0.5, y + 0.1, z + 0.5, 0, 1.2, 0, 0.01, 0.01)

          level.getBlock(x, y, z).set('minecraft:air')
        })


        level.playSound(null, pos.getX() + 0.5, pos.getY() + 0.5, pos.getZ() + 0.5, 'minecraft:entity.skeleton.ambient', 'blocks', 0.3, 0.5)

        level.spawnParticles('minecraft:soul_fire_flame', true, pos.getX() + 0.5, pos.getY() + 0.5, pos.getZ() + 0.5, 0.01, 0.02, 0.05, 20, 0.07)
      }
      )
    }
    )

  global.crucible_catalyst_stabiliser_check = (block, level) => {
    let stability = 0
    let _block = block
    let _level = level
    let pos = _block.getPos()

    let x = pos.getX()
    let y = pos.getY()
    let z = pos.getZ()

    let _y = STABILIZER_OFFSET_Y + y

    for (let [dx, dz] of STABILIZER_OFFSET_XZ) {
      let _x = dx + x
      let _z = dz + z

      let candidate_block = _level.getBlock(_x, _y, _z)

      //console.log(candidate_block.id)

      // Only skull_candle has these properties
      if (candidate_block.id == A_HEAD) {

        let state = candidate_block.blockState
        let definition = state.getBlock().getStateDefinition()

        let candles = state.getValue(definition.getProperty("candles"))
        //console.log(`CANDLES ${candles}`)
        let lit = state.getValue(definition.getProperty("lit"))
        //console.log(`LIT ${lit}`)

        if (lit && candles == 4) {
          //console.log(stability)
          stability++
        }
      }

      if (EYE_STABILIZER_BLOCKS.includes(candidate_block.id)) {
        stability++
      }

      //console.log(stability)
    }

    return stability

  }
})
