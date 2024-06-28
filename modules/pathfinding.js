function bresenham(x0, y0, x1, y1) {
    let points = [];
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        points.push([x0, y0]);
        if (x0 === x1 && y0 === y1) break;
        let e2 = 2 * err;
        
        if (dx > dy) {
            if (e2 > -dy) {
                err -= dy;
                x0 += sx;
            } else {
                err += dx;
                y0 += sy;
            }
        } else {
            if (e2 < dx) {
                err += dx;
                y0 += sy;
            } else {
                err -= dy;
                x0 += sx;
            }
        }
    }
    return points;
}
