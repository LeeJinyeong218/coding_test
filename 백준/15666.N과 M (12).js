const [[N, M], nums] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n").map(v => v.split(" ").map(Number));

nums.sort((a, b) => a - b);

let answer = [];
let current = [];

const dfs = cur_idx => {
    if (current.length === M) {
        answer.push(current.join(" "));
        return;
    }

    let visited = new Set();
    for (let i = cur_idx; i < N; i++) {
        const num = nums[i];
        if (visited.has(num)) continue;
        current.push(num);
        visited.add(num);
        dfs(i);
        current.pop();
    }
}

dfs(0);
console.log(answer.join("\n"));