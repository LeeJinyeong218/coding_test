const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

let A = input[1].split(" ").map(Number);
let B = input[3].split(" ").map(Number);

const max = Math.max(...A, ...B);
let answer = [];

for (let i = max; i > 0; i--) {
    while (true) {
        if (!A.includes(i) || !B.includes(i)) {
            break;
        }

        answer.push(i);
        A = A.slice(A.indexOf(i) + 1);
        B = B.slice(B.indexOf(i) + 1);
    }
}

console.log(answer.length + "\n" + answer.join(" "));