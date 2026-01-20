// ============================================================================
// systems/controls.js
// CONTROLS HANDLING
// (Player controls are handled in the Player class file "player.js")")
// ============================================================================

// GAME STATE CONTROLS

function keyPressed() {
    if (gameState === 'RUNNING' || gameState === 'WIN' || gameState === 'LOSE') {
        if (key === 'Escape') {
            gameState = 'SELECTOR';
        }
        
        if (key === 'r' || key === 'R') {
            loadLevelData(currentLevel || 1); 
        }
    }
}

// PROJECTILE SHOOTING

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
        }
    }
}