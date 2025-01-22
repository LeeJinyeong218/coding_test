const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const campus = input.slice(1).map(v => v.split(""));

const d = [[1, 0], [0, 1], [-1, 0], [0, -1]];

const visited = Array.from({ length : N }, () => Array(M).fill(false));

const bfs = (i, j) => {
    let answer = 0;
    let q = [[i, j]];
    visited[i][j] = true;

    while (q.length) {
        const [x, y] = q.shift();

        for (let [dx, dy] of d) {
            const [nx, ny] = [x + dx, y + dy];

            if (nx >= 0 && nx < N && ny >= 0 && ny < M && campus[nx][ny] && campus[nx][ny] !== "X" && !visited[nx][ny]) {
                q.push([nx, ny]);
                visited[nx][ny] = true;

                if (campus[nx][ny] === "P") answer++;
            }
        }
    }

    return answer ? answer : "TT";
}

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (campus[i][j] === "I") {
            console.log(bfs(i, j));
            break;
        }
    }
}

