const reader = require('readline').Interface({
    input: require('fs').createReadStream('dev/stdin'),
    output: undefined
})

let V;
let edges = [];

reader.on('line', line => {
    if (V === undefined) {
        V = +line.trim();
        edges = Array.from(Array(V + 1), () => []);
    } else {
        const [u, ...pairs] = line.trim().split(" ").map(Number);

        for (let i = 0; i < pairs.length; i += 2) {
            if (pairs[i] === -1) break;
            edges[u].push([pairs[i], pairs[i + 1]]);
        }
    }
})

reader.on('close', () => {
    // leaf 구하기
    let start = 1;
    let dist = Array(V + 1).fill(Infinity);
    dist[start] = 0;

    let q = [start];

    while (q.length) {
        const cur = q.shift();

        for (let [next, cost] of edges[cur]) {
            if (dist[cur] + cost < dist[next]) {
                q.push(next);
                dist[next] = dist[cur] + cost;
            }
        }
    }
    const farthest = dist.slice(1).reduce((p, n, i) => dist[p + 1] < n ? i : p, 0) + 1;
    start = farthest;
    dist = Array(V + 1).fill(Infinity);
    dist[start] = 0;

    q = [start];

    while (q.length) {
        const cur = q.shift();

        for (let [next, cost] of edges[cur]) {
            if (dist[cur] + cost < dist[next]) {
                q.push(next);
                dist[next] = dist[cur] + cost;
            }
        }
    }

    console.log(Math.max(...dist.slice(1)))
})