
const floor_tiles = ['kubejs:floor_tiles','kubejs:drain','kubejs:drain_breakable']

ServerEvents.recipes(event => {

    const tinker_flooring_list = ['seared_bricks','seared_stone','seared_cobble','seared_paver', 
    'scorched_bricks','scorched_road']

    let slabFunc = (output, input) => {
        event.shaped(output, [
		    'SS'
		],{
		    S: input
        }
    )
    }

    event.recipes.create.pressing('kubejs:seared_bricks_flooring', 'tconstruct:seared_brick')
    event.recipes.create.pressing('kubejs:scorched_bricks_flooring', 'tconstruct:scorched_brick')
    tinker_flooring_list.forEach(block => {
        const BaseBlock = `tconstruct:${block}`
        const BaseSlab = `tconstruct:${block}_slab`
        const Output = `kubejs:${block}_flooring`
        event.stonecutting(`4x ${Output}`, BaseBlock)
        event.stonecutting(`2x ${Output}`, BaseSlab)
        slabFunc(`4x ${Output}`, BaseSlab)
    })




})