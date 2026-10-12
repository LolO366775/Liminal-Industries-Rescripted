ServerEvents.recipes(event => {
  event.remove({output:"amendments:dragon_charge"})
  event.shapeless('9x amendments:dragon_charge',['enderio:end_steel_grinding_ball','botania:dragonstone','eidolon:lesser_soul_gem'])
  event.recipes.thermal.crucible(Fluid.of('create_central_kitchen:dragon_breath', 250), 'amendments:dragon_charge')
  event.recipes.createMixing(Fluid.of('create_central_kitchen:dragon_breath', 250), ['amendments:dragon_charge']).heated()
})
//maybe will be used in the legacy fork
/*EntityEvents.spawned("minecraft:dragon_fireball", event => {
  let dragon = event.entity
  let pos_x = dragon.getX()
  let pos_y = dragon.getY()
  let pos_z = dragon.getZ()
  event.entity.addMotion(0,-1,0)
  event.level.playSound(null,pos_x,pos_y,pos_z,"minecraft:entity.ender_dragon.growl","hostile",1,0.5)
})
ItemEvents.firstRightClicked ("minecraft:glass_bottle", event => {
  let player = event.getPlayer()
  let pos_x = player.getX()
  let pos_y = player.getY()
  let pos_z = player.getZ()
  let nearby_entities = event.level.getEntitiesWithin(AABB.of(pos_x - 3, pos_y - 3, pos_z - 3, pos_x + 3, pos_y + 3, pos_z + 3))
  nearby_entities.forEach(element => {
    if (element.getType() == "minecraft:area_effect_cloud") {
      let breath_nbt = element.getNbt()
      if (breath_nbt.getString("Particle") == "minecraft:dragon_breath")
        event.item.shrink(1)
        player.addItem(Item.of("minecraft:dragon_breath"))
        element.mergeNbt({"Age":breath_nbt.getInt("Age") + 200})
      }
    })
})*/