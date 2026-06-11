const scene = document.getElementById("scene");
const btn = document.getElementById("toggleBtn");

let isOn = true;

function setLampState(on) {
  isOn = on;

  if (isOn) {
    document.body.classList.remove("off-body");
    scene.classList.remove("off");
    btn.textContent = "Matikan lampu";
  } else {
    document.body.classList.add("off-body");
    scene.classList.add("off");
    btn.textContent = "Nyalakan lampu";
  }
}

btn.addEventListener("click", () => {
  setLampState(!isOn);
});

// Kamu bisa mematikan lampu lewat JS:
// setLampState(false);
