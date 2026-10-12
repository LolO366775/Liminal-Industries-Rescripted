StartupEvents.registry('item', event => {
    event.create('whisk')
            .displayName("Whisk")
            .maxStackSize(1)
            .maxDamage(128)
})