class Map {
  constructor() {
    this.map = [];

    this.random = new Random(seed);

    this.offsety = 0;
    this.maxoffsety = 950
    //this.maxoffsety = 0
    this.minoffsety = 0;

    this.micro_offset = 0

    this.sand_rainbow = false
    this.azure_rainbow = false
    this.crimson_rainbow = false

    this.sizes = [];
    this.stones = []

    this.caves = []

    this.floors = [35]
    this.ceilings = [30]
    this.centers = [[25,25]]
    this.rainbows = [[this.random.random(20,30),this.random.random(20,30)]]

    for (let i = 1; i < biome_nbr; i++) {
      this.floors.push(35+50*i)
      this.ceilings.push(30+50*i)
      this.centers.push([25,25+50*i])
      this.rainbows.push([this.random.random(20,30),this.random.random(20,30)+i*50])
    }

    console.log(this.rainbows)
    this.buffer_map = undefined

    this.hitbox = new Hitbox(ui, 0, 0, map_size, map_size, -1);

    this.minerals = [
      [7 /*Mineral Id*/, 35 /*Min Height*/, 250 /*Max Height*/, 6 /*Prob: 1/Num*/],
      [8, 35, 500, 35],
      [9, 35, 1000, 100],
      [10, 35, 1000, 50],
      [11, 35, 1000, 50],
      [12, 35, 1000, 200],

    ]

    this.can_fall = [31,33]

    this.hitbox.clicked = function () {
      if (!game_frozen) {
        if (mouseX < map_size && mouseY < map_size && player.target != undefined) {
          const bid = (player.target[1] + map.offsety) * block_per_row + player.target[0];
          if (keyIsDown(16)) {
            if (map.map[bid] == 0) {
              var selected = inventory.inventory[inventory.selected];
              if (selected != undefined) {
                selected = selected[0];
              } else {
                selected = -1;
              }
              if (selected != -1) { if (blocks[selected].Type != "Block") { return } }
              if (inventory.can_remove(selected, 1)) {
                inventory.remove(selected, 1);
                placed(selected)
                map.map[bid] = selected;
                if (blocks[map.map[bid]].Light) {
                  light.light_sources.push([blocks[map.map[bid]].Light, player.target[0], (player.target[1] + map.offsety)])
                }
                update(selected)
              }
            }
          } else {
            if (cant_mine.includes(map.map[bid]) == false) {

              if (blocks[map.map[bid]]["MinRank"] > inventory.current_mine_level) {return}

              if (drop_table[map.map[bid]]) { inventory.add(drop_table[map.map[bid]][0], drop_table[map.map[bid]][1]); }


              const coords = map.coords_from_block_id(bid)
              let system = new ParticleSystem(createVector(coords.x, coords.y), blocks[map.map[bid]]["Color"])

              for (let i = 0; i < 15; i++) {
                system.addParticle()
              }

              particules.push(system)

              var audio = new Audio('assets/sound/break.mp3');
              audio.play();
              if (blocks[map.map[bid]].Light) {


                for (let i in light.light_sources) {

                  const source = [blocks[map.map[bid]].Light, player.target[0], (player.target[1] + map.offsety)]
                  if (light.light_sources[i][0] == source[0] &&
                    light.light_sources[i][1] == source[1] &&
                    light.light_sources[i][2] == source[2]
                  ) { light.light_sources.splice(i, 1) }
                }
              } 
              mined(map.map[bid])
              map.map[bid] = 0;
              update()
            }
          }
        }
      }
    };
  }

  distance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  generate_sizes(psng, amp) {
    let result = CombineNoise(GenerateNoise(amp, 128, 8, 2, block_per_row, psng))[
      "pos"
    ];
    return result;
  }

  down() {
    down_transition()
  }

  up() {
    up_transition()
  }

  get_dirt_biome(x, y) {

    var block = 0
    if (y >= this.sizes[x]) {
      if (y == this.sizes[x]) {
        block = 2;
      } else {
        block = 1;
      }

    }
    const cave = this.caves[y * block_per_row + x];

    if (cave < 0.12 && y > this.sizes[x] + 5) { block = 0 }
    if (y > this.maxoffsety + block_per_row - 2) { block = 13 }
    return block
  }

  get_stone_biome(x, y) {
    var block = 6
    for (let i in this.minerals) {
      const rule = this.minerals[i]
      if (y >= rule[1] && y <= rule[2] && this.random.random(1, rule[3]) == 1) { block = rule[0] }
    }
    const cave = this.caves[y * block_per_row + x];
    if (cave < 0.12) { block = 0 }
    if (y > this.maxoffsety + block_per_row - 2) { block = 13 }
    return block
  }

