const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const T = +input[0].trim() // test data number

let i = 1;
while (input[i]) {
    const [n, k, t, m] = input[i].split(" ").map(Number);
    const sols = input.slice(i + 1, i + m + 1).map(r => r.trim().split(" ").map(Number));

    // 팀 순위 출력
    let table = Array.from(Array(n + 1), () => Array(k + 1).fill(0)); // 팀 개수 * 문제 개수
    let submitCount = Array(n + 1).fill(0);
    let lastSubmit = Array(n + 1).fill(k);

    sols.forEach(([i, j, s], idx) => {
        if (table[i][j] < s) {
            table[i][j] = s;
        }
        submitCount[i]++;
        lastSubmit[i] = idx;
    })

    let teams = Array(n).fill(0).map((_, i) => i + 1);
    teams.sort((a, b) => {
        const sumA = table[a].reduce((p, n) => p + n, 0);
        const sumB = table[b].reduce((p, n) => p + n, 0);

        if (sumA !== sumB) return sumB - sumA;

        if (submitCount[a] !== submitCount[b]) return submitCount[a] - submitCount[b];

        return lastSubmit[a] - lastSubmit[b];
    })

    console.log(teams.indexOf(t) + 1);

    i += m + 1;
}