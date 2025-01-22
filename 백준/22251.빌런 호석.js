const NUMS_N = 10;
const NUMS = [
    [true, true, true, false, true, true, true],
    [false, false, true, false, false, true, false],
    [true, false, true, true, true, false, true],
    [true, false, true, true, false, true, true],
    [false, true, true, true, false, true, false],
    [true, true, false, true, false, true, true],
    [true, true, false, true, true, true, true],
    [true, false, true, false, false, true, false],
    [true, true, true, true, true, true, true],
    [true, true, true, true, false, true, true],
];

const [N, K, P, X] = require('fs').readFileSync('dev/stdin')
                        .toString().trim().split(" ").map(Number);

let reverse_counts = Array.from(Array(NUMS_N), () => Array(NUMS_N).fill(0));

for (let i = 0; i < NUMS_N; i++) {
    for (let j = i + 1; j < NUMS_N; j++) {
        const reverse_count = NUMS[i].reduce((p, n, idx) => n !== NUMS[j][idx] ? p + 1 : p , 0);
        reverse_counts[i][j] = reverse_count;
        reverse_counts[j][i] = reverse_count;
    }
}

// 1 ~ P 개를 반전
// K는 자리 수
// 디스플레이 수가 1 ~ N
// 실제 번호 X

// 각 자리의 숫자 채우기
let current = X.toString().split("").map(Number);

while (current.length < K) {
    current.unshift(0);
}

let answer = 0;

const dfs = (cur_idx, num, accum) => {
    if (cur_idx < K) {
        for (let i = 0; i < NUMS_N; i++) {
            const new_accum = accum + reverse_counts[current[cur_idx]][i];
            const new_num = num * 10 + i
            if (new_accum <= P && new_num * (10 ** (K - cur_idx - 1)) <= N) {
                
                dfs(cur_idx + 1, new_num, new_accum);
            }
        }
    } else {
        // 모두 순회
        if (num > 0 && num <= N && accum > 0 && accum <= P) {     
            answer++;
        }
    }
}

dfs(0, 0, 0);

console.log(answer);