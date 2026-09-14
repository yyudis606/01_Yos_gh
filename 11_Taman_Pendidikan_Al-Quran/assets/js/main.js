/* =========================================================================
   main.js — LOGIKA TAMPILAN & INTERAKSI
   -------------------------------------------------------------------------
   File ini MENGAMBIL data dari assets/js/data.js lalu menampilkannya
   ke dalam HTML. Untuk mengubah ISI website, edit data.js — bukan file ini.

   Isi file (urut):
     A. Kumpulan ikon SVG
     B. Fungsi bantu (helper), termasuk pembuat "slot foto"
     C. Fungsi render tiap bagian website
     D. Interaksi (menu mobile, scroll, filter galeri, lightbox, form)
     E. Inisialisasi
   ========================================================================= */

/* =========================================================================
   A. KUMPULAN IKON SVG
   Dipakai lewat atribut data-icon="nama" pada HTML, atau properti
   "ikon" pada data.js. Tambah ikon baru cukup tambahkan entri di sini.
   ========================================================================= */
const IKON = {
  // Ikon Al-Qur'an: buku terbuka (mushaf) + bulan sabit kecil di kanan atas.
  quran: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.2c-1.3-1.1-3.4-1.7-5.6-1.7-1 0-2 .1-2.9.4v13.6c.9-.3 1.9-.4 2.9-.4 2.2 0 4.3.6 5.6 1.7"/><path d="M12 6.2c1.3-1.1 3.4-1.7 5.6-1.7 1 0 2 .1 2.9.4v13.6c-.9-.3-1.9-.4-2.9-.4-2.2 0-4.3.6-5.6 1.7z"/><path d="M12 6.2v13.6"/><path d="M9.2 9.4h2.6M9.2 12h2.6M12.2 9.4h2.6M12.2 12h2.6" stroke-width="1.3"/><path d="M17.6 2.6a2 2 0 1 0 1.8 3.2 2.3 2.3 0 1 1-1.8-3.2z" fill="currentColor" stroke="none"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H2z"/><path d="M22 4h-6a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H22z"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11"/></svg>`,
  teacher: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.8-5.4 2.8 1-6L3.2 9.4l6.1-.9z"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21.4l8.8-8.7a5 5 0 0 0 0-7.1z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m20 6-11 11-5-5"/></svg>`,
  wallet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h12v4"/><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M17 13h2"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.5-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.8.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.5-.3z"/><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V5.5h-2.6C11.9 5.5 11 7 11 9v2H8.5v3.5H11V22h3.5v-7.5H17L17.5 11H14z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3.2-.4-4.7a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.5A2.6 2.6 0 0 0 2.4 7.3C2 8.8 2 12 2 12s0 3.2.4 4.7a2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.5a2.6 2.6 0 0 0 1.8-1.8C22 15.2 22 12 22 12zM10 15V9l5.2 3z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.3 2.2 1.6 3.6 3.8 3.8V10c-1.4.1-2.7-.3-3.8-1v6.3A5.7 5.7 0 1 1 10.3 9.6v3a2.7 2.7 0 1 0 2.7 2.7V3z"/></svg>`,
  "arrow-up": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5m-7 7 7-7 7 7"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h3l2-2.5h8L18 8h3v12H3z"/><circle cx="12" cy="13.5" r="3.5"/></svg>`,
  quote: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h4v4a5 5 0 0 1-5 5V14a2 2 0 0 0 2-2H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm10 0h4v4a5 5 0 0 1-5 5V14a2 2 0 0 0 2-2h-2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/></svg>`,
};

/* Ambil ikon berdasarkan nama; jika tidak ada, pakai ikon "star". */
function ikon(nama) {
  return IKON[nama] || IKON.star;
}

/* =========================================================================
   B. FUNGSI BANTU (HELPER)
   ========================================================================= */

/* Pemilih elemen singkat */
const $ = (sel, induk = document) => induk.querySelector(sel);
const $$ = (sel, induk = document) => [...induk.querySelectorAll(sel)];

