// start code 1
const readline = require("readline-sync");

// Membuat papan 3x3 berisi spasi kosong
let board = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

// Menampilkan papan ke layar
function printBoard() {
  console.log("-------------");
  for (let i = 0; i < 3; i++) {
    console.log(`| ${board[i][0]} | ${board[i][1]} | ${board[i][2]} |`);
    console.log("-------------");
  }
}

// Mengecek apakah pemain menang
function checkWin(player) {
  // Cek baris
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    ) {
      return true;
    }
  }

  // Cek kolom
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] === player &&
      board[1][j] === player &&
      board[2][j] === player
    ) {
      return true;
    }
  }

  // Cek diagonal utama
  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  ) {
    return true;
  }

  // Cek diagonal kedua
  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  ) {
    return true;
  }

  return false;
}

// Mengecek apakah papan penuh (draw)
function isBoardFull() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === " ") {
        return false;
      }
    }
  }
  return true;
}

// Game loop

let currentPlayer = "X";

printBoard();

while (true) {
  console.log(`Enter a row (0, 1, or 2) for player ${currentPlayer}:`);
  let row = Number(readline.question("> "));

  console.log(`Enter a column (0, 1, or 2) for player ${currentPlayer}:`);
  let col = Number(readline.question("> "));

  // Validasi input
  if (row < 0 || row > 2 || col < 0 || col > 2) {
    console.log("Invalid input. Try again.");
    continue;
  }

  // Cek apakah sel kosong
  if (board[row][col] !== " ") {
    console.log("Cell already taken. Try again.");
    continue;
  }

  // Tempatkan token pemain
  board[row][col] = currentPlayer;

  // Tampilkan papan
  printBoard();

  // Cek menang
  if (checkWin(currentPlayer)) {
    console.log(`Player ${currentPlayer} won`);
    break;
  }

  // Cek draw
  if (isBoardFull()) {
    console.log("It's a draw!");
    break;
  }

  // Ganti pemain
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}
// end code 1

// -------------------
// | 0,0 | 0,1 | 0,2 |
// -------------------
// | 1,0 | 1,1 | 1,2 |
// -------------------
// | 2,0 | 2,1 | 2,2 |
// -------------------