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
