# Folder Foto

Simpan semua foto website di folder ini, dikelompokkan sesuai kegunaannya:

| Folder      | Untuk foto                          | Rasio | Ukuran disarankan |
| ----------- | ----------------------------------- | ----- | ----------------- |
| `hero/`     | Foto besar di bagian paling atas    | 4:3   | 1200 × 900 px     |
| `pengurus/` | Foto pengurus TPQ                   | 1:1   | 500 × 500 px      |
| `pengajar/` | Foto ustadz / ustadzah              | 1:1   | 500 × 500 px      |
| `galeri/`   | Foto dokumentasi kegiatan           | 4:3   | 1000 × 750 px     |

## Cara memakai foto

1. Salin file foto ke folder yang sesuai, contoh:
   `assets/img/pengajar/ahmad-fauzi.jpg`
2. Buka `assets/js/data.js`, cari data orang/item yang dimaksud.
3. Isi properti `foto` dengan path-nya:

   ```js
   foto: "assets/img/pengajar/ahmad-fauzi.jpg",
   ```

4. Simpan dan muat ulang browser.

## Catatan

- Selama properti `foto` masih `""` (kosong), website menampilkan **placeholder otomatis**
  sehingga tampilan tetap rapi.
- Bila path salah atau file belum ada, gambar juga otomatis diganti placeholder.
- Gunakan nama file huruf kecil tanpa spasi, contoh: `wisuda-tahfidz-2025.jpg`.
- Usahakan ukuran file di bawah 300 KB agar website tetap cepat.
