const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const T = +input[0].trim();

const getMax = (prices) => {
    let money = 0;
    let maxSold = 0;

    for (let i = prices.length - 1; i >= 0; i--) {
        if (maxSold < prices[i]) maxSold = prices[i];
        else {
            money += maxSold - prices[i];
        }
    }

    return money;
}

let answer = [];
for (let i = 0; i < T; i++) {
    const prices = input[2 + i * 2].trim().split(" ").map(Number);

    answer.push(getMax(prices));
}

console.log(answer.join('\n'));