/* Ubah teks bebas menjadi aman untuk disisipkan ke HTML (cegah XSS). */
function aman(teks) {
  return String(teks ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* Ambil inisial nama, contoh: "Ust. Ahmad Fauzi" -> "AF"
   Dipakai sebagai isi placeholder foto orang. */
function inisial(nama) {
  const kata = String(nama)
    .replace(/(Ust\.|Ustadz|Ustadzah|Ustadzh|H\.|KH\.|Hj\.|Bapak|Ibu|S\.Pd\.?I?|S\.Ag\.?|S\.E\.?|Lc\.?|A\.Md\.?)/gi, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return ((kata[0]?.[0] || "") + (kata[1]?.[0] || "")).toUpperCase() || "?";
}

/**
 * slotFoto() — INTI DARI "SIAPKAN TEMPAT FOTO".
 * Membuat markup tempat foto yang:
 *   - menampilkan <img> bila path foto sudah diisi di data.js
 *   - menampilkan placeholder rapi bila foto masih kosong
 *   - otomatis berubah jadi placeholder bila file foto tidak ditemukan (onerror)
 *
 * @param {string} src   Path foto dari data.js (boleh kosong)
 * @param {string} alt   Teks alternatif gambar
 * @param {object} opsi  { teks: tulisan placeholder, ikonNama: ikon placeholder }
 */
function slotFoto(src, alt, opsi = {}) {
  const teks = opsi.teks ?? "Foto menyusul";
  const namaIkon = opsi.ikonNama ?? "camera";
  const teksInisial = opsi.teksInisial ?? "";

  if (!src) return placeholderFoto(teksInisial, namaIkon, teks);

  // Atribut data-ph-* dipakai bila gambar gagal dimuat (lihat initFotoFallback).
  return `
    <img class="photo__img" src="${aman(src)}" alt="${aman(alt)}" loading="lazy"
         data-ph-inisial="${aman(teksInisial)}"
         data-ph-ikon="${aman(namaIkon)}"
         data-ph-teks="${aman(teks)}" />`;
}

/* Markup placeholder foto (dipakai saat foto kosong atau gagal dimuat). */
function placeholderFoto(teksInisial, namaIkon, teks) {
  return `
    <div class="photo__placeholder">
      <span class="photo__ph-ikon">${teksInisial ? aman(teksInisial) : ikon(namaIkon)}</span>
      ${teks ? `<span class="photo__ph-teks">${aman(teks)}</span>` : ""}
    </div>`;
}

/* =========================================================================
   C. RENDER TIAP BAGIAN WEBSITE
   ========================================================================= */

/* --- C1. Teks-teks yang memakai atribut data-* di HTML ------------------- */
function renderTeksDasar() {
  // data-lembaga="namaPendek" -> isi dari DATA_LEMBAGA.namaPendek
  $$("[data-lembaga]").forEach((el) => {
    el.textContent = DATA_LEMBAGA[el.dataset.lembaga] ?? "";
  });

  // data-tentang="visi" -> isi dari DATA_TENTANG.visi
  $$("[data-tentang]").forEach((el) => {
    el.textContent = DATA_TENTANG[el.dataset.tentang] ?? "";
  });

  // data-pendaftaran="status" -> isi dari DATA_PENDAFTARAN.status
  $$("[data-pendaftaran]").forEach((el) => {
    el.textContent = DATA_PENDAFTARAN[el.dataset.pendaftaran] ?? "";
  });

  // data-icon="nama" -> sisipkan ikon SVG
  $$("[data-icon]").forEach((el) => {
    el.innerHTML = ikon(el.dataset.icon);
  });

  // Logo: pakai gambar bila DATA_LEMBAGA.logo diisi, jika tidak pakai ikon.
  $$("[data-logo]").forEach((el) => {
    el.innerHTML = DATA_LEMBAGA.logo
      ? `<img src="${aman(DATA_LEMBAGA.logo)}" alt="Logo ${aman(DATA_LEMBAGA.namaPendek)}" />`
      : ikon("quran");
  });

  // Judul tab browser mengikuti nama lembaga.
  document.title = `${DATA_LEMBAGA.namaPendek} — ${DATA_LEMBAGA.namaPanjang}`;

  // Tahun berjalan di footer.
  const tahun = $("#tahunSekarang");
  if (tahun) tahun.textContent = new Date().getFullYear();
}

/* --- C2. Slot foto hero & tentang ---------------------------------------- */
function renderFotoUtama() {
  const hero = $('[data-photo="hero"]');
  if (hero) {
    hero.innerHTML = slotFoto(DATA_LEMBAGA.fotoHero, `Kegiatan ${DATA_LEMBAGA.namaPendek}`, {
      teks: "Foto kegiatan santri",
      ikonNama: "camera",
    });
  }

  const tentang = $('[data-photo="tentang"]');
  if (tentang) {
    tentang.innerHTML = slotFoto(DATA_TENTANG.foto, "Suasana belajar di TPQ", {
      teks: "Foto suasana belajar",
      ikonNama: "camera",
    });
  }
}

/* --- C3. Statistik ------------------------------------------------------- */
function renderStatistik() {
  const wadah = $("#statistikGrid");
  if (!wadah) return;

  wadah.innerHTML = DATA_STATISTIK.map(
    (s) => `
    <article class="stat">
      <span class="stat__ikon">${ikon(s.ikon)}</span>
      <strong class="stat__angka" data-target="${Number(s.angka) || 0}" data-satuan="${aman(s.satuan)}">0</strong>
      <span class="stat__label">${aman(s.label)}</span>
    </article>`
  ).join("");
}

/* --- C4. Tentang: misi & keunggulan -------------------------------------- */
function renderTentang() {
  const misi = $("#misiList");
  if (misi) {
    misi.innerHTML = DATA_TENTANG.misi.map((m) => `<li>${aman(m)}</li>`).join("");
  }

  const keunggulan = $("#keunggulanGrid");
  if (keunggulan) {
    keunggulan.innerHTML = DATA_TENTANG.keunggulan
      .map(
        (k) => `
      <article class="fitur">
        <span class="fitur__ikon">${ikon(k.ikon)}</span>
        <h3 class="fitur__judul">${aman(k.judul)}</h3>
        <p class="fitur__teks">${aman(k.teks)}</p>
      </article>`
      )
      .join("");
  }
}

/* --- C5. Program --------------------------------------------------------- */
function renderProgram() {
  const wadah = $("#programGrid");
  if (!wadah) return;

  wadah.innerHTML = DATA_PROGRAM.map(
    (p) => `
    <article class="program">
      <!-- Slot foto program (opsional). Isi "foto" di data.js untuk menampilkannya. -->
      <figure class="photo photo--program ${p.foto ? "" : "is-empty"}">
        ${slotFoto(p.foto, `Program ${p.nama}`, { teks: "Foto program", ikonNama: p.ikon })}
      </figure>

      <div class="program__isi">
        <span class="program__ikon">${ikon(p.ikon)}</span>
        <h3 class="program__nama">${aman(p.nama)}</h3>
        <span class="program__usia">${ikon("users")} ${aman(p.usia)}</span>
        <p class="program__desc">${aman(p.deskripsi)}</p>
        <ul class="program__materi">
          ${p.materi.map((m) => `<li>${aman(m)}</li>`).join("")}
        </ul>
      </div>
    </article>`
  ).join("");
}

/**
 * kartuOrang() — dipakai bersama oleh Pengurus & Pengajar
 * agar tampilan konsisten dan mudah dirawat.
 */
function kartuOrang(o, barisAtas, barisBawah) {
  return `
    <article class="orang">
      <!-- Slot foto orang: tampil inisial nama bila foto belum ada -->
      <div class="orang__foto ${o.foto ? "" : "is-empty"}">
        ${slotFoto(o.foto, `Foto ${o.nama}`, { teksInisial: inisial(o.nama), teks: "" })}
      </div>
      <div class="orang__isi">
        <h3 class="orang__nama">${aman(o.nama)}</h3>
        <span class="orang__jabatan">${aman(barisAtas)}</span>
        ${barisBawah ? `<p class="orang__ket">${aman(barisBawah)}</p>` : ""}
      </div>
    </article>`;
}

/* --- C6. Pengurus -------------------------------------------------------- */
function renderPengurus() {
  const wadah = $("#pengurusGrid");
  if (!wadah) return;
  wadah.innerHTML = DATA_PENGURUS.map((o) => kartuOrang(o, o.jabatan, o.keterangan)).join("");
}

/* --- C7. Pengajar -------------------------------------------------------- */
function renderPengajar() {
  const wadah = $("#pengajarGrid");
  if (!wadah) return;

  wadah.innerHTML = DATA_PENGAJAR.map(
    (o) => `
    <article class="orang orang--pengajar">
      <div class="orang__foto ${o.foto ? "" : "is-empty"}">
        ${slotFoto(o.foto, `Foto ${o.nama}`, { teksInisial: inisial(o.nama), teks: "" })}
      </div>
      <div class="orang__isi">
        <h3 class="orang__nama">${aman(o.nama)}</h3>
        <span class="orang__jabatan">${aman(o.kelas)}</span>
        <p class="orang__ket">${aman(o.keahlian)}</p>
        <span class="orang__tag">${ikon("clock")} ${aman(o.pengalaman)}</span>
      </div>
    </article>`
  ).join("");
}

/* --- C8. Jadwal ---------------------------------------------------------- */
function renderJadwal() {
  const wadah = $("#jadwalList");
  if (!wadah) return;

  wadah.innerHTML = DATA_JADWAL.map(
    (j) => `
    <article class="jadwal__item">
      <div class="jadwal__hari">${ikon("calendar")}<span>${aman(j.hari)}</span></div>
      <div class="jadwal__waktu">${ikon("clock")}<span>${aman(j.waktu)}</span></div>
      <div class="jadwal__kegiatan">${aman(j.kegiatan)}</div>
    </article>`
  ).join("");
}

/* --- C9. Galeri + filter kategori ---------------------------------------- */
function renderGaleri() {
  const wadah = $("#galeriGrid");
  const filter = $("#galeriFilter");
  if (!wadah) return;

  // Buat kartu galeri
  wadah.innerHTML = DATA_GALERI.map(
    (g, i) => `
    <figure class="galeri__item ${g.foto ? "" : "is-empty"}"
            data-kategori="${aman(g.kategori)}"
            data-index="${i}"
            ${g.foto ? 'role="button" tabindex="0"' : ""}>
      ${slotFoto(g.foto, g.judul, { teks: "Foto menyusul", ikonNama: "camera" })}
      <figcaption class="galeri__cap">
        <span class="galeri__kategori">${aman(g.kategori)}</span>
        <span class="galeri__judul">${aman(g.judul)}</span>
      </figcaption>
    </figure>`
  ).join("");

  // Tombol filter dibuat otomatis dari kategori yang ada di data.
  if (filter) {
    const kategori = ["Semua", ...new Set(DATA_GALERI.map((g) => g.kategori))];
    filter.innerHTML = kategori
      .map(
        (k, i) =>
          `<button class="chip ${i === 0 ? "is-active" : ""}" data-filter="${aman(k)}">${aman(k)}</button>`
      )
      .join("");
  }
}

/* --- C10. Testimoni ------------------------------------------------------ */
function renderTestimoni() {
  const wadah = $("#testimoniGrid");
  if (!wadah) return;

  wadah.innerHTML = DATA_TESTIMONI.map(
    (t) => `
    <article class="testimoni">
      <span class="testimoni__quote">${ikon("quote")}</span>
      <p class="testimoni__pesan">${aman(t.pesan)}</p>
      <div class="testimoni__orang">
        <div class="testimoni__foto ${t.foto ? "" : "is-empty"}">
          ${slotFoto(t.foto, `Foto ${t.nama}`, { teksInisial: inisial(t.nama), teks: "" })}
        </div>
        <div>
          <strong>${aman(t.nama)}</strong>
          <small>${aman(t.peran)}</small>
        </div>
      </div>
    </article>`
  ).join("");
}

/* --- C11. Pendaftaran (syarat, biaya, pilihan program) ------------------- */
function renderPendaftaran() {
  const syarat = $("#syaratList");
  if (syarat) {
    syarat.innerHTML = DATA_PENDAFTARAN.syarat
      .map((s) => `<li>${ikon("check")}<span>${aman(s)}</span></li>`)
      .join("");
  }

  const biaya = $("#biayaList");
  if (biaya) {
    biaya.innerHTML = DATA_PENDAFTARAN.biaya
      .map((b) => `<li><span>${aman(b.item)}</span><strong>${aman(b.nominal)}</strong></li>`)
      .join("");
  }

  // Pilihan program pada formulir mengikuti DATA_PROGRAM.
  const pilihProgram = $("#programPilih");
  if (pilihProgram) {
    pilihProgram.innerHTML =
      `<option value="">— Pilih program —</option>` +
      DATA_PROGRAM.map((p) => `<option value="${aman(p.nama)}">${aman(p.nama)}</option>`).join("");
  }
}

/* --- C12. Kontak, sosial media, peta, tombol WhatsApp -------------------- */
function renderKontak() {
  const k = DATA_LEMBAGA.kontak;

  // Daftar kontak lengkap (section Kontak)
  const daftar = [
    { ikonNama: "pin", label: "Alamat", nilai: k.alamat, href: "" },
    { ikonNama: "phone", label: "Telepon / WA", nilai: k.telepon, href: `https://wa.me/${k.teleponWa}` },
    { ikonNama: "mail", label: "Email", nilai: k.email, href: `mailto:${k.email}` },
  ];

  const kontakList = $("#kontakList");
  if (kontakList) {
    kontakList.innerHTML = daftar
      .map(
        (d) => `
      <li class="kontak__item">
        <span class="kontak__ikon">${ikon(d.ikonNama)}</span>
        <div>
          <small>${aman(d.label)}</small>
          ${d.href ? `<a href="${aman(d.href)}" target="_blank" rel="noopener">${aman(d.nilai)}</a>` : `<span>${aman(d.nilai)}</span>`}
        </div>
      </li>`
      )
      .join("");
  }

  // Kontak ringkas di footer
  const kontakFooter = $("#kontakFooter");
  if (kontakFooter) {
    kontakFooter.innerHTML = daftar
      .map((d) => `<li>${ikon(d.ikonNama)}<span>${aman(d.nilai)}</span></li>`)
      .join("");
  }

  // Media sosial (hanya yang diisi yang ditampilkan)
  const sosialHTML = Object.entries(DATA_LEMBAGA.sosialMedia)
    .filter(([, url]) => url)
    .map(
      ([nama, url]) =>
        `<a class="sosial__link" href="${aman(url)}" target="_blank" rel="noopener" aria-label="${aman(nama)}">${ikon(nama)}</a>`
    )
    .join("");
  ["#sosialList", "#sosialFooter"].forEach((sel) => {
    const el = $(sel);
    if (el) el.innerHTML = sosialHTML;
  });

  // Peta lokasi.
  // DATA_LEMBAGA.kontak.mapsEmbed boleh diisi dengan salah satu dari:
  //   1) hanya URL embed, contoh: "https://www.google.com/maps/embed?..."
  //   2) kode lengkap hasil salin-tempel dari Google Maps
  //      (menu Bagikan -> Sematkan peta), contoh: "<iframe src=\"...\" ...></iframe>"
  // Kode di bawah otomatis mengambil URL-nya saja dari kedua format tersebut,
  // karena elemen <iframe id="mapFrame"> sudah tersedia di index.html
  // dan hanya butuh diisi atribut src-nya.
  const map = $("#mapFrame");
  if (map) {
    const cocokSrc = String(k.mapsEmbed || "").match(/src=["']([^"']+)["']/i);
    map.src = cocokSrc ? cocokSrc[1] : k.mapsEmbed;
  }

  // Tombol WhatsApp mengambang
  const wa = $("#waFloat");
  if (wa) {
    wa.href = `https://wa.me/${k.teleponWa}?text=${encodeURIComponent(
      `Assalamu'alaikum, saya ingin bertanya tentang ${DATA_LEMBAGA.namaPendek}.`
    )}`;
  }
}

/* =========================================================================
   D. INTERAKSI
   ========================================================================= */

/* --- D1. Menu mobile & header saat digulir ------------------------------- */
function initNavigasi() {
  const header = $("#header");
  const nav = $("#nav");
  const toggle = $("#navToggle");

  // Buka/tutup menu di layar kecil
  toggle?.addEventListener("click", () => {
    const terbuka = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", terbuka);
    toggle.setAttribute("aria-expanded", String(terbuka));
  });

  // Klik salah satu menu -> tutup menu mobile
  $$(".nav__link, .nav__cta").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle?.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    })
  );

  // Header berubah gaya setelah digulir + tombol "kembali ke atas"
  const toTop = $("#toTop");
  const cekScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 20);
    toTop?.classList.toggle("is-visible", window.scrollY > 500);
  };
  window.addEventListener("scroll", cekScroll, { passive: true });
  cekScroll();

  toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* --- D2. Menu aktif mengikuti bagian yang sedang dilihat ----------------- */
function initScrollSpy() {
  const links = $$(".nav__link");
  const sections = links
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) =>
          l.classList.toggle("is-active", l.getAttribute("href") === `#${e.target.id}`)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => obs.observe(s));
}

/* --- D3. Animasi muncul saat elemen masuk layar -------------------------- */
function initReveal() {
  const items = $$("[data-reveal]");
  const obs = new IntersectionObserver(
    (entries, o) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          o.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((i) => obs.observe(i));
}

/* --- D4. Animasi angka statistik ---------------------------------------- */
function initHitungAngka() {
  const angka = $$(".stat__angka");
  const obs = new IntersectionObserver(
    (entries, o) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = Number(el.dataset.target) || 0;
        const satuan = el.dataset.satuan || "";
        const durasi = 1200;
        const mulai = performance.now();

        const langkah = (waktu) => {
          const progres = Math.min((waktu - mulai) / durasi, 1);
          // easing agar berhenti halus
          const nilai = Math.round(target * (1 - Math.pow(1 - progres, 3)));
          el.textContent = nilai + (progres === 1 ? satuan : "");
          if (progres < 1) requestAnimationFrame(langkah);
        };
        requestAnimationFrame(langkah);
        o.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  angka.forEach((a) => obs.observe(a));
}

/* --- D5. Filter galeri --------------------------------------------------- */
function initFilterGaleri() {
  const filter = $("#galeriFilter");
  if (!filter) return;

  filter.addEventListener("click", (e) => {
    const tombol = e.target.closest(".chip");
    if (!tombol) return;

    $$(".chip", filter).forEach((c) => c.classList.remove("is-active"));
    tombol.classList.add("is-active");

    const pilih = tombol.dataset.filter;
    $$(".galeri__item").forEach((item) => {
      const cocok = pilih === "Semua" || item.dataset.kategori === pilih;
      item.classList.toggle("is-hidden", !cocok);
    });
  });
}

/* --- D6. Lightbox galeri (hanya untuk item yang sudah punya foto) -------- */
function initLightbox() {
  const box = $("#lightbox");
  const img = $("#lightboxImg");
  const cap = $("#lightboxCap");
  if (!box) return;

  const buka = (i) => {
    const data = DATA_GALERI[i];
    if (!data?.foto) return; // foto belum ada -> tidak dibuka
    img.src = data.foto;
    img.alt = data.judul;
    cap.textContent = `${data.judul} — ${data.kategori}`;
    box.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const tutup = () => {
    box.hidden = true;
    img.src = "";
    document.body.style.overflow = "";
  };

  $("#galeriGrid")?.addEventListener("click", (e) => {
    const item = e.target.closest(".galeri__item");
    if (item) buka(Number(item.dataset.index));
  });

  // Dukungan keyboard (Enter/Space) untuk aksesibilitas
  $("#galeriGrid")?.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const item = e.target.closest(".galeri__item");
    if (item) {
      e.preventDefault();
      buka(Number(item.dataset.index));
    }
  });

  $("#lightboxClose")?.addEventListener("click", tutup);
  box.addEventListener("click", (e) => {
    if (e.target === box) tutup();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !box.hidden) tutup();
  });
}

/* --- D7. Formulir pendaftaran -> kirim ke WhatsApp ----------------------- */
function initFormDaftar() {
  const form = $("#formDaftar");
  const status = $("#formStatus");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validasi sederhana: semua field wajib harus terisi.
    const data = Object.fromEntries(new FormData(form).entries());
    const wajib = ["namaAnak", "usiaAnak", "programPilih", "namaWali", "noHp"];
    const kosong = wajib.filter((k) => !String(data[k]).trim());

    if (kosong.length) {
      status.textContent = "Mohon lengkapi semua data yang wajib diisi.";
      status.className = "form-status is-error";
      return;
    }

    // Susun pesan WhatsApp
    const pesan =
      `Assalamu'alaikum, saya ingin mendaftarkan santri baru di ${DATA_LEMBAGA.namaPendek}.\n\n` +
      `Nama Santri : ${data.namaAnak}\n` +
      `Usia        : ${data.usiaAnak} tahun\n` +
      `Program     : ${data.programPilih}\n` +
      `Nama Wali   : ${data.namaWali}\n` +
      `No. WA      : ${data.noHp}\n` +
      (data.pesanDaftar ? `Catatan     : ${data.pesanDaftar}\n` : "") +
      `\nTerima kasih.`;

    window.open(
      `https://wa.me/${DATA_LEMBAGA.kontak.teleponWa}?text=${encodeURIComponent(pesan)}`,
      "_blank"
    );

    status.textContent = "Formulir dibuka di WhatsApp. Silakan tekan kirim di aplikasi WhatsApp.";
    status.className = "form-status is-success";
    form.reset();
  });
}

