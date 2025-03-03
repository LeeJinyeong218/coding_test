var input = require('fs').readFileSync('dev/stdin').toString().split('\n');
var N = +input[0].trim();

var costs = input.slice(1).map(line => line.trim().split(" ").map(Number));

var RED = 0;
var GREEN = 1;
var BLUE = 2;

var answer = Infinity;

for (let first_color = 0; first_color < 3; first_color++) {
    let dp = Array.from({ length: N }, () => Array(3).fill(0));
    for (let i = 0; i < 3; i++) {
        if (i !== first_color) dp[0][i] = Infinity;
    }
    dp[0][first_color] = costs[0][first_color];

    for (let i = 1; i < N; i++) {
        dp[i][RED] = Math.min(dp[i - 1][GREEN], dp[i - 1][BLUE]) + costs[i][RED];
        dp[i][GREEN] = Math.min(dp[i - 1][RED], dp[i - 1][BLUE]) + costs[i][GREEN];
        dp[i][BLUE] = Math.min(dp[i - 1][RED], dp[i - 1][GREEN]) + costs[i][BLUE];
    }

    for (let i = 0; i < 3; i++) {
        if (i !== first_color) {
            answer = Math.min(answer, dp[N - 1][i]);
        }
    }
}

console.log(answer);