const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const [R, C] = input[0].trim().split(" ").map(Number);
const board = input.slice(1).map(v => v.trim().split(""));
const d = [[0, 1], [1, 0], [-1, 0], [0, -1]];

let set = new Set();
let visited = Array.from(Array(R), () => Array(C).fill(false));
let answer = 0;

const dfs = (x, y, n) => {
    answer = Math.max(answer, n);

    for (let [dx, dy] of d) {
        const [nx, ny] = [x + dx, y + dy];

        if (nx >= 0 && nx < R && ny >= 0 && ny < C && !visited[nx][ny] && !set.has(board[nx][ny])) {
            const char = board[nx][ny];
            set.add(char);
            visited[nx][ny] = true;
            dfs(nx, ny, n + 1);
            visited[nx][ny] = false;
            set.delete(char);
        }
    }
}

visited[0][0] = true;
set.add(board[0][0]);
dfs(0, 0, 1);

console.log(answer);