  get_crimson_biome(x,y,i) {
    var block = this.random.random(1,5) == 1 ? 0 : 28
    if (this.rainbows[i][0] == x && this.rainbows[i][1] == y) {
      block = 35
      light.light_sources.push([5,x,y])
    }
    return block
  }

  get_azure_biome(x,y,i) {
    let block = 0

    for (let i in this.centers) {
      if (this.distance(x,y,this.centers[i][0],this.centers[i][1]) < 7) {
        block = this.random.random(0,2) == 1 ? 29 : 30
      }
    }

    if (this.rainbows[i][0] == x && this.rainbows[i][1] == y) {
      block = 34
      light.light_sources.push([5,x,y])
    }

    return block
  }

  get_verde_biome(x,y,i) {
    let block = 0

    const d1 = Math.abs(x-24)
    const d2 = Math.abs(x-25)

    const distance = d1-d2 > 0 ? d2 : d1;
    //console.log(this.ceilings[i] - distance,y)
    if (y == this.floors[i]) {
      block = 32
    } else if (y < this.ceilings[i] - distance) {
      block = 31
    }
    if (this.rainbows[i][0] == x && this.rainbows[i][1] == y) {
      block = 33
      light.light_sources.push([5,x,y])
    }

    return block
  }

  fall() {
    for (let id in this.map) {
      id = this.map.length - parseInt(id)
      if (this.map[parseInt(id)+block_per_row+""] == 0 /*&& this.can_fall.includes(this.map[id])*/) {
        this.map[parseInt(id)+block_per_row+""] = this.map[id]
        this.map[id] = 0
      }
    }

  }

  generate_caves() {
    for (let y = 0; y < block_per_row * biome_nbr; y += 1) {
      for (let x = 0; x < block_per_row; x += 1) {
        const cave = Math.abs(perlin.perlin2(x / (block_size * 1.5), y / (block_size * 1.5)));
        this.caves.push(cave)
      }
    }
  }

  get_block_from_index(i,x,y) {
    let block = 0

    if (this.biomes[i] == 1) {
      block = this.get_dirt_biome(x,y)
    } else if (this.biomes[i] == 2) {
      block = this.get_stone_biome(x,y)
    }else if (this.biomes[i] == 3) {
      block = this.get_crimson_biome(x,y,parseInt(i))
    }else if (this.biomes[i] == 4) {
      block = this.get_azure_biome(x,y,parseInt(i))
    }else if (this.biomes[i] == 5) {
      block = this.get_verde_biome(x,y,parseInt(i))
    }

    return block
  }

  generate_map() {
    this.sizes = this.generate_sizes(this.random, 5);
    this.stones = this.generate_sizes(this.random, 2);
    perlin.seed(seed)

    this.biomes = [1,2,2]

    for (let i = 3; i < biome_nbr; i++) {
      const biome = this.random.random(2, 6)
      if (biome == 2) {
        this.biomes.push(biome)
      } else {
        if (!this.biomes.includes(biome)) {
          this.biomes.push(biome)
        }
      }
      
    }

    console.log(this.biomes)

    this.generate_caves()

    for (let i in this.biomes) {
      console.log(block_per_row * i,block_per_row * i + block_per_row )
      for (let y = block_per_row * i; y < block_per_row * i + block_per_row; y += 1) {
        for (let x = 0; x < block_per_row; x += 1) {
          let block = this.get_block_from_index(i,x,y)
          //console.log(this.biomes[i],this.biomes[parseInt(i)+1+""],i)
          if (block_per_row * i + block_per_row - y < 15 && i < this.biomes.length - 1 && this.biomes[i] != this.biomes[parseInt(i)+1+""] && this.biomes[parseInt(i)+1+""] != "5") {
            if (this.random.random(0,block_per_row * i + block_per_row - y) == 0) {block = this.get_block_from_index(parseInt(i)+1+"",x,y)}
          }

          this.map.push(block)
        }
      }
    }

    for (let i = 0; i < block_per_row * block_per_row *2; i ++) {
      this.map.push(13)
    }

    console.log(this.map)
  }

  replace_if_air(y, x, id) {
    const block_id = Math.floor(y * block_per_row + x);
    if (map.map[block_id] == 0) {
      map.map[block_id] = id;
    }
  }

