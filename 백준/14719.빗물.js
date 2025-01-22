// 검색 풀이
const input = require('fs').readFileSync('dev/stdin').toString().split("\n");

const [[H, W], arr] = input.map(v => v.trim().split(" ").map(Number));
let answer = 0;

for (let i = 0; i < W; i++) {
    const maxH_left = Math.max(...arr.slice(0, i + 1));
    const maxH_right = Math.max(...arr.slice(i));

    answer += Math.min(maxH_left, maxH_right) - arr[i];
}

console.log(answer);