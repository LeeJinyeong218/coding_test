const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split("\n");

const [N, K] = input[0].trim().split(" ").map(Number);
const arr = input[1].trim().split(" ").map(Number);

let l = 0;
let r = N - 1;
let count = Array(100001).fill(0);

for (let i = 0; i < N; i++) {
    if (count[arr[i]] >= K) {
        r = i - 1;
        break;
    }

    count[arr[i]]++;
}

let max = r - l + 1;

while (l < N) {
    count[arr[l]]--;
    l++;

    while (r < N - 1)  {
        if (count[arr[r + 1]] >= K) {
            break;
        }
        r++;
        count[arr[r]]++;
    }

    max = Math.max(r - l + 1, max);
}

console.log(max);