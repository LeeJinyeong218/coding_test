const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const T = +input[0];
const ABs = input.slice(1).map(v => v.split(" ").map(Number));
const MAX = 10000;

const D = n => (n * 2) % 10000;

const S = n => n > 0 ? n - 1 : 9999;

const L = n => (n % 1000) * 10 + Math.floor(n / 1000);

const R = n => (n % 10) * (10 ** 3) + Math.floor(n / 10);

const commands = [D, S, L, R];

const getCommands = (A, B) => {
    let q = [[A, ""]];
    let visited = Array(MAX + 1).fill(false);
    visited[A] = true;

    while (q.length) {
        const [cur, log] = q.shift();

        for (let com of commands) {
            const new_num = com(cur);
            if (!visited[new_num]) {
                if (new_num === B) {
                    return log + com.name;
                }

                q.push([new_num, log + com.name]);
                visited[new_num] = true;
            }
        }
    }
}

const sol = () => {
    let answer = [];
    for (let i = 0; i < T; i++) {
        const [A, B] = ABs[i];
        answer.push(getCommands(A, B));
    }
    console.log(answer.join("\n"));
}

sol();