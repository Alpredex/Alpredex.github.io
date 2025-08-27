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
