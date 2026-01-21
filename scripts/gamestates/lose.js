// ============================================================================
// gamestates/lose.js
// LOSE GAME STATE
// ============================================================================

function drawLose() {
    // Stop game music if playing
    if (assets.audio.musicGame.isPlaying()) {
        assets.audio.musicGame.stop();
    }
    // Transition Sound at Level Lose
    if (hasPlayedLoseSound === false) {
        assets.audio.transitionLost.play();
        hasPlayedLoseSound = true;
    }    
    background(20, 20, 20);
    push();
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("You Lose! Press R to Restart or Esc", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    pop();
    
    // Stop orphaned sounds
    assets.audio.sfxPlayerMove.stop();
}