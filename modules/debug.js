function draw_debug() {
  fill(0, 0, 0);
  let fps = frameRate();
  const debug = "Crafty v" + ver + " seed: " + seed + " " + round(fps) + "fps";
  //text(debug, 100, 100)
}
