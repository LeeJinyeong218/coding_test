const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const N = +input[0].trim();
const counts = input[1].trim().split(" ").map(Number); // 왼쪽에 더 큰 사람 수 (맨 마지막 부터)

let person = 1;
let q = Array(N).fill(0);

while (person <= N) { // 사람을 모두 배치할 때까지 반복
    const count = counts[person - 1]; // 옆에 큰 사람 몇 명인지

    let k = 0;
    for (let i = 0; i < N; i++) {
        if (q[i] === 0) {
            k++;
            if (k === count + 1) {
                q[i] = person;
            }
        }
    } // 이미 채워진 값을 제외하고 0인 칸에서 count + 1에 해당 person을 넣는다.
    person++;
}

console.log(q.join(" "));