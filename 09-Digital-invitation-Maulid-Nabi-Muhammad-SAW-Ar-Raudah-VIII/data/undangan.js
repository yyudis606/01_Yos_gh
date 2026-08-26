// ============================================================
// DATA UNDANGAN
// Semua isi undangan diatur dari sini. Cari komentar sesuai
// yang ingin diubah (TEKS, FOTO, TANGGAL, WAKTU, TEMPAT, MUSIK).
// Warna tampilan (tema hijau/emas) diatur terpisah di
// scss/abstracts/_variables.scss, lihat komentar di file itu.
// ============================================================
window.MAULID_DATA = {

  // --- TEKS: nama & tema acara (tampil di halaman pembuka/hero) ---
  eventName: 'Maulid Nabi Muhammad SAW',     // judul utama acara
  theme: 'Meneladani akhlak Rasulullah SAW', // sub-judul/tema acara
  photoLabel: ' ',                           // label kecil di atas foto hero, kosongkan spasi jika tidak perlu

  // --- TANGGAL: ubah ketiga nilai ini bersamaan agar konsisten ---
  dateDetail: 'Kamis, 10 September 2026',    // teks tanggal Masehi, format bebas: 'Hari, DD Bulan YYYY'
  eventDate: '2026-09-10',                   // format ISO 'YYYY-MM-DD', dipakai countdown, wajib akurat
  date: '28 Rabiul Awal 1448 Hijriah',        // teks tanggal Hijriah, tampil di bawah tanggal Masehi

  // --- WAKTU: ubah kedua nilai ini bersamaan agar konsisten ---
  time: '19.30 WIT - selesai',                // teks jam acara yang tampil ke tamu, boleh pakai zona waktu
  eventTime: '19:30',                         // format 24 jam 'HH:MM', dipakai countdown, wajib akurat

  // --- TEMPAT: lokasi dan peta acara ---
  venue: 'Musholla Ar-Raudah VIII',           // nama tempat acara
  address: 'Jalan Sukamaju Perumahan Ar-Raudah VIII, RT. 04/RW. 01, Landasan Ulin Utara, Banjarbaru, Kalimantan Selatan',
  mapsUrl: 'https://maps.app.goo.gl/xZQRi7TwLLvm2gCK8', // link "Buka Peta", ambil dari tombol Bagikan di Google Maps
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.9182271599478!2d114.72343533200576!3d-3.425070713455525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2de683004eead4fb%3A0x747e80a949d1abe5!2sMusholla%20Ar-Raudah!5e0!3m2!1sid!2sid!4v1787376237290!5m2!1sid!2sid', // link peta kecil, ambil dari menu Bagikan > Sematkan peta

  // --- TEKS: detail tamu/acara ---
  speaker: 'Ustaz / Ustazah',                 // nama penceramah
  dressCode: 'Busana muslim',                 // ketentuan busana

  // --- FOTO: file gambar diletakkan di folder images/ ---
  heroImage: 'images/image-maulid.png',       // foto utama halaman hero

  // --- MUSIK: file audio diletakkan di folder music/ ---
  musicFile: 'music/Maher_Zain_-_Ya_Nabi_Salam_Alayka_Arabic_Version.mp3', // file musik latar
  musicTitle: 'Lantunan religi',               // judul musik yang tampil di player
  musicArtist: 'Musik pembuka acara'           // keterangan musik yang tampil di player
};
