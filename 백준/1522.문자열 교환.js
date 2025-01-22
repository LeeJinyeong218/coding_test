// 검색 풀이
let input = require('fs').readFileSync('dev/stdin').toString().trim().split("");
let serial_input = [...input, ...input];

let aCount = input.reduce((p, n) => n === 'a' ? p + 1 : p, 0);

let bCount_sliding = input.slice(0, aCount).reduce((p, n) => n === 'b' ? p + 1 : p, 0)
let min = bCount_sliding;

for (let i = 1; i < serial_input.length - aCount + 1; i++) {
    if (serial_input[i - 1] === "b") bCount_sliding--;
    if (serial_input[i + aCount - 1] === "b") bCount_sliding++;

    min = Math.min(bCount_sliding, min);
}

console.log(min);