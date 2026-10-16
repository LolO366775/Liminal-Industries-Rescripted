ServerEvents.tags('block', event => {

    const thermalDynamons = event.get('thermal:dynamos').getObjectIds()
    const thermalMachines = event.get('thermal:machines').getObjectIds()
    const tinkersSmeltry = event.get('tconstruct:smeltery').getObjectIds()
    const tinkersFoundary = event.get('tconstruct:foundry').getObjectIds()
    thermalDynamons.concat(thermalMachines, tinkersSmeltry, tinkersFoundary).forEach(nBlock => 
        event.add('create:wrench_pickup', nBlock)
    )
})
