const MAX = 100000;
const [N, K] = require('fs').readFileSync('dev/stdin').toString().trim().split(" ").map(Number);

let visited = new Set([N]);
let q = [[N, 0]]; // [위치, 카운트]

while (q.length) {
    const [locate, count] = q.shift();
    if (locate === K) {
        console.log(count);
        break;
    }

    if (locate <= MAX / 2 && !visited.has(locate * 2)) {
        q.push([locate * 2, count]);
        visited.add(locate * 2);
    } 
    if (locate > 0 && !visited.has(locate - 1)) {
        q.push([locate - 1, count + 1]);
        visited.add(locate - 1);
    } 
    if (locate < MAX - 1 && !visited.has(locate + 1)) {
        q.push([locate + 1, count + 1]);
        visited.add(locate + 1, count + 1);
    }
}

