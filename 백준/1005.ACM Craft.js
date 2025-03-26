// chatGPT 풀이
var reader = require('readline').createInterface({
    input: require('fs').createReadStream('dev/stdin'),
    output: undefined
});

var input = [];
reader.on('line', function (line) {
    input.push(line.trim());
}).on('close', function () {
    let index = 0;
    let T = Number(input[index++]);
    let result = [];

    while (T--) {
        let [N, K] = input[index++].split(' ').map(Number);
        let Ds = [0, ...input[index++].split(' ').map(Number)]; // 1-based index
        let edges = Array.from({ length: N + 1 }, () => []);
        let inDegree = Array(N + 1).fill(0);

        for (let i = 0; i < K; i++) {
            let [u, v] = input[index++].split(' ').map(Number);
            edges[u].push(v);
            inDegree[v]++;
        }

        let W = Number(input[index++]); // 목표 건물

        result.push(getMinTime(N, edges, inDegree, Ds, W));
    }

    console.log(result.join("\n"));
});

function getMinTime(N, edges, inDegree, Ds, W) {
    let dp = Array(N + 1).fill(0);
    let queue = [];

    for (let i = 1; i <= N; i++) {
        dp[i] = Ds[i]; // 기본 건축 시간
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    while (queue.length > 0) {
        let u = queue.shift();
        for (let v of edges[u]) {
            dp[v] = Math.max(dp[v], dp[u] + Ds[v]);
            if (--inDegree[v] === 0) {
                queue.push(v);
            }
        }
    }

    return dp[W];
}
