const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const N = +input[0];
const M = +input[1];
const S = input[2];

const getCount = (n, m) => {
    if (m < n) return 0;
    return m - n + 1;
}

let answer = 0;
let n = null;

for (let i = 0; i < M - 1; i++) {
    if (n === null && S.charAt(i) === "I") {
        n = 0;
        continue;
    }

    if (n !== null) {
        if (S.charAt(i) === "O" && S.charAt(i + 1) === "I") {
            n++;
            i++;
        } else {
            answer += getCount(N, n);
            n = null;
            i--;
        }
    }
}

if (n !== null) {
    answer += getCount(N, n);
}

console.log(answer);