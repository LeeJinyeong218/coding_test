const [N, K] = require('fs').readFileSync('dev/stdin').toString().trim().split(" ").map(Number);
const MAX = 100000;

let visited = new Set();
let q = [[N, 0]];

while (q.length) {
    const [cur, cnt] = q.shift();
    if (cur === K) {
        console.log(cnt);
        break;
    }

    if (cur < K && !visited.has(cur + 1)) {
        q.push([cur + 1, cnt + 1, 1]);
        visited.add(cur + 1);
    }
    if (cur > 0 && !visited.has(cur - 1)) {
        q.push([cur - 1, cnt + 1, -1]);
        visited.add(cur - 1);
    }
    if (cur <= MAX && !visited.has(cur * 2)) {
        q.push([cur * 2, cnt + 1, 0]); 
        visited.add(cur * 2);
    }
}