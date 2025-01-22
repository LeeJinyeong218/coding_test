// 검색 풀이
const [n, arr] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const balls = arr.split("");

let min = Infinity;

// 빨간색, 파란색을 왼쪽으로
let Rflag = false;
let Bflag = false;

let Rcnt = 0;
let Bcnt = 0;

for (let i = 0; i < n; i++) {
    if (arr[i] === "B") Rflag = true;
    if (arr[i] === "R") Bflag = true;

    if (Rflag && arr[i] === "R") Rcnt++;
    if (Bflag && arr[i] === "B") Bcnt++;
}

min = Math.min(min, Rcnt, Bcnt);

Rflag = false;
Bflag = false;

Rcnt = 0;
Bcnt = 0;

for (let i = n - 1; i >= 0; i--) {
    if (arr[i] === "B") Rflag = true;
    if (arr[i] === "R") Bflag = true;

    if (Rflag && arr[i] === "R") Rcnt++;
    if (Bflag && arr[i] === "B") Bcnt++;
}

min = Math.min(min, Rcnt, Bcnt);

console.log(min);