const N = +require('fs').readFileSync('dev/stdin').toString();

let dp = Array(N + 1).fill(Infinity);
const l = Math.floor(Math.sqrt(N));
const powers = Array(Math.floor(Math.sqrt(N))).fill(0).map((_, i) => (i + 1) ** 2);
powers.forEach(v => {
    dp[v] = 1;
})

let max_idx = 0;
for (let i = 2; i <= N; i++) {
    if (dp[i] === 1) max_idx++;
    else {
        for (let j = max_idx; j >= 0; j--) {
            dp[i] = Math.min(dp[i], dp[i - powers[j]] + 1);
        }
    }
}

console.log(dp[N]);
