const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const T = +input[0];

const gcd = (a, b) => a % b === 0 ? b : gcd(b, a % b);

const lcm = (a, b) => a * b / gcd(a, b);

const sol = (M, N, x, y) => {
    // k % M = x -> (k - x) % M = 0
    // k % N = y -> (k - y) % N = 0
    // k = nM + x = mN + y
    const last = lcm(M, N);

    let mx = x;
    let ny = y;
    while (true) {
        if (mx === ny) return mx;
        if (mx > last || ny > last) return -1;

        if (mx < ny) {
            mx += M;
        } else {
            ny += N;
        }
    }
}

for (let i = 0; i < T; i++) {
    const [M, N, x, y] = input[i + 1].split(" ").map(Number);
    console.log(sol(M, N, x, y));
}