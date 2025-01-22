const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const [n, m] = input[0].trim().split(" ").map(Number);
const nums = input[1].trim().split(" ").map(Number).sort((a, b) => a - b);

let answer = new Set();

let visited = Array(n).fill(false);
const dfs = (arr) => {
    if (arr.length === m) {
        if (!answer.has(arr.join(" "))) {
            console.log(arr.join(' '));
            answer.add(arr.join(" "));
        }
        return;
    }

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            visited[i] = true;
            dfs([...arr, nums[i]]);
            visited[i] = false;
        }
    }
}

dfs([]);