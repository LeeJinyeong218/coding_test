// gpt 풀이
// packs에 대한 dp 뿐만 아니라, 다른 요소에 대한 dp를 고려해봐야함
const [[N, K], ...packs] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n")
                            .map(v => v.split(" ").map(Number));

let dp = Array(K + 1).fill(0);

for (const [weight, value] of packs) {
    for (let j = K; j >= weight; j--) {
        dp[j] = Math.max(dp[j], dp[j - weight] + value);
    }
}

console.log(dp[K])