class Player {
  constructor() {
    this.player_x = map_size / 2;
    this.player_y = 0;

    this.player_speed = 2;
    this.player_jump_power = (6 / 20) * block_size;
    console.log(this.player_jump_power)

    this.gravity = map_size / 5000;

    this.vx = 0;
    this.vy = 0;

    this.player_size_x = block_size * 0.9;
    this.player_size_y = block_size * 0.9;

    this.passable = [0, 4, 14, 27];
    this.target = undefined
    this.direction = true
  }

  tick() {
    const upr = [this.player_x + this.player_size_x * 0.1, this.player_y + this.player_size_y * 0.1];
    const upl = [this.player_x + this.player_size_x * 0.9, this.player_y + this.player_size_y * 0.1];
    const dor = [this.player_x + this.player_size_x * 0.1, this.player_y + this.player_size_y * 0.9];
    const dol = [this.player_x + this.player_size_x * 0.9, this.player_y + this.player_size_y * 0.9];

    const centr = [this.player_x + this.player_size_x / 2, this.player_y + this.player_size_y / 2]
    const centr_coords = map.get_coords(centr[0], centr[1])
    const mouse_coords = map.get_coords(mouseX, mouseY)
    const path = bresenham(centr_coords[0], centr_coords[1], mouse_coords[0], mouse_coords[1])

    this.target = undefined

    for (let i in path) {
      var bid = (path[i][1] + map.offsety) * block_per_row + path[i][0];
      var block = map.map[bid]
      if (i != 0) {
        if (!keyIsDown(16)) {
          if (block != 0) {
            this.target = path[i]
            break
          }
        } else {
          //square(path[i][0] * block_size, path[i][1] * block_size, block_size)
          //console.log(map.check_if_block_next(bid))
          var bid = (path[path.length - i][1] + map.offsety) * block_per_row + path[path.length - i][0];
          var block = map.map[bid]
          if (block == 0 && map.check_if_block_next(bid)) {
            this.target = path[path.length - i]
            break
          }
        }

      }
    }

    if (this.target != undefined) {
      strokeWeight(4);
      stroke(51);
      noFill()
      square(this.target[0] * block_size, this.target[1] * block_size - map.micro_offset, block_size)
      noStroke()
    }



    const is_sky_under =
      this.passable.includes(
        map.map[map.check_block_at_coords(dor[0], dor[1] + this.vy)]
      ) &&
      this.passable.includes(
        map.map[map.check_block_at_coords(dol[0], dol[1] + this.vy)]
      );

    const is_sky_up =
      this.passable.includes(
        map.map[map.check_block_at_coords(upr[0], upr[1])]
      ) &&
      this.passable.includes(
        map.map[map.check_block_at_coords(upl[0], upl[1])]
      );

    const is_sky_right =
      this.passable.includes(
        map.map[map.check_block_at_coords(dol[0] + this.player_speed, dol[1])]
      ) &&
      this.passable.includes(
        map.map[map.check_block_at_coords(upl[0] + this.player_speed, upl[1])]
      );

    const is_sky_left =
      this.passable.includes(
        map.map[map.check_block_at_coords(dor[0] - this.player_speed, dor[1])]
      ) &&
      this.passable.includes(
        map.map[map.check_block_at_coords(upr[0] - this.player_speed, upr[1])]
      );
    if (!noclip) {
      if (is_sky_under == true) {
        this.vy += this.gravity;
      } else {
        this.vy = 0
        this.vy -= this.gravity;
      }

      if (is_sky_up != true) {
        this.vy = 0;
        this.vy += this.gravity * 10;
      }
    }

    this.vx *= 0.2

    if (keyIsDown(68)) {
      this.vx = this.player_speed;
      this.direction = true
    }

    if (keyIsDown(81)) {
      this.vx = -this.player_speed;
      this.direction =  false
    }

    if (is_sky_right == false && this.vx > 0 && !noclip) {
      this.vx = 0;
    }

    if (is_sky_left == false && this.vx < 0 && !noclip) {
      this.vx = 0;
    }

    if (keyIsDown(90) || keyIsDown(32)) {
      if (!noclip) {
        if (is_sky_under == false) {
          this.vy -= this.player_jump_power;
        }
      } else {
        if (is_sky_under == false) {
          this.vy = -this.player_jump_power;
        }
      }
    }

    if (noclip && keyIsDown(83)) { this.vy = +this.player_jump_power; }

    if (this.player_y > 700) {
      map.down()
    }

    if (this.player_y < 200) {
      map.up()
    }

    if (!this.passable.includes(map.map[map.check_block_at_coords(centr[0], centr[1])]) && !noclip) {
      this.player_y -= block_size*1
    }

    if (map.map[map.check_block_at_coords(centr[0], centr[1])] == 14) {
      map.end()
    }

    this.player_x += this.vx;
    this.player_y += this.vy;

  }

  draw() {
    if (typeof player_texture_right != "string") {
      if (this.direction) {
        image(player_texture_right, Math.floor(this.player_x), Math.floor(this.player_y) - map.micro_offset, this.player_size_x, this.player_size_y);
      } else {
        image(player_texture_left, Math.floor(this.player_x), Math.floor(this.player_y) - map.micro_offset, this.player_size_x, this.player_size_y);
      }
    }
  }
}
