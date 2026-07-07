// Start coding 1 ↓
const readline = require("readline-sync");
// Input
const name = readline.question("Enter name: ");
const birthYear = Number(readline.question("Enter birth year: "));
const birthMonth = Number(readline.question("Enter birth month (1-12): "));
const birthDate = Number(readline.question("Enter birth date: "));

// Konversi tanggal lahir ke milidetik sejak epoch (1970-01-01)
const isLeap = (y) =>
  (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);

// Jumlah hari perbulan
const daysInMonth = (y, m) => {
  const normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (m === 2 && isLeap(y)) return 29;
  return normal[m - 1];
};
// Hitung total hari sejak epoch (1970-01-01)
const computeDaysSinceEpoch = (year, month, date) => {
  let days = 0;

  // Tambah hari tahun-tahun sebelumnya
  for (let y = 1970; y < year; y++) {
    days += isLeap(y) ? 366 : 365;
  }

  // Tambah hari bulan-bulan sebelumnya
  for (let m = 1; m < month; m++) {
    days += daysInMonth(year, m);
  }

  // Tambah hari & tanggal
  days += (date - 1);
  return days;
};

// Konversi ke milidetik
const birthDays = computeDaysSinceEpoch(birthYear, birthMonth, birthDate);
const birthMillis = birthDays * 24 * 60 * 60 * 1000;

// Objek sesuai peraturan
const person = {
  name,
  birthDate: birthMillis,
  getAge() {
    // Hitung umur berdasarkan tanggal saat ini
    const dueYear = 2026;
    const dueMonth = 7;
    const dueDate = 6;
    const dueHour = 20;

    const dueDays = computeDaysSinceEpoch(dueYear, dueMonth, dueDate);
    const dueMillis = dueDays * 24 * 60 * 60 * 1000 + dueHour * 3600000;

    const diff = dueMillis - this.birthDate;

    const ageYears = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
    return ageYears;
  }
};
// Output
console.log(`\nHey ${person.name}, your age is ${person.getAge()}.`);
// End coding 1 ↑