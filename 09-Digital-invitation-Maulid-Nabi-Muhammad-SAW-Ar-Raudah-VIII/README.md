# Undangan Digital Maulid Nabi

## Styling dengan Sass

Kode styling ditulis dalam Sass di folder `scss/` (variabel, mixin breakpoint, dan partial per komponen), lalu dikompilasi menjadi `style.css` dan `visibility.css`. Jangan mengedit `style.css`/`visibility.css` secara langsung karena akan tertimpa saat build ulang.

1. `npm install` (sekali saja, untuk memasang paket `sass`).
2. `npm run sass:build` untuk mengompilasi sekali, atau `npm run sass:watch` untuk mengompilasi otomatis saat file `.scss` diubah.

## Mengubah data acara

Semua data utama ada di `data/undangan.js`. Cukup ubah nilai berikut:

- `eventName`, `theme`: nama dan tema acara
- `photoLabel`: tulisan kecil di atas foto utama, misalnya `Foto acara`
- `date`, `dateDetail`, `time`: tanggal Hijriah, tanggal Masehi, dan waktu
- `venue`, `address`: nama dan alamat tempat
- `mapsUrl`, `mapEmbedUrl`: link Google Maps dan peta kecil
- `speaker`: nama penceramah
- `dressCode`: ketentuan busana
- `heroImage`: nama file foto di folder `image/`
- `musicFile`: nama file musik di folder `music/`
- `musicTitle`, `musicArtist`: judul dan keterangan musik

## Menambahkan foto dan musik

1. Masukkan foto ke folder `images/`, lalu sesuaikan `heroImage`.
2. Masukkan musik ke folder `music/`, lalu sesuaikan `musicFile`.
3. Buka `index.html` di browser.

Nama file sebaiknya sederhana, tanpa spasi, contohnya `foto-maulid.jpg` dan `musik-maulid.mp3`.
