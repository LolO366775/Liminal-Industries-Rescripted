BlockEvents.rightClicked("farmersdelight:cutting_board", (event) => {
  let nbt = event.item.getNbt();
  if (nbt && nbt.getBoolean("tic_broken")) {
    event.cancel();
  }
})