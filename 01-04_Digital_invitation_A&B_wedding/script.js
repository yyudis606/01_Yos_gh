const event = window.INVITATION_DATA;
const guest = new URLSearchParams(location.search).get('guest') || localStorage.getItem('invitationGuest') || 'Tamu Istimewa';
const guestName = decodeURIComponent(guest);
localStorage.setItem('invitationGuest', guestName);
document.getElementById('guestName').textContent = guestName;
document.getElementById('groomName').textContent = event.groom;
document.getElementById('brideName').textContent = event.bride;
document.getElementById('eventDay').textContent = event.day;
document.getElementById('eventDate').textContent = event.date;
document.getElementById('eventTime').textContent = event.time;
document.getElementById('infoDay').textContent = event.day;
document.getElementById('infoDate').textContent = event.date;
document.getElementById('infoTime').textContent = event.time;
document.getElementById('venueName').textContent = event.venue;
document.getElementById('venueAddress').textContent = event.address;
document.getElementById('mapsLink').href = event.mapsUrl;
document.getElementById('musicTitle').textContent = event.musicTitle;
document.getElementById('musicArtist').textContent = event.musicArtist;
const configuredMusic = document.querySelector('#bgMusic source');
configuredMusic.src = event.musicFile;
document.getElementById('bgMusic').load();

const attendanceKey = 'undanganAttendance';
const getAttendance = () => JSON.parse(localStorage.getItem(attendanceKey) || '{}');
const saveAttendance = data => localStorage.setItem(attendanceKey, JSON.stringify(data));
const statuses = { btnAttending: 'hadir', btnMaybe: 'ragu', btnNot: 'tidak' };
function updateStats() {
  const data = Object.values(getAttendance());
  document.getElementById('attendingCount').textContent = data.filter(value => value === 'hadir').length;
  document.getElementById('maybeCount').textContent = data.filter(value => value === 'ragu').length;
  document.getElementById('notCount').textContent = data.filter(value => value === 'tidak').length;
  document.querySelectorAll('.attendance-btn').forEach(button => button.classList.toggle('active', getAttendance()[guestName] === statuses[button.id]));
}
Object.keys(statuses).forEach(id => document.getElementById(id).addEventListener('click', () => { const data = getAttendance(); data[guestName] = statuses[id]; saveAttendance(data); updateStats(); }));
updateStats();

const targetDate = new Date(event.eventDate).getTime();
function updateCountdown() { const remaining = Math.max(0, targetDate - Date.now()); const values = [Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24, Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60]; ['days','hours','minutes','seconds'].forEach((id, index) => { document.getElementById(id).textContent = String(values[index]).padStart(2, '0'); }); }
updateCountdown(); setInterval(updateCountdown, 1000);

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
    try { await music.play(); } catch (error) { document.getElementById('copyStatus').textContent = 'Musik belum dapat diputar.'; }
  } else {
    music.pause();
  }
  updateMusicControls();
}
musicBtn.addEventListener('click', toggleMusic);
navMusicBtn.addEventListener('click', toggleMusic);
music.addEventListener('play', updateMusicControls);
music.addEventListener('pause', updateMusicControls);
const shareLink = `${location.origin}${location.pathname.replace('invitation.html', 'index.html')}?guest=${encodeURIComponent(guestName)}`;
document.getElementById('shareLink').value = shareLink;
document.getElementById('copyBtn').addEventListener('click', async () => { await navigator.clipboard.writeText(shareLink); document.getElementById('copyStatus').textContent = 'Link berhasil disalin.'; });
document.getElementById('whatsappBtn').addEventListener('click', () => { const text = `Undangan untuk ${guestName}: ${shareLink}`; window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener'); });
