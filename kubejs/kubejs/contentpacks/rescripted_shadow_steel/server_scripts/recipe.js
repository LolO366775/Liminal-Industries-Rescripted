ServerEvents.recipes(event => {
    if (!Platform.isLoaded("legacy_shadow_steel")) {
	    event.recipes.botania.mana_infusion(
            Item.of('create:shadow_steel', 1),
            'create:chromatic_compound',
            500,
            'eidolon:shadow_gem_block'
        )
    }
})