// ============================================================================
// gamestates/selector.js
// LEVEL SELECTOR GAME STATE
// ============================================================================

// ----------------------------------------------
// INITIALIZE LEVEL SELECTOR UI
// ----------------------------------------------

function initializeLevelSelector() {
    gameState = 'LOADING';

    // P5.TOUCHGUI SETUP
    // -----------------------------
    
    selectorGui = createGui();
    // Clear existing buttons
    levelButtons.forEach(btn => {
        if (btn.remove) btn.remove();
    });
    levelButtons = [];
    // Layout Configuration
    const startY = height / 2 - 80;
    const gapY = 60;
    const btnW = 300;
    const btnH = 50;
    const startX = width / 2 - (btnW / 2);
    // Create buttons from Manifest
    levels.forEach((lvl, index) => {
        let btn = createButton(lvl.name, startX, startY + (index * gapY), btnW, btnH);
        // Locked vs Unlocked Styling
        if (lvl.id <= unlockedLevel) {
            btn.setStyle({
                strokeWeight: 0,
                fillBg: color("#A88D75"),
                fillBgHover: color("#C3B99C"),
                fillLabel: color("#252223"),
                fillLabelHover: color("#302B29"),
                rounding: 0,
                textSize: 24,
                font: "fontAlagard"
            });
        } else {
            btn.setStyle({
                strokeWeight: 0,
                fillBg: color("#252223"),
                fillBgHover: color("#302B29"),
                fillLabel: color("#302B29"),
                fillLabelHover: color("#423635"),
                fillBgActive: color("#302B29"),
                fillLabelActive: color("#423635"),
                rounding: 0,
                textSize: 24,
                font: "fontAlagard"
            });
        }
        levelButtons.push(btn);
    });

    // AUDIO
    // -----------------------------

    // Reset for next level start
    hasPlayedStartTransition = false; 
    hasPlayedWinSound = false;
    hasPlayedLoseSound = false;
    // Stop game music if playing
    if (assets.audio.musicGame.isPlaying()) {
        assets.audio.musicGame.stop();
    }
    // Play menu music
    assets.audio.musicMenu.loop();
    assets.audio.musicMenu.setVolume(0.5);
    // Stop move sounds
    assets.audio.sfxPlayerMove.stop();

    // FINISH INITIALIZATION
    // -----------------------------

    console.log(`\u001b[1;32mSelector initialized\u001b[0m`);
    gameState = 'SELECTOR';
}

//----------------------------------------------
// DRAW LEVEL SELECTOR SCREEN
//----------------------------------------------

function drawSelector() {

    // Draw background and UI
    background(20);
    push();
    fill("#C3B99C");
    textFont(fontAlagard);
    textAlign(CENTER);
    textSize(48);
    text("Level Selector", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4);
    drawGui(selectorGui);

    // Handle Inputs
    for (let i = 0; i < levelButtons.length; i++) {
        if (levelButtons[i].isPressed && unlockedLevel >= levels[i].id) {
            loadLevelData(levels[i].id);
            // Play transition sound
            if (!assets.audio.transitionLevelStart.isPlaying()) {
                assets.audio.transitionLevelStart.play();
            }
        }
        else if (levelButtons[i].isPressed && unlockedLevel < levels[i].id) {
            // Play denied sound
            if (!assets.audio.sfxButtonDenied.isPlaying()) {
                assets.audio.sfxButtonDenied.play();
            }
        }
    }
    pop();
}