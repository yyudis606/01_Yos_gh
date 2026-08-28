// ==========================================================================
// 1. Isi nama tamu (dari URL ?guest= atau localStorage) + data undangan
//    Sumber data: window.INVITATION_DATA, didefinisikan di data/undangan.js
// ==========================================================================
const event = window.INVITATION_DATA;
const guest = new URLSearchParams(location.search).get('guest') || localStorage.getItem('invitationGuest') || 'Tamu Istimewa';
const guestName = decodeURIComponent(guest);
localStorage.setItem('invitationGuest', guestName);

document.getElementById('guestName').textContent = guestName;
document.getElementById('wishName').value = guestName;

// Nama mempelai & jadwal acara (header + section info lokasi)
document.getElementById('groomName').textContent = event.groom;
document.getElementById('brideName').textContent = event.bride;
document.getElementById('eventDay').textContent = event.day;
document.getElementById('eventDate').textContent = event.date;
document.getElementById('eventTime').textContent = `${event.time} - ${event.endTime}`;
document.getElementById('infoDay').textContent = event.day;
document.getElementById('infoDate').textContent = event.date;
document.getElementById('infoTime').textContent = `${event.time} - ${event.endTime}`;
document.getElementById('venueName').textContent = event.venue;
document.getElementById('venueAddress').textContent = event.address;

// Tautan Google Maps (tombol "Lihat lokasi" + peta embed)
document.getElementById('mapsLink').href = event.mapsUrl;
document.getElementById('mapPreviewLink').href = event.mapsUrl;
document.getElementById('mapFrame').src = event.mapEmbedUrl || `${event.mapsUrl}&output=embed`;

// Tombol QRIS: nonaktifkan jika belum ada qrisUrl di data/undangan.js
const qrisLink = document.getElementById('qrisLink');
if (event.qrisUrl) {
  qrisLink.href = event.qrisUrl;
} else {
  qrisLink.removeAttribute('href');
  qrisLink.setAttribute('aria-disabled', 'true');
  qrisLink.textContent = 'Belum tersedia';
}

// Info musik latar (judul, artis, file audio)
document.getElementById('musicTitle').textContent = event.musicTitle;
document.getElementById('musicArtist').textContent = event.musicArtist;
const configuredMusic = document.querySelector('#bgMusic source');
configuredMusic.src = event.musicFile;
document.getElementById('bgMusic').load();

// ==========================================================================
// 2. Konfirmasi kehadiran (RSVP) — disimpan per nama tamu di localStorage
// ==========================================================================
const attendanceKey = 'undanganAttendance';
const getAttendance = () => JSON.parse(localStorage.getItem(attendanceKey) || '{}');
const saveAttendance = data => localStorage.setItem(attendanceKey, JSON.stringify(data));
const statuses = { btnAttending: 'hadir', btnMaybe: 'ragu', btnNot: 'tidak' };

function updateStats() {
  const data = Object.values(getAttendance());
  document.getElementById('attendingCount').textContent = data.filter(value => value === 'hadir').length;
  document.getElementById('maybeCount').textContent = data.filter(value => value === 'ragu').length;
  document.getElementById('notCount').textContent = data.filter(value => value === 'tidak').length;
  // Tandai tombol status yang sesuai dengan pilihan tamu saat ini sebagai "aktif"
  document.querySelectorAll('.attendance-btn').forEach(button => button.classList.toggle('active', getAttendance()[guestName] === statuses[button.id]));
}

Object.keys(statuses).forEach(id => document.getElementById(id).addEventListener('click', () => {
  const data = getAttendance();
  data[guestName] = statuses[id];
  saveAttendance(data);
  updateStats();
}));
updateStats();

// ==========================================================================
// 3. Ucapan tamu — dikirim ke commentsApiUrl bila diisi, jika tidak
//    disimpan/dibaca dari localStorage saja (mode offline)
// ==========================================================================
const wishesKey = 'undanganWishes';
const wishForm = document.getElementById('wishForm');
const wishList = document.getElementById('wishList');
const wishStatus = document.getElementById('wishStatus');
const statusLabels = { hadir: 'Hadir', ragu: 'Ragu', tidak: 'Tidak hadir', belum: 'Belum konfirmasi' };

function readWishes() {
  return JSON.parse(localStorage.getItem(wishesKey) || '[]');
}

