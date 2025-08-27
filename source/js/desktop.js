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