  generate_tree(x, y, random) {
    const number = random.random(4, 7);
    var block_id = 0;
    for (let i = 0; i < number; i++) {
      block_id = Math.floor((y - i) * block_per_row + x);
      map.map[block_id] = 3;
      if (i > number - 3) {
        this.replace_if_air(y - i, x - 2, 4);
        this.replace_if_air(y - i, x - 1, 4);
        this.replace_if_air(y - i, x + 1, 4);
        this.replace_if_air(y - i, x + 2, 4);
      }
    }
    this.replace_if_air(y - number - 1, x - 2, 4);
    this.replace_if_air(y - number - 1, x - 1, 4);
    this.replace_if_air(y - number - 1, x, 4);
    this.replace_if_air(y - number - 1, x + 1, 4);
    this.replace_if_air(y - number - 1, x + 2, 4);
    this.replace_if_air(y - number, x - 2, 4);
    this.replace_if_air(y - number, x - 1, 4);
    this.replace_if_air(y - number, x, 4);
    this.replace_if_air(y - number, x + 1, 4);
    this.replace_if_air(y - number, x + 2, 4);
  }

  generate_trees() {
    const random = new Random(seed);
    const number = random.random(5, 15);
    for (let i = 0; i < number; i++) {
      const x = random.random(0, block_per_row - 1);
      const y = this.sizes[x] - 1;
      this.generate_tree(x, y, random);
    }
  }

  draw_map() {

    if (this.micro_offset <= 0) {
      this.micro_offset = block_size
      player.player_y += block_size
      this.offsety -= 1
    }

    if (this.micro_offset >= block_size) {
      this.micro_offset = 0
      player.player_y -= block_size
      this.offsety += 1
    }

    for (let y = 0; y < block_per_row + 1; y += 1) {
      for (let x = 0; x < block_per_row; x += 1) {
        try {
          noStroke();
          const block_id = (y + this.offsety) * block_per_row + x;
          if (blocks[this.map[block_id]]["Texture"] == undefined) {
            const color = blocks[this.map[block_id]]["Color"];
            fill(color[0], color[1], color[2]);
            if (this.map[block_id] != 0) {
              square(x * block_size, y * block_size - this.micro_offset, block_size);
            }
          } else {
            image(blocks[this.map[block_id]]["Texture"], x * block_size, y * block_size - this.micro_offset, block_size, block_size)


          }

        } catch (error) {
          console.log(error)
          image(blocks[15]["Texture"], x * block_size, y * block_size - this.micro_offset, block_size, block_size)
        }
      }
    }
  }
  coords_from_block_id(block_id) {
    const row = floor(block_id / block_per_row);
    const col = block_id % block_per_row;

    const nx = col * block_size;
    const ny = (row - this.offsety) * block_size;

    return { x: nx, y: ny };
  }


  check_block_at_coords(x, y) {
    const nx = floor(x / block_size) * block_size;
    const ny = floor(y / block_size) * block_size;

    const block_id = ((ny / block_size) + this.offsety) * block_per_row + nx / block_size;

    return block_id;
  }

  get_coords(x, y) {
    const nx = floor(x / block_size);
    const ny = floor(y / block_size);

    return [nx, ny]
  }

  end() {
    this.map[this.map.indexOf(14)] = 0
    alert("You won gg")
  }

  check_if_block_next(bid) {
    return map.map[bid + 1] != 0 || map.map[bid - 1] != 0 || map.map[bid + block_per_row] != 0 || map.map[bid - block_per_row] != 0
  }
}

async function down_transition() {
  for (let i = 0; i < block_size / 1; i++) {
    await wait(1)
    map.micro_offset += 1
    if (map.micro_offset >= block_size && map.offsety + 1 < map.maxoffsety) {
      map.micro_offset = 0
      player.player_y -= block_size
      map.offsety += 1
    }
  }
}

async function up_transition() {
  for (let i = 0; i < block_size / 1; i++) {
    await wait(1)
    map.micro_offset -= 1
    if (map.micro_offset <= 0 && map.offsety - 1 > map.minoffsety) {
      map.micro_offset = block_size
      player.player_y += block_size
      map.offsety -= 1
    }
  }
}


function rotate90Degrees(array) {
  const N = Math.sqrt(array.length / 4);

  const rotated = new Array(array.length);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const originalIndex = (i * N + j) * 4;
      const newIndex = (j * N + (N - i - 1)) * 4;
      for (let k = 0; k < 4; k++) {
        rotated[newIndex + k] = array[originalIndex + k];
      }
    }
  }

  return rotated;
}