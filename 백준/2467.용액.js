const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const N = +input[0].trim();
const arr = input[1].trim().split(" ").map(Number);

let l = 0;
let r = N - 1;

let diff = Infinity;
let answer = [l, r];

while (l < r) {
    const sum = arr[l] + arr[r];

    if (sum === 0) {
        answer = [l, r];
        break;
    }

    if (diff > Math.abs(sum)) {
        diff = Math.abs(sum);
        answer = [l, r];
    }

    if (sum < 0) {
        l++;
    } else {
        r--;
    }
}

console.log(answer.map(i => arr[i]).join(" "));