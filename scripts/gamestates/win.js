// ============================================================================
// gamestates/win.js
// WIN GAME STATE
// ============================================================================

// ----------------------------------------------
// INITIALIZE WIN SCREEN
// ----------------------------------------------

function initializeWin() {
    gameState = 'LOADING';

    // AUDIO
    // -----------------------------
    if (assets.audio.musicGame.isPlaying()) {
        assets.audio.musicGame.stop();
    }
    if (!assets.audio.transitionWin.isPlaying()) {
        assets.audio.transitionWin.play();
    }
    assets.audio.sfxPlayerMove.stop();

    // P5.TOUCHGUI SETUP
    // -----------------------------
    winGui = createGui();
    // Clear old buttons if any exist
    if (typeof winButtons !== 'undefined') {
        winButtons.forEach(btn => {
            if (btn.remove) btn.remove();
        });
    }
    winButtons = [];
    // Layout config
    const btnW = 300;
    const btnH = 50;
    const startX = width / 2 - (btnW / 2);
    let currentY = height / 2 + 20; // Start below the text
    const gapY = 65;
    // Define Buttons to create
    let actions = [
        { label: "Replay Level", action: "REPLAY" },
        { label: "Level Selector", action: "MENU" }
    ];
    // Generate Buttons
    actions.forEach((act, index) => {
        let btn = createButton(act.label, startX, currentY + (index * gapY), btnW, btnH);
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
        // Attach custom property to identify button action
        btn.actionType = act.action;
        winButtons.push(btn);
    });

    // FINALIZE INITIALIZATION
    // -----------------------------

    unlockedLevel = Math.max(unlockedLevel, currentLevel + 1);
    console.log(`\u001b[1;32mWin Screen initialized.\u001b[0m`);
    console.log(`\u001b[1;33mLevel ${unlockedLevel} unlocked\u001b[0m`);
    gameState = 'WIN';
}

// ----------------------------------------------
// DRAW WIN SCREEN
// ----------------------------------------------

function drawWin() {

    // Draw background and UI
    background(20);
    push();
    textAlign(CENTER, CENTER);
    textFont(fontAlagard);
    fill("#C3B99C");
    textSize(64);
    text("Level Cleared!", width / 2, height / 2 - 100);
    drawGui(winGui);

    // Handle Inputs
    for (let i = 0; i < winButtons.length; i++) {
        if (winButtons[i].isPressed) {
            let action = winButtons[i].actionType;
            if (action === "REPLAY") {
                assets.audio.transitionLevelStart.play();
                loadLevelData(currentLevel);
            } 
            else if (action === "MENU") {
                initializeLevelSelector();
            }
        }
    }
    pop();
}