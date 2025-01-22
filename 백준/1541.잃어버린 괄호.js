const input = require('fs').readFileSync('dev/stdin').toString().trim();

// -로 분리
const parts = input.split("-");
const getSum = eq => {
    return eq.split("+").reduce((p, n) => p + +n, 0)
}

let answer = getSum(parts[0]);

if (parts.length > 1) {
    answer -= parts.slice(1).map(v => getSum(v)).reduce((p, n) => p + n, 0)
}

console.log(answer);