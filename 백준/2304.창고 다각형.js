const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const n = +input[0].trim();
const arr = input.slice(1).map(i => i.trim().split(' ').map(Number)).sort((a, b) => a[0] - b[0]);

const maxHIdx = arr.reduce((idx, [_, y], i) => y > arr[idx][1] ? i : idx, 0);

let leftArea = 0;
let leftIdx = 0; // 전 최고 높이, 그 x좌표를 저장

for (let i = leftIdx; i < maxHIdx; i++) {
    if (arr[leftIdx][1] < arr[i][1]) {
        leftArea += (arr[i][0] - arr[leftIdx][0]) * arr[leftIdx][1];
        leftIdx = i;
    }
}
leftArea += arr[leftIdx][1] * (arr[maxHIdx][0] - arr[leftIdx][0]);

let rightArea = 0;
let rightIdx = n - 1;

for (let i = rightIdx; i > maxHIdx; i--) {
    if (arr[rightIdx][1] < arr[i][1]) {
        rightArea += (arr[rightIdx][0] - arr[i][0]) * arr[rightIdx][1];
        rightIdx = i;
    }
}
rightArea += arr[rightIdx][1] * (arr[rightIdx][0] - arr[maxHIdx][0]);

console.log(leftArea + arr[maxHIdx][1] + rightArea);