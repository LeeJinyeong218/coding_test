const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const N = +input[0];
const map = input.slice(1).map(v => v.split("").map(Number));
const d = [[1, 0], [0, 1], [-1, 0], [0, -1]];

const sol = () => {
    let answer = [];
    let visited = Array.from(Array(N), () => Array(N).fill(false));

    const bfs = (i, j) => {
        let q = [[i, j]];
        visited[i][j] = true;
        let count = 1;

        while (q.length) {
            const [x, y] = q.shift();

            for (let [dx, dy] of d) {
                const [nx, ny] = [x + dx, y + dy];

                if (
                    nx >= 0 && nx < N && ny >= 0 && ny < N &&
                    map[nx][ny] && !visited[nx][ny]
                ) {
                    visited[nx][ny] = true;
                    q.push([nx, ny]);
                    count++;
                }
            }
        }

        return count;
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (map[i][j] && !visited[i][j]) {
                answer.push(bfs(i, j));
            }
        }
    }

    answer.sort((a, b) => a - b);
    console.log(answer.length + "\n" + answer.join("\n"));
}

sol();