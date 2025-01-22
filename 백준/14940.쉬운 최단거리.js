const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const grid = input.slice(1).map(v => v.trim().split(" ").map(Number));
const d = [[-1, 0], [1, 0], [0, -1], [0, 1]];
let answer = grid.map(r => r.map(v => v === 1 ? -1 : 0));

let target = null;

for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (grid[i][j] === 2) {
            target = [i, j];
            break;
        }
    }
}

let visited = Array.from(Array(n), () => Array(m).fill(false));

let q = [target];
visited[target[0]][target[1]] = true;

while (q.length > 0) {
    const [cx, cy] = q.shift();
    const count = answer[cx][cy];

    for (let [dx, dy] of d) {
        const nx = cx + dx;
        const ny = cy + dy;

        if (nx >= 0 && nx < n && ny >= 0 && ny < m && grid[nx][ny] > 0 && !visited[nx][ny]) {
            answer[nx][ny] = count + 1;
            visited[nx][ny] = true;
            q.push([nx, ny])
        }
    }
}

console.log(answer.map(v => v.join(" ")).join("\n"));