// ============================================================================
// gamestates/lose.js
// LOSE GAME STATE
// ============================================================================

// ----------------------------------------------
// INITIALIZE LOSE SCREEN
// ----------------------------------------------

function initializeLose() {
    gameState = 'LOADING';

    // AUDIO
    // -----------------------------
    if (assets.audio.musicGame.isPlaying()) {
        assets.audio.musicGame.stop();
    }
    if (!assets.audio.transitionLost.isPlaying()) {
        assets.audio.transitionLost.play();
    }
    assets.audio.sfxPlayerMove.stop();

    // P5.TOUCHGUI SETUP
    // -----------------------------
    loseGui = createGui();
    // Clear old buttons if any exist
    if (typeof loseButtons !== 'undefined') {
        loseButtons.forEach(btn => {
            if (btn.remove) btn.remove();
        });
    }
    loseButtons = [];
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
        loseButtons.push(btn);
    });

    // FINALIZE INITIALIZATION
    // -----------------------------

    console.log(`\u001b[1;31mLose Screen initialized.\u001b[0m`);
    gameState = 'LOSE';
}

// ----------------------------------------------
// DRAW LOSE SCREEN
// ----------------------------------------------

function drawLose() {

    // Draw Background and UI
    background(20);
    push();
    textAlign(CENTER, CENTER);
    textFont(fontAlagard);
    fill("#cd1414");
    textSize(64);
    text("Level Failed!", width / 2, height / 2 - 100);
    drawGui(loseGui);

    // Handle Inputs
    for (let i = 0; i < loseButtons.length; i++) {
        if (loseButtons[i].isPressed) {
            let action = loseButtons[i].actionType;
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