// ============================================================================
// classes/enemy.js
// ENEMY CLASS
// ============================================================================

class Enemy {

    // CONSTRUCTOR
    // --------------------------------

    constructor(w, h, x, y, row, col, grid, cellW, cellH, type) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.row = row;       
        this.col = col;
        this.grid = grid; 
        this.cellW = cellW;
        this.cellH = cellH;  
        this.type = type;

        this.lastRow = -1;    
        this.lastCol = -1;
        
        this.targetX = x;
        this.targetY = y;
        
        if (this.type === 'skeleton') {
            this.speed = 1;
            this.shootIntervalBase = 120;
            this.sprites = assets.enemies.skeleton;
        } 
        else if (this.type === 'demon') {
            this.speed = 2.5;
            this.shootIntervalBase = 60;
            this.sprites = assets.enemies.demon;
        }

        this.spriteIndex = 1;
        this.findNextTarget();
        this.shootTimer = this.shootIntervalBase;
    }

    // DISPLAY & UPDATE
    // --------------------------------

    display() {
        let img = this.sprites[this.spriteIndex];
        push();
        translate(this.x + this.w / 2, this.y + this.h / 2);
        imageMode(CENTER);
        image(img, 0, 0, this.w, this.h);
        pop();
    }

    update() {
        let dx = this.targetX - this.x;
        let dy = this.targetY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // WALKING ANIMATION
        // --------------------------------

        if (distance > 0.1) {
            if (Math.abs(dx) > Math.abs(dy)) {
                this.spriteIndex = (dx > 0) ? 0 : 2; 
            } else {
                this.spriteIndex = (dy > 0) ? 1 : 3; 
            }
        }
        if (distance < this.speed) {
            this.x = this.targetX;
            this.y = this.targetY;
            this.col = Math.round(this.x / this.cellW);
            this.row = Math.round(this.y / this.cellH);
            this.findNextTarget();
        } else {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }

        // SHOOTING LOGIC
        // --------------------------------

        this.shootTimer--; 
        if (this.shootTimer <= 0) {
            // Check Line of Sight
            if (player && checkLineOfSight(this, player)) {
                projectiles.push(new Projectile(this.x + this.w / 2, this.y + this.h / 2, player.x + player.w / 2, player.y + player.h / 2, true));
                // Reset timer after shooting
                this.shootTimer = 80;
                // Play shooting sound
                if (!assets.audio.sfxPlayerShoot.isPlaying()) {
                    assets.audio.sfxPlayerShoot.play();
                }
            }
            else {
                // If tried to shoot but could not, set Timer to shorter value
                this.shootTimer = 60;
            }
        }
    }

    // PATHFINDING LOGIC
    // --------------------------------

    findNextTarget() {
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        let validMoves = [];

        for (let dir of directions) {
            let nextRow = this.row + dir[0];
            let nextCol = this.col + dir[1];

            if (nextRow >= 0 && nextRow < this.grid.length && 
                nextCol >= 0 && nextCol < this.grid[0].length) {
                
                let tile = this.grid[nextRow][nextCol];

                if (tile === 1 || tile === 6 || tile === 7 || tile === 8) {
                    if (nextRow !== this.lastRow || nextCol !== this.lastCol) {
                        validMoves.push({ r: nextRow, c: nextCol });
                    }
                }
            }
        }

        if (validMoves.length > 0) {
            let move = random(validMoves); 
            this.lastRow = this.row;
            this.lastCol = this.col;
            this.setTarget(move.r, move.c);
        } else {
            let tempR = this.lastRow; 
            let tempC = this.lastCol;
            if (tempR !== -1) {
                this.lastRow = this.row;
                this.lastCol = this.col;
                this.setTarget(tempR, tempC);
            }
        }
    }

    setTarget(r, c) {
        this.targetX = c * this.cellW;
        this.targetY = r * this.cellH;
    }
}