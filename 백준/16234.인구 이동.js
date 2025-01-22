// chatgpt 효율 수정
// 메모리 1/20, 시간 1/5
let [[N, L, R], ...A] = require('fs').readFileSync('dev/stdin')
    .toString().trim().split("\n")
    .map(v => v.split(" ").map(Number));

const d = [[-1, 0], [1, 0], [0, -1], [0, 1]];
let t = 0;

// 새로운 인구정보를 code로 저장 -> 연결된 국가의 위치를 union 배열에 저장해서 처리
// update로 처리(flag)

while (true) {
    let visited = Array.from(Array(N), () => Array(N).fill(false)); // visited 재사용
    let updated = false;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (!visited[i][j]) {
                let q = [[i, j]];
                let union = [];
                let sum = 0, count = 0; // obj로 묶지 않고 sum, count 별도 처리

                while (q.length) {
                    const [x, y] = q.shift();
                    if (visited[x][y]) continue;

                    visited[x][y] = true;
                    union.push([x, y]);
                    sum += A[x][y];
                    count++;

                    for (let [dx, dy] of d) {
                        const [nx, ny] = [x + dx, y + dy];
                        if (
                            nx >= 0 && nx < N && ny >= 0 && ny < N &&
                            !visited[nx][ny]
                        ) {
                            const diff = Math.abs(A[x][y] - A[nx][ny]);
                            if (diff >= L && diff <= R) {
                                q.push([nx, ny]);
                            }
                        }
                    }
                }

                if (union.length > 1) {
                    const newPop = Math.floor(sum / count);
                    union.forEach(([x, y]) => A[x][y] = newPop);
                    updated = true;
                }
            }
        }
    }

    if (!updated) break;
    t++;
}

console.log(t);
