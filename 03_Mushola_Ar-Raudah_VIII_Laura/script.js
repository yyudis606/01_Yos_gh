async function getJadwalSholat() {
  try {
    // Koordinat Landasan Ulin, Banjarbaru
    const latitude = -3.4426;
    const longitude = 114.8103;

    const url = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`;

    const response = await fetch(url);
    const data = await response.json();

    const jadwal = data.data.timings;

    // Tampilkan jadwal
    document.getElementById("subuh").textContent = jadwal.Fajr;
    document.getElementById("dzuhur").textContent = jadwal.Dhuhr;
    document.getElementById("ashar").textContent = jadwal.Asr;
    document.getElementById("maghrib").textContent = jadwal.Maghrib;
    document.getElementById("isya").textContent = jadwal.Isha;

    // Simpan jadwal untuk countdown
    window.jadwalSholat = jadwal;
  } catch (error) {
    console.log("Gagal mengambil jadwal sholat:", error);
  }
}

getJadwalSholat();

// ===============================
// JAM DIGITAL REALTIME
// ===============================
function updateJamDigital() {
  const now = new Date();
  const jam = String(now.getHours()).padStart(2, "0");
  const menit = String(now.getMinutes()).padStart(2, "0");
  const detik = String(now.getSeconds()).padStart(2, "0");

  document.getElementById("jam-digital").textContent =
    `${jam}:${menit}:${detik}`;
}

setInterval(updateJamDigital, 1000);
updateJamDigital();

// ===============================
// JAM ANALOG REALTIME (jarum berjalan)
// Rotasi tiap jarum diatur lewat custom property --deg
// yang dibaca oleh style .hand di scss/components/_analog-clock.scss
// ===============================
function updateJamAnalog() {
  const now = new Date();
  const jam = now.getHours() % 12;
  const menit = now.getMinutes();
  const detik = now.getSeconds();

  // Derajat jarum jam: 360deg / 12 jam, ditambah pergeseran halus dari menit
  const hourDeg = jam * 30 + menit * 0.5;
  // Derajat jarum menit: 360deg / 60 menit, ditambah pergeseran halus dari detik
  const minuteDeg = menit * 6 + detik * 0.1;
  // Derajat jarum detik: 360deg / 60 detik
  const secondDeg = detik * 6;

  const hourHand = document.getElementById("hourHand");
  const minuteHand = document.getElementById("minuteHand");
  const secondHand = document.getElementById("secondHand");

  if (hourHand) hourHand.style.setProperty("--deg", `${hourDeg}deg`);
  if (minuteHand) minuteHand.style.setProperty("--deg", `${minuteDeg}deg`);
  if (secondHand) secondHand.style.setProperty("--deg", `${secondDeg}deg`);
}

setInterval(updateJamAnalog, 1000);
updateJamAnalog();

// ===============================
// HITUNG MUNDUR SHOLAT BERIKUTNYA
// ===============================
function hitungMundur() {
  if (!window.jadwalSholat) return;

  const now = new Date();

  // Ambil jadwal sholat hari ini
  const times = [
    { nama: "Subuh", waktu: window.jadwalSholat.Fajr },
    { nama: "Dzuhur", waktu: window.jadwalSholat.Dhuhr },
    { nama: "Ashar", waktu: window.jadwalSholat.Asr },
    { nama: "Maghrib", waktu: window.jadwalSholat.Maghrib },
    { nama: "Isya", waktu: window.jadwalSholat.Isha },
  ];

  let target = null;

  for (let t of times) {
    const [h, m] = t.waktu.split(":");
    const waktuSholat = new Date();
    waktuSholat.setHours(h, m, 0, 0);

    if (waktuSholat > now) {
      target = { nama: t.nama, waktu: waktuSholat };
      break;
    }
  }

  // Jika semua sudah lewat → target Subuh besok
  if (!target) {
    const [h, m] = window.jadwalSholat.Fajr.split(":");
    const besok = new Date();
    besok.setDate(besok.getDate() + 1);
    besok.setHours(h, m, 0, 0);

    target = { nama: "Subuh", waktu: besok };
  }

  const selisih = target.waktu - now;

  const jam = Math.floor(selisih / (1000 * 60 * 60));
  const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
  const detik = Math.floor((selisih % (1000 * 60)) / 1000);

  document.getElementById("countdown").textContent =
    `${target.nama} — ${jam}j ${menit}m ${detik}d`;
}

setInterval(hitungMundur, 1000);

// ===============================
// KALENDER MASEHI DAN HIJRIYAH
// ===============================
const namaBulanMasehi = new Intl.DateTimeFormat("id-ID", {
  month: "long",
  year: "numeric",
});
const formatHijriyah = new Intl.DateTimeFormat("id-ID-u-ca-islamic-umalqura", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const formatBagianHijriyah = new Intl.DateTimeFormat(
  "id-ID-u-ca-islamic-umalqura",
  { day: "numeric", month: "numeric", year: "numeric" },
);
const namaHariMasehi = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const namaHariIslami = [
  "Ahad",
  "Itsnain",
  "Tsulatsa",
  "Arbi'a",
  "Khamis",
  "Jumu'ah",
  "Sabt",
];
const namaBulanHijriyah = {
  rabiulawal: "Rabiul Awal",
  rabiulakhir: "Rabiul Akhir",
  jumadilawal: "Jumadil Awal",
  jumadilakhir: "Jumadil Akhir",
};

function formatNamaBulanHijriyah(tanggal) {
  const bagian = formatHijriyah.formatToParts(tanggal);
  const bulan = bagian.find(({ type }) => type === "month")?.value ?? "";
  const tahun = bagian.find(({ type }) => type === "year")?.value ?? "";
  const namaBulan = namaBulanHijriyah[bulan.toLowerCase()] ?? bulan;

  return `${namaBulan} ${tahun}`;
}

function buatKalender(
  tanggalAwal,
  jumlahHari,
  judul,
  targetId,
  tanggalHariIni,
  namaHari,
  onNavigate,
  labelTanggal = (_tanggal, nomorHari) => nomorHari,
) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const tabel = document.createElement("table");
  tabel.className = "calendar-table";
  tabel.innerHTML = `
    <caption class="calendar-title">
      <div class="calendar-title-inner">
        <button class="calendar-nav calendar-nav-previous" type="button" aria-label="Bulan sebelumnya" data-direction="-1">&lt;</button>
        <span>${judul}</span>
        <button class="calendar-nav calendar-nav-next" type="button" aria-label="Bulan berikutnya" data-direction="1">&gt;</button>
      </div>
    </caption>
    <thead><tr>${namaHari
      .map(
        (hari) =>
          `<th scope="col"><span class="day-name-full">${hari}</span><span class="day-name-short">${hari.slice(0, 3)}</span></th>`,
      )
      .join("")}</tr></thead>
    <tbody></tbody>
  `;

  const badan = tabel.querySelector("tbody");
  tabel.querySelectorAll(".calendar-nav").forEach((tombol) => {
    tombol.addEventListener("click", () => {
      onNavigate(Number(tombol.dataset.direction));
    });
  });
  let baris = document.createElement("tr");
  const hariPertama = tanggalAwal.getDay();

  for (let kosong = 0; kosong < hariPertama; kosong += 1) {
    baris.insertAdjacentHTML("beforeend", '<td class="is-empty">0</td>');
  }

  for (let hari = 1; hari <= jumlahHari; hari += 1) {
    const tanggal = new Date(tanggalAwal);
    tanggal.setDate(tanggalAwal.getDate() + hari - 1);
    const adalahHariIni = tanggal.toDateString() === tanggalHariIni.toDateString();
    baris.insertAdjacentHTML(
      "beforeend",
      `<td class="${adalahHariIni ? "is-today" : ""}"${adalahHariIni ? ' aria-current="date"' : ""}>${labelTanggal(tanggal, hari)}</td>`,
    );

    if (tanggal.getDay() === 6 || hari === jumlahHari) {
      while (baris.children.length < 7) {
        baris.insertAdjacentHTML("beforeend", '<td class="is-empty">0</td>');
      }
      badan.appendChild(baris);
      baris = document.createElement("tr");
    }
  }

  target.replaceChildren(tabel);
}

function dapatkanKomponenHijriyah(tanggal) {
  return Object.fromEntries(
    formatBagianHijriyah
      .formatToParts(tanggal)
      .filter(({ type }) => ["day", "month", "year"].includes(type))
      .map(({ type, value }) => [type, Number(value)]),
  );
}

function awalBulanHijriyah(tanggal) {
  const awal = new Date(tanggal);
  while (dapatkanKomponenHijriyah(awal).day !== 1) {
    awal.setDate(awal.getDate() - 1);
  }
  return awal;
}

function jumlahHariBulanHijriyah(awal) {
  const bulan = dapatkanKomponenHijriyah(awal).month;
  const tahun = dapatkanKomponenHijriyah(awal).year;
  const akhir = new Date(awal);
  akhir.setDate(akhir.getDate() + 1);

  while (
    dapatkanKomponenHijriyah(akhir).month === bulan &&
    dapatkanKomponenHijriyah(akhir).year === tahun
  ) {
    akhir.setDate(akhir.getDate() + 1);
  }

  return Math.round((akhir - awal) / (1000 * 60 * 60 * 24));
}

function geserBulanHijriyah(awal, arah) {
  const tanggalPencarian = new Date(awal);
  tanggalPencarian.setDate(
    tanggalPencarian.getDate() + (arah > 0 ? 35 : -1),
  );
  return awalBulanHijriyah(tanggalPencarian);
}

function tampilkanKalender() {
  const hariIni = new Date();
  let awalMasehi = new Date(hariIni.getFullYear(), hariIni.getMonth(), 1);
  let awalHijriyah = awalBulanHijriyah(hariIni);

  function tampilkanKalenderMasehi() {
    const jumlahHari = new Date(
      awalMasehi.getFullYear(),
      awalMasehi.getMonth() + 1,
      0,
    ).getDate();
    buatKalender(
      awalMasehi,
      jumlahHari,
      namaBulanMasehi.format(awalMasehi),
      "kalender-masehi",
      hariIni,
      namaHariMasehi,
      (arah) => {
        awalMasehi = new Date(
          awalMasehi.getFullYear(),
          awalMasehi.getMonth() + arah,
          1,
        );
        tampilkanKalenderMasehi();
      },
    );
  }

  function tampilkanKalenderHijriyah() {
    buatKalender(
      awalHijriyah,
      jumlahHariBulanHijriyah(awalHijriyah),
      formatNamaBulanHijriyah(awalHijriyah),
      "kalender-hijriyah",
      hariIni,
      namaHariIslami,
      (arah) => {
        awalHijriyah = geserBulanHijriyah(awalHijriyah, arah);
        tampilkanKalenderHijriyah();
      },
      (tanggal) => dapatkanKomponenHijriyah(tanggal).day,
    );
  }

  tampilkanKalenderMasehi();
  tampilkanKalenderHijriyah();

  const tombolHariIni = document.getElementById("tombol-hari-ini");
  if (tombolHariIni) {
    tombolHariIni.addEventListener("click", () => {
      const sekarang = new Date();
      awalMasehi = new Date(sekarang.getFullYear(), sekarang.getMonth(), 1);
      awalHijriyah = awalBulanHijriyah(sekarang);
      tampilkanKalenderMasehi();
      tampilkanKalenderHijriyah();
    });
  }
}

tampilkanKalender();

// ===============================
// PUASA & IDUL FITRI SELANJUTNYA
// ===============================
const BULAN_HIJRIYAH_RAMADAN = 9;
const BULAN_HIJRIYAH_SYAWAL = 10;

const formatTanggalLengkap = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

// Cari tanggal Masehi untuk awal (tanggal 1) bulan Hijriyah tertentu yang
// akan datang berikutnya, dihitung mulai dari bulan setelah tanggal acuan
// agar hasilnya selalu di masa depan.
function cariAwalBulanHijriyahBerikutnya(bulanTarget, tanggalAcuan) {
  let awal = geserBulanHijriyah(awalBulanHijriyah(tanggalAcuan), 1);
  while (dapatkanKomponenHijriyah(awal).month !== bulanTarget) {
    awal = geserBulanHijriyah(awal, 1);
  }
  return awal;
}

function formatSelisihWaktu(selisihMs) {
  const total = Math.max(0, selisihMs);
  const hari = Math.floor(total / (1000 * 60 * 60 * 24));
  const jam = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const menit = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const detik = Math.floor((total % (1000 * 60)) / 1000);

  return `${hari}h ${jam}j ${menit}m ${detik}d`;
}

function tampilkanPuasaDanIdulFitri() {
  const elTanggalPuasa = document.getElementById("tanggal-puasa");
  const elCountdownPuasa = document.getElementById("countdown-puasa");
  const elTanggalIdulFitri = document.getElementById("tanggal-idul-fitri");
  const elCountdownIdulFitri = document.getElementById("countdown-idul-fitri");

  if (
    !elTanggalPuasa ||
    !elCountdownPuasa ||
    !elTanggalIdulFitri ||
    !elCountdownIdulFitri
  ) {
    return;
  }

  const hariIni = new Date();
  const awalPuasa = cariAwalBulanHijriyahBerikutnya(
    BULAN_HIJRIYAH_RAMADAN,
    hariIni,
  );
  const awalIdulFitri = cariAwalBulanHijriyahBerikutnya(
    BULAN_HIJRIYAH_SYAWAL,
    hariIni,
  );

  elTanggalPuasa.textContent = formatTanggalLengkap.format(awalPuasa);
  elTanggalIdulFitri.textContent = formatTanggalLengkap.format(awalIdulFitri);

  function perbaruiCountdown() {
    const sekarang = new Date();
    elCountdownPuasa.textContent = formatSelisihWaktu(awalPuasa - sekarang);
    elCountdownIdulFitri.textContent = formatSelisihWaktu(
      awalIdulFitri - sekarang,
    );
  }

  perbaruiCountdown();
  setInterval(perbaruiCountdown, 1000);
}

tampilkanPuasaDanIdulFitri();
