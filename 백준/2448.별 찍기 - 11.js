const input = +require('fs').readFileSync('dev/stdin').toString().trim();

const answer = Array.from(Array(input), () => Array(2 * input - 1).fill(" "));

const base = [
    [" ", " ", "*", " ", " "],
    [" ", "*", " ", "*", " "],
    ["*", "*", "*", "*", "*"],
]

const dfs = (r, c, n) => {
    if (n === 3) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 5; j++) {
                answer[r + i][c + j] = base[i][j];
            }
        }
        return;
    }

    dfs(r, c + n / 2, n / 2);
    dfs(r + n / 2, c, n / 2);
    dfs(r + n / 2, c + n, n / 2);
}

dfs(0, 0, input);

console.log(answer.map(v => v.join("")).join("\n"));