const [[M, N, H], ...tomatoes] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n")
                .map(v => v.split(" ").map(Number));
const total_row_length = N * H;

// 모든 좌표는 행 열 높이로 정리한다.
const d = [[-1, 0], [0, -1], [0, 1], [N, 0], [-N, 0], [1, 0]];

const bfs = () => {
    let q = [];
    let head = 0;
    let count_0 = 0;

    for (let i = 0; i < total_row_length; i++) {
        for (let j = 0; j < M; j++) {
            if (tomatoes[i][j] === 1) {
                q.push([i, j, 0]);
            } else if (!tomatoes[i][j]) {
                count_0++;
            }
        }
    }

    if (!count_0) return 0;

    while (q[head]) {
        const [r, c, t] = q[head];
        head++;

        let optional_d = d;
        if (r % N === 0) {
            optional_d = d.slice(1);
        } else if (r % N === N - 1) {
            optional_d = d.slice(0, 5);
        }
    
        for (let [dr, dc] of optional_d) {
            const nr = r + dr;
            const nc = c + dc;

            if (nr >= 0 && nr < total_row_length && nc >= 0 && nc < M && !tomatoes[nr][nc]) {
                tomatoes[nr][nc] = 1;
                count_0--;
        
                if (!count_0) {
                    return t + 1;
                }
        
                q.push([nr, nc, t + 1]);
            }
        }
    }

    return -1;
}

console.log(bfs());