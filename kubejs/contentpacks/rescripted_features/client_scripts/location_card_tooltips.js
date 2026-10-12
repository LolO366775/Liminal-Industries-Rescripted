ItemEvents.tooltip(event => {
  event.addAdvanced("#kubejs:location_cards", (item, advanced, text) => {
    try {
      let location = item.nbt.getCompound("location")
      let dimension = location.getString("levelKey")
      let blockpos = location.getCompound("blockpos")
      let pos_x = blockpos.getInt("X")
      let pos_y = blockpos.getInt("Y")
      let pos_z = blockpos.getInt("Z")
      let address = location.getString("name")
      if (address == "") {
        let name = item.getDisplayName().getString().replace("[","").replace("]","")
        let address_display = convert_address_tooltip_to_default_if_needed(name)
        text.add(1, Text.of('Address: ').aqua().append(Text.of(address_display)))
        text.add(2, Text.of('Dimension: ').gold().append(Text.of("Unset").gray()))
        text.add(3, Text.of('X: ').red().append(Text.of("Unset").gray()))
        text.add(4, Text.of('Y: ').green().append(Text.of("Unset").gray()))
        text.add(5, Text.of('Z: ').blue().append(Text.of("Unset").gray()))
      } else {
        let address_display = convert_address_tooltip_to_default_if_needed(address)
        text.add(1, Text.of('Address: ').aqua().append(Text.of(address_display)))
        text.add(2, Text.of('Dimension: ').gold().append(Text.of(dimension)))
        text.add(3, Text.of('X: ').red().append(Text.of(pos_x)))
        text.add(4, Text.of('Y: ').green().append(Text.of(pos_y)))
        text.add(5, Text.of('Z: ').blue().append(Text.of(pos_z)))
      }
    } catch (error) {}
  })
})
/**
* @param {String} address
*/
function convert_address_tooltip_to_default_if_needed(address){
  if (address == "Brown Location Card") {
    return '"Brown" (default)'
  }
	if (address == "Red Location Card") {
    return '"Red" (default)'
  }
  if (address == "Orange Location Card") {
    return '"Orange" (default)'
  }
  if (address == "Yellow Location Card") {
    return '"Yellow" (default)'
  }
  if (address == "Lime Location Card") {
    return '"Lime" (default)'
  }
  if (address == "Green Location Card") {
    return '"Green" (default)'
  }
  if (address == "Cyan Location Card") {
    return '"Cyan" (default)'
  }
  if (address == "Light Blue Location Card") {
    return '"Light Blue" (default)'
  }
  if (address == "Blue Location Card") {
    return '"Blue" (default)'
  }
  if (address == "Purple Location Card") {
    return '"Purple" (default)'
  }
  if (address == "Magenta Location Card") {
    return '"Magenta" (default)'
  }
  if (address == "Pink Location Card") {
    return '"Pink" (default)'
  }
  if (address == "White Location Card") {
    return '"White" (default)'
  }
  if (address == "Light Gray Location Card") {
    return '"Light Gray" (default)'
  }
  if (address == "Gray Location Card") {
    return '"Gray" (default)'
  }
  if (address == "Black Location Card") {
    return '"Black" (default)'
  }
  return '"' + address + '"'
}