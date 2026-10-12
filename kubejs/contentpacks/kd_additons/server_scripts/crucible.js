ServerEvents.recipes(event => {
    event.forEachRecipe({type:'eidolon:crucible'}, recipe => {
        let json = JSON.parse(recipe.json.toString())
        let inputs = []
        json.steps.forEach(step => {
            if (!step.items) {return}
            step.items.forEach(input => {
                if (input.item) {
                    inputs.push(input.item)
                } else if (input.tag) {
                    inputs.push('#' + input.tag)
                }
            })
        })
        inputs.push(Fluid.of('minecraft:water', 1000))
        event.recipes.create.mixing(Item.of(json.result.item, json.result.count || 1),inputs).heatLevel('CRUCIBLECATALYST').id('kubejs:eidolon_crucible/' + recipe.getId().toString().replace('eidolon:', ''))
    })
})