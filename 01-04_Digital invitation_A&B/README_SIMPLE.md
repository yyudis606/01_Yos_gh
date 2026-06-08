# 🎭 Undangan Digital Batman & Batgirl - Versi Cepat

Undangan digital super mudah! Cukup input 1 nama dan musik langsung otomatis menyala! 🎵✨

## ⚡ Fitur Utama

✅ **Input Nama Cepat** - Hanya perlu masukkan nama tamu sekali  
✅ **Musik Auto Play** - Lagu otomatis menyala saat halaman dibuka  
✅ **WhatsApp Share** - Bagikan undangan langsung ke WhatsApp dalam 1 klik  
✅ **Link Shareable** - Copy & bagikan link undangan ke siapa saja  
✅ **Konfirmasi Kehadiran** - Tamu bisa confirm hadir/ragu/tidak hadir  
✅ **Statistik Real-time** - Lihat jumlah yang sudah confirm  
✅ **Desain Modern** - Tema dark dengan gradien elegan  
✅ **Galeri Foto** - Tampilkan foto Batman & Batgirl  
✅ **Countdown Timer** - Hitung mundur hingga acara  
✅ **Maps Link** - Link langsung ke Google Maps  
✅ **Responsive** - Sempurna di mobile, tablet, desktop  

## 🚀 Cara Pakai (Super Mudah!)

### 1. Buka File
Buka file **`invitation.html`** di browser (Chrome, Firefox, Safari, Edge)

### 2. Masukkan Nama
Ketik nama tamu Anda di form "Masukkan Nama Anda"

### 3. Klik Perbarui
Tekan tombol "Perbarui" - nama langsung muncul di undangan

### 4. Bagikan ke WhatsApp
Klik tombol **"Bagikan ke WhatsApp"** dan pilih kontak/grup

## 🎵 Musik Auto-Play

**Cara kerjanya:**
- Musik otomatis menyala saat halaman dibuka
- Jika browser block autoplay, klik halaman satu kali untuk aktifkan musik
- Musik loop terus menerus
- Bisa dikontrol dengan tombol play/pause

**Lagu yang digunakan:**
- Andra Backbone - Sempurna (love song yang menyentuh)

## 📱 Fitur WhatsApp

Tekan "Bagikan ke WhatsApp" untuk membagikan:
- Nama tamu sudah otomatis disertakan
- Nama calon pengantin: Batman & Batgirl
- Tanggal & jam acara
- Link ke undangan digital

## 🌟 Form Input (Sangat Sederhana)

```
Nama Tamu: [__________________]  ← Hanya ini yang perlu diisi!
```

Klik: [Perbarui] [Reset]

## 📲 Sharing Methods

### Via WhatsApp
1. Klik "Bagikan ke WhatsApp"
2. Pilih kontak atau grup
3. Kirim! ✓

### Via Link Shareable
1. Cari section "Bagikan Link Undangan"
2. Klik tombol "Salin" untuk copy link
3. Bagikan ke:
   - WhatsApp group
   - Email
   - Facebook
   - Instagram
   - SMS

### Via Lainnya
- Screenshot halaman
- Email langsung file HTML

## 📋 Fitur Konfirmasi Kehadiran

**Setiap tamu bisa confirm kehadiran mereka:**

Pilih salah satu:
- ✅ **Hadir** - Tamu akan hadir
- 🤔 **Ragu** - Tamu belum yakin
- ❌ **Tidak Hadir** - Tamu tidak akan hadir

**Statistik Real-time:**
- Jumlah yang akan hadir
- Jumlah yang ragu
- Jumlah yang tidak hadir

Data tersimpan otomatis di device masing-masing tamu (localStorage).

## 🎨 Elemen Halaman

1. **Header** - Judul "Kami Mengundang Anda" dengan nama pasangan
2. **Input Form** - Kolom nama tamu (1 field saja)
3. **Intro Text** - Salam untuk tamu dengan nama yang sudah di-input
4. **Couple Display** - Foto Batman & Batgirl
5. **Countdown** - Hitung mundur hingga acara
6. **Lokasi** - Nama dan alamat tempat acara + Maps link
7. **Music Player** - Player musik dengan kontrol play/pause
8. **Gallery** - Galeri foto couple dengan fullscreen viewer
9. **Konfirmasi Kehadiran** - Tombol untuk confirm hadir/ragu/tidak hadir + statistik
10. **Link Shareable** - Copy link untuk dibagikan ke tamu lainnya
11. **Buttons** - WhatsApp Share dan Download
12. **Footer** - Credits & social media links

## 🔧 Customization (Optional)

Buka file dengan text editor untuk edit:

### Ganti Musik
Cari bagian ini:
```html
<source src="music/Andra_BackBone_-_sempurna_(mp3.pm).mp3" type="audio/mpeg">
```
Ubah path ke file musik Anda

### Ganti Foto
Ganti path di bagian "Couple Display":
```html
<img src="image/your-new-image.jpg" alt="Batgirl">
```

### Ubah Warna Tema
Cari `:root` di bagian CSS dan edit variable:
```css
--accent: #e94560;      /* Ganti warna accent */
--gold: #d4af37;        /* Ganti warna gold */
```

### Ubah Tanggal & Lokasi
Cari bagian countdown dan location di HTML dan edit langsung

## 📋 File Structure

```
01-04_Digital invitation_A&B/
├── invitation.html          ← BUKA INI! (File utama)
├── README_SIMPLE.md         ← Panduan ini
├── image/
│   ├── batgirl-design-fan-art-v0-yp53l9zpnfda1.jpeg
│   └── San_Diego_Comic-Con_2024_Masquerade_-_Cosplay_of_Batman_3.jpeg
├── music/
│   └── Andra_BackBone_-_sempurna_(mp3.pm).mp3
└── [folder lainnya]
```

## ⚠️ Troubleshooting

### Musik tidak menyala
**Solusi:**
1. Klik halaman satu kali
2. Atau klik play button di music player
3. Cek speaker/volume device

### Nama tidak berubah
**Solusi:**
1. Pastikan sudah ketik nama di form
2. Klik tombol "Perbarui"
3. Refresh halaman (F5)

### Foto tidak muncul
**Solusi:**
1. Pastikan file foto ada di folder `image/`
2. Refresh halaman
3. Cek internet connection

### Maps tidak buka
**Solusi:**
1. Pastikan koneksi internet aktif
2. Coba buka di browser lain

## ✅ Pre-Share Checklist

Sebelum bagikan:
- [ ] Nama tamu sudah diisi
- [ ] Musik otomatis menyala ✓
- [ ] Foto muncul dengan baik
- [ ] Maps link bisa dibuka
- [ ] WhatsApp button berfungsi
- [ ] Link shareable sudah dicopy
- [ ] Konfirmasi kehadiran berfungsi

## 💡 Pro Tips

1. **Save As Template** - Save file dengan nama baru untuk setiap tamu
2. **Auto Loop** - Musik akan terus menyala (loop)
3. **No Internet Needed** - Semua berfungsi offline (kecuali Maps & WhatsApp)
4. **Mobile Friendly** - Buka di mobile untuk pengalaman terbaik

## 🎉 Siap Pakai!

Undangan sudah 100% siap digunakan. Tidak perlu setup rumit, upload server, atau hal teknis lainnya.

Cukup:
1. Buka file
2. Ketik nama
3. Bagikan ke WhatsApp
4. Done! 🎊

---

**Dibuat dengan ❤️ untuk undangan yang simple & efektif**
