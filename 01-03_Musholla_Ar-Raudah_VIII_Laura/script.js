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
