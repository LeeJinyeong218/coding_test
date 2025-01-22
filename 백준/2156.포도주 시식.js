const [n, ...liters] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n").map(v => +v.trim());

let dp = Array(n).fill(0);

dp[0] = liters[0];
dp[1] = liters[1] + liters[0];
dp[2] = Math.max(dp[1], liters[1] + liters[2], liters[0] + liters[2]);

for (let i = 3; i < n; i++) {
    dp[i] = Math.max(dp[i - 3] + liters[i - 1] + liters[i], dp[i - 2] + liters[i], dp[i - 1]);
}

console.log(dp[n - 1]);