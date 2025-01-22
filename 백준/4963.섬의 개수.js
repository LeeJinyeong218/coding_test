const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n").map(i => i.trim().split(" ").map(Number));
const d = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

const getIsland = (w, h, grid) => {
    let visited = Array.from(Array(h), () => Array(w).fill(false));
    let count = 0;

    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            if (grid[i][j] && !visited[i][j]) {
                count++;
                let q = [[i, j]];
                visited[i][j] = true;

                while (q.length > 0) {
                    const [cx, cy] = q.shift();

                    for (let [dx, dy] of d) {
                        const nx = cx + dx;
                        const ny = cy + dy;

                        if (nx >= 0 && nx < h && ny >= 0 && ny < w && grid[nx][ny] && !visited[nx][ny]) {
                            q.push([nx, ny]);
                            visited[nx][ny] = true;
                        }
                    }
                }
            }
        }
    }

    return count;
}

let idx = 0;
while (input[idx]) {
    const [w, h] = input[idx];
    if (!w && !h) break;
    idx++;
    const grid = input.slice(idx, idx + h);

    // 출력
    console.log(getIsland(w, h, grid));

    idx = idx + h;
}

