const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const n = +input[0].trim();
const S = input.slice(1).map(i => i.trim().split(" ").map(Number));

const getScore = (arr) => {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            count += S[arr[i]][arr[j]] + S[arr[j]][arr[i]];
        }
    }
    return count;
}

let minDifference = Infinity;
let visited = Array(n).fill(false);

const dfs = (idx, count) => {
    // 팀이 절반으로 나눠졌을 때
    if (count === n / 2) {
        let team1 = [], team2 = [];
        for (let i = 0; i < n; i++) {
            if (visited[i]) team1.push(i);
            else team2.push(i);
        }
        const difference = Math.abs(getScore(team1) - getScore(team2));
        minDifference = Math.min(minDifference, difference);
        return;
    }

    // 백트래킹
    for (let i = idx; i < n; i++) {
        if (!visited[i]) {
            visited[i] = true;
            dfs(i + 1, count + 1);
            visited[i] = false;
        }
    }
};

dfs(0, 0);
console.log(minDifference);
