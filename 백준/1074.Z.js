const [N, r, c] = require('fs').readFileSync('dev/stdin').toString().split(" ").map(Number);

const getNum = (N, r, c) => {
    if (N === 1) return r * 2 + c;

    let part;
    const half = 2 ** (N - 1);

    if (r < half && c < half) part = 0;
    else if (r < half && c >= half) part = 1;
    else if (r >= half && c < half) part = 2;
    else part = 3;

    return part * half ** 2 + getNum(N - 1, r >= half ? r - half : r, c >= half ? c - half : c);
}

console.log(getNum(N, r, c));