const reader = require('readline').Interface({
    input: require('fs').createReadStream('dev/stdin'),
    output: undefined
})

let T;
let N, M, W;
let edges = [];
let answer = [];

const init = () => {
    N = undefined;
    M = undefined;
    W = undefined;
    edges = [];
}

reader.on('line', line => {
    if (T === undefined) {
        T = +line.trim();
    } else if (N === undefined && M === undefined && W === undefined) {
        [N, M, W] = line.trim().split(" ").map(Number);
    } else {
        const [S, E, T] = line.trim().split(" ").map(Number);
        if (M) {
            edges.push([S - 1, E - 1, T]);
            edges.push([E - 1, S - 1, T]);
            M--;
        } else if (W) {
            edges.push([S - 1, E - 1, T * -1]);
            W--;
        }
        if (M + W === 0) {
            const dist = Array(N).fill(0);

            for (let i = 0; i < N; i++) {
                for (let [start, end, time] of edges) {
                    if (dist[start] + time < dist[end]) {
                        dist[end] = dist[start] + time;
                    }
                }
            }

            let flag = "NO";
            for (let i = 0; i < N; i++) {
                for (let [start, end, time] of edges) {
                    if (dist[start] + time < dist[end]) {
                        flag = "YES"
                        break;
                    }
                }
            }
            
            answer.push(flag);

            init();
        }
    }
})

reader.on('close', () => {
    console.log(answer.join('\n'))
})