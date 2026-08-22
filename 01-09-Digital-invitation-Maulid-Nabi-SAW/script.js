const data = window.MAULID_DATA;
const textFields = { eventName: data.eventName, theme: data.theme, photoLabel: data.photoLabel, dateDetail: data.dateDetail, time: data.time, venue: data.venue, address: data.address, speaker: data.speaker, dressCode: data.dressCode };
Object.entries(textFields).forEach(([id, value]) => { document.getElementById(id).textContent = value; });
document.getElementById('mapsLink').href = data.mapsUrl;
document.getElementById('mapFrame').src = data.mapEmbedUrl || `${data.mapsUrl}&output=embed`;

const heroImage = document.getElementById('heroImage');
const image = new Image();
image.onload = () => { heroImage.style.backgroundImage = `url("${data.heroImage}")`; heroImage.classList.add('has-image'); };
image.onerror = () => { heroImage.classList.add('image-placeholder'); };
image.src = data.heroImage;

const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
music.src = data.musicFile;
music.load();
musicToggle.addEventListener('click', async () => {
  if (music.paused) { try { await music.play(); } catch (error) { musicToggle.setAttribute('aria-label', 'Musik belum tersedia'); } }
  else { music.pause(); }
  updateMusicState();
});
function updateMusicState() { const playing = !music.paused; musicToggle.classList.toggle('is-playing', playing); musicToggle.setAttribute('aria-label', playing ? `Matikan ${data.musicTitle}` : `Putar ${data.musicTitle}`); }
music.addEventListener('play', updateMusicState);
music.addEventListener('pause', updateMusicState);
function startMusic() {
  music.play().then(updateMusicState).catch(updateMusicState);
}
startMusic();
document.addEventListener('pointerdown', startMusic, { once: true });
updateMusicState();
