const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const N = +input[0];
const costs = input.slice(1).map(v => v.trim().split(" ").map(Number));
const COLOR_SIZE = 3;

let dp = Array.from({ length : N }, () => Array(COLOR_SIZE).fill(-1));
dp[0] = costs[0];

for (let i = 1; i < N; i++) {
    dp[i][0] = costs[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);
    dp[i][1] = costs[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);
    dp[i][2] = costs[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
}

console.log(Math.min(...dp[N - 1]));