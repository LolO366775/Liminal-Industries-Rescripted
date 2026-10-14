  //1.20.1 FLuid 
  //In Startup script
  StartupEvents.registry('fluid', event => {
    
    
    // Basic "thick" (looks like lava) fluid with red tint
    event.create('kubejs:truffle_oil') // ('') contains the fluid id
        //sets the texture to thick
      .displayName('Truffle Oil') //in  game name of fluid      
      .stillTexture('kubejs:block/truffle_oil_still') 
      .flowingTexture('kubejs:block/truffle_oil_flow')
      .translucent()
      .noBucket() //adding this will cause the fluid to have no ability to go in a bucket, but will still be able to be placed into the world by machines like create mod pipe unless .noBlock() is also added
       
    })

 StartupEvents.registry('item', event => {
    
     event.create('kubejs:truffle_oil_bottle').texture('kubejs:item/truffle_oil_bottle')
   
    })