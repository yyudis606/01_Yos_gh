// Sumber data tunggal untuk undangan (dibaca oleh script.js).
// Ubah nilai di sini saja untuk memperbarui isi undangan, tidak perlu edit invitation.html/script.js.
window.INVITATION_DATA = {
  // Nama mempelai wanita & pria, tampil di judul dan tag <title>
  bride: 'Batgirl',
  groom: 'Batman',

  // Tanggal & jam acara dalam format tampilan (teks bebas, bukan untuk perhitungan countdown)
  date: '15 Juni 2027',
  day: 'Selasa',
  time: '19.00 WIB',
  endTime: '22.00 WIB',

  // Nama tempat dan alamat lengkap acara
  venue: 'Gedung Serbaguna',
  address: 'Jalan Utama No. 123',

  // Tautan Google Maps: mapsUrl untuk tombol "Lihat lokasi", mapEmbedUrl untuk peta kecil (iframe)
  mapsUrl: 'https://www.google.com/maps?q=Gedung+Serbaguna+Jalan+Utama+123',
  mapEmbedUrl: 'https://www.google.com/maps?q=Gedung+Serbaguna+Jalan+Utama+123&output=embed',

  // Gambar/tautan QRIS yang dibuka saat tombol "Buka QRIS" diklik. Kosongkan untuk menonaktifkan tombol.
  qrisUrl: 'image/Qris.jpeg',

  // Judul, artis, dan file musik latar undangan
  musicTitle: 'Sempurna',
  musicArtist: 'Andra & The Backbone',
  musicFile: 'music/wedding-song.mp3',

  // Tanggal target countdown, format ISO 8601 lengkap dengan zona waktu
  eventDate: '2027-06-15T19:00:00+07:00',

  // URL API opsional untuk menyimpan/mengambil ucapan tamu secara online.
  // Kosongkan ('') agar ucapan hanya disimpan di localStorage perangkat tamu.
  commentsApiUrl: ''
};
