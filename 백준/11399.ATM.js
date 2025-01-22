let [[N], nums] = require('fs').readFileSync('dev/stdin').toString().split('\n')
    .map(v => v.split(" ").map(Number));

nums.sort((a, b) => a - b);

console.log(nums.reduce((p, n, i) => p + n * (N - i), 0));

