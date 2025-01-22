const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const n = +input[0].trim();
const pyramid = input.slice(1).map(r => r.trim().split(" ").map(Number));

let dp = Array.from(Array(n), () => Array(n).fill(null));
dp[0][0] = pyramid[0][0];

for (let i = 1; i < n; i++) {
    for (let j = 0; j < i + 1; j++) {
        dp[i][j] = pyramid[i][j];
        if (j === 0) dp[i][j] += dp[i - 1][j];
        else if (dp[i - 1][j] === null) dp[i][j] += dp[i - 1][j - 1];
        else dp[i][j] += Math.max(dp[i - 1][j], dp[i - 1][j - 1])
    }
}

console.log(Math.max(...dp[n - 1]));