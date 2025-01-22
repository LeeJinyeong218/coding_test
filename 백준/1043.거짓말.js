const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n")

const [N, M] = input[0].split(" ").map(Number);
const [T, ...t_nums] = input[1].split(" ").map(Number);
let party = input.slice(2).map(v => v.split(" ").map(Number).slice(1));

const truth = new Set(t_nums);
let answer = M;

if (T) {
    for (let i = 0; i < N; i++) {
        party.forEach((p) => {
            if (p.some(v => truth.has(v))) p.forEach((h) => truth.add(h));
        });
    }

    party.forEach((p) => {
        if (p.some(v => truth.has(v))) answer--;
    });
}

console.log(answer);