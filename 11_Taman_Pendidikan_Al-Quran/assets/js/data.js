/* =========================================================================
   data.js — PUSAT SEMUA DATA WEBSITE
   -------------------------------------------------------------------------
   File ini sengaja dipisah agar perubahan data (nama pengurus, pengajar,
   program, jadwal, kontak, foto) CUKUP DIEDIT DI SINI SAJA.
   Tidak perlu menyentuh file HTML / CSS / main.js.

   CARA MENAMBAH FOTO:
   1. Simpan file foto ke folder yang sesuai, contoh:
        assets/img/pengajar/ustadz-ahmad.jpg
   2. Tulis path-nya pada properti "foto" di bawah, contoh:
        foto: "assets/img/pengajar/ustadz-ahmad.jpg"
   3. Jika foto BELUM ADA, biarkan bernilai "" (string kosong).
      Website otomatis menampilkan placeholder (inisial nama / ikon),
      jadi tampilan tetap rapi tanpa gambar rusak.
   ========================================================================= */

/* -------------------------------------------------------------------------
   1. IDENTITAS LEMBAGA
   Dipakai di: navbar, hero, footer, judul halaman, dan kontak.
   ------------------------------------------------------------------------- */
const DATA_LEMBAGA = {
  namaPendek: "Raudhatul Ulum",
  namaPanjang: "Taman Pendidikan Al-Qur'an Raudhatul Ulum",

  // Judul besar di hero sengaja dipisah 2 baris agar rapi & tidak
  // terpotong di layar desktop. Baris 2 (nama khas) tampil lebih menonjol.
  judulBaris1: "Taman Pendidikan Al-Qur'an",
  judulBaris2: "Raudhatul Ulum",

  tagline: "Mencetak Generasi Qur'ani yang Berakhlak Mulia",
  deskripsiSingkat:
    "Taman Pendidikan Al-Qur'an untuk anak-anak yang memadukan metode tahsin, tahfidz, dan pembinaan akhlak dalam suasana belajar yang menyenangkan.",

  // Logo lembaga. Kosongkan ("") untuk memakai ikon bawaan.
  logo: "assets/img/icon/quran.png",

  // Foto besar pada bagian hero (bagian paling atas website).
  fotoHero: "", // contoh: "assets/img/hero/santri-mengaji.jpg"

  tahunBerdiri: 2005,

  // Data kontak — tampil di bagian Kontak & Footer.
  kontak: {
    alamat: "Jl. Komp. Arraudah VIII No.35, Landasan Ulin Bar., Kec. Liang Anggang, Kota Banjar Baru, Kalimantan Selatan 70723",
    telepon: "+62 853-1033-3373", // format tampil
    teleponWa: "6285310333373", // format internasional untuk link WhatsApp
    email: "info@tpqraudhatululum.sch.id",
    // Link Google Maps embed. Boleh diisi salah satu dari:
    //   - hanya URL-nya saja, contoh: "https://www.google.com/maps/embed?..."
    //   - ATAU seluruh kode <iframe> hasil salin-tempel dari Google Maps
    //     (klik "Bagikan" -> tab "Sematkan peta" -> salin kodenya).
    // main.js otomatis mengambil URL-nya saja dari kedua format di atas.
    // PENTING: dibungkus tanda backtick (`) bukan tanda kutip ("),
    // karena kode embed iframe di bawah ini sudah mengandung banyak
    // tanda kutip ganda (") di dalam atribut src/width/height, dsb.
    mapsEmbed:
      `<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d248.91825425679582!2d114.7236256731633!3d-3.4249664993156066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1789449309306!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`,
  },

  // Media sosial. Kosongkan ("") bila tidak dipakai — otomatis disembunyikan.
  sosialMedia: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
    tiktok: "",
  },
};

/* -------------------------------------------------------------------------
   2. STATISTIK / ANGKA SINGKAT
   Tampil sebagai kartu angka di bawah hero.
   "angka" boleh berupa bilangan; akan dianimasikan menghitung naik.
   ------------------------------------------------------------------------- */
