const CATALYSTS = ["kubejs:crucible_catalyst_dormant", "kubejs:crucible_catalyst_active", "kubejs:crucible_catalyst_stable"]

ItemEvents.tooltip(event => {

    for (let catalyst of CATALYSTS)
        event.addAdvanced(catalyst, (item, advanced, text) => {
            // shift, alt and ctrl are all keys you can check!
            if (!event.shift && !event.ctrl) {
                text.add(1, [Text.of('Hold [').darkGray(), Text.of('Shift').gray(), Text.of('] to see more info (activation).').darkGray()],)
                text.add(2, [Text.of('Hold [').darkGray(), Text.of('Ctrl').gray(), Text.of('] to see more info (stabilisation).').darkGray()])

                if (catalyst == "kubejs:crucible_catalyst_dormant") { 
                    text.add(3, [Text.of('Hold [').darkGray(), Text.of('Ctrl').gray(), Text.of('] to see more info (stabilisation).').darkGray()])
                }

            } else if (event.shift && !event.ctrl) {

                text.add(1, [Text.of('Hold [').darkGray(), Text.of('Shift').white(), Text.of('] to see more info (activation).').darkGray()],)
                text.add(2, [Text.of('Hold [').darkGray(), Text.of('Ctrl').gray(), Text.of('] to see more info (stabilisation).').darkGray()])
                text.add(3, " ")
                text.add(4, [Text.of("To activate the ").color("#C7954B"), Text.of("Catalyst").aqua(), Text.of(" you will have to surround it with ").color("#C7954B"), Text.of("Enchanted Ash").white(), Text.of(" that will be consumed. It will need to be replaced in order to keep Catalyst active. Active Catalyst emits light.").color("#C7954B")])
                text.add(5, [Text.of('╔').white(), Text.of('═').white(), Text.of('╗').white()])
                text.add(6, [Text.of('║').white(), Text.of('█').aqua(), Text.of('║').white()])
                text.add(7, [Text.of('╚').white(), Text.of('═').white(), Text.of('╝').white()])

            } else if (!event.shift && event.ctrl) {

                text.add(1, [Text.of('Hold [').darkGray(), Text.of('Shift').gray(), Text.of('] to see more info (activation).').darkGray()],)
                text.add(2, [Text.of('Hold [').darkGray(), Text.of('Ctrl').white(), Text.of('] to see more info (stabilisation).').darkGray()])
                text.add(3, " ")
                text.add(4, [Text.of("Hitting ").color("#C7954B"), Text.of("Dormant Catalyst").aqua(), Text.of(" with srench will disturb it and create a feeedback useful for stabilisation diagnostics.").color("#C7954B")])
                text.add(5, [Text.of("[ Lingering Smoke ]").white(), Text.of(" means a Head/Skull or Eye is missing.").color("#C7954B")])
                text.add(6, [Text.of("[ Blue Flame ]").aqua(), Text.of(" means a Head/Skull is present but there is not enough candles installed on it.").color("#C7954B")])
                text.add(7, [Text.of("[ Orange Flame ]").color("#ff810b") , Text.of(" means a Head/Skull has enough candles installed, but they are not yet lit.").color("#C7954B")])
                text.add(8, [Text.of("[ Green Stars ]").green(), Text.of(" means a Head/Skull or Eye is considered a valid anchor to stabilize the Catalyst.").color("#C7954B")])

            } else if (event.shift && event.ctrl) {

                text.add(1, [Text.of('Hold [').darkGray(), Text.of('Shift').white(), Text.of('] to see more info.').darkGray()])
                text.add(2, [Text.of('Hold [').darkGray(), Text.of('Ctrl').white(), Text.of('] to see more info (stabilisation).').darkGray()])
                text.add(2, " ")
                text.add(3, [Text.of("To activate the ").color("#C7954B"), Text.of("Catalyst").aqua(), Text.of(" you will have to surround it with ").color("#C7954B"), Text.of("Enchanted Ash").white(), Text.of(" that will be consumed. It will need to be replaced in order to keep Catalyst active. Active Catalyst emits light.").color("#C7954B")])
                text.add(4, [Text.of('╔').white(), Text.of('═').white(), Text.of('╗').white()])
                text.add(5, [Text.of('║').white(), Text.of('█').aqua(), Text.of('║').white()])
                text.add(6, [Text.of('╚').white(), Text.of('═').white(), Text.of('╝').white()])

                text.add(7, " ")
                text.add(8, [Text.of("Hitting ").color("#C7954B"), Text.of("Dormant Catalyst").aqua(), Text.of(" with srench will disturb it and create a feeedback useful for stabilisation diagnostics.").color("#C7954B")])
                text.add(9, [Text.of("[ Lingering Smoke ]").white(), Text.of(" means a Head/Skull or Eye is missing.").color("#C7954B")])
                text.add(10, [Text.of("[ Blue Flame ]").aqua(), Text.of(" means a Head/Skull is present but there is not enough candles installed on it.").color("#C7954B")])
                text.add(11, [Text.of("[ Orange Flame ]").color("#ff810b") , Text.of(" means a Head/Skull has enough candles installed, but they are not yet lit.").color("#C7954B")])
                text.add(12, [Text.of("[ Green Stars ]").green(), Text.of(" means a Head/Skull or Eye is considered a valid anchor to stabilize the Catalyst.").color("#C7954B")])
                text.add(13, " ")
                text.add(14, [Text.of("Fully Stable Catalyst no longer consumes Enchanted Ash ").color("#C7954B")])
            }
        })

})


JEIEvents.information (event => {
     for (let catalyst of CATALYSTS)
    event.addItem(catalyst, "Active Catalyst and Stable Catalyst allows for crafting of Crucible recipes in Basin.")

})