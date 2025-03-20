var [[N], cards] = require('fs').readFileSync('dev/stdin').toString().split("\n").map(v => v.trim().split(" ").map(Number));
var MAX = 1000001;
var idxs = Array(MAX).fill(-1);
var scores = Array(N).fill(0);
var max = 0;

for (let i = 0; i < N; i++) {
    idxs[cards[i]] = i;
    max = Math.max(max, cards[i]);
}

for (let i = 0; i < N; i++) {
    let num = cards[i];
    for (let j = num * 2; j <= max; j += num) {
        if (idxs[j] !== -1) {
            scores[idxs[j]]--;
            scores[i]++;
        }
    }
}

console.log(scores.join(' '));