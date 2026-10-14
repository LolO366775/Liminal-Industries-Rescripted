ServerEvents.recipes(event => {
	event.remove({ id: 'create_enchantment_industry:crafting/printer' })
	event.remove({ id: 'create_hypertube:hypertube_entrance' })
	event.shaped('create_hypertube:hypertube_entrance', [
		' A ', 
		' B ',
		' C '  
		],{
		  A: 'thermal:cured_rubber', 
		  B: 'create:smart_chute',
		  C: 'create:cogwheel'
	})
	event.shaped('create_enchantment_industry:printer', [
		' A ', 
		' B ',
		' C '  
		],{
		  A: 'create:copper_casing', 
		  B: 'thermal:cured_rubber',
		  C: 'create:iron_sheet'
	})
})