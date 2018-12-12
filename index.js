const readline = require('readline-sync');

const Board = function () {
  this.matrix = Array(3).fill(null).map(_ => Array(3).fill(' '));
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

};

const board = new Board();

let player = 'X';
board.show();

while (!board.hasWinner()) {
  const answer = readline.question(`Your move, player ${player}: `);
  const [row, col] = answer.split(',').map(Number);
  board.update(row, col, player);
  board.show();
  
};
