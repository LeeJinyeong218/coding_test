const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const [n, m, r] = input[0].split(" ").map(Number);
const items = input[1].trim().split(" ").map(Number);
const paths = input.slice(2).map(v => v.split(" ").map(Number));

const dist = Array.from(Array(n), () => Array(n).fill(Infinity));

for (let i = 0; i < n; i++) {
    dist[i][i] = 0;
}

paths.forEach(([a, b, l]) => {
    dist[a - 1][b - 1] = l;
    dist[b - 1][a - 1] = l;
})

for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
            dist[j][i] = dist[i][j];
        }
    }
}

console.log(
    Math.max(...dist.map(r => r.reduce((p, n, idx) => n <= m ? p + items[idx] : p, 0)))
)