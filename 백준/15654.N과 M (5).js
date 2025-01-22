const [[N, M], nums] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n").map(v => v.split(" ").map(Number));

nums.sort((a, b) => a - b);

let answer = [];
let current = [];
let visited = Array(N).fill(0);

const dfs = () => {
    if (current.length === M) {
        answer.push(current.join(" "));
        return;
    }

    for (let i = 0; i < N; i++) {
        if (visited[i]) continue;
        current.push(nums[i]);
        visited[i] = 1;
        dfs(i);
        current.pop();
        visited[i] = 0
    }
}

dfs(-1);

console.log(answer.join("\n"));