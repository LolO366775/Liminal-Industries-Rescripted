ServerEvents.recipes(event => {

	let press = (Output, Catalyst, Input) => {
		event.remove({output: Output})
		event.recipes.thermal.press(Output, [Input, Catalyst])
	}

	press(
		'ae2:printed_calculation_processor',
		'ae2:calculation_processor_press',
		'ae2:certus_quartz_crystal'
	)

	press(
		'ae2:printed_engineering_processor',
		'ae2:engineering_processor_press',
		'minecraft:diamond'
	)

	press(
		'ae2:printed_logic_processor',
		'ae2:logic_processor_press',
		'minecraft:gold_ingot'
	)

	press(
		'ae2:printed_silicon',
		'ae2:silicon_press',
		'#forge:silicon'
	)

	event.recipes.thermal.press('9x thermal:sapphire', ['thermal:sapphire_block', 'thermal:press_unpacking_die'])
	event.recipes.thermal.press('9x thermal:ruby', ['thermal:ruby_block', 'thermal:press_unpacking_die'])

	event.recipes.thermal.press('2x minecraft:arms_up_pottery_sherd', ['minecraft:brick', 'minecraft:arms_up_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:burn_pottery_sherd', ['minecraft:brick', 'minecraft:burn_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:brewer_pottery_sherd', ['minecraft:brick', 'minecraft:brewer_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:heartbreak_pottery_sherd', ['minecraft:brick', 'minecraft:heartbreak_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:mourner_pottery_sherd', ['minecraft:brick', 'minecraft:mourner_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:prize_pottery_sherd', ['minecraft:brick', 'minecraft:prize_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:explorer_pottery_sherd', ['minecraft:brick', 'minecraft:explorer_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:heart_pottery_sherd', ['minecraft:brick', 'minecraft:heart_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:angler_pottery_sherd', ['minecraft:brick', 'minecraft:angler_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:plenty_pottery_sherd', ['minecraft:brick', 'minecraft:plenty_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:archer_pottery_sherd', ['minecraft:brick', 'minecraft:archer_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:friend_pottery_sherd', ['minecraft:brick', 'minecraft:friend_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:blade_pottery_sherd', ['minecraft:brick', 'minecraft:blade_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:skull_pottery_sherd', ['minecraft:brick', 'minecraft:skull_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:shelter_pottery_sherd', ['minecraft:brick', 'minecraft:shelter_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:sheaf_pottery_sherd', ['minecraft:brick', 'minecraft:sheaf_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:howl_pottery_sherd', ['minecraft:brick', 'minecraft:howl_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:mourner_pottery_sherd', ['minecraft:brick', 'minecraft:mourner_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:miner_pottery_sherd', ['minecraft:brick', 'minecraft:miner_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:danger_pottery_sherd', ['minecraft:brick', 'minecraft:danger_pottery_sherd'])
	event.recipes.thermal.press('2x minecraft:snort_pottery_sherd', ['minecraft:brick', 'minecraft:snort_pottery_sherd'])
	event.recipes.thermal.press('2x neapolitan:scream_pottery_sherd', ['minecraft:brick', 'neapolitan:scream_pottery_sherd'])
	event.recipes.thermal.press('2x neapolitan:spider_pottery_sherd', ['minecraft:brick', 'neapolitan:spider_pottery_sherd'])
	event.recipes.thermal.press('2x neapolitan:reflection_pottery_sherd', ['minecraft:brick', 'neapolitan:reflection_pottery_sherd'])
	event.recipes.thermal.press('2x neapolitan:snack_pottery_sherd', ['minecraft:brick', 'neapolitan:snack_pottery_sherd'])
})