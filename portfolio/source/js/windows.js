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
