const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const city = input.slice(1).map(v => v.split(" ").map(Number));

let houses = [];
let chickens = [];

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (city[i][j] === 1) {
            houses.push([i, j]);
        } else if (city[i][j] === 2) {
            chickens.push([i, j]);
        }
    }
}

const check = new Array(chickens.length).fill(false);

const getMin = () => {
    let sum = 0;
    houses.forEach(([i, j]) => {
        let min = Infinity;
        chickens.forEach((_, idx) => {
            if (check[idx] === true) {
                const [ci, cj] = chickens[idx];
                min = Math.min(min, Math.abs(i - ci) + Math.abs(j - cj))
            }
        })
        sum += min;
    })

    return sum;
}

let answer = Infinity;

const dfs = (idx, cnt) => {
    if (cnt === M) {
        answer = Math.min(answer, getMin());
        return;
    } else {
        for (let i = idx; i < chickens.length; i++) {
            if (check[i] === true) continue;
            check[i] = true;
            dfs(i, cnt + 1);
            check[i] = false;
        }
    }
}

dfs(0, 0);
console.log(answer);