/* --- D8. Pengganti otomatis bila file foto tidak ditemukan --------------
   Contoh kasus: path foto di data.js sudah diisi, tetapi filenya belum
   diunggah / salah nama. Gambar "rusak" diganti placeholder agar rapi.
   Catatan: event "error" gambar tidak menggelembung, sehingga dipakai
   fase capture (argumen ketiga = true).
   ----------------------------------------------------------------------- */
function initFotoFallback() {
  document.addEventListener(
    "error",
    (e) => {
      const img = e.target;
      if (!(img instanceof HTMLImageElement) || !img.classList.contains("photo__img")) return;

      const wadah = img.closest(".photo, .orang__foto, .galeri__item, .testimoni__foto");
      wadah?.classList.add("is-empty");
      img.outerHTML = placeholderFoto(
        img.dataset.phInisial || "",
        img.dataset.phIkon || "camera",
        img.dataset.phTeks || ""
      );
    },
    true
  );
}

/* --- D9. Scroll halus untuk semua tautan #bagian ------------------------- */function initScrollHalus() {
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 76; // tinggi header agar judul tidak tertutup
      const posisi = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: posisi, behavior: "smooth" });
    });
  });
}

/* =========================================================================
   E. INISIALISASI — dijalankan setelah halaman siap
   ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  // 0) Siapkan penanganan foto gagal muat (dipasang sebelum render)
  initFotoFallback();

  // 1) Isi konten dari data.js
  renderTeksDasar();
  renderFotoUtama();
  renderStatistik();
  renderTentang();
  renderProgram();
  renderPengurus();
  renderPengajar();
  renderJadwal();
  renderGaleri();
  renderTestimoni();
  renderPendaftaran();
  renderKontak();

  // 2) Aktifkan interaksi
  initNavigasi();
  initScrollSpy();
  initReveal();
  initHitungAngka();
  initFilterGaleri();
  initLightbox();
  initFormDaftar();
  initScrollHalus();
});
