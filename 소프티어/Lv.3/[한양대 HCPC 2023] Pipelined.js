const input = require('fs').readFileSync(0).toString().trim().split("\n");

const N = +input[0].trim();
const S = input[1].trim().split(" ").map(Number);

const sol = () => {
    if (N === 1) return S[0];

    S.sort((a, b) => a - b)
    
    let t = 0;
    let p = 0;
    let valid_time = 0;
    while (p < N - 1) {
        t++;
        valid_time += 1 / S[p];

        if (valid_time >= 1 / S[p + 1]) {
            p++;
            valid_time = 0;
        }
    }

    t += S[N - 1];
    
    return t;
}

console.log(sol());