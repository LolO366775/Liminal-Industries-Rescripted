const DUST_ID = 'eidolon:enchanted_ash'
const REQUIRED_DUST = 8
const TICK_INTERVAL = 60 // block entity serverTick runs once per second
const MAX_DUST_EATEN_PER_TICK = 4 // eats a random amount from 0 up to this many, per blockEntity serverTick

global.pewter_catalyst_deactivation = (level, pos) => {
  level.spawnParticles(
    'minecraft:soul',
    true,
    pos.getX() + 0.5,
    pos.getY() + 0.5,
    pos.getZ() + 0.5,
    0.4,
    0.4,
    0.4,
    20,
    0.2
  )

  level.playSound(
    null,
    pos.getX(),
    pos.getY(),
    pos.getZ(),
    'eidolon:wraith_hurt',
    'blocks',
    1,
    0.8
  )

  level.playSound(
    null,
    pos.getX(),
    pos.getY(),
    pos.getZ(),
    'minecraft:block.anvil.land',
    'blocks',
    0.5,
    0.2
  )

  level.playSound(
    null,
    pos.getX(),
    pos.getY(),
    pos.getZ(),
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
  event.create('pewter_catalyst_dormant')
    .displayName('Dormant Pewter Catalyst')
    .blockEntity(blockInfo => {
      blockInfo.serverTick(TICK_INTERVAL, 0, (blockEntity) => {
        let level = blockEntity.getLevel()
        let pos = blockEntity.getBlockPos()
        let block = level.getBlock(pos)
        let dustCount = getDustNeighborPositions(level, pos.getX(), pos.getY(), pos.getZ()).length

        if (dustCount >= REQUIRED_DUST) {
          block.set('kubejs:pewter_catalyst_active')
        }
      })
    })

  event.create('pewter_catalyst_active')
    .displayName('Active Pewter Catalyst')
    .lightLevel(1.0)
    .randomTick(tick => {
      if (Math.random() > 0.5) return //dont play in 50% of random ticks
      let level = tick.getLevel()
      let pos = tick.block.getPos()
      level.playSound(null, pos.getX() + 0.5, pos.getY() + 0.5, pos.getZ() + 0.5, 'eidolon:wraith_ambient', 'blocks', Math.random() * 0.3, 0.5 + Math.random())
    })
    .blockEntity(blockInfo => {
      blockInfo.serverTick(TICK_INTERVAL, 0, (blockEntity) => {
        let level = blockEntity.getLevel()
        let pos = blockEntity.getBlockPos()
        let block = level.getBlock(pos)
        let dustPositions = getDustNeighborPositions(level, pos.getX(), pos.getY(), pos.getZ())

        if (dustPositions.length < REQUIRED_DUST) {

          global.pewter_catalyst_deactivation(level, pos)

          block.set('kubejs:pewter_catalyst_dormant')
          return
          
        }


        let amountToEat = Math.floor(Math.random() * (MAX_DUST_EATEN_PER_TICK + 1))
        let positionsToEat = pickRandom(dustPositions, amountToEat)

        positionsToEat.forEach(positionKey => {
          let parts = positionKey.split(',')
          let x = Number(parts[0])
          let y = Number(parts[1])
          let z = Number(parts[2])

          //level.playSound()
          level.spawnParticles('minecraft:campfire_cosy_smoke', false, x, y + 0.1, z, 0, 1.1, 0, 0.01, 0.01)

          level.getBlock(x, y, z).set('minecraft:air')
        })
        level.playSound(null, pos.getX(), pos.getY(), pos.getZ(), 'minecraft:entity.skeleton.ambient', 'blocks', 0.3, 0.5)
      })
    })
})