// ============================================================================
// systems/controls.js
// CONTROLS HANDLING
// ============================================================================

function keyPressed() {

    // GAME STATE CONTROLS
    // --------------------------------

    if (gameState === 'RUNNING' || gameState === 'WIN' || gameState === 'LOSE') {
        if (key === 'Escape') {
            initializeLevelSelector();    
        }
        
        if (key === 'r' || key === 'R') {
            loadLevelData(currentLevel); 
        }
    }

    // AUDIO CONTROLS
    // --------------------------------

    if (key === 'm' || key === 'M') {
        if (getAudioContext().state === 'running') {
            getAudioContext().suspend();
        } else {
            userStartAudio();
        }
    }
}

// PLAYER CONTROLS
// --------------------------------

// Player movement controls are handled in the player class file "classes/player.js")

function mousePressed() { 
    if (gameState === 'RUNNING' && mouseButton === LEFT && player) {
        // Only shoot if the timer has reached 0
        if (player.shootTimer === 0) {
            
            const px = player.x + player.w / 2;
            const py = player.y + player.h / 2;
            
            // Fire a projectile towards the mouse position
            projectiles.push(new Projectile(px, py, mouseX, mouseY, false));
            
            // Set the timer back to shootCooldown
            player.shootTimer = player.shootCooldown;

            // Play shooting sound
            assets.audio.sfxPlayerShoot.play();
        }
    }
}