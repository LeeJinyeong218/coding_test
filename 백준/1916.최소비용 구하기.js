const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const N = +input[0];
const M = +input[1];
const [start, end] = input[input.length - 1].trim().split(" ").map(Number);

let graph = Array.from(Array(N + 1), () => ({}));

input.slice(2, 2 + M).forEach(line => {
    const [start, end, cost] = line.split(" ").map(Number);
    if (graph[start][end] === undefined) {
        graph[start][end] = cost;
    } else {
        graph[start][end] = Math.min(graph[start][end], cost);
    }
})

const dijkstra = (start, end) => {
    let dist = Array(N + 1).fill(Infinity);
    let visited = Array(N + 1).fill(false);
    dist[start] = 0;

    let pq = [[start, 0]];

    while (pq.length) {
        pq.sort((a, b) => a[1] - b[1]);
        const [cur, cost] = pq.shift();

        if (visited[cur]) continue;
        visited[cur] = true;

        for (let [next, next_cost] of Object.entries(graph[cur])) {
            if (dist[+next] > cost + next_cost) {
                dist[+next] = cost + next_cost;
                pq.push([+next, cost + next_cost]);
            }
        }
    }

    return dist[end];
}

console.log(dijkstra(start, end));