const input = require('fs').readFileSync('dev/stdin').toString().split('\n');

const [_, K] = input[0].split(' ').map(Number);
const coins = input.slice(1).map(Number).sort((a, b) => b - a);

let rest = K;
let cnt = 0;
for (const coin of coins) {
    cnt += Math.floor(rest / coin);
    rest %= coin;
    if (rest === 0) break;
}
console.log(cnt);