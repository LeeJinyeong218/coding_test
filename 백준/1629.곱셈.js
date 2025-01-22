const [a, b, c] = require('fs').readFileSync('dev/stdin').toString().trim().split(" ").map(BigInt);

const modExp = (a, b, c) => {
    if (a === 0n || c === 1n) return 0n;
    if (b === 0n) return 1n; // 예외 처리
    
    if (b % 2n) {
        const sub = modExp(a, (b - 1n) / 2n, c);
        return (sub * sub * (a % c)) % c;
    } else {
        const sub = modExp(a, b / 2n, c);
        return (sub * sub) % c;
    }
}

console.log(modExp(a, b, c).toString());
