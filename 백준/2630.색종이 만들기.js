const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const N = +input[0];
const paper = input.slice(1).map(v => v.split(" ").map(Number));

let counts = [0, 0];

// 범위 안의 색종이가 모두 같은 색인지 확인
const isAllPainted = (start_r, start_c, n) => {
    const end_r = start_r + n;
    const end_c = start_c + n;

    let color = paper[start_r][start_c];

    for (let i = start_r; i < end_r; i++) {
        for (let j = start_c; j < end_c; j++) {
            if (paper[i][j] !== color) {
                return false;
            }
        }
    }

    return true;
}

// 모두 같은 색상인지 확인하고 맞으면 counts에 추가
// 아니라면 4분할해서 다시 계산
const sol = (start_r, start_c, n) => {
    if (n === 1 || isAllPainted(start_r, start_c, n)) {
        counts[paper[start_r][start_c]]++;
    } else {
        const half = n / 2;
        sol(start_r, start_c, half);
        sol(start_r + half, start_c, half);
        sol(start_r + half, start_c + half, half);
        sol(start_r, start_c + half, half);
    }
}

sol(0, 0, N);

console.log(counts.join("\n"));