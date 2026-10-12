//i tried to hide the musket upgrade smithing template but
//im really really stupid
//and i dont know what im doing
//and i couldnt get any of the documentation to work
//so i gave up
//sorry!!!!!!!!!!!
ServerEvents.recipes(event => {
    event.remove({ id: 'musketmod:musket_with_bayonet_smithing' })
    event.remove({ id: 'musketmod:musket_with_scope_smithing' })
    event.smithing(
    'musketmod:musket_with_bayonet',
    'minecraft:iron_nugget',
    'musketmod:musket',
    'minecraft:iron_sword'
    )
    event.smithing(
    'musketmod:musket_with_scope',
    'minecraft:iron_nugget',
    'musketmod:musket',
    'minecraft:spyglass'
    )
})