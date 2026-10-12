ServerEvents.tags('block', event => {
    event.add('kubejs:stripped_wallpapers', ['kubejs:wallpaper_nest','kubejs:wallpaper_nest_perm'])
    event.add('kubejs:stripped_wallpapers', ['kubejs:stripped_wallpaper','kubejs:stripped_wallpaper_perm'])
    event.add('kubejs:stripped_wallpapers', ['kubejs:stripped_wallpaper2','kubejs:stripped_wallpaper2_perm'])
    event.add('kubejs:stripped_wallpapers', ['kubejs:stripped_wallpaper3','kubejs:stripped_wallpaper3_perm'])
    event.add('kubejs:stripped_wallpapers', ['kubejs:stripped_wallpaper4','kubejs:stripped_wallpaper4_perm'])
    event.add('kubejs:stripped_wallpapers', ['kubejs:stripped_wallpaper5','kubejs:stripped_wallpaper5_perm'])
    event.add('kubejs:stripped_wallpapers', ['kubejs:stripped_wallpaper6','kubejs:stripped_wallpaper6_perm'])
    event.add('kubejs:stripped_wallpapers', ['kubejs:stripped_wallpaper7','kubejs:stripped_wallpaper7_perm'])

    event.add('kubejs:ceilling_lamps', ['#kubejs:yellow_ceilling_lamps_on','#kubejs:yellow_ceilling_lamps_off','#kubejs:yellow_ceilling_lamps_broken'])
    event.add('kubejs:ceilling_lamps', ['#kubejs:white_ceilling_lamps_on','#kubejs:white_ceilling_lamps_off','#kubejs:white_ceilling_lamps_broken'])
    event.add('kubejs:ceilling_lamps', ['#kubejs:red_ceilling_lamps_on','#kubejs:red_ceilling_lamps_off','#kubejs:red_ceilling_lamps_broken'])

    event.add('kubejs:yellow_ceilling_lamps_on', ['kubejs:ceilling_lamp_buzzing','kubejs:ceilling_lamp_waking'])
    event.add('kubejs:white_ceilling_lamps_on', ['kubejs:ceilling_lamp2_buzzing','kubejs:ceilling_lamp2_waking'])
    event.add('kubejs:red_ceilling_lamps_on', ['kubejs:ceilling_lamp_red_buzzing','kubejs:ceilling_lamp_red_waking'])

    event.add('kubejs:traffic_signs', [
        'kubejs:arrow1_sign',
        'kubejs:arrow2_sign',
        'kubejs:liminal_warning',
        'kubejs:liminal_warning2',
        'kubejs:box_sign',
        'kubejs:infinity_sign',
        'kubejs:skull_sign',
        'kubejs:stop_sign',
        'kubejs:explantion1_sign',
        'kubejs:explantion2_sign',
        'kubejs:unknown1',
        'kubejs:cross_sign',
        'kubejs:exit_sign',
        'kubejs:exit_sign2',
        'kubejs:left_arrow_sign',
        'kubejs:right_arrow_sign',
        'kubejs:nowhere_sign',
        'kubejs:monolith_sign',
        'kubejs:witahdigroi_sign',
        'kubejs:tripple_sign',
        'kubejs:turn_back_sign',
        'kubejs:inkblod_sign'
    ])
})