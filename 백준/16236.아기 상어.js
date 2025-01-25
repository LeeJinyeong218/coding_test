const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const N = +input[0].trim();
const map = input.slice(1).map(v => v.split(" ").map(Number));
const d = [[-1, 0], [0, -1], [1, 0], [0, 1]];

let size = 2;
let eatCount = 0;
let baby;

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (map[i][j] === 9) {
            baby = [i, j];
            map[i][j] = 0;
            break;
        }
    }
}

const bfs = () => {
    let visited = Array.from(Array(N), () => Array(N).fill(false));
    let q = [[...baby, 0]];
    let candidates = []; // 후보 관리
    visited[baby[0]][baby[1]] = true;

    while (q.length) {
        let [x, y, dist] = q.shift();

        for (let [dx, dy] of d) {
            const [nx, ny] = [x + dx, y + dy];

            if (
                nx >= 0 && nx < N && ny >= 0 && ny < N &&
                !visited[nx][ny] && map[nx][ny] <= size
            ) {
                visited[nx][ny] = true;

                if (map[nx][ny] && map[nx][ny] < size) {
                    candidates.push([nx, ny, dist + 1]);
                } else {
                    q.push([nx, ny, dist + 1]);
                }
            }
        }
    }

    if (candidates.length) {
        candidates.sort((a, b) =>
            a[2] - b[2] || a[0] - b[0] || a[1] - b[1]
        );

        let [nx, ny, dist] = candidates[0];
        map[nx][ny] = 0;
        eatCount++;
        if (eatCount === size) {
            size++;
            eatCount = 0;
        }
        baby = [nx, ny];
        return dist;
    }

    return 0;
};

const sol = () => {
    let answer = 0;

    while (true) {
        const result = bfs();
        if (!result) break;
        answer += result;
    }

    return answer;
};

console.log(sol());