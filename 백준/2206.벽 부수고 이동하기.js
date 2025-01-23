const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const [N, M] = input[0].trim().split(" ").map(Number);
const map = input.slice(1).map((v) => v.trim().split("").map(Number));
const d = [[1, 0], [-1, 0], [0, 1], [0, -1]];

const bfs = () => {
    const visited = Array.from(Array(N), () => Array(M).fill().map(() => [Infinity, Infinity]));
    const queue = [[0, 0, 0, 1]]; // [x, y, wall_broken, distance]
    visited[0][0][0] = 1; // 시작 지점에서 벽 부수지 않은 상태
    let head = 0;

    while (head < queue.length) {
        const [x, y, wall_broken, dist] = queue[head++];

        if (x === N - 1 && y === M - 1) return dist; // 도착 지점

        for (const [dx, dy] of d) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
                // 이동 가능한 경우
                if (map[nx][ny] === 0 && dist + 1 < visited[nx][ny][wall_broken]) {
                    visited[nx][ny][wall_broken] = dist + 1;
                    queue.push([nx, ny, wall_broken, dist + 1]);
                }
                // 벽을 부수고 이동하는 경우
                if (map[nx][ny] === 1 && wall_broken === 0 && dist + 1 < visited[nx][ny][1]) {
                    visited[nx][ny][1] = dist + 1;
                    queue.push([nx, ny, 1, dist + 1]);
                }
            }
        }
    }

    return -1;
};

console.log(bfs());
