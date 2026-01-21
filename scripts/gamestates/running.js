// ============================================================================
// gamestates/running.js
// RUNNING GAME STATE
// ============================================================================

// ---------------------------------------------
// LOAD LEVEL DATA FROM JSON FILE
// ---------------------------------------------

function loadLevelData(levelNumber) { 
    gameState = 'LOADING'; // Set game state to LOADING

    // Clear previous level data
    // -----------------------------

    walls = [];
    floors = [];
    projectiles = [];
    player = null; 
    enemies = [];
    gridData = null;

    // Load level JSON file
    // -----------------------------

    currentLevel = levelNumber;
    const levelFile = `assets/levels/level${levelNumber}.json`;
    loadJSON(levelFile, 
        // Success (data loaded - initialize level)
        (data) => {
            console.log(`\u001b[1;32mLevel ${levelNumber} loaded\u001b[0m`);
            gridData = data;
            initializeLevel();
        },
        // Error (failed to load data - return to selector)
        (err) => {
            console.error(`\u001b[1;31mFailed to load level ${levelNumber}\u001b[0m`, err);
            gameState = 'SELECTOR';
        }
    );
}

// ---------------------------------------------
// INITIALIZE LEVEL OBJECTS BASED ON GRID DATA
// ---------------------------------------------

function initializeLevel() {
    gridCols = gridData.gridCols;
    gridRows = gridData.gridRows;
    const grid = gridData.grid;

    cellWidth = CANVAS_WIDTH / gridCols;
    cellHeight = CANVAS_HEIGHT / gridRows;

    for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
            let startX = c * cellWidth;
            let startY = r * cellHeight;
            let tileType = grid[r][c];

            // Terrain Layer
            // ---------------------------
            
            // Draw Grass Floor if 0 (Grass) or 9 (Player)
            if (tileType === 0 || tileType === 9) {
                floors.push(new Floor(startX, startY, cellWidth, cellHeight, 0));
            }
            // Draw Path Floor if 1 (Path) or 6-8 (Enemy)
            else if (tileType === 1 || tileType === 6 || tileType === 7 || tileType === 8) {
                floors.push(new Floor(startX, startY, cellWidth, cellHeight, 1));
            }
            // Draw Wall if 3
            else if (tileType === 3) {
                walls.push(new Wall(startX, startY, cellWidth, cellHeight, 3));
            }

            // Entity Layer
            // ---------------------------

            // Draw Player if 9
            if (tileType === 9) {
                player = new Player(cellWidth - 4, cellHeight - 4, startX, startY);
            }

            // Draw Enemy (Skeleton) if 8
            else if (tileType === 8) {
                enemies.push(new Enemy(cellWidth - 4, cellHeight - 4, startX, startY, r, c, grid, cellWidth, cellHeight, 'skeleton'));            
            }

            // Draw Enemy (Demon) if 7
            else if (tileType === 7) {
                enemies.push(new Enemy(cellWidth - 4, cellHeight - 4, startX, startY, r, c, grid, cellWidth, cellHeight, 'demon'));            
            }
        }
    }

    // AUDIO
    // -----------------------------

    // Stop menu music if playing
    if (assets.audio.musicMenu.isPlaying()) {
        assets.audio.musicMenu.stop();
    }

    // FINISH INITIALIZATION
    // -----------------------------
    console.log(`\u001b[1;32mLevel initialized\u001b[0m`);
    gameState = 'RUNNING';
}

// ---------------------------------------------
// DRAW THE LEVEL
// ---------------------------------------------

function drawLevel() {
    
    // AUDIO
    // -----------------------------

    // If the transition sound has finished, start the game music
    if (!assets.audio.transitionLevelStart.isPlaying() && !assets.audio.musicGame.isPlaying()) {
        assets.audio.musicGame.loop();
        assets.audio.musicGame.setVolume(0.5);
    }

    // LEVEL RENDERING
    // -----------------------------

    // Draw Walls
    for (const wall of walls) {
        wall.display();
    }
    for (const floor of floors) {
        floor.display();
    }

    // Draw Aiming Line
    if (player) {
        push();
        stroke(255, 200);
        strokeWeight(2);
        const px = player.x + player.w / 2;
        const py = player.y + player.h / 2;
        line(px, py, mouseX, mouseY);
        pop();
    }

    // Draw Projectiles
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        p.update();
        p.display();
        if (p.dead) projectiles.splice(i, 1);
    }

    // Draw Characters
    if (player) {
        player.handleInput(); 
        player.update();      
        player.display();     
    }
    
    // Draw Enemies
    for (const e of enemies) { 
        e.update();
        e.display();
    }

    // CHECK WIN CONDITION
    // -----------------------------

    if (enemies.length === 0) {
        initializeWin();
    }

    // DEBUG: Draw Line of Sight from Enemies to Player
    // -----------------------------
    /*
    push();
    for(let e of enemies) {
        // Green line if they see player, Red if blocked
        if (checkLineOfSight(e, player)) {
            stroke(0, 255, 0); // Green
        } else {
            stroke(255, 0, 0); // Red
        }
        strokeWeight(1);
        line(e.x + e.w/2, e.y + e.h/2, player.x + player.w/2, player.y + player.h/2);
    }
    pop();
    */
}