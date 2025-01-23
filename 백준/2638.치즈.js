const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const [N, M] = input[0].trim().split(" ").map(Number);
const grid = input.slice(1).map(v => v.trim().split(" ").map(Number));
const d = [[-1, 0], [1, 0], [0, -1], [0, 1]];

// 외부공기 체크
const checkExternal = () => {
    let visited = Array.from(Array(N), () => Array(M).fill(false));
    grid[0][0] = -1;
    let q = [[0, 0]];
    visited[0][0] = true;

    while (q.length) {
        const [x, y] = q.shift();

        for (let [dx, dy] of d) {
            const [nx, ny] = [x + dx, y + dy];

            if (nx >= 0 && nx < N && ny >= 0 && ny < M && grid[nx][ny] < 1 && !visited[nx][ny]) {
                grid[nx][ny] = -1;
                visited[nx][ny] = true;
                q.push([nx, ny]);
            }
        }
    }
}

// 치즈 녹이기
const melt = () => {
    let flag = false;
    let visited = Array.from(Array(N), () => Array(M).fill(false));

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (grid[i][j] === 1) {
                flag = true;
                visited[i][j] = true;
                let q = [[i, j]];

                while (q.length) {
                    const [x, y] = q.shift();

                    let count = 0;

                    for (let [dx, dy] of d) {
                        const [nx, ny] = [x + dx, y + dy];

                        if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
                            if (grid[nx][ny] === -1) {
                                count++;
                            } else if (!visited[nx][ny] && grid[nx][ny] === 1) {
                                q.push([nx, ny]);
                                visited[nx][ny] = true;
                            }
                        }
                    }

                    if (count > 1) {
                        // 녹는 조건
                        grid[x][y] = -2;
                    }
                }
            }
        }
    }

    return flag;
}

let t = 0;
checkExternal();

while (true) {
    const flag = melt();
    if (!flag) break;
    checkExternal();
    t++;
}

console.log(t);