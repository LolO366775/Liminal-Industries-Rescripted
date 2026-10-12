BlockEvents.broken('kubejs:pewter_catalyst_active', event=>{
    global.pewter_catalyst_deactivation(event.level, event.block.pos)
})


ServerEvents.blockLootTables(event => {    
    event.addBlock('kubejs:pewter_catalyst_active', table => {
        table.addPool(pool => {
            pool.addItem('kubejs:pewter_catalyst_dormant', 1 , [1, 1]); // pool.addItem(block id, weight, [min amount, max amount])
    });
  });
});