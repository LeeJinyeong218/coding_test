const [[N, _], ...rel] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n")
                        .map(v => v.split(" ").map(Number));

const steps = Array.from({ length : N }, () => Array(N).fill(Infinity));

// 번호 - 1을 인덱스로 하여 설정
rel.forEach(([s, e]) => {
    steps[s - 1][e - 1] = 1;
    steps[e - 1][s - 1] = 1;
})

// 최소 베이컨 구하기
for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            if (steps[i][k] + steps[k][j] < steps[i][j]) {
                steps[i][j] = steps[i][k] + steps[k][j];
                steps[j][i] = steps[i][j];
            }
        }
    }
}

// 0부터 순회하면서 최소 베이컨의 번호 구하기
let answer = null;
let min_bacon = Infinity;

for (let i = 0; i < N; i++) {
    steps[i][i] = 0;

    const sum = steps[i].reduce((p, n) => p + n, 0);
    if (min_bacon > sum) {
        answer = i + 1;
        min_bacon = sum;
    }
}

console.log(answer);
