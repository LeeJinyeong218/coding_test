var sudoku = require('fs').readFileSync('dev/stdin').toString().trim().split("\n").map(v => v.trim().split("").map(Number));

var blanks = [];

for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (sudoku[i][j] === 0) blanks.push([i, j]);
  }
}

var l = blanks.length;

function findNumbers(x, y) {
  let result = Array(10).fill(false);
  for (let i = 0; i < 9; i++) {
    result[sudoku[x][i]] = true;
    result[sudoku[i][y]] = true;
  }

  const startX = Math.floor(x / 3) * 3;
  const startY = Math.floor(y / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      result[sudoku[startX + i][startY + j]] = true;
    }
  }

  return result.reduce((p, n, i) => {
    if (!n) p.push(i);
    return p;
  }, []);
}

function dfs(idx) {
  if (idx === l) {
    console.log(sudoku.map(v => v.join("")).join("\n"));
    process.exit(0);
  }

  var [x, y] = blanks[idx];
  var cand = findNumbers(x, y);

  if (cand.length === 0) {
    return;
  }

  for (let num of cand) {
    sudoku[x][y] = num;
    dfs(idx + 1);
  }
  sudoku[x][y] = 0;
}

dfs(0);