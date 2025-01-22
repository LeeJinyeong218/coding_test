const reader = require('readline').Interface({
    input: require('fs').createReadStream('dev/stdin'),
    output: undefined
})

let N, M, X;
let edges = [];

reader.on('line', line => {
    if (N === undefined && M === undefined && X === undefined) {
        [N, M, X] = line.trim().split(" ").map(Number);
        edges = Array.from(Array(N), () => []);
    } else {
        const [s, e, t] = line.trim().split(" ").map(Number);
        edges[s - 1].push([e - 1, t]);
    }
})

reader.on('close', () => {
    let max = 0;
    let dists = [];
    for (let i = 0; i < N; i++) {
        let dist = Array(N).fill(Infinity);
        dist[i] = 0;

        let q = [i];

        while (q.length) {
            const cur = q.shift();

            for (let [next, time] of edges[cur]) {
                if (dist[cur] + time < dist[next]) {
                    q.push(next);
                    dist[next] = dist[cur] + time;
                }
            }
        }

        dists.push(dist);
    }

    for (let i = 0; i < N; i++) {
        max = Math.max(max, dists[i][X - 1] + dists[X - 1][i]);
    }

    console.log(max);
})