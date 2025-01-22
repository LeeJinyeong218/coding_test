const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const [R, C, T] = input[0].trim().split(" ").map(Number);
const room = input.slice(1).map(v => v.trim().split(" ").map(Number));
const d = [[1, 0], [-1, 0], [0, 1], [0, -1]];

let top = 0;
let bottom = 0;
for (let i = 0; i < R; i++) {
    if (room[i][0] === -1) {
        top = i;
        bottom = top + 1;
        break;
    }
}

const 확산 = () => {
    let div = Array.from(Array(R), () => Array(C).fill(0));

    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (room[i][j] !== -1) {
                const val_div = Math.floor(room[i][j] / 5);

                for (let [dx, dy] of d) {
                    const [nx, ny] = [i + dx, j + dy];
                    if (nx >= 0 && nx < R && ny >= 0 && ny < C && room[nx][ny] !== -1) {
                        div[nx][ny] += val_div;
                        div[i][j] -= val_div;
                    }
                }
            }
        }
    }

    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (room[i][j] === -1) continue;
            room[i][j] += div[i][j];
        }
    }
}

const 순환 = () => {
    // 위쪽 공기청정기 순환 (반시계 방향)
    for (let row = top - 1; row > 0; row--) room[row][0] = room[row - 1][0];
    for (let col = 0; col < C - 1; col++) room[0][col] = room[0][col + 1];
    for (let row = 0; row < top; row++) room[row][C - 1] = room[row + 1][C - 1];
    for (let col = C - 1; col > 1; col--) room[top][col] = room[top][col - 1];
    room[top][1] = 0;
    room[top][0] = -1;

    // 아래쪽 공기청정기 순환 (시계 방향)
    for (let row = bottom + 1; row < R - 1; row++) room[row][0] = room[row + 1][0];
    for (let col = 0; col < C - 1; col++) room[R - 1][col] = room[R - 1][col + 1];
    for (let row = R - 1; row > bottom; row--) room[row][C - 1] = room[row - 1][C - 1];
    for (let col = C - 1; col > 1; col--) room[bottom][col] = room[bottom][col - 1];
    room[bottom][1] = 0;
    room[bottom][0] = -1;
}

for (let i = 0; i < T; i++) {
    확산();
    순환();
}
console.log(room.flat().reduce((p, n) => p + n, 2));