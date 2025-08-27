document.addEventListener('DOMContentLoaded', () => {
  // ================== Sounds ==================
  const startupSound = new Audio('source/computer-startup-264414.mp3');
  const whirrSound = new Audio('source/computer-humming-236384.mp3');
  const clickSound = new Audio('source/computer-mouse-click-352734.mp3');
  whirrSound.loop = true;

  function playClick() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  }

  function playStartupAndHumm() {
    const playBoth = () => {
      startupSound.play().catch(() => {});
      whirrSound.play().catch(() => {});
    };
    playBoth();
    document.addEventListener('click', () => playBoth(), { once: true });
  }
  playStartupAndHumm();
// ================== Minesweeper ==================
const MS_ROWS = 9;
const MS_COLS = 9;
const MS_MINES = 10;
const msGrid = document.getElementById("ms-grid");
const msReset = document.getElementById("ms-reset");

let cells = [];
let minePositions = new Set();
let flagsPlaced = 0;

function createMinesweeper() {
  msGrid.innerHTML = '';
  cells = [];
  minePositions = new Set();
  flagsPlaced = 0;

  // Generate unique mine positions
  while (minePositions.size < MS_MINES) {
    minePositions.add(Math.floor(Math.random() * MS_ROWS * MS_COLS));
  }

  for (let i = 0; i < MS_ROWS * MS_COLS; i++) {
    const cell = document.createElement("div");
    cell.className = "ms-cell";
    Object.assign(cell.style, {
      width: "30px",
      height: "30px",
      background: "#c0c0c0",
      border: "2px outset #fff",
      textAlign: "center",
      lineHeight: "30px",
      userSelect: "none",
    });
    cell.dataset.index = i;
    cell.dataset.mine = minePositions.has(i) ? "1" : "0";
    cell.dataset.revealed = "0";
    cell.dataset.flag = "0";

    cell.addEventListener("click", () => revealCell(i));
    cell.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      toggleFlag(cell);
    });

    cells.push(cell);
    msGrid.appendChild(cell);
  }

  const overlay = msGrid.parentElement.querySelector('.ms-gameover');
  if (overlay) overlay.remove();
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
  while (stack.length) {
    const currentIndex = stack.pop();
    const currentCell = cells[currentIndex];

    if (currentCell.dataset.revealed === "1") continue;
    currentCell.dataset.revealed = "1";
    currentCell.style.background = "#e0e0e0";
    currentCell.style.border = "2px inset #808080";

    if (currentCell.dataset.mine === "1") {
      currentCell.innerHTML = `<img src="source/minesweeper.png" style="width:100%; height:100%;">`;
      showGameOver();
      return;
    }

    const offsets = [
      -MS_COLS - 1, -MS_COLS, -MS_COLS + 1,
      -1, 1,
      MS_COLS - 1, MS_COLS, MS_COLS + 1
    ];
    let count = 0;
    const neighbors = [];

    for (let o = 0; o < offsets.length; o++) {
      const ni = currentIndex + offsets[o];
      if (
        ni >= 0 &&
        ni < cells.length &&
        Math.floor(ni / MS_COLS) === Math.floor(currentIndex / MS_COLS) + Math.floor(offsets[o] / MS_COLS)
      ) {
        neighbors.push(ni);
        if (cells[ni].dataset.mine === "1") count++;
      }
    }

    if (count > 0) {
      currentCell.textContent = count;
    } else {
      for (let n of neighbors) {
        if (cells[n].dataset.revealed === "0" && cells[n].dataset.flag === "0") stack.push(n);
      }
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
  Object.assign(overlay.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,0,0,0.5)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    fontWeight: 'bold',
    pointerEvents: 'none',
    zIndex: 5,
  });
  overlay.textContent = 'GAME OVER';
  msGrid.parentElement.appendChild(overlay);
}

function checkWin() {
  const revealed = cells.filter(c => c.dataset.revealed === "1").length;
  if (revealed === MS_ROWS * MS_COLS - MS_MINES) {
    alert("You win!");
    cells.forEach(c => c.style.pointerEvents = "none");
  }
}

