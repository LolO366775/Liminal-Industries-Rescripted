ServerEvents.tags('item', event => {
    [
        'red', 'orange', 'green', 'lime', 'blue', 'lblue', 'pink', 'purple'
    ].forEach(colour =>
        event.add('backrooms:coloured_wallpapers', `kubejs:wallpaper_${colour}`)
    )
})