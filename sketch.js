// ============================================================================
// sketch.js
// MAIN GAME FILE
// ============================================================================

// PRELOAD FUNCTION
// Loads all assets and levels manifest before the game starts

function preload() {
    // Levels
    levels = loadJSON('assets/levels/levels.json',
        (data) => {
            console.log('\u001b[1;32mLevel manifest loaded successfully');
            levels = data;
        },
        (err) => console.error('Failed to load levels', err)
    );

    // Player Sprites
    for (let i = 0; i < 8; i++) {
        assets.player[i] = loadImage(`assets/sprites/player/player_000${i + 1}.png`);
    }

    // Initialize Enemy Sprite Container
    assets.enemies = {
        skeleton: [], 
        demon: [] 
    };
    // Load Enemy Type 1 (Skeleton - ID 8)
    for (let i = 0; i < 4; i++) {
        assets.enemies.skeleton[i] = loadImage(`assets/sprites/enemy_skeleton/enemy_skeleton_000${i + 1}.png`);
    }
    // Load Enemy Type 2 (Demon - ID 7)
    for (let i = 0; i < 4; i++) {
        assets.enemies.demon[i] = loadImage(`assets/sprites/enemy_demon/enemy_demon_000${i + 1}.png`);
    }

    // Environment
    assets.floors[0] = loadImage('assets/sprites/environment/floor_grass.png');
    assets.floors[1] = loadImage('assets/sprites/environment/floor_path.png');
    // placeholder floor 2
    assets.walls[3] = loadImage('assets/sprites/environment/wall_stone.png');
    assets.walls[4] = loadImage('assets/sprites/environment/wall_wood.png');
    // placeholder wall 5

}

// SETUP FUNCTION
// Initializes the canvas and level selector UI

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, P2D, document.getElementById('game-container'));
    setupLevelSelector();
}

// GAME STATE MANAGER (DRAW)
// Calls different draw functions from the "systems/gamestate.js" file based on gameState

function draw() {
    switch (gameState) {
        case 'SELECTOR':
            console.log("Game State: SELECTOR");
            drawSelector();
            break;
        case 'LOADING':
            console.log("Game State: LOADING");
            drawLoading();
            break;
        case 'RUNNING':
            console.log("Game State: RUNNING");
            drawLevel();
            break;
        case 'WIN':
            console.log("Game State: WIN");
            drawWin();
            break;
        case 'LOSE':
            console.log("Game State: LOSE");
            drawLose();
            break;
    }
} 