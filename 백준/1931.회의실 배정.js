const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const N = +input[0];
const meetings = input.slice(1).map(v => v.split(" ").map(Number));

meetings.sort((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]);

let count = 0;
let lastEndTime = 0;

for (let i = 0; i < N; i++) {
    const [start, end] = meetings[i];
    if (start >= lastEndTime) {
        count++;
        lastEndTime = end;
    }
}

console.log(count);