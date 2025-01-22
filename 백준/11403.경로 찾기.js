const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const N = +input[0];
let graph = input.slice(1).map(v => v.split(" ").map(Number));

for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (graph[i][j]) continue;
            graph[i][j] = (graph[i][k] && graph[k][j]) ? 1 : 0;
        }
    }
}

console.log(graph.map(v => v.join(" ")).join("\n"));