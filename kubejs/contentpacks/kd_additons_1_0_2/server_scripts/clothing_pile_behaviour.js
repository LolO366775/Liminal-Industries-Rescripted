BlockEvents.rightClicked('kubejs:clothing_pile', event => {
    const block = event.block
    const item = event.item
    const layers = Number(block.properties.layers)

    if (event.item.id == 'kubejs:clothing_pile'){
        let pile = event.getBlock()
        if (layers < 7){
            pile.set(pile.getId(),{"layers":`${layers+1}`})

            if (!event.player.isCreative()){
                event.item.count--
            }
        }
        if (layers == 7){
            pile.set('kubejs:clothing_pile_full')

            if (!event.player.isCreative()) {
                event.item.count--
            }
        }
    }
    event.cancel()
})