const DATA_STATISTIK = [
  { angka: 250, satuan: "+", label: "Santri Aktif", ikon: "users" },
  { angka: 18, satuan: "", label: "Tenaga Pengajar", ikon: "teacher" },
  { angka: 20, satuan: "+", label: "Tahun Berkhidmat", ikon: "calendar" },
  { angka: 35, satuan: "+", label: "Hafidz/Hafidzah", ikon: "book" },
];

/* -------------------------------------------------------------------------
   3. TENTANG KAMI — Visi & Misi
   ------------------------------------------------------------------------- */
const DATA_TENTANG = {
  sejarah:
    "TPQ Raudhatul Ulum berdiri sejak tahun 2005 sebagai wujud kepedulian masyarakat terhadap pendidikan Al-Qur'an bagi anak-anak di lingkungan sekitar. Berawal dari satu kelas sederhana di serambi masjid, kini TPQ kami telah membina ratusan santri dengan kurikulum yang tersusun rapi dan tenaga pengajar bersanad.",

  visi:
    "Menjadi lembaga pendidikan Al-Qur'an terdepan yang melahirkan generasi Qur'ani, berakhlak mulia, dan bermanfaat bagi umat.",

  misi: [
    "Membimbing santri membaca Al-Qur'an dengan kaidah tajwid yang benar.",
    "Menanamkan kecintaan terhadap Al-Qur'an sejak usia dini.",
    "Membentuk akhlak mulia melalui keteladanan dan pembiasaan harian.",
    "Menyelenggarakan pembelajaran yang menyenangkan, aktif, dan kreatif.",
    "Menjalin kerja sama yang erat antara lembaga, orang tua, dan masyarakat.",
  ],

  // Keunggulan yang tampil sebagai kartu kecil.
  keunggulan: [
    {
      ikon: "book",
      judul: "Metode Ummi & Tilawati",
      teks: "Metode pembelajaran terstruktur dan teruji untuk semua tingkat usia.",
    },
    {
      ikon: "teacher",
      judul: "Pengajar Bersanad",
      teks: "Dibimbing ustadz/ustadzah berpengalaman dengan sanad yang jelas.",
    },
    {
      ikon: "heart",
      judul: "Pembinaan Akhlak",
      teks: "Adab dan akhlak menjadi bagian utama dari kurikulum harian.",
    },
    {
      ikon: "star",
      judul: "Kelas Kecil",
      teks: "Maksimal 12 santri per halaqah agar pendampingan lebih optimal.",
    },
  ],

  // Foto pendukung di bagian "Tentang". Kosongkan bila belum ada.
  foto: "", // contoh: "assets/img/tentang/kegiatan-belajar.jpg"
};

/* -------------------------------------------------------------------------
   4. PROGRAM PEMBELAJARAN
   Tambah/hapus program cukup dengan menambah/menghapus objek di array ini.
   ------------------------------------------------------------------------- */
const DATA_PROGRAM = [
  {
    ikon: "book",
    nama: "Iqro' & Pra-Tahsin",
    usia: "4 – 6 tahun",
    deskripsi:
      "Pengenalan huruf hijaiyah, makhraj dasar, hafalan surat pendek, dan doa harian melalui permainan edukatif.",
    materi: ["Huruf Hijaiyah", "Iqro' 1–6", "Doa Harian", "Surat Pendek"],
    foto: "", // contoh: "assets/img/program/iqro.jpg"
  },
  {
    ikon: "quran",
    nama: "Tahsin Al-Qur'an",
    usia: "7 – 12 tahun",
    deskripsi:
      "Perbaikan bacaan Al-Qur'an sesuai kaidah tajwid, dilengkapi praktik dan setoran bacaan rutin.",
    materi: ["Tajwid Praktis", "Makharijul Huruf", "Tadarus", "Ujian Tahsin"],
    foto: "",
  },
  {
    ikon: "star",
    nama: "Tahfidz Juz 30 & 29",
    usia: "8 – 15 tahun",
    deskripsi:
      "Program hafalan bertahap dengan target terukur, murojaah terjadwal, dan wisuda tahfidz tahunan.",
    materi: ["Setoran Harian", "Murojaah", "Tasmi'", "Wisuda Tahfidz"],
    foto: "",
  },
  {
    ikon: "heart",
    nama: "Adab & Akhlak",
    usia: "Semua usia",
    deskripsi:
      "Pembinaan karakter Islami: adab kepada orang tua, guru, teman, serta praktik ibadah harian.",
    materi: ["Aqidah Dasar", "Fiqih Ibadah", "Sirah Nabawiyah", "Praktik Sholat"],
    foto: "",
  },
];

