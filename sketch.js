// ============================================================================
// sketch.js
// MAIN GAME FILE
// ============================================================================

// -------------------------------------------------------------
// GLOBAL VARIABLES
// -------------------------------------------------------------

// CONFIG
// -----------------------------

// Canvas
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 600;

// Player settings
const playerShootCooldown = 40;
const playerMoveSpeed = 2;

// ASSETS & GAME OBJECTS
// -----------------------------

// Asset Containers
const assets = {
    player: {},
    enemies: {
        skeleton: [],
        demon: []
    },
    walls: {},
    floors: {},
    audio: {}
};

// Game Objects
let player;
let enemies = [];
let walls = [];
let floors = [];
let projectiles = [];

// Map & Level Data
let levels = [];
let gridData;
let gridCols = 0; 
let gridRows = 0;
let cellWidth;
let cellHeight;

// UI
let selectorGui;
let winGui;
let loseGui;
let levelButtons = [];
let winButtons = [];
let loseButtons = [];

// GAME STATE
// -----------------------------

let gameState // 'SELECTOR', 'LOADING', 'RUNNING', 'WIN', 'LOSE'
let currentLevel = 0;
let unlockedLevel = 1;

// AUDIO FLAGS
// -----------------------------

let hasPlayedWinSound = false;
let hasPlayedLoseSound = false;

// FONT
// -----------------------------

let fontAlagard;


// -------------------------------------------------------------
// PRELOAD ASSETS
// -------------------------------------------------------------

function preload() {

    // FONT
    // -----------------------------
    
    fontAlagard = loadFont('assets/font/alagard.ttf');

    // LEVEL MANIFEST
    // -----------------------------

    levels = loadJSON('assets/levels/levels.json',
        (data) => {
            console.log('\u001b[1;32mLevel manifest loaded\u001b[0m');
            levels = data;
        },
        (err) => console.error('Failed to load levels', err)
    );
    
    // SPRITES
    // -----------------------------

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
    // placeholder 2
    assets.walls[3] = loadImage('assets/sprites/environment/wall_stone.png');
    // placeholder 4
    // placeholder 5

    // AUDIO
    // -----------------------------

    soundFormats('mp3');
    // Music
    assets.audio.musicGame = loadSound('assets/audio/music-fight.mp3');
    assets.audio.musicMenu = loadSound('assets/audio/music-main-menu.mp3');
    // Transitions
    assets.audio.transitionWin = loadSound('assets/audio/music-transitions-level-win.mp3');
    assets.audio.transitionLost = loadSound('assets/audio/music-transitions-level-lost.mp3');
    assets.audio.transitionLevelStart = loadSound('assets/audio/music-transitions-level-start.mp3');
    // Sound Effects
    assets.audio.sfxButtonDenied = loadSound('assets/audio/fx-button-denied.mp3');
    assets.audio.sfxCharacterHit = loadSound('assets/audio/fx-character-hit.mp3');
    assets.audio.sfxWallHit = loadSound('assets/audio/fx-wall-hit.mp3');
    assets.audio.sfxPlayerMove = loadSound('assets/audio/fx-player-move.mp3');
    assets.audio.sfxPlayerShoot = loadSound('assets/audio/fx-shoot-spell.mp3');
}


// -------------------------------------------------------------
// SETUP FUNCTION
// -------------------------------------------------------------

function setup() {
    // Create canvas in the game-container div
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, P2D, document.getElementById('game-container'));

    // Initalize selector
    initializeLevelSelector();

    // Audio and graphics settings
    getAudioContext().suspend();
    noSmooth();
}

// -------------------------------------------------------------
// GAME STATE MANAGER (DRAW)
// Calls the draw function based on the current game state
// -------------------------------------------------------------

function draw() {
    switch (gameState) {
        case 'LOADING':
            console.log("Drawing: \u001b[1;36mLOADING\u001b[0m");
            drawLoading();
            break;
        case 'SELECTOR':
            console.log("Drawing: \u001b[1;35mSELECTOR\u001b[0m");
            drawSelector();
            break;
        case 'RUNNING':
            console.log("Drawing: \u001b[1;32mRUNNING\u001b[0m");
            drawLevel();
            break;
        case 'WIN':
            console.log("Drawing: \u001b[1;33mWIN\u001b[0m");
            drawWin();
            break;
        case 'LOSE':
            console.log("Drawing: \u001b[1;31mLOSE\u001b[0m");
            drawLose();
            break;
    }
}