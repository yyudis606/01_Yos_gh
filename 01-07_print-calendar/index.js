// start code 4 ↓
const readline = require("readline-sync");

// Titik acuan: 1 Jan 1800 = Rabu = 3
const startDay1800 = 3;

function Calendar(year, month) {
  this.year = year;
  this.month = month;
}

Calendar.prototype.isLeapYear = function () {
  const year = this.year;
  return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
};

Calendar.prototype.getTotalDaysSince1800 = function () {
  let total = 0;
  for (let y = 1800; y < this.year; y++) {
    total += ((y % 400 === 0) || (y % 4 === 0 && y % 100 !== 0)) ? 366 : 365;
  }
  return total;
};

Calendar.prototype.getTotalDaysBeforeMonth = function () {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (this.isLeapYear()) daysInMonth[1] = 29;

  let total = 0;
  for (let i = 0; i < this.month - 1; i++) {
    total += daysInMonth[i];
  }
  return total;
};

Calendar.prototype.print = function () {
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (this.isLeapYear()) daysInMonth[1] = 29;

  const totalDays =
    this.getTotalDaysSince1800() +
    this.getTotalDaysBeforeMonth();

  const startDay = (startDay1800 + totalDays) % 7;

  const title = `${monthNames[this.month - 1]} ${this.year}`;

  // Center title
  const calendarWidth = 35;
  const leftPadding = Math.floor((calendarWidth - title.length) / 2);
  console.log("\n" + " ".repeat(leftPadding) + title);

  console.log("----------------------------------");
  console.log(" Sun  Mon  Tue  Wed  Thu  Fri  Sat");

  let output = "";

  // Spasi sebelum tanggal 1
  for (let i = 0; i < startDay; i++) {
    output += "     ";
  }

  // Cetak tanggal
  for (let day = 1; day <= daysInMonth[this.month - 1]; day++) {
    output += String(day).padStart(4) + " ";
    if ((startDay + day) % 7 === 0) output += "\n";
  }

  console.log(output + "\n");
};

// Program utama
const year = Number(readline.question("Enter full year (e.g., 2001): "));
const month = Number(readline.question("Enter month in number between 1 and 12: "));

const cal = new Calendar(year, month);
cal.print();
// end code 4 ↑