/* -------------------------------------------------------------------------
   5. STRUKTUR PENGURUS
   Urutan di array = urutan tampil di website.
   ------------------------------------------------------------------------- */
const DATA_PENGURUS = [
  {
    nama: "Bapak Amrullah Haki",
    jabatan: "Ketua Pengurus Mushola Ar-Raudah",
    keterangan: "Pengurus Mushola Ar-Raudah VIII",
    foto: "", // contoh: "assets/img/pengurus/amrullah-haki.jpg"
  },
  {
    nama: "Ibu Wahdah",
    jabatan: "Ketua Taman Pendidikan Al-Qur'an",
    keterangan: "Raudhatul Ulum",
    foto: "",
  },
  {
    nama: "Ustad Muliadi",
    jabatan: "Pengurus Mushola Ar-Raudah VIII",
    keterangan: "Bidang Kurikulum",
    foto: "",
  },
  {
    nama: "Ustadzah Siti Aminah, S.Pd.",
    jabatan: "Sekretaris",
    keterangan: "Administrasi & Kesantrian",
    foto: "",
  },
  // {
  //   nama: "Nur Hidayah, A.Md.",
  //   jabatan: "Bendahara",
  //   keterangan: "Keuangan & Infaq",
  //   foto: "",
  // },
  // {
  //   nama: "Bapak Sholeh Mahmud",
  //   jabatan: "Koordinator Sarana",
  //   keterangan: "Sarana, Prasarana & Humas",
  //   foto: "",
  // },
];

/* -------------------------------------------------------------------------
   6. TENAGA PENGAJAR (Ustadz / Ustadzah)
   Properti "kelas" = kelas/halaqah yang diampu.
   ------------------------------------------------------------------------- */
const DATA_PENGAJAR = [
  {
    nama: "Ust. Ahmad Fauzi, S.Ag.",
    kelas: "Tahfidz Juz 30",
    keahlian: "Hafidz 30 Juz • Qiraah Sab'ah",
    pengalaman: "12 tahun mengajar",
    foto: "", // contoh: "assets/img/pengajar/ahmad-fauzi.jpg"
  },
  {
    nama: "Ust. Ridwan Hakim, Lc.",
    kelas: "Tahsin Lanjutan",
    keahlian: "Alumni LIPIA • Sanad Hafs",
    pengalaman: "9 tahun mengajar",
    foto: "",
  },
  {
    nama: "Ustadzah Khadijah, S.Pd.I",
    kelas: "Iqro' & Pra-Tahsin",
    keahlian: "Metode Ummi Bersertifikat",
    pengalaman: "10 tahun mengajar",
    foto: "",
  },
  {
    nama: "Ustadzah Maryam Salsabila",
    kelas: "Tahfidz Putri",
    keahlian: "Hafidzah 30 Juz",
    pengalaman: "7 tahun mengajar",
    foto: "",
  },
  {
    nama: "Ust. Zainal Abidin, S.Pd.",
    kelas: "Adab & Akhlak",
    keahlian: "Fiqih Ibadah • Sirah",
    pengalaman: "8 tahun mengajar",
    foto: "",
  },
  {
    nama: "Ustadzah Fatimah Az-Zahra",
    kelas: "Iqro' Kelas A",
    keahlian: "Metode Tilawati",
    pengalaman: "5 tahun mengajar",
    foto: "",
  },
  {
    nama: "Ust. Bilal Ramadhan",
    kelas: "Tahsin Dasar",
    keahlian: "Tajwid Praktis",
    pengalaman: "4 tahun mengajar",
    foto: "",
  },
  {
    nama: "Ustadzah Aisyah Rahmawati, S.Pd.",
    kelas: "Kelas Persiapan",
    keahlian: "PAUD Islami",
    pengalaman: "6 tahun mengajar",
    foto: "",
  },
];

