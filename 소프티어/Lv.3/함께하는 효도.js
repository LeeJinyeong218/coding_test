const input = require('fs').readFileSync(0).toString().trim().split("\n");

const [n, m] = input[0].trim().split(" ").map(Number);
const grid = input.slice(1, 1 + n).map(v => v.trim().split(" ").map(Number));
const friends = input.slice(1 + n).map(v => v.trim().split(" ").map(v => +v - 1));
const d = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const sol = () => {
    let visited = Array.from(Array(n), () => Array(n).fill(false));
    const l = friends.length;
    let cur_friends = friends.map(v => [...v]);
    let result = 0;
    friends.forEach(([x, y]) => {
        visited[x][y] = true;
        result += grid[x][y];
    })
    let max = result;

    const dfs = (f_idx, time) => {
        if (time > 3) {
            max = Math.max(max, result);
            return;
        }

        const [x, y] = cur_friends[f_idx];

        for (let [dx, dy] of d) {
            const [nx, ny] = [x + dx, y + dy];

            if (
                nx >= 0 && nx < n && ny >= 0 && ny < n &&
                !cur_friends.slice(0, f_idx).includes(f_idx)
            ) {
                if (visited[nx][ny]) {
                    cur_friends[f_idx] = [nx, ny];
                    if (f_idx < l - 1) {
                        dfs(f_idx + 1, time);
                    } else {
                        dfs(0, time + 1);
                    }
                    cur_friends[f_idx] = [x, y];
                } else {
                    result += grid[nx][ny];
                    visited[nx][ny] = true;
                    cur_friends[f_idx] = [nx, ny];
                    if (f_idx < l - 1) {
                        dfs(f_idx + 1, time);
                    } else {
                        dfs(0, time + 1);
                    }
                    result -= grid[nx][ny];
                    visited[nx][ny] = false;
                    cur_friends[f_idx] = [x, y];
                }
            }
        }
    }
    dfs(0, 1);
    return max;
}

console.log(sol());