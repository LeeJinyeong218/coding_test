const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const [N, d, k, c] = input[0].trim().split(" ").map(Number);
const sushis = input.slice(1).map(Number);

let max = 1;

for (let i = 0; i < N; i++) {
    const set = new Set(i < N - k ? sushis.slice(i, i + k) : [...sushis.slice(i), ...sushis.slice(0, k - N + i)]);

    if (set.has(c)) max = Math.max(max, set.size);
    else max = Math.max(max, set.size + 1);
}

console.log(max);