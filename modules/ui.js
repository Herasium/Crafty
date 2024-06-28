class Ui {
  constructor() {
    this.hitbox = [];
  }

  add_hitbox(hit) {
    this.hitbox.push(hit);
  }

  render_debug() {
    for (let i in this.hitbox) {
      const hitbox = this.hitbox[i];

      fill(hitbox.hitbox.z*50, 0, 0,100);
      rect(
        hitbox.hitbox["x"],
        hitbox.hitbox["y"],
        hitbox.hitbox.size[0],
        hitbox.hitbox.size[1]
      );
    }
  }

  click() {
    let current;

    for (let i in this.hitbox) {
      const hitbox = this.hitbox[i];
      if (
        mouseX >= hitbox.hitbox["x"] &&
        mouseX <= hitbox.hitbox["x"] + hitbox.hitbox["size"][0] &&
        mouseY >= hitbox.hitbox["y"] &&
        mouseY <= hitbox.hitbox["y"] + hitbox.hitbox["size"][1]
      ) {
        if (current == undefined) {
          current = hitbox;
        } else {
          if (current.hitbox["z"] < hitbox.hitbox["z"]) {
            current = hitbox;
          }
        }
      }
    }
    
    if (current != undefined) {
      if (current.clicked != undefined) {
        current.clicked()
      }
    }
  }

  draw () {
    if (inventory.inventory[inventory.selected] != undefined && keyIsDown(16) && blocks[inventory.inventory[inventory.selected][0]] != undefined) {
      image(blocks[inventory.inventory[inventory.selected][0]]["Texture"],mouseX - 5, mouseY - 5,10,10)
    }
  }

  delete(hit) {
    const index = this.hitbox.indexOf(hit);
    if (index > -1) { 
      this.hitbox.splice(index, 1); 
    }
  }
}

class Hitbox {
  constructor(ui, x, y, sizex, sizey, z) {
    this.hitbox = {
      x: x,
      y: y,
      z: z,
      size: [sizex, sizey],
    };

    this.ui = ui

    this.clicked = function() {
      console.log(this,"hitbox clicked")
    };

    ui.add_hitbox(this);
  }

  destroy() {
    this.ui.delete(this)
  }
}
