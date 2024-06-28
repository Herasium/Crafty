class Lightning {
    constructor() {
        this.map = new Array(block_per_row * (block_per_row) * 20).fill(global_illumination)
        this.light_sources = []
        this.light_pass = [0, 4]
    }

    setup() {
        //this.light_sources.push([20,0,0])
        for (let i = 0; i < block_per_row; i++) {
            this.light_sources.push([20, i, 0])
        }
    }

    propagate(id, level, debug) {
        if (level <= 0) { return }
        if (this.map[id + 1] < level && Math.floor(id / 50) == Math.floor((id + 1) / 50)) { this.map[id + 1] = level; this.propagate(id + 1, this.light_pass.includes(map.map[id + 1]) ? level - 0.25 : level - 3, debug) }
        if (this.map[id - 1] < level && Math.floor(id / 50) == Math.floor((id - 1) / 50)) { this.map[id - 1] = level; this.propagate(id - 1, this.light_pass.includes(map.map[id - 1]) ? level - 0.25 : level - 3, debug) }
        if (this.map[id + block_per_row] < level) { this.map[id + block_per_row] = level; this.propagate(id + block_per_row, this.light_pass.includes(map.map[id + block_per_row]) ? level - 0.25 : level - 3, debug) }
        if (this.map[id - block_per_row] < level) { this.map[id - block_per_row] = level; this.propagate(id - block_per_row, this.light_pass.includes(map.map[id - block_per_row]) ? level - 0.25 : level - 3, debug) }
    }

    determine_light_divisor(source) {

        let value = source[0]

        const block_id = source[2] * block_per_row + source[1]

        for (let i = 0; i < Math.abs(source[2] - map.offsety); i++) {
            if (source[2] - map.offsety > 0) {
                value -= this.light_pass.includes(map.map[block_id - i * block_per_row]) ? 0.25 : 3
            } else {
                value -= this.light_pass.includes(map.map[block_id + i * block_per_row]) ? 0.25 : 3
            }
        }

        return value
    }

    calculate() {

        this.map = new Array(block_per_row * (block_per_row * 20)).fill(global_illumination)

        for (let i in this.light_sources) {
            //console.log(this.light_sources[i],i)
            const block_id = (this.light_sources[i][2]) * block_per_row + this.light_sources[i][1]
            this.map[block_id] = this.light_sources[i][0]
            this.propagate(block_id, this.light_sources[i][0] - 1,i)
            }

    }
    draw() {
        //console.log((0+map.offsety)*block_per_row+0)
        for (let y = 0; y < block_per_row + 1; y++) {
            //console.log((y + map.offsety) * block_per_row)
            for (let x = 0; x < block_per_row; x++) {
                fill(0, 0, 0, Math.floor(10 - this.map[(y + map.offsety) * block_per_row + x]) * 25.5)
                square(x * block_size, y * block_size - map.micro_offset, block_size)
            }
        }
    }

}