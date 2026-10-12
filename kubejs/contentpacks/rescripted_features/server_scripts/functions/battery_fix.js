LootJS.modifiers((event) => {

let battery_drops = (id, drop_item) => {
event
    .addBlockLootModifier(id)
    .replaceLoot(id, drop_item);
}

battery_drops("kubejs:batteries", "3x kubejs:battery")
battery_drops("kubejs:lithium_ion_batteries", "3x kubejs:lithium_ion_battery")
 
})