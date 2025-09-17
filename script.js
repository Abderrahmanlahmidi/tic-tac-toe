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

  renderGrid(settings.gridSize);
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

  renderGrid(getSettings ? getSettings.gridSize : 3);
}

function renderGrid(size) {
  const grid = document.getElementById("game-grid");
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  let currentPlayer = getSettings.player1;
  let secondPlayer = getSettings.player2;
  console.log(currentPlayer)
  console.log(secondPlayer)


  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);



    if(!square.textContent){
      square.addEventListener("click", () => {
    const mark = document.createElement("span");
    mark.textContent = currentPlayer;
    square.appendChild(mark);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayer = currentPlayer === ;

});

    }
  }
}

window.addEventListener("load", loadSettings);

// 
