# Tiny Wizard

A browser-based top-down shooter built with [p5.js](https://p5js.org/). Play as a wizard fighting through three hand-crafted levels, defeating skeletons and demons before they take you out. 

---

## Gameplay

- Clear every enemy to win the level.
- Enemies roam the map randomly and shoot at you when they have line of sight.
- Two enemy types with distinct behaviors:
  - **Skeleton** – slow, shoots every ~2 seconds
  - **Demon** – fast, shoots every ~1 second

## Controls

| Input | Action |
|---|---|
| `WASD` | Move |
| `Left Mouse Button` | Shoot |
| `M` | Mute / Unmute audio |
| `R` | Reload current level |
| `ESC` | Return to Level Selector |

## Levels

| # | Name |
|---|---|
| 1 | The Journey Begins |
| 2 | The Skeleton Path |
| 3 | The Labyrinth |

Levels are defined as JSON grid files in `assets/levels/`. Each cell in the grid encodes terrain (grass, path, wall) and entity placement (player, skeleton, demon).

## Project Structure

```
sketch.js                   # Entry point, global state, preload/setup/draw loop
index.html                  # Page shell and script loading order
style.css                   # Layout and styling
scripts/
  classes/
    player.js               # Player movement, input handling, wall collision
    enemy.js                # Enemy AI: random pathfinding + line-of-sight shooting
    projectile.js           # Projectile movement and hit detection
    wall.js / floor.js      # Tile entities
  systems/
    collision.js            # AABB collision + line-segment line-of-sight check
    controls.js             # Keyboard/mouse input helpers
  gamestates/
    selector.js             # Level select screen
    loading.js              # Loading screen
    running.js              # Active gameplay: level init + draw loop
    win.js / lose.js        # End screens
assets/
  levels/                   # level1–3.json grid data + manifest
  sprites/                  # Player, skeleton, demon, environment spritesheets
  audio/                    # Background music, transition stings, SFX
  font/                     # Alagard bitmap font
```

## Tech Stack

- [p5.js](https://p5js.org/) – rendering and game loop
- [p5.sound](https://p5js.org/reference/p5.sound/) – audio playback
- [p5.touchgui](https://github.com/L05/p5.touchgui) – UI buttons
