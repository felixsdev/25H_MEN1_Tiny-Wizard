// classes/wall.js
class Wall {
    // Constructor to initialize wall properties
    constructor(x, y, w, h, type) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = type;
    }

    // Renders the walls. (Called in draw)
    display() {
        // Draw the loaded wall sprite to fill the wall's dimensions
        image(assets.walls[this.type], this.x, this.y, this.w, this.h);
    }
}