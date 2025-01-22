const reader = require('readline').Interface({
    input: require('fs').createReadStream('dev/stdin'),
    output: undefined
})

let N, M;
let table = [];
let answer = [];

reader.on("line", line => {
    if (!N) {
        [N, M] = line.split(" ").map(Number);
    } else if (table.length < N) {
        const idx = table.length;
        table.push(line.split(" ").map(Number));
        if (idx === 0) {
            for (let i = 1; i < N; i++) {
                table[idx][i] = table[idx][i - 1] + table[idx][i];
            }
        } else {
            table[idx][0] = table[idx - 1][0] + table[idx][0];
            for (let i = 1; i < N; i++) {
                table[idx][i] = table[idx - 1][i] + table[idx][i - 1] - table[idx - 1][i - 1] + table[idx][i];
            }
        }
    } else {
        [x1, y1, x2, y2] = line.split(" ").map(v => +v - 1);
        let sum = 0;

        if (x1 === 0 && y1 === 0) {
            sum = table[x2][y2];
        } else if (x1 === 0) {
            sum = table[x2][y2] - table[x2][y1 - 1];
        } else if (y1 === 0) {
            sum = table[x2][y2] - table[x1 - 1][y2];
        } else {
            sum = table[x2][y2] + table[x1 - 1][y1 - 1] - table[x1 - 1][y2] - table[x2][y1 - 1];
        }
        answer.push(sum);
    }
})

reader.on('close', () => {
    console.log(answer.join("\n"));
})