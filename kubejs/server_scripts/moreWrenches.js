ServerEvents.tags('block', event => {

    const thermalDynamons = event.get('thermal:dynamos').getObjectIds()
    const thermalMachines = event.get('thermal:machines').getObjectIds()
    //const tinkersSmeltry = event.get('tconstruct:smeltery').getObjectIds()
    //const tinkersFoundary = event.get('tconstruct:foundry').getObjectIds()
   thermalDynamons.concat(thermalMachines).forEach(nBlock => 
       event.add('create:wrench_pickup', nBlock)
    )
    const tinkersSmeltry = event.get('tconstruct:smeltery').getObjectIds()
    const tinkersFoundary = event.get('tconstruct:foundry').getObjectIds()

    tinkersSmeltry.concat(tinkersFoundary).forEach(nBlock => {
        if (nBlock.getNamespace() == 'tconstruct'){
            event.add('create:wrench_pickup', nBlock)
        }
    })
})
