// ============================================================================
// /systems/gamestate.js
// GAME STATE MANAGEMENT SYSTEM
// ============================================================================

// SETUP LEVEL SELECTOR UI (P5.touchgui)

function setupLevelSelector() {
    // Initialize GUI
    selectorGui = createGui();
    // Clean up old buttons if they exist
    if (levelButtons && levelButtons.length) {
        for (let b of levelButtons) {
            if (b.remove) b.remove(); 
        }
    }
    levelButtons = [];
    let levelButtonY = 0; 
    // Create buttons based on the 'levels' manifest loaded in preload
    for (let i = 0; i < levels.length; i++) {
        let btn = createButton(levels[i].name, width/2 - 150, height/2 - 80 + levelButtonY, 300, 50);
        // Style based on unlocked status
        if (levels[i].id <= unlockedLevel) {
            btn.setStyle({
                fillBg: color("#FF0000"),
                fillBgHover: color("#FF4444"),
                fillLabel: color("#FFFFFF"),
                rounding: 0,
                textSize: 20
            });
        } else {
            btn.setStyle({
                fillBg: color(100),
                fillBgActive: color(100),
                fillLabel: color(150),
                rounding: 0,
                textSize: 20
            });
            btn.isPressed = false; // Disable interaction
        }
        levelButtons.push(btn);
        levelButtonY = levelButtonY + 60;
    }
}

// DRAW LEVEL SELECTOR SCREEN

function drawSelector() {
    background(20);
    push();
    fill(255);
    textAlign(CENTER);
    textSize(40);
    text("Level Selector", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4);
    drawGui(selectorGui);
    // Check button clicks
    for (let i = 0; i < levelButtons.length; i++) {
        if (levelButtons[i].isPressed && unlockedLevel >= levels[i].id) {
            loadLevelData(levels[i].id);
        }
    }
    pop();
}

// DRAW THE CURRENT LEVEL

function drawLevel() {
    noSmooth() 
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

    /* DEBUG: Draw Line of Sight from Enemies to Player
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
    

    // CHECK WIN CONDITION
    if (enemies.length === 0) {
        gameState = 'WIN';
        unlockedLevel = Math.max(unlockedLevel, currentLevel + 1);
        setupLevelSelector();
        console.log("\u001b[1;36mLevel " + unlockedLevel + " unlocked");
    }

}

// DRAW LOADING SCREEN

function drawLoading() {
    background(20, 20, 20);
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Loading...", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    pop();
}

// DRAW WIN SCREEN

function drawWin() {
    background(20, 20, 20);
    push();
    fill(0, 255, 0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("You Win! Press R to Restart or Esc", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    pop();
}

// DRAW LOSE SCREEN

function drawLose() {
    background(20, 20, 20);
    push();
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("You Lose! Press R to Restart or Esc", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    pop();
}