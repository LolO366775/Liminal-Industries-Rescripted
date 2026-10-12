ServerEvents.tags('block', event => {
    event.add('kubejs:yellow_ceilling_lamps_on', ['kubejs:ceilling_lamp','kubejs:ceilling_lamp_blinking'])
    event.add('kubejs:yellow_ceilling_lamps_off', ['kubejs:ceilling_lamp_off','kubejs:ceilling_lamp_blinking','kubejs:ceilling_lamp_dying'])
    event.add('kubejs:yellow_ceilling_lamps_broken', ['kubejs:ceilling_lamp_broken','kubejs:ceilling_lamp_breaking'])

    event.add('kubejs:white_ceilling_lamps_on', ['kubejs:ceilling_lamp2','kubejs:ceilling_lamp2_blinking'])
    event.add('kubejs:white_ceilling_lamps_off', ['kubejs:ceilling_lamp2_off','kubejs:ceilling_lamp2_blinking','kubejs:ceilling_lamp2_dying'])
    event.add('kubejs:white_ceilling_lamps_broken', ['kubejs:ceilling_lamp2_broken','kubejs:ceilling_lamp2_breaking'])

    event.add('kubejs:red_ceilling_lamps_on', ['kubejs:ceilling_lamp_red','kubejs:ceilling_lamp_red_blinking'])
    event.add('kubejs:red_ceilling_lamps_off', ['kubejs:ceilling_lamp_red_off','kubejs:ceilling_lamp_red_blinking','kubejs:ceilling_lamp_red_dying'])
    event.add('kubejs:red_ceilling_lamps_broken', ['kubejs:ceilling_lamp_red_broken','kubejs:ceilling_lamp_red_breaking'])
})