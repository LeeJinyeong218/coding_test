const [N, K] = require('fs').readFileSync('dev/stdin').toString().trim().split(" ").map(Number);

const MAX = 100000;
const dp_time = Array(MAX + 1).fill(Infinity);
const dp_count = Array(MAX + 1).fill(0);

const queue = [];
queue.push(N);
dp_time[N] = 0;
dp_count[N] = 1;

while (queue.length) {
    const cur = queue.shift();

    for (let next of [cur - 1, cur + 1, cur * 2]) {
        if (next < 0 || next > MAX) continue;

        // 방문하지 않았거나 더 짧은 시간을 발견한 경우
        if (dp_time[next] > dp_time[cur] + 1) {
            dp_time[next] = dp_time[cur] + 1;
            dp_count[next] = dp_count[cur];
            queue.push(next);
        } 
        // 같은 시간으로 도달 가능한 경우
        else if (dp_time[next] === dp_time[cur] + 1) {
            dp_count[next] += dp_count[cur];
        }
    }
}

console.log(dp_time[K] + "\n" + dp_count[K]);