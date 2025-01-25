const reader = require('readline').Interface({
    input: require('fs').createReadStream('dev/stdin'),
    output: undefined
})

let n, m;
let edges = [];
let s, e;

reader.on('line', line => {
    if (n === undefined) {
        n = +line.trim()
        edges = Array.from(Array(n + 1), () => []);
    } else if (m === undefined) {
        m = +line.trim();
    } else {
        const [start, end, cost] = line.trim().split(" ").map(Number);

        if (cost === undefined) {
            s = start;
            e = end;
            reader.close();
        } else {
            edges[start].push([end, cost]);
        }
    }
})

reader.on('close', () => {
    edges.forEach(r => {
        r.sort((a, b) => a[1] - b[1])
    })
    // 최소 비용 구하기
    let dist = Array(n + 1).fill(Infinity);
    dist[s] = 0;

    let q = [s];
    let head = 0;
    let passed = Array.from(Array(n + 1), () => []);
    passed[s] = [s];

    while (head < q.length) {
        const cur = q[head++];

        for (let [next, cost] of edges[cur]) {
            if (dist[cur] + cost < dist[next]) {
                dist[next] = dist[cur] + cost;
                passed[next] = [...passed[cur], next];
                q.push(next);
            }
        }
    }

    console.log(dist[e] + "\n" + passed[e].length + "\n" + passed[e].join(" "));
})