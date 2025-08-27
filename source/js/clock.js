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
