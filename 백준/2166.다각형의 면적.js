const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const N = +input[0].trim();
const points = input.slice(1).map(v => v.trim().split(" ").map(Number));

let j = N - 1;
let result = 0;

for (let i = 0; i < N; i++) {
    result += points[j][0] * points[i][1] - points[j][1] * points[i][0];
    j = i;
}

console.log((Math.abs(result) / 2).toFixed(1));