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
