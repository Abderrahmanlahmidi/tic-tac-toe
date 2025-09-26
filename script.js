let player_1;
let player_2;
let currentPlayer;

const Score_1 = document.getElementById("score1");
const Score_2 = document.getElementById("score2");
const WinCondition = document.getElementById("win-condition");

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
    player_1 = getSettings.player1;
    player_2 = getSettings.player2;
    WinCondition.textContent = `Alignements requis: ${getSettings.winLength}`;
  } else {
    document.getElementById("grid-size").value = 3;
    document.getElementById("win-length").value = 3;
    document.getElementById("player1-symbol").value = "X";
    document.getElementById("player2-symbol").value = "O";
    player_1 = "X";
    player_2 = "O";
    WinCondition.textContent = `Alignements requis: ${3}`;
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
        if (checkWin(savedGrid,currentPlayer)) {
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

function checkWin(board, player) {
  let size = board.length;

  for (let row = 0; row < size; row++) {
    if (board[row].every(cell => cell === player)) return true;
  }

  for (let col = 0; col < size; col++) {
    let win = true;
    for (let row = 0; row < size; row++) {
      if (board[row][col] !== player) win = false;
    }
    if (win) return true;
  }

  if (board.every((row, i) => row[i] === player)) return true;

  if (board.every((row, i) => row[size - 1 - i] === player)) return true;

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

const resetButton = document.getElementById("reset-scores");

resetButton.addEventListener("click", () => {
   if (localStorage.getItem("Score")) {
    localStorage.setItem(
      "Score",
      JSON.stringify({ [player_1]: 0, [player_2]: 0 })
    );
  }

  Score_1.textContent = `Joueur 1 (${player_1}): ${0}`;
  Score_2.textContent = `Joueur 2 (${player_2}): ${0}`;
  restartGame();
})


window.addEventListener("load", loadSettings);


