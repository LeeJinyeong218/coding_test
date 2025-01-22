const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split("\n");
const MAX_D = 10000;

const [[N, D], ...roads] = input.map(v => v.trim().split(" ").map(Number));

let edges = {};
let nodes = new Set();

roads.forEach(([s, e, d]) => {
    nodes.add(s);
    if (!edges[s]) {
        edges[s] = {};
        edges[s][e] = d;
    } else {
        edges[s][e] = Math.min(d, (edges[s][e] || e - s));
    }
})

let min = D;

const bfs = (start, accum) => {
    min = Math.min(min, accum + D - start);

    for (let node of nodes) {
        if (node >= start) {
            for (let [next, value] of Object.entries(edges[node])) {
                if (next <= D) {
                    bfs(next, accum + node - start + value);
                }   
            }
        }
    }
}

bfs(0, 0);

console.log(min);