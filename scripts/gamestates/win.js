// ============================================================================
// gamestates/win.js
// WIN GAME STATE
// ============================================================================

function drawWin() {
    // Stop game music if playing
    if (assets.audio.musicGame.isPlaying()) {
        assets.audio.musicGame.stop();
    }
    // Transition Sound at Level Win
    if (hasPlayedWinSound === false) {
        assets.audio.transitionWin.play();
        hasPlayedWinSound = true;
    }
    background(20, 20, 20);
    push();
    fill(0, 255, 0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("You Win! Press R to Restart or Esc", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    pop();
    
    // Stop orphaned sounds
    assets.audio.sfxPlayerMove.stop();
}