msReset.addEventListener("click", createMinesweeper);
createMinesweeper();

  // ================== Posty Assistant ==================
  const posty = document.getElementById("posty");
  const bubble = document.getElementById("posty-bubble");
  const text = document.getElementById("posty-text");
  const postyClose = document.getElementById("posty-close");

  const messages = [
    "Hi, I’m Posty 👋 Need some help?",
    "Looks like you're exploring Aden's portfolio!",
    "You can double-click icons to open windows.",
    "Don't forget to check the Skills window!",
    "Fun fact: caffeine powers this OS ☕"
  ];
  let msgIndex = 0;

  function showBubble() {
    text.textContent = messages[msgIndex];
    bubble.style.display = "block";
    msgIndex = (msgIndex + 1) % messages.length;
    setTimeout(() => bubble.style.display = "none", 6000);
  }

  setTimeout(showBubble, 4000);
  setInterval(showBubble, 25000);
  postyClose.addEventListener("click", () => posty.style.display = "none");

  // ================== Notepad Formatting ==================
  function format(command, value = null) {
    document.execCommand(command, false, value);
  }

  ["boldBtn", "italicBtn", "underlineBtn"].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener("click", () => format(id.replace("Btn", "").toLowerCase()));
  });

  const fontSelect = document.getElementById("fontSelect");
  if (fontSelect) fontSelect.addEventListener("change", e => format("fontName", e.target.value));

  const colorInput = document.getElementById("colorInput");
  if (colorInput) colorInput.addEventListener("input", e => format("foreColor", e.target.value));

  // ================== Clock ==================
  function updateClock() {
    const clock = document.getElementById('clock');
    if (!clock) return;
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    clock.textContent = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // ================== Windows & Taskbar ==================
  const windows = document.querySelectorAll('.window');
  let highestZ = 10;
  const taskbarContainer = document.querySelector('.taskbar-windows');

  function createTaskbarButton(targetSelector, label) {
    if (taskbarContainer.querySelector(`.taskbar-item[data-target="${targetSelector}"]`)) {
      return taskbarContainer.querySelector(`.taskbar-item[data-target="${targetSelector}"]`);
    }

    const btn = document.createElement('span');
    btn.className = 'taskbar-item';
    btn.dataset.target = targetSelector;
    btn.textContent = label;
    btn.addEventListener('click', () => {
      const win = document.querySelector(targetSelector);
      if (!win) return;
      win.style.display = win.style.display === 'none' ? 'block' : 'none';
      win.style.zIndex = ++highestZ;
      updateTaskbarState();
      playClick();
    });

    taskbarContainer.appendChild(btn);
    return btn;
  }

  function updateTaskbarState() {
    taskbarContainer.querySelectorAll('.taskbar-item').forEach(btn => {
      const win = document.querySelector(btn.dataset.target);
      btn.classList.toggle('active', win && win.style.display !== 'none');
    });
  }

  windows.forEach(win => {
    win.style.display = 'none';
    const title = win.querySelector('.title-bar');
    const minimizeBtn = win.querySelector('.btn.minimize');
    const closeBtn = win.querySelector('.btn.close');
    let isDragging = false;
    let offsetX, offsetY;

    const bringToFront = () => {
      win.style.display = 'block';
      win.style.zIndex = ++highestZ;
      updateTaskbarState();
      playClick();
    };

    title?.addEventListener('mousedown', e => {
      isDragging = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
      bringToFront();
    });

    document.addEventListener('mousemove', e => {
      if (!isDragging) return;
      win.style.left = Math.max(0, e.clientX - offsetX) + 'px';
      win.style.top = Math.max(0, e.clientY - offsetY) + 'px';
    });

    document.addEventListener('mouseup', () => isDragging = false);

    minimizeBtn?.addEventListener('click', () => {
      win.style.display = 'none';
      updateTaskbarState();
      playClick();
    });

    closeBtn?.addEventListener('click', () => {
      win.style.display = 'none';
      const btn = taskbarContainer.querySelector(`.taskbar-item[data-target='.${win.classList[1]}']`);
      btn?.remove();
      updateTaskbarState();
      playClick();
    });
  });

  // ================== Start Menu ==================
  const startButton = document.querySelector('.start-button');
  const startMenu = document.getElementById('startMenu');
  startButton.addEventListener('click', e => {
    e.stopPropagation();
    startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
    playClick();
  });
  document.addEventListener('click', e => {
    if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
      startMenu.style.display = 'none';
    }
  });

  // ================== Desktop Icons ==================
  document.querySelectorAll('.desktop-icon').forEach(icon => {
    let clickTimer = null;
    icon.addEventListener('click', () => {
      playClick();
      if (!clickTimer) {
        clickTimer = setTimeout(() => clickTimer = null, 250);
      } else {
        clearTimeout(clickTimer);
        clickTimer = null;
        const win = document.querySelector(icon.dataset.target);
        if (!win) return;
        win.style.display = 'block';
        win.style.zIndex = ++highestZ;
        createTaskbarButton(icon.dataset.target, win.dataset.title || "Window");
        updateTaskbarState();
      }
    });
  });
});
