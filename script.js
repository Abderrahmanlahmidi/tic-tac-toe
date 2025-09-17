let player_1;
let player_2;

let currentPlayer;

document.getElementById("apply-settings").addEventListener("click", () => {
  const gridSize = document.getElementById("grid-size").value;
  const winLength = document.getElementById("win-length").value;
  const player1 = document.getElementById("player1-symbol").value || "X";
  const player2 = document.getElementById("player2-symbol").value || "O";

  const settings = {
    gridSize,
    winLength,
    player1,
    player2,
  };

  localStorage.setItem("TicTacToeSettings", JSON.stringify(settings));


  currentPlayer = player1;
  localStorage.setItem("currentPlayer", currentPlayer);


  localStorage.removeItem("gridMarks");

  renderGrid(settings.gridSize, player1, player2);
  restartGame();
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

  if(getSettings){
    player_1 = getSettings.player1;
    player_2 = getSettings.player2;
  }else{
    player_1 = "X";
    player_2 = "O";
  }

  renderGrid(getSettings ? getSettings.gridSize : 3,player_1, player_2);
  
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

        currentPlayer = currentPlayer === pl1 ? pl2 : pl1;
        localStorage.setItem("currentPlayer", currentPlayer);

        document.getElementById("current-turn").textContent = `الدور الحالي: ${currentPlayer}`;
      }
    });

    grid.appendChild(square);
  }

  document.getElementById("current-turn").textContent = `الدور الحالي: ${currentPlayer}`;
}



const restartButton = document.getElementById("restart");

function restartGame(){
   let saveGrid = localStorage.getItem("gridMarks");
  if(saveGrid){
    saveGrid = localStorage.removeItem("gridMarks");
    renderGrid(getSettings ? getSettings.gridSize : 3);
  }
}

restartButton.addEventListener("click", () => {
 restartGame();
})


const WinCondition = document.getElementById("win-condition");
const Score = getSettings.winLength;  
WinCondition.textContent = `Alignements requis: ${Score}`











window.addEventListener("load", loadSettings);


