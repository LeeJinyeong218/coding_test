let input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

let T = +input.shift();

const P = () => {
    let mem = Array(101).fill(null);
    mem[0] = 0;
    mem[1] = 1;
    mem[2] = 1;

    return function getP(n) {
        if (mem[n] === null) {
            mem[n] = getP(n - 2) + getP(n - 3);
        }

        return mem[n];
    }
}

let P_ = P();

while (T) {
    const N = +input.shift();
    console.log(P_(N));

    T--;
}