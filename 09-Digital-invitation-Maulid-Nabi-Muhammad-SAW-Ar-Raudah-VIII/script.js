// data/undangan.js harus dimuat sebelum file ini, lihat window.MAULID_DATA
const data = window.MAULID_DATA;

// --- ISI TEKS: salin nilai data/undangan.js ke elemen HTML dengan id yang sama ---
const textFields = { eventName: data.eventName, theme: data.theme, photoLabel: data.photoLabel, dateDetail: data.dateDetail, islamicDate: data.date, time: data.time, venue: data.venue, address: data.address, speaker: data.speaker, dressCode: data.dressCode };
Object.entries(textFields).forEach(([id, value]) => { const field = document.getElementById(id); if (field) field.textContent = value; });

// --- PETA: isi link "Buka Maps" dan iframe peta kecil ---
document.getElementById('mapsLink').href = data.mapsUrl;
document.getElementById('mapFrame').src = data.mapEmbedUrl || `${data.mapsUrl}&output=embed`;

// --- HITUNG MUNDUR: gabungkan eventDate + eventTime jadi satu objek Date target ---
function getEventDateTime() {
  const rawDate = data.eventDate || data.dateDetail;
  const rawTime = data.eventTime || (data.time.match(/(\d{1,2})\.(\d{2})/) || ['19:30', '19', '30']).slice(1).join(':');

  if (!rawDate || !rawTime) {
    return new Date();
  }

  const isoDate = rawDate.includes('-') ? rawDate : rawDate.replace(/\D+/g, '-').replace(/^-|-$/g, '');
  const normalizedTime = rawTime.includes(':') ? rawTime : rawTime.replace('.', ':');

  const date = new Date(`${isoDate}T${normalizedTime}:00`);

  if (!Number.isNaN(date.getTime())) {
    return date;
  }

  const fallbackDate = new Date(data.dateDetail || rawDate);
  const fallbackMatch = (data.time || rawTime).match(/(\d{1,2})\.(\d{2})/);
  const fallbackHours = fallbackMatch ? Number(fallbackMatch[1]) : 19;
  const fallbackMinutes = fallbackMatch ? Number(fallbackMatch[2]) : 30;

  return new Date(
    fallbackDate.getFullYear(),
    fallbackDate.getMonth(),
    fallbackDate.getDate(),
    fallbackHours,
    fallbackMinutes,
    0,
    0
  );
}

// Menghitung sisa waktu ke target lalu menampilkannya di angka hari/jam/menit/detik
function updateCountdown() {
  const countdownTarget = getEventDateTime();
  const timeLeft = countdownTarget.getTime() - Date.now();
  const countdownEls = {
    days: document.getElementById('countdown-days'),
    hours: document.getElementById('countdown-hours'),
    minutes: document.getElementById('countdown-minutes'),
    seconds: document.getElementById('countdown-seconds')
  };

  if (timeLeft <= 0) {
    Object.values(countdownEls).forEach((el) => { el.textContent = '00'; });
    return;
  }

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownEls.days.textContent = String(days).padStart(2, '0');
  countdownEls.hours.textContent = String(hours).padStart(2, '0');
  countdownEls.minutes.textContent = String(minutes).padStart(2, '0');
  countdownEls.seconds.textContent = String(seconds).padStart(2, '0');
}

// --- FOTO HERO: cek dulu apakah heroImage bisa dimuat, baru tampilkan sebagai background ---
const heroImage = document.getElementById('heroImage');
const image = new Image();
image.onload = () => { heroImage.style.backgroundImage = `url("${data.heroImage}")`; heroImage.classList.add('has-image'); };
image.onerror = () => { heroImage.classList.add('image-placeholder'); };
image.src = data.heroImage;

// --- MUSIK: pemutaran otomatis + tombol play/pause di navigasi bawah ---
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const audioGate = document.getElementById('audioGate');
const openInvitation = document.getElementById('openInvitation');
music.src = data.musicFile;
music.load();
musicToggle.addEventListener('click', async () => {
  if (music.paused) { try { await music.play(); } catch (error) { musicToggle.setAttribute('aria-label', 'Musik belum tersedia'); } }
  else { music.pause(); }
  updateMusicState();
});
// Sinkronkan tampilan tombol musik (ikon/aria-label) dengan status audio saat ini
function updateMusicState() { const playing = !music.paused; musicToggle.classList.toggle('is-playing', playing); musicToggle.setAttribute('aria-label', playing ? `Matikan ${data.musicTitle}` : `Putar ${data.musicTitle}`); }
music.addEventListener('play', updateMusicState);
music.addEventListener('pause', updateMusicState);

// Browser sering memblokir autoplay bersuara, jadi coba lagi saat ada sentuhan/klik pertama
function startMusic() {
  music.play().then(updateMusicState).catch(updateMusicState);
}
startMusic();
document.addEventListener('pointerdown', startMusic, { once: true });
openInvitation.addEventListener('click', () => {
  startMusic();
  audioGate.classList.add('is-hidden');
});
music.addEventListener('playing', () => audioGate.classList.add('is-hidden'));

// --- JALANKAN: mulai hitung mundur (update tiap detik) dan set status musik awal ---
updateCountdown();
setInterval(updateCountdown, 1000);
updateMusicState();
