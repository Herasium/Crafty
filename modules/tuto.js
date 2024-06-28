

class Tutoriel {
    constructor() {

        this.step = 0
        this.frame_count = 0
        this.condition_filled = false
        this.pressed_keys = []
        this.mined = []
        this.placed = []

        this.indications = [
            "Welcome to Crafty! I'm the tuto, here to help you start your journey. [SPACE to continue]",
            "First, let's go over the basics. [SPACE to continue]",
            "Use the 'Z' or 'Space' key to jump, the 'Q' key to go left, and the 'D' key to go right.",
            "Next, try to collect some wood by clicking on one.",
            "You can turn the logs into planks in the crafting menu by clicking on the plank icon, in the top right.",
            "Now, you need to select the planks in your inventory, Using the numbers keys (0-9) to choose a selected slot. [SPACE to continue]",
            "You can now place down the planks by clicking next to a block while pressing 'SHIFT'.",
            "Good, you now have the basics.\nTo finish the game, you'll need to find the 3 Rainbowite ingots, turn them into the final portal, and leave this dimension. [SPACE to continue]",
            "To do so, find the 3 Rainbowite ores hidden in the map. \nTip: You'll need a diamond pickaxe to break them. [SPACE to continue]",
            "Good luck, and have fun. [SPACE to continue]"
        ]
        
    }

    render_text() {
        //textFont(font)
        textSize(14);
        fill(0,0,0)
        textAlign(LEFT)
        text(this.indications[this.step] ,10,100)
    }

    render_step_2() {
        noFill()
        strokeWeight(3);
        stroke(0);
        square(20+650, 60, 40);
        square(60+650, 20, 40);
        square(100+650, 60, 40);
        rect(20+650, 110, 20*9,40)
        fill(0,0,0)
        noStroke()
        textAlign(CENTER);
        if (this.pressed_keys.includes(90)) {fill(0,255,0)} else {fill(0,0,0)}
        text("Z",60+650+20,45)
        if (this.pressed_keys.includes(81)) {fill(0,255,0)} else {fill(0,0,0)}
        text("Q",20+650+20,85)
        if (this.pressed_keys.includes(68)) {fill(0,255,0)} else {fill(0,0,0)}
        text("D",100+650+20,85)
        if (this.pressed_keys.includes(32)) {fill(0,255,0)} else {fill(0,0,0)}
        text("SPACE",20+650+(20*4.5),25+110)
    }

    render_step_3() {
        for (let i in map.map) {
            if (map.map[i]== 3) {
                const coords = map.coords_from_block_id(i)
                noFill()
                strokeWeight(3)
                stroke(255,0,255)
                square(coords.x,coords.y,block_size)
            }
        }
    }

    render_step_4() {
        noFill()
        strokeWeight(3)
        stroke(255,0,255)
        square(map_size - 35, 10, 25)
    }

    tick() {
        this.check_conditions()
        //console.log(this.pressed_keys,this.step)
        if (this.condition_filled) {this.step ++; this.condition_filled = false; this.pressed_keys = []; this.mined = []; this.placed = []}
    }

    key_pressed(key) {
        this.pressed_keys.push(key)
    }

    on_mine(block) {
        this.mined.push(block)
        console.log(this.mined)
    }

    on_placed(block) {
        this.placed.push(block)
        console.log(this.placed)
    }

    render() {
        this.render_text()
        if (this.step == 2) {this.render_step_2()}
        if (this.step == 3) {this.render_step_3()}
        if (this.step == 4) {this.render_step_4()}
    }

    check_conditions() {
            if (this.step == 0 || this.step == 1 || this.step == 5 || this.step == 7 || this.step == 9 || this.step == 8) {this.condition_filled = this.pressed_keys.includes(32)}
            if (this.step == 2) {this.condition_filled = this.pressed_keys.includes(90) && this.pressed_keys.includes(81) && this.pressed_keys.includes(68) && this.pressed_keys.includes(32)}
            if (this.step == 3) {this.condition_filled = this.mined.includes(3)}
            if (this.step == 4) {this.condition_filled = inventory.can_remove(5,1)}
            if (this.step == 6) {this.condition_filled = this.placed.includes(5)}
            console.log(this.condition_filled)
    }


}