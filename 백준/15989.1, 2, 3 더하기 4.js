const [, ...nums] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n").map(Number);
const MAX = 10000;

let dp = Array.from(Array(MAX + 1), () => Array(4).fill(0));
dp[0] = [0, 0, 0, 0];
dp[1] = [1, 1, 0, 0];
dp[2] = [2, 1, 1, 0];
dp[3] = [3, 1, 1, 1];

const max_nums = Math.max(...nums);
for (let i = 4; i <= max_nums; i++) {
    dp[i][1] = 1;
    dp[i][2] = dp[i - 2][1] + dp[i - 2][2];
    dp[i][3] = dp[i - 3][0];
    dp[i][0] = dp[i][1] + dp[i][2] + dp[i][3];
}

nums.forEach(num => {
    console.log(dp[num][0]);
});