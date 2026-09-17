# Website TPQ Raudhatul Ulum

Website profil **Taman Pendidikan Al-Qur'an Raudhatul Ulum** — dibangun dengan HTML, SASS/CSS, dan JavaScript murni (tanpa framework). Seluruh kode diberi komentar berbahasa Indonesia agar mudah dirawat.

---

## 1. Struktur Folder

```
.
├── index.html                  # Kerangka halaman (semua section)
├── package.json                # Skrip compile SASS
└── assets/
    ├── css/
    │   └── main.css            # HASIL COMPILE SASS — jangan diedit manual
    ├── js/
    │   ├── data.js             # ★ SEMUA DATA WEBSITE ADA DI SINI
    │   └── main.js             # Logika render & interaksi
    ├── img/                    # Tempat menyimpan semua foto
    │   ├── hero/               # Foto besar bagian atas
    │   ├── pengurus/           # Foto pengurus
    │   ├── pengajar/           # Foto ustadz/ustadzah
    │   └── galeri/             # Foto kegiatan
    └── scss/
        ├── main.scss           # File induk (daftar @use)
        ├── base/
        │   ├── _variables.scss # ★ Warna, font, jarak, radius
        │   ├── _mixins.scss    # Potongan gaya yang dipakai ulang
        │   └── _base.scss      # Reset & gaya elemen dasar
        ├── layout/
        │   ├── _layout.scss    # Container, section, judul
        │   ├── _header.scss    # Navigasi atas + menu mobile
        │   └── _footer.scss    # Footer
        └── components/
            ├── _buttons.scss   _photo.scss      _hero.scss
            _statistik.scss     _tentang.scss    _program.scss
            _orang.scss         _jadwal.scss     _galeri.scss
            _testimoni.scss     _daftar.scss     _kontak.scss
```

---

## 2. Menjalankan Website

Cukup buka `index.html` di browser. Namun agar semua fitur berjalan normal, disarankan memakai server lokal:

```bash
# Opsi 1 — pnpm (compile SASS lalu jalankan server)
pnpm install
pnpm dev

# Opsi 2 — Python
python3 -m http.server 5173
```

Lalu buka `http://localhost:5173`.

---

## 3. Mengubah Isi Website (Data)

**Semua teks dan data ada di satu file: [`assets/js/data.js`](assets/js/data.js).**
Tidak perlu menyentuh HTML/CSS/JS lain.

| Yang ingin diubah              | Variabel di `data.js`  |
| ------------------------------ | ---------------------- |
| Nama lembaga, alamat, WA, email| `DATA_LEMBAGA`         |
| Angka statistik                | `DATA_STATISTIK`       |
| Sejarah, visi, misi, keunggulan| `DATA_TENTANG`         |
| Program pembelajaran           | `DATA_PROGRAM`         |
| **Struktur pengurus**          | `DATA_PENGURUS`        |
| **Daftar pengajar**            | `DATA_PENGAJAR`        |
| Jadwal kegiatan                | `DATA_JADWAL`          |
| Galeri foto                    | `DATA_GALERI`          |
| Testimoni wali santri          | `DATA_TESTIMONI`       |
| Syarat & biaya pendaftaran     | `DATA_PENDAFTARAN`     |

Contoh menambah pengajar baru — cukup tambahkan satu objek:

```js
const DATA_PENGAJAR = [
  // ...data lama...
  {
    nama: "Ust. Hamzah Abdullah",
    kelas: "Tahfidz Juz 29",
    keahlian: "Hafidz 30 Juz",
    pengalaman: "3 tahun mengajar",
    foto: "assets/img/pengajar/hamzah.jpg", // kosongkan "" bila belum ada
  },
];
```

Kartu baru langsung muncul di website tanpa mengubah HTML.

---

## 4. Menambahkan Foto

Semua tempat foto **sudah disiapkan**. Selama `foto: ""` masih kosong, website menampilkan placeholder rapi (inisial nama untuk orang, ikon kamera untuk galeri) — jadi tata letak tidak berantakan.

Langkah menambah foto:

1. Simpan file foto ke folder yang sesuai, misalnya `assets/img/pengajar/ahmad-fauzi.jpg`
2. Buka `assets/js/data.js`, isi properti `foto` dengan path-nya:

   ```js
   foto: "assets/img/pengajar/ahmad-fauzi.jpg",
   ```

3. Simpan, lalu muat ulang browser. Selesai.

Bila path salah atau file belum diunggah, gambar otomatis diganti placeholder (tidak akan tampil ikon "gambar rusak").

**Rekomendasi ukuran foto**

| Lokasi           | Rasio  | Ukuran disarankan |
| ---------------- | ------ | ----------------- |
| Hero             | 4:3    | 1200 × 900 px     |
| Tentang          | 1:1    | 800 × 800 px      |
| Program          | 16:9   | 800 × 450 px      |
| Pengurus/Pengajar| 1:1    | 500 × 500 px      |
| Galeri           | 4:3    | 1000 × 750 px     |

Gunakan format `.jpg` (foto) atau `.webp` agar ringan; usahakan < 300 KB per file.

---

## 5. Mengubah Tampilan (SASS)

Warna, font, jarak, dan radius diatur terpusat di
[`assets/scss/base/_variables.scss`](assets/scss/base/_variables.scss).
Contoh mengganti warna utama:

```scss
$hijau-700: #0f7b6c; // ganti kode warna ini
```

Setelah mengedit file `.scss`, **wajib compile ulang**:

```bash
npm install          # sekali saja, memasang sass
npm run sass         # compile satu kali
npm run sass:watch   # compile otomatis saat file disimpan (untuk pengembangan)
npm run sass:build   # versi minified untuk publikasi
```

> Catatan: `assets/css/main.css` adalah hasil compile — jangan diedit langsung karena akan tertimpa.

---

## 6. Fitur

- Desain modern responsif (desktop, tablet, ponsel)
- Navigasi lengket dengan penanda menu aktif otomatis
- Animasi muncul saat digulir + animasi hitung angka statistik
- Slot foto siap pakai dengan placeholder otomatis
- Galeri dengan filter kategori dan pratinjau ukuran besar (lightbox)
- Formulir pendaftaran yang langsung dikirim ke WhatsApp pengurus
- Tombol WhatsApp mengambang & tombol kembali ke atas
- Aksesibilitas: skip link, fokus keyboard, dukungan `prefers-reduced-motion`

---

## 7. Sebelum Dipublikasikan

- [ ] Ganti data di `DATA_LEMBAGA` (alamat, nomor WA, email, media sosial)
- [ ] Ganti `mapsEmbed` dengan link embed Google Maps lokasi asli
- [ ] Perbarui daftar `DATA_PENGURUS` dan `DATA_PENGAJAR`
- [ ] Unggah foto dan isi properti `foto`
- [ ] Jalankan `npm run sass:build` untuk CSS versi ringan
