Ponder.registry((event) => {
    event
        .create("kubejs:carpet_truffle")
        .scene(
            "searching_for_truffles",
            "Searching For Truffles",
            "kubejs:7x7_backrooms_floor",
            (scene, util) => {
                // scene which shows truffle obtainment
                const centerBlockPos = util.grid.at(3.5, 0, 3.5);
                const centerTop = util.vector.topOf(centerBlockPos);
                scene.showStructure();
                scene.idle(10);
                scene.addKeyframe();
                scene.text(60, "To search for a truffle, crawl and hold right click on a carpet", [3.45, 1, 3.5]).placeNearTarget();
                scene.idle(30);
                scene.showControls(80, centerBlockPos.above(1), "down").rightClick();
                scene.idle(40);
                scene.addKeyframe();
                scene.world.createItemEntity(centerTop.add(0, 1, 0), util.vector.of(-0.04, 0.5, -0.04), "kubejs:carpet_truffle");
                scene.idle(30);
                scene.text(40, "After enough clicks, a truffle will pop out", [2.7, 1.15, 3]).placeNearTarget();
                scene.idle(70);
                scene.text(120, "You cannot get truffles from the same area twice*", [3.5, 1, 3.5]).placeNearTarget();
                scene.idle(40);
            }
        )
        .scene(
            "inspecting_carpet",
            "Inspecting Carpet",
            "kubejs:7x7_backrooms_floor",
            (scene, util) => {
                // scene which shows spyglass searching
                scene.showStructure();
                scene.idle(10);
                scene.text(60, "A spyglass will show you if truffles can be harvested from a carpet", [3.5, 1, 3.5]).placeNearTarget();
                scene.idle(60);
                scene.addKeyframe();
                scene.showControls(70, [5.5, 1, 3.5], "down").rightClick().whileSneaking().withItem("spyglass");
                scene.idle(10);
                scene.text(60, '"The carpet here looks thoroughly picked over."', [5.45, 0.5, 3.5]).colored(PonderPalette.RED).placeNearTarget();
                scene.idle(80);
                scene.addKeyframe();
                scene.text(60, "If it appears anything but undisturbed, it's best to search somewhere else", [5.5, 1, 3.5]).placeNearTarget();
                scene.idle(80);
                scene.showControls(70, [1.5, 1, 3.5], "down").rightClick().whileSneaking().withItem("spyglass");
                scene.idle(10);
                scene.text(60, '"The carpet looks undisturbed."', [1.45, 0.5, 3.5]).colored(PonderPalette.FAST).placeNearTarget();
                scene.idle(40);
                scene.world.createItemEntity(util.vector.topOf(util.grid.at(1.5, 0, 3.5)), util.vector.of(0.04, 0.5, -0.07), "kubejs:carpet_truffle");
                scene.idle(30);
                scene.addKeyframe();
                scene.text(80, "Carpets will return to an undisturbed state if you pick at other areas enough", [5.5, 0.5, 3.5]).placeNearTarget();
                scene.idle(80);
                scene.showControls(130, [5.5, 1, 3.5], "down").rightClick().whileSneaking().withItem("spyglass");
                scene.idle(10);
                scene.text(120, '"The carpet looks undisturbed."', [5.45, 0.5, 3.5]).colored(PonderPalette.FAST).placeNearTarget();
                scene.idle(40);
            }
        );
});