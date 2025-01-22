const reader = require('readline').Interface({
    input: require('fs').createReadStream('dev/stdin'),
    output: undefined
})

let N, E;
let dp;
let answer = Infinity;

const getMinDist = () => {
    let graph = Array.from(Array(N + 1), () => Array(N + 1).fill(Infinity));
    for (let i = 0; i < N; i++) graph[i + 1][i + 1] = 0;

    return (start, end) => {
        if (graph[start][end] < Infinity) return graph[start][end];
        let dist = graph[start];
        let q = [[start, 0]];

        while (q.length) {
            q.sort((a, b) => a[1] - b[1]);
            const [cur, accum] = q.shift();

            for (let [next, cost] of dp[cur]) {
                if (dist[next] > cost + accum) {
                    dist[next] = cost + accum;
                    q.push([next, dist[next]]);
                }
            }

        }
        
        dist.forEach((cost, idx) => {
            graph[idx][start] = cost;
        })

        return dist[end];
    }
}

let distCalc;

reader.on('line', line => {
    if (N === undefined && E === undefined) {
        [N, E] = line.split(" ").map(Number);
        dp = Array.from(Array(N + 1), () => []);
        distCalc = getMinDist();
    } else {
        const [u, v, c] = line.split(" ").map(Number);

        if (c) {
            dp[u].push([v, c]);
            dp[v].push([u, c]);
        } else {
            answer = Math.min(
                distCalc(1, u) + distCalc(u, v) + distCalc(v, N),
                distCalc(1, v) + distCalc(u, v) + distCalc(u, N)
            )
        }
    }
})

reader.on('close', () => {
    console.log(answer === Infinity ? -1 : answer);
})