const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const N = +input[0];
const grid = input.slice(1).map(v => v.split(" ").map(Number));

const dp = Array.from(
    Array(N),
    () => Array.from(Array(N), () => [0, 0, 0])
)

for (let i = 1; i < N; i++) {
    if (grid[0][i] === 1) break;
    dp[0][i][0] = 1;
}

for (let i = 1; i < N; i++) {
    for (let j = 1; j < N; j++) {
        if (grid[i][j] === 1) continue;
        dp[i][j][0] = dp[i][j - 1][0] + dp[i][j - 1][2];
        dp[i][j][1] = dp[i - 1][j][1] + dp[i - 1][j][2];
  
        if (grid[i - 1][j] === 0 && grid[i][j - 1] === 0) {
            dp[i][j][2] = dp[i - 1][j - 1][0] + dp[i - 1][j - 1][1] + dp[i - 1][j - 1][2];
        }
    }
}
const result = dp[N - 1][N - 1][0] + dp[N - 1][N - 1][1] + dp[N - 1][N - 1][2];
console.log(result);