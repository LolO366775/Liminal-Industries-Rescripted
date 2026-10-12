/**
* @param {Registry.Block} event
*/
function block_registry_oil_carpets(event) {
	let oil_carpet = (id,display_name,type) => {
		event.create(id).displayName(display_name)
		.fullBlock(true)
		.mapColor("color_black")
		.soundType("coral_block")
		.unbreakable()
		.tagBlock('wither_immune')
		.noDrops()
		.item(item => item.modelJson({"parent": `kubejs:block/oil/${type}1`}))
		.blockstateJson = {
  			"variants": {
    			"": [{
      				"model": `kubejs:block/oil/${type}1`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/oil/${type}2`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/oil/${type}3`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/oil/${type}4`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/oil/${type}5`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/oil/${type}6`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/oil/${type}7`, "weight": 10
    			},
    			{
      				"model": `kubejs:block/oil/${type}8`, "weight": 10
   				}]
  			}
		}
	}
	oil_carpet("oil_carpet","Crude Oil Soaked Carpet","yellow")
	oil_carpet("red_oil_carpet","Crude Oil Soaked Carpet (Red)","red")
}