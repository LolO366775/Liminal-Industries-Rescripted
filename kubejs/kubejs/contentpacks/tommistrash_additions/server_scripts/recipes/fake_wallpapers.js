//theres probably a better way to do this
let fakeWallpapers = [
    {
        wallpaperItem: "kubejs:wallpaper_red",
        wallpaperFake: "kubejs:wallpaper_fake_red"
    }, {
        wallpaperItem: "kubejs:wallpaper_orange",
        wallpaperFake: "kubejs:wallpaper_fake_orange"
    }, {
        wallpaperItem: "kubejs:wallpaper_lime",
        wallpaperFake: "kubejs:wallpaper_fake_lime"
    }, {
        wallpaperItem: "kubejs:wallpaper_green",
        wallpaperFake: "kubejs:wallpaper_fake_green"
    }, {
        wallpaperItem: "kubejs:wallpaper_blue",
        wallpaperFake: "kubejs:wallpaper_fake_blue"
    }, {
        wallpaperItem: "kubejs:wallpaper_lblue",
        wallpaperFake: "kubejs:wallpaper_fake_lblue"
    }, {
        wallpaperItem: "kubejs:wallpaper_pink",
        wallpaperFake: "kubejs:wallpaper_fake_pink"
    }, {
        wallpaperItem: "kubejs:wallpaper_purple",
        wallpaperFake: "kubejs:wallpaper_fake_purple"
    }
]

ServerEvents.recipes(event => {
    for (let data of fakeWallpapers) {
        let wallpaperItem = data.wallpaperItem
        let wallpaperFake = data.wallpaperFake
        event.custom({
            "type": "create:item_application",
            "ingredients":[
                {"item": "supplementaries:timber_frame"},
                {"item": wallpaperItem}
            ],
            "results": [
                {"item": wallpaperFake}
            ]
        })
    }
})