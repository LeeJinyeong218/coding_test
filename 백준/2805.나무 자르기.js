const [[N, M], trees] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n").map(v => v.split(" ").map(Number));

const max = Math.max(...trees);
const cut = h => {
    return trees.reduce((p, n) => n > h ? p + n - h : p, 0);
}

let l = 0, r = max;

while (l < r) {
    const mid = Math.ceil((l + r) / 2);

    if (cut(mid) >= M) {
        l = mid;
    } else {
        r = mid - 1;
    }
}

console.log(l);