// ============================================================================
// systems/collision.js
// COLLISION DETECTION
// ============================================================================

// SIMPLE AABB COLLISION CHECK BETWEEN TWO RECTANGLES
// Used for walking collisions and projectile hits
// -------------------------------------------------------------------

function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y
    );
}

// CHECK LINE OF SIGHT BETWEEN TWO ENTITIES (NO WALLS IN BETWEEN)
// Used for enemy AI to see if they can shoot the player
// -------------------------------------------------------------------

function checkLineOfSight(entity1, entity2) {
    let x1 = entity1.x + entity1.w / 2;
    let y1 = entity1.y + entity1.h / 2;
    let x2 = entity2.x + entity2.w / 2;
    let y2 = entity2.y + entity2.h / 2;
    for (let wall of walls) {
        if (lineRectCollide(x1, y1, x2, y2, wall.x, wall.y, wall.w, wall.h)) {
            return false;
        }
    }
    return true;
}
function lineRectCollide(x1, y1, x2, y2, rx, ry, rw, rh) {
    if (lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry)) return true;
    if (lineLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh)) return true;
    if (lineLine(x1, y1, x2, y2, rx, ry, rx, ry + rh)) return true;
    if (lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh)) return true;
    return false;
}
function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return true;
    }
    return false;
}