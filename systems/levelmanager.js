// ============================================================================
// /systems/levelmanager.js
// LEVEL MANAGEMENT SYSTEM
// ============================================================================

// LOAD LEVEL DATA FROM JSON FILE 

function loadLevelData(levelNumber) {  
    gameState = 'LOADING';
    clearLevelData();
    currentLevel = levelNumber;
    const levelFile = `assets/levels/level${levelNumber}.json`;
    loadJSON(levelFile, 
        (data) => {
            console.log(`\u001b[1;32mLevel ${levelNumber} loaded successfully`);
            gridData = data;
            initializeLevel();
        },
        (err) => {
            console.error(`Failed to load level ${levelNumber}`, err);
            gameState = 'SELECTOR';
        }
    );
}

// INITIALIZE LEVEL OBJECTS BASED ON GRID DATA

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
     
    // Start game draw loop
    gameState = 'RUNNING';
}

// CLEAR LEVEL DATA BEFORE LOADING A NEW LEVEL

function clearLevelData() {
    walls = [];
    floors = [];
    projectiles = [];
    player = null; 
    enemies = [];
    gridData = null;
}