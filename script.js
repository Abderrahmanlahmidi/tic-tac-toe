let player_1;
let player_2;
let currentPlayer;

const Score_1 = document.getElementById("score1");
const Score_2 = document.getElementById("score2");

document.getElementById("apply-settings").addEventListener("click", () => {
  const gridSize = parseInt(document.getElementById("grid-size").value);
  const winLength = parseInt(document.getElementById("win-length").value);
  const player1 = document.getElementById("player1-symbol").value || "X";
  const player2 = document.getElementById("player2-symbol").value || "O";

  const settings = { gridSize, winLength, player1, player2 };
  localStorage.setItem("TicTacToeSettings", JSON.stringify(settings));

  currentPlayer = player1;
  localStorage.setItem("currentPlayer", currentPlayer);
  localStorage.removeItem("gridMarks");

  if (!localStorage.getItem("Score")) {
    localStorage.setItem(
      "Score",
      JSON.stringify({ [player1]: 0, [player2]: 0 })
    );
  }

  updateScoreDisplay();
  renderGrid(gridSize, player1, player2);
  restartGame();

  const WinCondition = document.getElementById("win-condition");
  WinCondition.textContent = `Alignements requis: ${winLength}`;
});

var getSettings = JSON.parse(localStorage.getItem("TicTacToeSettings"));

function loadSettings() {
  if (getSettings) {
    document.getElementById("grid-size").value = getSettings.gridSize;
    document.getElementById("win-length").value = getSettings.winLength;
    document.getElementById("player1-symbol").value = getSettings.player1;
    document.getElementById("player2-symbol").value = getSettings.player2;
  } else {
    document.getElementById("grid-size").value = 3;
    document.getElementById("win-length").value = 3;
    document.getElementById("player1-symbol").value = "X";
    document.getElementById("player2-symbol").value = "O";
  }

  if (getSettings) {
    player_1 = getSettings.player1;
    player_2 = getSettings.player2;
  } else {
    player_1 = "X";
    player_2 = "O";
  }

  if (!localStorage.getItem("Score")) {
    localStorage.setItem(
      "Score",
      JSON.stringify({ [player_1]: 0, [player_2]: 0 })
    );
  }

  updateScoreDisplay();
  renderGrid(getSettings ? getSettings.gridSize : 3, player_1, player_2);
}

function renderGrid(size, pl1, pl2) {
  const grid = document.getElementById("game-grid");
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  currentPlayer = localStorage.getItem("currentPlayer") || pl1;
  let savedGrid = JSON.parse(localStorage.getItem("gridMarks")) || Array(size * size).fill("");

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    if (savedGrid[i]) {
      const mark = document.createElement("span");
      mark.textContent = savedGrid[i];
      square.appendChild(mark);
    }

    square.addEventListener("click", () => {
      if (!savedGrid[i]) {
        const mark = document.createElement("span");
        mark.textContent = currentPlayer;
        square.appendChild(mark);

        savedGrid[i] = currentPlayer;
        localStorage.setItem("gridMarks", JSON.stringify(savedGrid));

        const winLength = parseInt(JSON.parse(localStorage.getItem("TicTacToeSettings")).winLength) || 3;
        if (checkWin(savedGrid, size, winLength, currentPlayer)) {
          alert(`Joueur ${currentPlayer} a gagné !`);
          updateScore(currentPlayer);
          localStorage.removeItem("gridMarks");
          renderGrid(size, pl1, pl2);
          return;
        }

        currentPlayer = currentPlayer === pl1 ? pl2 : pl1;
        localStorage.setItem("currentPlayer", currentPlayer);
        document.getElementById("active-player").textContent = `Joueur actif: ${currentPlayer}`;
      }
    });

    grid.appendChild(square);
  }

  document.getElementById("active-player").textContent = `Joueur actif: ${currentPlayer}`;
}

function restartGame() {
  const gridSize = parseInt(document.getElementById("grid-size").value);
  const winLength = parseInt(document.getElementById("win-length").value);
  const player1 = document.getElementById("player1-symbol").value || "X";
  const player2 = document.getElementById("player2-symbol").value || "O";

  const settings = { gridSize, winLength, player1, player2 };
  localStorage.setItem("TicTacToeSettings", JSON.stringify(settings));

  currentPlayer = player1;
  localStorage.setItem("currentPlayer", currentPlayer);
  localStorage.removeItem("gridMarks");

  renderGrid(settings.gridSize, player1, player2);
}

document.getElementById("restart").addEventListener("click", () => {
  restartGame();
});

function checkWin(marks, size, winLength, player) {
  const getIndex = (row, col) => row * size + col;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col <= size - winLength; col++) {
      let ok = true;
      for (let k = 0; k < winLength; k++) {
        if (marks[getIndex(row, col + k)] !== player) ok = false;
      }
      if (ok) return true;
    }
  }

  for (let col = 0; col < size; col++) {
    for (let row = 0; row <= size - winLength; row++) {
      let ok = true;
      for (let k = 0; k < winLength; k++) {
        if (marks[getIndex(row + k, col)] !== player) ok = false;
      }
      if (ok) return true;
    }
  }

  for (let row = 0; row <= size - winLength; row++) {
    for (let col = 0; col <= size - winLength; col++) {
      let ok = true;
      for (let k = 0; k < winLength; k++) {
        if (marks[getIndex(row + k, col + k)] !== player) ok = false;
      }
      if (ok) return true;
    }
  }

  for (let row = 0; row <= size - winLength; row++) {
    for (let col = winLength - 1; col < size; col++) {
      let ok = true;
      for (let k = 0; k < winLength; k++) {
        if (marks[getIndex(row + k, col - k)] !== player) ok = false;
      }
      if (ok) return true;
    }
  }

  return false;
}

function updateScore(player) {
  let score = JSON.parse(localStorage.getItem("Score"));
  score[player] += 1;
  localStorage.setItem("Score", JSON.stringify(score));
  updateScoreDisplay();
}

function updateScoreDisplay() {
  let score = JSON.parse(localStorage.getItem("Score"));
  if (score) {
    Score_1.textContent = `Joueur 1 (${player_1}): ${score[player_1] || 0}`;
    Score_2.textContent = `Joueur 2 (${player_2}): ${score[player_2] || 0}`;
  }
}

window.addEventListener("load", loadSettings);
