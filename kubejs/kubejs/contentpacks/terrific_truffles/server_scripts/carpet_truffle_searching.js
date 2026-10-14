const TRUFFLE_SEPARATION_RADIUS = 5

// Hoes and Tinkers' Construct tools with tilling capability block off a bigger radius
const TRUFFLE_TILL_SEPARATION_MULTIPLIER = 3
const TRUFFLE_TILL_SEPARATION_RADIUS = TRUFFLE_SEPARATION_RADIUS * TRUFFLE_TILL_SEPARATION_MULTIPLIER

const TRUFFLE_EMPTY_HAND_SEPARATION_MULTIPLIER = 5
const TRUFFLE_EMPTY_HAND_SEPARATION_RADIUS = TRUFFLE_SEPARATION_RADIUS * TRUFFLE_EMPTY_HAND_SEPARATION_MULTIPLIER

const TRUFFLE_MEMORY_LENGTH = 7
const TRUFFLE_SEARCH_SUCCESS_CHANCE = 0.005

// const TRUFFLE_FOUND_EXCITEMENT = 30 //deprtecated
// const EXCITEMENT_EFFECT = 'kubejs:recently_found_truffle' //deprecated

//const DEBUG_CHAT_ENABLED = true

// For detecting any tilling tools
const ToolActions = Java.loadClass('net.minecraftforge.common.ToolActions')
const HOE_TILL_ACTION = ToolActions.HOE_TILL

const MIN_HUNGER_COST = 0.1
const TILL_TOOL_DAMAGE = 1

// For detecting fke players 
const FakePlayer = Java.loadClass('net.minecraftforge.common.util.FakePlayer')

function getTrufflePoints(player) {
    let data = player.persistentData
    if (!data.contains('truffle_points')) {
        return []
    }
    return JSON.parse(data.getString('truffle_points'))
}

function saveTrufflePoints(player, points) {
    player.persistentData.putString('truffle_points', JSON.stringify(points))
}

function getDistance(p, x, y, z) {
    let dx = p.x - x
    let dy = p.y - y
    let dz = p.z - z
    return dx * dx + dy * dy + dz * dz
}

function canSearch(player, x, y, z) {
    let points = getTrufflePoints(player)
    for (let p of points) {
        let radius = p.radius || TRUFFLE_SEPARATION_RADIUS
        if (getDistance(p, x, y, z) <= radius ** 2) {
            return false
        }
    }
    return true
}

function distanceExplanation(player, x, y, z) {
    let points = getTrufflePoints(player)

    let closestRatio = Infinity

    for (let p of points) {
        let radius = p.radius || TRUFFLE_SEPARATION_RADIUS
        let ratio = Math.sqrt(getDistance(p, x, y, z)) / radius
        if (ratio < closestRatio) {
            closestRatio = ratio
        }
    }

    if (closestRatio === Infinity) {
        return Text.lightPurple('The carpet looks undisturbed. Time to search.')
    }

    if (closestRatio <= 0.2)
        return Text.red('The carpet here looks thoroughly picked over.')

    if (closestRatio <= 0.4)
        return Text.orange('There are hardly any promising lumps left.')

    if (closestRatio <= 0.6)
        return Text.yellow('Someone has searched this patch fairly recently.')

    if (closestRatio <= 0.8)
        return Text.green('The carpet seems a little disturbed.')

    if (closestRatio <= 1.0)
        return Text.gray('You hesitate. This spot feels familiar.')

    return Text.lightPurple('The carpet looks undisturbed. Time to search.')
}

function addSearchPoint(player, x, y, z, radius) {
    let points = getTrufflePoints(player)
    let point = {
        x: Math.floor(x),
        y: Math.floor(y),
        z: Math.floor(z),
        radius: radius
    }
    points.push(point)
    if (points.length > TRUFFLE_MEMORY_LENGTH) {
        points.shift()
    }
    saveTrufflePoints(player, points)
    //console.log(points)

    //if (DEBUG_CHAT_ENABLED) {
   //     player.tell(Text.gray(`[Truffle Debug] Blocked off (${point.x}, ${point.y}, ${point.z}) radius ${radius}`))
   // }
}


function isTillingTool(itemStack) {
    if (!itemStack) return false
    try {
        return itemStack.canPerformAction(HOE_TILL_ACTION)
    } catch (e) {
        //console.log('Truffle: tilling capability check failed:', e)
        return false
    }
}

function isFakePlayer(player) {
    try {
        return FakePlayer.isInstance(player)
    } catch (e) {
        //console.log('Truffle: fake player check failed:', e)
        return false
    }
}

function attemptTruffleSearch(event, player, block, x, y, z, radius) {
    player.swing()

    if (!canSearch(player, x, y, z)) return

    if (Math.random() < TRUFFLE_SEARCH_SUCCESS_CHANCE) {
        block.popItem('kubejs:carpet_truffle')
        addSearchPoint(player, x, y, z, radius)
        if (TRUFFLE_FOUND_EXCITEMENT === 0) {
            return
        }
        player.potionEffects.add(EXCITEMENT_EFFECT, TRUFFLE_FOUND_EXCITEMENT, 0, false, false)
    } else {
        event.cancel()
    }
}

BlockEvents.rightClicked(event => {

    if (event.hand != 'MAIN_HAND') return

    const {
        player,
        block,
        level
    } = event

    if (isFakePlayer(player)) return

    if (!block.id.endsWith('carpet')) return

    let x = block.pos.x
    let y = block.pos.y
    let z = block.pos.z
    //console.log(player.mainHandItem)

    if (String(player.getPose()) == 'SWIMMING') {
        let item = player.mainHandItem

        if (item == 'kubejs:putty_knife') {
            attemptTruffleSearch(event, player, block, x, y, z, TRUFFLE_SEPARATION_RADIUS)
        } else if (isTillingTool(item)) {

            if (item.nbt && !item.nbt.getBoolean("tic_broken")) {
                attemptTruffleSearch(event, player, block, x, y, z, TRUFFLE_TILL_SEPARATION_RADIUS)
                player.damageHeldItem()
                return
            }

        } else if (item.isEmpty()) {

                attemptTruffleSearch(event, player, block, x, y, z, TRUFFLE_EMPTY_HAND_SEPARATION_RADIUS)
                return

        }

        let soundType = block.blockState.soundType

        level.playSound(
            null, // everyone nearby
            block.pos.x + 0.5,
            block.pos.y + 0.5,
            block.pos.z + 0.5,
            soundType.placeSound,
            "blocks",
            1.0,
            1.0
        )
    }

    if (['SWIMMING', 'CROUCHING'].includes(String(player.getPose()))) {

        if (player.mainHandItem == 'minecraft:spyglass') {
            //console.log("spyglass")
            player.swing()

            player.setStatusMessage(distanceExplanation(player, x, y, z))

        }

    }
})
