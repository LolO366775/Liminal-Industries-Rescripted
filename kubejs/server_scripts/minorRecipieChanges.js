// priority: 0

// Visit the wiki for more info - https://kubejs.com/
ServerEvents.recipes(event => {
  let create_loaded = Platform.isLoaded("create")
//   let ie_loaded = Platform.isLoaded("immersiveengineering")
  let ender_io_loaded = Platform.isLoaded("enderio")

    //Fix wireless terminal recipie
    if (create_loaded && ender_io_loaded) {
        event.remove({output: 'ae2:wireless_crafting_terminal', input: 'minecraft:crafting_table'})
        event.shaped('ae2:wireless_crafting_terminal', [
            'C', 
            'A',
            'F'
            ],{
            A: 'enderio:skeletal_contractor', 
            C: 'ae2:wireless_terminal',
            F: 'create:crafting_blueprint'
            }
        )
        // event.shaped('ae2:wireless_crafting_terminal', [
        //     'C', 
        //     'A',
        //     'F'
        //     ],{
        //     A: 'ae2:crafting_terminal', 
        //     C: 'ae2:wireless_receiver',
        //     F: 'ae2:dense_energy_cell'
        //     }
        // )
    }
})