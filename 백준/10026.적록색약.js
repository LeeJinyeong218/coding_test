const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n")
const N = +input[0];
const pic = input.slice(1).map(v => v.split(""));

const d = [[-1, 0], [0, 1], [0, -1], [1, 0]];

let visitedRG = Array.from({length : N}, () => Array(N).fill(false));
let visitedNonRG = Array.from({length : N}, () => Array(N).fill(false));

const isEqualRG = (color1, color2) => {
    if (
        (color1 === "R" || color1 === "G") && color2 === "B" ||
        (color2 === "R" || color2 === "G") && color1 === "B"
    ) return false;
    return true;
}

const bfsRG = (i, j, color) => {
    let q = [[i, j]];
    visitedRG[i][j] = true;

    while (q.length) {
        const [x, y] = q.shift();

        for (let [dx, dy] of d) {
            const nx = x + dx, ny = y + dy;

            if (nx >= 0 && nx < N && ny >= 0 && ny < N &&
                !visitedRG[nx][ny] && isEqualRG(color, pic[nx][ny])) {
                q.push([nx, ny]);
                visitedRG[nx][ny] = true;
            }
        }
    }
}

const bfsNonRG = (i, j, color) => {
    let q = [[i, j]];
    visitedNonRG[i][j] = true;

    while (q.length) {
        const [x, y] = q.shift();

        for (let [dx, dy] of d) {
            const nx = x + dx, ny = y + dy;

            if (nx >= 0 && nx < N && ny >= 0 && ny < N &&
                !visitedNonRG[nx][ny] && pic[nx][ny] === color) {
                q.push([nx, ny]);
                visitedNonRG[nx][ny] = true;
            }
        }
    }
}

let answer = [0, 0];

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        const color = pic[i][j];

        if (!visitedRG[i][j]) {
            answer[1]++;
            bfsRG(i, j, color);
        }
        if (!visitedNonRG[i][j]) {
            answer[0]++;
            bfsNonRG(i, j, color);
        }
    }
}

console.log(answer.join(" "));