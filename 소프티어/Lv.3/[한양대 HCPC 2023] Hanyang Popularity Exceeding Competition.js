const reader = require('readline').Interface({
    input: process.stdin,
    output: undefined
})

let N;
let pc = [];
reader.on('line', line => {
    if (N === undefined) {
        N = +line.trim();
    } else {
        pc.push(line.trim().split(" ").map(Number));
    }
})

reader.on('close', () => {
    const plus = (cur, p, c) => {
        if (Math.abs(cur - p) > c) return false;
        return true;
    }

    let popular = 0;

    pc.forEach(([p, c]) => {
        if (plus(popular, p, c)) {
            popular++;
        }
    })

    console.log(popular)
})