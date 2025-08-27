const MS_ROWS = 9;
const MS_COLS = 9;
const MS_MINES = 10;

let cells = [];
let minePositions = new Set();
let flagsPlaced = 0;

function createMinesweeper() {
  const msGrid = document.getElementById("ms-grid");
  const msReset = document.getElementById("ms-reset");

  // Clear grid and overlay
  msGrid.innerHTML = '';
  cells = [];
  minePositions = new Set();
  flagsPlaced = 0;
  const existingOverlay = msGrid.parentElement.querySelector('.ms-gameover');
  if (existingOverlay) existingOverlay.remove();

  // Place mines
  while (minePositions.size < MS_MINES) {
    minePositions.add(Math.floor(Math.random() * MS_ROWS * MS_COLS));
  }

  // Create cells
  for (let i = 0; i < MS_ROWS * MS_COLS; i++) {
    const cell = document.createElement("div");
    cell.className = "ms-cell";
    cell.dataset.index = i;
    cell.dataset.mine = minePositions.has(i) ? "1" : "0";
    cell.dataset.revealed = "0";
    cell.dataset.flag = "0";

    // Click handlers
    cell.addEventListener("click", () => revealCell(i));
    cell.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      toggleFlag(cell);
    });

    cells.push(cell);
    msGrid.appendChild(cell);
  }

  // Reset button
  msReset.replaceWith(msReset.cloneNode(true));
  document.getElementById("ms-reset").addEventListener("click", createMinesweeper);
}

function toggleFlag(cell) {
  if (cell.dataset.revealed === "1") return;

  if (cell.dataset.flag === "0") {
    cell.dataset.flag = "1";
    cell.textContent = "🚩";
    flagsPlaced++;
  } else {
    cell.dataset.flag = "0";
    cell.textContent = "";
    flagsPlaced--;
  }
}

function revealCell(index) {
  const cell = cells[index];
  if (cell.dataset.revealed === "1" || cell.dataset.flag === "1") return;

  const stack = [index];

  const numberColors = {
    1: "blue",
    2: "green",
    3: "red",
    4: "darkblue",
    5: "brown",
    6: "cyan",
    7: "black",
    8: "gray"
  };

  while (stack.length) {
    const currentIndex = stack.pop();
    const currentCell = cells[currentIndex];

    if (currentCell.dataset.revealed === "1") continue;

    currentCell.dataset.revealed = "1";
    currentCell.style.background = "#e0e0e0";
    currentCell.style.border = "2px inset #808080";

    if (currentCell.dataset.mine === "1") {
      showGameOver();
      return;
    }

    // Count surrounding mines
    const neighbors = [];
    let count = 0;
    const row = Math.floor(currentIndex / MS_COLS);
    const col = currentIndex % MS_COLS;

    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (r >= 0 && r < MS_ROWS && c >= 0 && c < MS_COLS) {
          const ni = r * MS_COLS + c;
          if (cells[ni].dataset.mine === "1") count++;
          neighbors.push(ni);
        }
      }
    }

    if (count > 0) {
      currentCell.textContent = count;
      currentCell.style.color = numberColors[count] || "black";
    } else {
      neighbors.forEach(n => {
        if (cells[n].dataset.revealed === "0" && cells[n].dataset.flag === "0") stack.push(n);
      });
    }
  }

  checkWin();
}


function showGameOver() {
  cells.forEach(cell => {
    if (cell.dataset.mine === "1") {
      cell.innerHTML = `<img src="source/minesweeper.png" style="width:100%; height:100%;">`;
    }
    cell.style.pointerEvents = "none";
  });

  const overlay = document.createElement('div');
  overlay.className = 'ms-gameover';
  overlay.id = 'ms-overlay';
  Object.assign(overlay.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,0,0,0.5)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',      // stack text and button vertically
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    fontWeight: 'bold',
    pointerEvents: 'auto',        // allow clicks
    zIndex: 10,
    textShadow: '2px 2px 5px black'
  });

  const message = document.createElement('div');
  message.textContent = 'GAME OVER';
  overlay.appendChild(message);

  const resetBtn = document.createElement('button');
  resetBtn.textContent = "Restart";
  Object.assign(resetBtn.style, {
    marginTop: "20px",
    padding: "6px 12px",
    fontSize: "16px",
    cursor: "pointer",
    border: "2px solid #fff",
    borderBottomColor: "#808080",
    borderRightColor: "#808080",
    borderRadius: "4px",
    backgroundColor: "#d4d0c8",
    fontWeight: "bold"
  });

  resetBtn.addEventListener("click", () => {
    overlay.remove();
    createMinesweeper();
  });

  overlay.appendChild(resetBtn);
  document.getElementById("ms-grid").parentElement.appendChild(overlay);
}

function checkWin() {
  const revealed = cells.filter(c => c.dataset.revealed === "1").length;
  if (revealed === MS_ROWS * MS_COLS - MS_MINES) {
    cells.forEach(c => c.style.pointerEvents = "none");

    const existingOverlay = document.getElementById("ms-overlay");
    if (existingOverlay) existingOverlay.remove();

    const overlay = document.createElement('div');
    overlay.className = 'ms-gameover';
    overlay.id = 'ms-overlay';
    Object.assign(overlay.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,128,0,0.5)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px',
      fontWeight: 'bold',
      pointerEvents: 'auto',
      zIndex: 10,
      textShadow: '2px 2px 5px black'
    });

    const message = document.createElement('div');
    message.textContent = 'YOU WIN!';
    overlay.appendChild(message);

    const resetBtn = document.createElement('button');
    resetBtn.textContent = "Restart";
    Object.assign(resetBtn.style, {
      marginTop: "20px",
      padding: "6px 12px",
      fontSize: "16px",
      cursor: "pointer",
      border: "2px solid #fff",
      borderBottomColor: "#808080",
      borderRightColor: "#808080",
      borderRadius: "4px",
      backgroundColor: "#d4d0c8",
      fontWeight: "bold"
    });

    resetBtn.addEventListener("click", () => {
      overlay.remove();
      createMinesweeper();
    });

    overlay.appendChild(resetBtn);
    document.getElementById("ms-grid").parentElement.appendChild(overlay);
  }
}



// Initialize Minesweeper
document.addEventListener("DOMContentLoaded", createMinesweeper);
