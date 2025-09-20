# Tic-Tac-Toe Game Documentation

This project implements a customizable **Tic-Tac-Toe game** in JavaScript with persistent settings and score tracking using `localStorage`.

---

## Features

* Dynamic grid size (`n x n`)
* Custom player symbols
* Custom win condition (number of marks required in a row)
* Persistent game state using `localStorage`
* Score tracking with reset option
* Restart game functionality

---

## Main Functions

### 1. **`loadSettings()`**

Loads game settings from `localStorage` (grid size, win condition, player symbols).
If no saved settings exist, default values are applied:

* Grid size = `3`
* Win condition = `3`
* Player 1 = `"X"`
* Player 2 = `"O"`

Also initializes the score if not present.

---

### 2. **`renderGrid(size, pl1, pl2)`**

Creates the game grid dynamically:

* Generates `n x n` cells.
* Restores previously saved marks (if available).
* Listens for player clicks and places symbols.
* Checks win conditions using `checkWin()`.
* Switches active player and updates UI.

---

### 3. **`restartGame()`**

Resets the board while keeping the current score:

* Clears the grid.
* Reinitializes settings and current player.
* Re-renders the grid.

---

### 4. **`checkWin(marks, size, winLength, player)`**

Checks whether a player has won:

* **Rows** → consecutive symbols horizontally.
* **Columns** → consecutive symbols vertically.
* **Diagonals** → both left-to-right and right-to-left diagonals.

Returns `true` if the win condition is met, otherwise `false`.

---

### 5. **`updateScore(player)`**

Increases the score of the winning player and updates `localStorage`.

---

### 6. **`updateScoreDisplay()`**

Displays current scores for both players:

```
Player 1 (X): 2
Player 2 (O): 1
```

---

### 7. **Reset Scores Button**

Resets both players' scores to `0` in `localStorage` and updates the display.

---

## Event Listeners

* **`apply-settings`**: Saves new settings, initializes the game, and restarts the grid.
* **`restart`**: Restarts the game board while keeping scores.
* **`reset-scores`**: Resets scores to zero.
* **`window.load`**: Loads settings and initializes the game when the page loads.

---

## LocalStorage Keys

* `TicTacToeSettings` → `{ gridSize, winLength, player1, player2 }`
* `currentPlayer` → Current active player symbol
* `gridMarks` → Array of current grid state
* `Score` → `{ X: number, O: number }`

---

## Example Usage

1. Select grid size = `4`, win condition = `3`.
2. Choose symbols: Player 1 = `"A"`, Player 2 = `"B"`.
3. Play the game: marks persist even after page refresh.
4. Reset scores anytime with the reset button.

