class Player {
    // classes/player.js
    // Constructor to initialize player properties 
    constructor(w, h, x, y) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = 0;
        this.vy = 0;
        this.speed = playerMoveSpeed;
        this.spriteIndex = 0;
        this.shootTimer = 0;
        this.shootCooldown = playerShootCooldown;
    }

    // Renders the player sprite at its new (x, y) position. (Called in draw)
    display() {
        let img = assets.player[this.spriteIndex];
        push();
        translate(this.x + this.w / 2, this.y + this.h / 2);
        imageMode(CENTER);
        image(img, 0, 0, this.w, this.h);
        pop();
    }

    // Calculates and sets the velocity (vx and vy) based on key presses. (Called in draw)
    handleInput() {
        // Reset velocities first
        this.vx = 0;
        this.vy = 0;

        // W key (Up)
        if (keyIsDown(87)) {
            this.vy = -this.speed;
            this.spriteIndex = 4;
        } 

        // S key (Down)
        if (keyIsDown(83)) {
            this.vy = this.speed;
            this.spriteIndex = 0;
        }

        // A key (Left)
        if (keyIsDown(65)) {
            this.vx = -this.speed;
            this.spriteIndex = 6;
        } 
        
        // D key (Right)
        if (keyIsDown(68)) {
            this.vx = this.speed;
            this.spriteIndex = 2;
        }

        // W + A (Up-Left)
        if (keyIsDown(87) && keyIsDown(65)) {
            this.spriteIndex = 5;
        }

        // W + D (Up-Right)
        if (keyIsDown(87) && keyIsDown(68)) {
            this.spriteIndex = 3;
        }

        // S + A (Down-Left)
        if (keyIsDown(83) && keyIsDown(65)) {
            this.spriteIndex = 7;
        }

        // S + D (Down-Right)
        if (keyIsDown(83) && keyIsDown(68)) {
            this.spriteIndex = 1;
        }

        // Normalize the velocity (using 'this.vx' and 'this.vy')
        if (this.vx !== 0 && this.vy !== 0) {
            const diagSpeed = this.speed / Math.sqrt(2);
            this.vx = this.vx > 0 ? diagSpeed : -diagSpeed;
            this.vy = this.vy > 0 ? diagSpeed : -diagSpeed;
        }

        // Play movement sound
        if (gameState === 'RUNNING' && (this.vx !== 0 || this.vy !== 0) && !assets.audio.sfxPlayerMove.isPlaying()) {
            assets.audio.sfxPlayerMove.loop();
            assets.audio.sfxPlayerMove.setVolume(1.5);
        }
        else if (this.vx === 0 && this.vy === 0) {
            assets.audio.sfxPlayerMove.stop();
        }
    }

    // Checks collision and apply the new velocity (vx and vy) to the player's position (x and y). (Called in draw)
    update() {
        // Handle shooting cooldown
        if (this.shootTimer > 0) {
            this.shootTimer--;
        }

        // Move on X axis and check for collisions
        this.x += this.vx;
        for (const wall of walls) {
            if (checkCollision(this, wall)) {
                // If collision detected, move player back
                if (this.vx > 0) { // Moving right, push player back to the left edge of the wall
                    this.x = wall.x - this.w;
                } else if (this.vx < 0) { // Moving left, push player back to the right edge of the wall
                    this.x = wall.x + wall.w;
                }
                this.vx = 0; // Stop X movement for next frame
            }
        }

        // Move on Y axis and check for collisions
        this.y += this.vy;
        for (const wall of walls) {
            if (checkCollision(this, wall)) {
                 // If collision detected, move player back
                if (this.vy > 0) { // Moving down, push player back to the top edge of the wall
                    this.y = wall.y - this.h;
                } else if (this.vy < 0) { // Moving up, push player back to the bottom edge of the wall
                    this.y = wall.y + wall.h;
                }
                this.vy = 0; // Stop Y movement for next frame
            }
        }
    }
}