const readline = require('readline-sync');

const Board = function () {
  this.matrix = Array(3).fill(null).map(_ => Array(3).fill(' '));
  this.movesLeft = 9;
};

Board.prototype.show = function () {
  console.log(`     0     1     2
  +-----+-----+-----+
0 |${this.matrix[0].map(e => `  ${e}  `).join('|')}|
  +-----+-----+-----+
1 |${this.matrix[1].map(e => `  ${e}  `).join('|')}|
  +-----+-----+-----+
2 |${this.matrix[2].map(e => `  ${e}  `).join('|')}|
  +-----+-----+-----+`);
};

Board.prototype.update = function (row, col, player) {
  this.matrix[row][col] = player;
};

Board.prototype.isValid = function (row, col) {
  return !isNaN(row) && !isNaN(col)
    && row >= 0 && row < 3
    && col >= 0 && col < 3
    && this.matrix[row][col] === ' ';
};

Board.prototype.hasWinner = function () {
  const M = this.matrix;

  for (let row of [0, 1, 2]) {
    const arr = M[row]
    if (arr[0] === arr[1] && arr[1] === arr[2] && arr[0] !== ' ') return true;
  }
  for (let col of [0, 1, 2]) {
    const arr = M.map(row => row[col]);
    if (arr[0] === arr[1] && arr[1] === arr[2] && arr[0] !== ' ') return true;
  }
  if (M[0][0] === M[1][1] && M[1][1] === M[2][2] && M[1][1] !== ' ') return true;
  if (M[0][2] === M[1][1] && M[1][1] === M[2][0] && M[1][1] !== ' ') return true;

  return false;
};

const board = new Board();
board.show();

let player = 'X';
let gameEnded = false;

// A move looks like this: 1,1
while (!gameEnded) {
  const answer = readline.question(`Your move, player ${player}: `);
  const [row, col] = answer.split(',').map(Number);
  if (board.isValid(row, col)) {
    board.update(row, col, player);
    board.movesLeft -= 1;
    board.show();
    if (board.hasWinner()) {
      console.log(`You win, player ${player}!`);
      gameEnded = true;
    } else if (board.movesLeft > 0) {
      player = player === 'X' ? 'O' : 'X';
    } else {
      console.log("It's a draw!");
      gameEnded = true;
    }
  } else {
    console.log('Invalid move!');
  }
}
