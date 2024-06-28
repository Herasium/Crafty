const map_size = 1000;
const block_per_row = 50;
const biome_nbr = 20
const block_size = map_size / block_per_row;

const ver = 0.1;

const global_illumination = 0

let count = 0

const ui = new Ui();
const map = new Map();
const light = new Lightning();
const player = new Player();
const inventory = new Inventory();
const tuto = new Tutoriel();

let font
let particules = []

let noclip = false
let game_frozen = false;

const cant_mine = [0,13];

function preload() {
  //font = loadFont("/assets/jersey.ttf")
  for (let i in blocks) {
    if (blocks[i]["Source"] != undefined) {
      blocks[i]["Texture"] = loadImage(blocks[i]["Source"])
      if (true) {
        blocks[i]["Rotate1"] = blocks[i]["Texture"]

        blocks[i]["Rotate1"].loadPixels()
        let rotated = rotate90Degrees(blocks[i]["Rotate1"]["pixels"])
        let count = 0
        for (let x = 0; x < blocks[i]["Rotate1"].width; x += 1) {
          for (let y = 0; y < blocks[i]["Rotate1"].height; y += 1) {
            blocks[i]["Rotate1"].set(x, y,[rotated[count],rotated[count+1],rotated[count+2],rotated[count+3]]);
            count += 4
          }
        }
        blocks[i]["Rotate1"].updatePixels()

        blocks[i]["Rotate2"] = blocks[i]["Rotate1"]

        blocks[i]["Rotate2"].loadPixels()
        rotated = rotate90Degrees(blocks[i]["Rotate2"]["pixels"])
        count = 0
        for (let x = 0; x < blocks[i]["Rotate2"].width; x += 1) {
          for (let y = 0; y < blocks[i]["Rotate2"].height; y += 1) {
            blocks[i]["Rotate2"].set(x, y,[rotated[count],rotated[count+1],rotated[count+2],rotated[count+3]]);
            count += 4
          }
        }
        blocks[i]["Rotate2"].updatePixels();

        blocks[i]["Rotate3"] = blocks[i]["Rotate2"]

        blocks[i]["Rotate3"].loadPixels()
        rotated = rotate90Degrees(blocks[i]["Rotate3"]["pixels"])
        count = 0
        for (let x = 0; x < blocks[i]["Rotate3"].width; x += 1) {
          for (let y = 0; y < blocks[i]["Rotate3"].height; y += 1) {
            blocks[i]["Rotate3"].set(x, y,[rotated[count],rotated[count+1],rotated[count+2],rotated[count+3]]);
            count += 4
          }
        }
        blocks[i]["Rotate3"].updatePixels();
      }
    }
  }
  player_texture_right = loadImage(player_texture_right)
  player_texture_left = loadImage(player_texture_left)
}

function setup() {
  createCanvas(map_size, map_size);
  angleMode(DEGREES);
  translate(width / 2, height / 2);
  map.generate_map();
  map.generate_trees();
  light.setup();
  light.calculate()
}

function game_tick() {
  player.tick();
  if (count % 60 == 0) {
     // map.fall();
  }
  inventory.set_rank()
  tuto.tick()
  count ++
}


function ui_tick() {
  inventory.draw();
  draw_debug();
  ui.draw()
  for (let i in particules) {
    particules[i].run()
  }
  tuto.render()
}

function update(new_block) {
  light.calculate()
}

function mined(mined_block) {
  tuto.on_mine(mined_block)
}

function placed(mined_block) {
  tuto.on_placed(mined_block)
}

function mine_failed(try_block) {}

function draw() {
  clear();
  background(0, 182, 255);
  map.draw_map();
  light.draw()
  player.draw();
  if (!game_frozen) {
    game_tick();
  }
  ui_tick()
}

function mousePressed() {
  ui.click()
}

const number_key_codes = [49, 50, 51, 52, 53,54,55,56,57,48];

function keyPressed() {
  //console.log(keyCode)
  if (number_key_codes.includes(keyCode)) {
    inventory.selected = number_key_codes.indexOf(keyCode);
  }

  if (keyCode == 65) {
    inventory.inventory[inventory.selected] = [-1,0]
  }

  tuto.key_pressed(keyCode)
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

