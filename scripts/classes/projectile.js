// ============================================================================
// classes/projectile.js
// PROJECTILE CLASS
// ============================================================================

class Projectile {

    // CONSTRUCTOR
    // --------------------------------

    constructor(x, y, targetX, targetY, isEnemyProjectile) {
        this.x = x;
        this.y = y;
        this.w = 12;  
        this.h = 12;
        // Center projectile on spawn
        this.x -= this.w / 2;
        this.y -= this.h / 2; 
        this.speed = 6;
        // Is this projectile shot by an enemy?
        this.isEnemy = isEnemyProjectile;
        // Direction math
        const dx = targetX - (this.x + this.w / 2);
        const dy = targetY - (this.y + this.h / 2);
        const d = sqrt(dx * dx + dy * dy) || 1;
        this.vx = (dx / d) * this.speed;
        this.vy = (dy / d) * this.speed;
        this.dead = false;
    }

    // UPDATE
    // --------------------------------

    update() {
        if (this.dead) return;

        this.x += this.vx;
        this.y += this.vy;

        // COLLISION LOGIC
        // --------------------------------

        // Map border
        if (this.x < -50 || this.x > CANVAS_WIDTH + 50 || this.y < -50 || this.y > CANVAS_HEIGHT + 50) {
            this.dead = true;
            return;
        }
        // Wall collision
        for (const wall of walls) {
            if (checkCollision(this, wall)) {
                this.dead = true;
                // Play wall hit sound
                assets.audio.sfxWallHit.play();
                return;
            }
        }
        // Entity collision
        if (this.isEnemy) {
            // If Enemy Projectile -> Check collision with PLAYER
            if (player && checkCollision(this, player)) {
                console.log("\u001b[1;31mPlayer dead!\u001b[0m");
                this.dead = true;
                gameState = 'LOSE'; // Trigger Game Over
            }
        } else {
            // If Player Projectile -> Check collision with ENEMIES
            for (let i = enemies.length - 1; i >= 0; i--) {
                let e = enemies[i];
                if (checkCollision(this, e)) {
                    enemies.splice(i, 1); // Kill enemy
                    this.dead = true;
                    // Play character hit sound
                    assets.audio.sfxCharacterHit.play();
                    return; 
                }
            }
        }
    }

    // DISPLAY
    // --------------------------------

    display() {
        push();
        noStroke();
        // Different colors for different bullets
        if (this.isEnemy) {
            fill(50, 50, 50);
        } else {
            fill(255, 80, 80);
        }
        rect(this.x, this.y, this.w, this.h);
        pop();
    }
}