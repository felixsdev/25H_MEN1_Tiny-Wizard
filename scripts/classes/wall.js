// ============================================================================
// classes/wall.js
// WALL CLASS
// ============================================================================

class Wall {

    // CONSTRUCTOR
    // --------------------------------

    constructor(x, y, w, h, type) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = type;
    }

    // DISPLAY
    // --------------------------------

    // Renders the walls. (Called in draw)
    display() {
        // Draw the loaded wall sprite to fill the wall's dimensions
        image(assets.walls[this.type], this.x, this.y, this.w, this.h);
    }
}