const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const map = input.slice(1).map(v => v.split(" ").map(Number));
const WALL_COUNT = 3;
const d = [[0, 1], [0, -1], [1, 0], [-1, 0]];

const bfs = map_copy => {
    let cnt = 0;
    let virus = []
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (map_copy[i][j] === 2) {
                virus.push([i, j]);
            }
        }
    }

    while (virus.length) {
        const [x, y] = virus.shift();

        for (let [dx, dy] of d) {
            const [nx, ny] = [x + dx, y + dy];

            if (nx >= 0 && nx < n && ny >= 0 && ny < m && map_copy[nx][ny] === 0) {
                map_copy[nx][ny] = 2;
                virus.push([nx, ny]);
            }
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (map_copy[i][j] === 0) {
            cnt += 1;
          }
        }
    }

    return cnt;
}

let answer = 0;
const dfs = wall => {
    if (wall === WALL_COUNT) {
        answer = Math.max(answer, bfs(map.map(v => [...v])))
        return;
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (map[i][j] === 0) {
            map[i][j] = 1;
            dfs(wall + 1);
            map[i][j] = 0;
          }
        }
      }
}
dfs(0);

console.log(answer);