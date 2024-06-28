class Inventory {
  constructor() {
    this.inventory = [];
    this.selected = 0;

    this.full = false;
    this.can_craft = []

    this.craft_hit = []

    this.current_mine_level = 0
  }

  render_slot(x, y, id, number, name, index) {
    noStroke();
    if (index == this.selected) {
      fill(0, 0, 0);
    } else {
      fill(138, 77, 64);
    }

    square(10 + x, y, 40);
    fill(191, 191, 191);
    square(12.5 + x, 2.5 + y, 35);
    if (id != -1 && id != undefined) {
      try {
        if (blocks[id]["Texture"] == undefined) {
          const color = blocks[id]["Color"];

          fill(color[0], color[1], color[2]);
          square(17.5 + x, 7.5 + y, 25);
        } else {

            image(blocks[id]["Texture"], 17.5 + x, 7.5 + y, 25, 25)
          
        }
        fill(255, 255, 255);
        text("x" + number, 30 + x, 32.5 + y);

      } catch(error) {
        image(blocks[15]["Texture"], 17.5 + x, 7.5 + y, 25, 25)
        fill(255, 255, 255);
        text("???", 30 + x, 32.5 + y);
      }
    }
  }

  draw_hotbar() {
    let xoffset = 0;
    for (let i = 0; i < 10; i++) {
      if (this.inventory[i] != undefined) {
        this.render_slot(
          xoffset,
          10,
          this.inventory[i][0],
          this.inventory[i][1],
          "",
          i
        );
      } else {
        this.render_slot(xoffset, 10, -1, 0, "", i);
      }
      xoffset += 45;
    }
  }

  add(item, quantity) {
    for (let i in this.inventory) {
      if (
        this.inventory[i][0] == item &&
        this.inventory[i][1] + quantity <= 64
      ) {
        this.inventory[i] = [
          this.inventory[i][0],
          this.inventory[i][1] + quantity,
        ];
        this.check_craft()
        return;
      }
      if (this.inventory[i][0] == -1) {
        this.inventory[i][0] = item;
        this.inventory[i][1] = quantity;
        this.check_craft()
        return;
      }
    }
    this.inventory.push([item, quantity]);
    this.check_craft()
  }

  set_rank() {
    if (this.selected < 0 || this.inventory[this.selected] == undefined) {return}
    const item = this.inventory[this.selected][0]
    if (this.inventory[this.selected][0] < 0) {return}
    //console.log(this.current_mine_level)
    this.current_mine_level =  blocks[item]["Rank"] ? blocks[item]["Rank"] : 0
  }

  can_remove(item, quantity) {
    var total = 0;
    for (let i in this.inventory) {
      if (this.inventory[i][0] == item) {
        total += this.inventory[i][1];
      }
    }
    return total >= quantity;
  }
  remove(item, quantity) {
    var left = quantity;
    for (let i in this.inventory) {
      if (this.inventory[i][0] == item) {
        if (this.inventory[i][1] > left) {
          this.inventory[i][1] -= left;
          left = 0;
        } else {
          left -= this.inventory[i][1];
          this.inventory[i][1] = 0;
          this.inventory[i][0] = -1;
        }
      }
    }
    this.check_craft()
  }

  draw() {
    this.draw_hotbar();
    this.draw_craft();
  }

  craft_slot(id) {
    const receipe = this.can_craft[id]

    for (let i in receipe.From) {
      this.remove(receipe.From[i], receipe.FromNumber[i])
    }
    this.add(receipe.To, receipe.ToNumber)
  }

  create_hitbox() {
    for (let i in this.craft_hit) { this.craft_hit[i].destroy() }
    this.craft_hit = []

    var offsety = 10;
    for (let i in this.can_craft) {

      const hit = new Hitbox(ui, map_size - 35, offsety, 25, 25, 10)
      hit.Id = i
      hit.clicked = function () { inventory.craft_slot(this.Id) }

      this.craft_hit.push(hit)

      offsety += 30;
    }
    let xoffset = 10;
    for (let i = 0; i < 10; i++) {
        const hit = new Hitbox(ui, xoffset, 10, 40, 40, 10)
        hit.Id = i
        hit.clicked = function () { inventory.selected = i }
  
        this.craft_hit.push(hit)
      xoffset += 45;
    }
  }

  check_craft() {
    this.can_craft = []
    for (let i in crafts) {
      const receipe = crafts[i]
      let can = true

      for (let a in receipe["From"]) {
        if (this.can_remove(receipe["From"][a], receipe["FromNumber"][a]) == false) { can = false }
      }
      if (can) { this.can_craft.push(receipe) }

    }
    this.create_hitbox()
  }

  draw_craft() {
    var offsety = 10;
    for (let i in this.can_craft) {
      const receipe = this.can_craft[i]
      fill(191, 191, 191);
      square(map_size - 35, offsety, 25);

      try {
        if (blocks[receipe["To"]]["Texture"] == undefined) {
          const color = blocks[receipe["To"]]["Color"];

          fill(color[0], color[1], color[2]);
          square(map_size - 35 + 5, 5 + offsety, 15);
        } else {

            image(blocks[receipe["To"]]["Texture"], map_size - 30, 5 + offsety, 15, 15)
          
        }
        fill(255, 255, 255);
        text("x" + receipe["ToNumber"], map_size - 35 + 10, 20 + offsety);

      } catch(error) {
        console.log(error)
        image(blocks[15]["Texture"], 17.5 + x, 7.5 + y, 25, 25)
        fill(255, 255, 255);
        text("???", map_size - 35 + 10, 20 + offsety);
      }
      offsety += 30;
    }
  }
}
