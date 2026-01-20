// ==========================================
// config.js
// GAME CONSTANTS & GLOBALS
// ==========================================

// Game constants
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 600;

// Assets container
const assets = {
    player: {},
    enemy: {},
    walls: {},
    floors: {},
    audio: {}
};

// Game state globals
let gameState = 'SELECTOR'; // 'SELECTOR', 'LOADING', 'RUNNING', 'WIN', 'LOSE'
let currentLevel = 0;
let unlockedLevel = 1;

// Player settings
let playerShootCooldown = 40;
let playerMoveSpeed = 2;

// Game objects
let player;
let enemies = [];
let walls = [];
let floors = [];
let projectiles = [];

// Map & level data
let levels = [];
let gridData;
let gridCols = 0; 
let gridRows = 0;
let cellWidth, cellHeight;

// UI Elements
let selectorGui;
let levelButtons = [];

// Audio
let hasPlayedStartTransition = false;
let hasPlayedWinSound = false;
let hasPlayedLoseSound = false;