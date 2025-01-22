const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const N = +input[0]
const dices = input.slice(1).map(v => v.split(" ").map(BigInt));
const MODULAR = 1000000007n;

const getPow = (val, exp) => {
    if (exp === 1n) {
        return val;
    }

    const temp = getPow(val, exp / 2n);

    if (exp % 2n === 1n) {
        return (temp * temp) % MODULAR * val % MODULAR;
    }
    return (temp * temp) % MODULAR;
}

let answer = 0n;

dices.forEach(([n, s]) => {
    answer = (answer + s * getPow(n, MODULAR - 2n)) % MODULAR;
})

console.log(parseInt(answer));