function renderWishes(wishes) {
  wishList.innerHTML = '';
  if (!wishes.length) {
    wishList.innerHTML = '<p class="wish-status">Belum ada ucapan. Jadilah yang pertama.</p>';
    return;
  }
  // Tampilkan ucapan terbaru di paling atas
  wishes.slice().reverse().forEach(wish => {
    const item = document.createElement('article'); item.className = 'wish-item';
    const meta = document.createElement('div'); meta.className = 'wish-meta';
    const name = document.createElement('strong'); name.className = 'wish-name'; name.textContent = wish.name;
    const badge = document.createElement('span'); badge.className = `wish-badge ${wish.attendance}`; badge.textContent = statusLabels[wish.attendance] || 'Belum konfirmasi';
    const message = document.createElement('p'); message.className = 'wish-message'; message.textContent = wish.message;
    meta.append(name, badge);
    item.append(meta, message);
    wishList.appendChild(item);
  });
}

async function loadWishes() {
  // Tanpa commentsApiUrl, langsung tampilkan ucapan lokal
  if (!event.commentsApiUrl) { renderWishes(readWishes()); return; }
  try {
    const response = await fetch(event.commentsApiUrl);
    if (!response.ok) throw new Error('Gagal memuat ucapan');
    renderWishes(await response.json());
  } catch (error) {
    // Jika API gagal diakses, tetap tampilkan ucapan yang tersimpan lokal
    renderWishes(readWishes());
    wishStatus.textContent = 'Ucapan lokal ditampilkan.';
  }
}
loadWishes();

wishForm.addEventListener('submit', async submitEvent => {
  submitEvent.preventDefault();
  const currentStatus = getAttendance()[guestName] || 'belum';
  const formData = new FormData(wishForm);
  const wish = { name: String(formData.get('name')).trim(), message: String(formData.get('message')).trim(), attendance: currentStatus, createdAt: Date.now() };

  // Selalu simpan ke localStorage sebagai cadangan, lalu coba kirim ke API jika tersedia
  const wishes = readWishes();
  wishes.push(wish);
  localStorage.setItem(wishesKey, JSON.stringify(wishes));

  if (event.commentsApiUrl) {
    try {
      const response = await fetch(event.commentsApiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(wish) });
      if (!response.ok) throw new Error('Gagal menyimpan ucapan');
    } catch (error) {
      wishStatus.textContent = 'Tersimpan di perangkat ini.';
    }
  }

  wishForm.reset();
  renderWishes(wishes);
  wishStatus.textContent = 'Ucapan berhasil ditambahkan.';
});

// ==========================================================================
// 4. Hitung mundur menuju event.eventDate, diperbarui tiap detik
// ==========================================================================
const targetDate = new Date(event.eventDate).getTime();

function updateCountdown() {
  const remaining = Math.max(0, targetDate - Date.now());
  const values = [
    Math.floor(remaining / 86400000),
    Math.floor(remaining / 3600000) % 24,
    Math.floor(remaining / 60000) % 60,
    Math.floor(remaining / 1000) % 60
  ];
  ['days', 'hours', 'minutes', 'seconds'].forEach((id, index) => {
    document.getElementById(id).textContent = String(values[index]).padStart(2, '0');
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ==========================================================================
// 5. Kontrol musik latar (tombol di section musik + tombol di bottom nav)
// ==========================================================================
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const navMusicBtn = document.getElementById('navMusicBtn');

function updateMusicControls() {
  const isPlaying = !music.paused;
  musicBtn.textContent = isPlaying ? 'Pause' : 'Play';
  navMusicBtn.classList.toggle('is-playing', isPlaying);
  navMusicBtn.setAttribute('aria-label', isPlaying ? 'Pause musik' : 'Lanjutkan musik');
}

async function toggleMusic() {
  if (music.paused) {
    try { await music.play(); } catch (error) { musicBtn.textContent = 'Play'; }
  } else {
    music.pause();
  }
  updateMusicControls();
}

musicBtn.addEventListener('click', toggleMusic);
navMusicBtn.addEventListener('click', toggleMusic);
music.addEventListener('play', updateMusicControls);
music.addEventListener('pause', updateMusicControls);
// Coba autoplay saat halaman dibuka; browser bisa memblokir ini sampai ada interaksi pengguna
music.play().then(updateMusicControls).catch(() => updateMusicControls());