/* -------------------------------------------------------------------------
   7. JADWAL KEGIATAN
   ------------------------------------------------------------------------- */
const DATA_JADWAL = [
  { hari: "Senin – Jumat", waktu: "17.00 – 18.00 WIB", kegiatan: "KBM Reguler (Iqro', Tahsin, Tahfidz)" },
  { hari: "Sabtu", waktu: "08.00 – 10.00 WIB", kegiatan: "Ekstra: Kaligrafi, Tahfidz Intensif" },
  { hari: "Ahad", waktu: "07.00 – 09.00 WIB", kegiatan: "Kegiatan Orang Tua & Santri (bulanan)" },
];

/* -------------------------------------------------------------------------
   8. GALERI FOTO
   Semua item di bawah akan tampil sebagai kartu galeri.
   Jika "foto" masih kosong, kartu tampil sebagai placeholder bertanda
   "Foto menyusul" — tinggal isi path-nya bila foto sudah tersedia.
   ------------------------------------------------------------------------- */
const DATA_GALERI = [
  { judul: "Kegiatan Belajar Mengajar", kategori: "Kegiatan", foto: "" }, // contoh: "assets/img/galeri/kbm-01.jpg"
  { judul: "Wisuda Tahfidz Juz 30", kategori: "Acara", foto: "" },
  { judul: "Lomba Tartil Antar Santri", kategori: "Lomba", foto: "" },
  { judul: "Peringatan Maulid Nabi", kategori: "Acara", foto: "" },
  { judul: "Praktik Sholat Berjamaah", kategori: "Kegiatan", foto: "" },
  { judul: "Outing Class Santri", kategori: "Kegiatan", foto: "" },
  { judul: "Pembagian Rapor Santri", kategori: "Acara", foto: "" },
  { judul: "Santunan Anak Yatim", kategori: "Sosial", foto: "" },
];

/* -------------------------------------------------------------------------
   9. TESTIMONI WALI SANTRI
   ------------------------------------------------------------------------- */
const DATA_TESTIMONI = [
  {
    nama: "Ibu Latifah",
    peran: "Wali Santri Kelas Tahsin",
    pesan:
      "Anak saya jadi semangat mengaji setiap sore. Ustadzahnya sabar dan komunikatif dengan orang tua.",
    foto: "",
  },
  {
    nama: "Bapak Sugeng Riyadi",
    peran: "Wali Santri Tahfidz",
    pesan:
      "Program tahfidznya terarah, ada laporan hafalan rutin sehingga kami bisa ikut memantau di rumah.",
    foto: "",
  },
  {
    nama: "Ibu Rohmah",
    peran: "Wali Santri Iqro'",
    pesan:
      "Suasana belajarnya menyenangkan. Alhamdulillah anak saya sudah lancar huruf hijaiyah dalam 3 bulan.",
    foto: "",
  },
];

/* -------------------------------------------------------------------------
   10. INFORMASI PENDAFTARAN
   ------------------------------------------------------------------------- */
const DATA_PENDAFTARAN = {
  status: "Pendaftaran Santri Baru Dibuka",
  periode: "Gelombang 1 — Juni s.d. Agustus",
  syarat: [
    "Usia minimal 4 tahun",
    "Fotokopi akta kelahiran / kartu keluarga",
    "Pas foto 3x4 sebanyak 2 lembar",
    "Mengisi formulir pendaftaran",
  ],
  biaya: [
    { item: "Pendaftaran (sekali bayar)", nominal: "Rp 100.000" },
    { item: "Infaq bulanan", nominal: "Rp 50.000" },
    { item: "Buku & perlengkapan", nominal: "Menyesuaikan" },
  ],
  catatan:
    "Keluarga kurang mampu dapat mengajukan keringanan biaya. Silakan hubungi pengurus.",
};
