// ============================================================================
// gamestates/loading.js
// LOADING GAME STATE
// ============================================================================

function drawLoading() {
    background(20, 20, 20);
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Loading...", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    pop();
}