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
