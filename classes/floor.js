// classes/floor.js
class Floor {
    // Constructor to initialize wall properties
    constructor(x, y, w, h, type) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = type;
    }

    // Renders the floors. (Called in draw)
    display() {
        // Draw the loaded floor sprite to fill the floor's dimensions
        image(assets.floors[this.type], this.x, this.y, this.w, this.h);
    }
}