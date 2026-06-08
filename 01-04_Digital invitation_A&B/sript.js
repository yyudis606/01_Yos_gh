/* ============================================================
   🎭 UNDANGAN DIGITAL BATMAN & BATGIRL — SCRIPT FINAL
   Dibuat untuk GitHub Pages — cepat, stabil, dan responsif
============================================================ */

/* -------------------------------
   1. BACA NAMA TAMU
-------------------------------- */
function getQueryGuest() {
  const params = new URLSearchParams(window.location.search);
  return params.get("guest");
}

function readGuest() {
  const q = getQueryGuest();
  if (q) return decodeURIComponent(q);

  const stored = localStorage.getItem("invitationGuest");
  return stored || "Tamu Istimewa";
}

function saveGuest(name) {
  localStorage.setItem("invitationGuest", name);
}

function updateGuestDisplay() {
  const g = readGuest();
  document.getElementById("guestName").textContent = g;
  saveGuest(g);
}

/* -------------------------------
   2. RSVP SYSTEM
-------------------------------- */
function loadAttendance() {
  return JSON.parse(localStorage.getItem("undanganAttendance") || "{}");
}

function saveAttendance(data) {
  localStorage.setItem("undanganAttendance", JSON.stringify(data));
}

function setAttendanceStatus(guest, status) {
  const data = loadAttendance();
  data[guest] = status;
  saveAttendance(data);
  updateStats();
  highlightActive(status);
}

function updateStats() {
  const data = loadAttendance();
  let at = 0, mb = 0, no = 0;

  Object.values