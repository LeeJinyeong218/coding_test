// 해결 but 메모리 해결 필요
const [[M, N], ...tomatoes] = require('fs').readFileSync('dev/stdin').toString().trim()
                            .split("\n").map(v => v.split(" ").map(Number));

const d = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const getDays = () => {
    let q = [];
    let head = 0; // shift()가 시간을 많이 잡아먹어 head로 shift()하는 것처럼 처리
    let zero_count = 0; // 0의 개수

    // 초기 1의 위치 확인 + 0의 개수 카운트
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (tomatoes[i][j] === 1) {
                q.push([i, j, 0]);
            } else if (tomatoes[i][j] === 0) {
                zero_count++;
            }
        }
    }

    // 이미 다 익었다면 0 반환
    if (zero_count === 0) {
        return 0;
    }

    // head가 배열 밖을 가르키지 않게 처리
    while (head < q.length) {
        const [x, y, count] = q[head];
        head++;

        for (let [dx, dy] of d) {
            const nx = x + dx, ny = y + dy;

            if (nx >= 0 && nx < N && ny >= 0 && ny < M && tomatoes[nx][ny] === 0) {
                tomatoes[nx][ny] = 1;
                zero_count--;
                q.push([nx, ny, count + 1]);
            }
        }

        if (zero_count === 0) return count + 1;
    }

    return -1 // head가 q를 넘을 때 (0은 남았는데 더 나갈 수 없는 경우)
}

console.log(getDays());
