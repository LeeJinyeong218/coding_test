const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const N = +input[0];
const nums = input[1].split(" ").map(Number);

let dpAsc = Array(N).fill(1); // i까지 오름차순 최대 길이
let dpDesc = Array(N).fill(1); // i부터 내림차순 최대 길이

dpAsc[0] = 1;
for (let i = 1; i < N; i++) {
    for (let j = i - 1; j >= 0; j--) {
        if (nums[j] < nums[i]) {
            dpAsc[i] = Math.max(dpAsc[i], dpAsc[j] + 1);
        }
    }
}

dpDesc[N - 1] = 1;
for (let i = N - 2; i >= 0; i--) {
    for (let j = i + 1; j < N; j++) {
        if (nums[j] < nums[i]) {
            dpDesc[i] = Math.max(dpDesc[i], dpDesc[j] + 1);
        }
    }
}

const lengths = [];
for (let i = 0; i < N; i++) {
    lengths.push(dpAsc[i] + dpDesc[i] - 1);
}

console.log(Math.max(...lengths));