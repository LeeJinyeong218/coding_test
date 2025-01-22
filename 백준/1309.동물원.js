const n = +require('fs').readFileSync('dev/stdin').toString().trim();

let dp = Array(n + 1);

dp[0] = 1;
dp[1] = 3;

for (let i = 2; i <= n; i++) {
    // 맨위쪽, 맨아래쪽 없을 때 + 위 아래 모두 비어있을 때 <???
    dp[i] = (dp[i - 1] * 2 + dp[i - 2]) % 9901;
}

console.log(dp[n]);