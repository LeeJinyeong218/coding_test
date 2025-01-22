const reader = require('readline').createInterface({
    input: require('fs').createReadStream('dev/stdin'),
    output: undefined
});

let T = 0;
let n = 0;
let stickers = [];
let answer = [];
reader.on('line', line => {
    if (T === 0) {
        T = +line.trim();
    } else if (n === 0) {
        n = +line.trim();
    } else {
        stickers.push(line.split(" ").map(Number));
        if (stickers.length === 2) {
            let dp = Array.from({ length : n }, () => Array(2).fill(0));

            dp[0][0] = stickers[0][0];
            dp[0][1] = stickers[1][0];

            for (let i = 1; i < n; i++) {
                if (i > 1) {
                    dp[i][0] = Math.max(...dp[i - 2], dp[i - 1][1]) + stickers[0][i];
                    dp[i][1] = Math.max(...dp[i - 2], dp[i - 1][0]) + stickers[1][i];
                } else {
                    dp[i][0] = dp[i - 1][1] + stickers[0][i];
                    dp[i][1] = dp[i - 1][0] + stickers[1][i];
                }
            }

            answer.push(n > 1 ? Math.max(...dp[n - 2], ...dp[n - 1]) : Math.max(...dp[n - 1]));
            n = 0
            stickers = [];
        }
    }
})

reader.on('close', () => {
    console.log(answer.join("\n"));
})