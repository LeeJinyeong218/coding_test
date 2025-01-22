const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const n = +input[0].trim() // 지방
const reqs = input[1].trim().split(" ").map(Number); // 요청 예산
const total = +input[2].trim(); // 총 예산

const getSum = (limit) => {
    let sum = 0;
    reqs.forEach(req => {
        if (req < limit) sum += req;
        else sum += limit;
    })
    return sum;
}

// 상한가 이진탐색
let l = 1; // total이 모든 요청들보다 작을 때가 있다
let r = Math.max(...reqs);

let answer = l;

while (l <= r) {
    const mid = Math.floor((l + r) / 2);

    if (getSum(mid) > total) {
        r = mid - 1;
    } else {
        answer = Math.max(answer, mid);
        l = mid + 1;
    }
}

console.log(answer);