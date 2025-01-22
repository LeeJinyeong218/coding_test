const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const T = +input[0];

let direction, l, r;

const R = () => {
    direction = 1 - direction;
}

const D = () => {
    if (direction) {
        r--;
        return;
    }
    l++;
}

const isEmpty = () => {
    return l > r
}

const sol = (T_num) => {
    const funcs = input[T_num * 3 + 1].split("");
    const n = +input[T_num * 3 + 2];
    let arr = input[T_num * 3 + 3];
    arr = arr.slice(1, arr.length - 1).split(",").map(Number);

    // 변수 초기화
    direction = 0;
    l = 0
    r = n - 1;

    for (let func of funcs) {
        if (func === "R") {
            R();
        } else if (func === "D") {
            if (isEmpty()) {
                console.log("error");
                return;
            }
            D();
        }
    }

    const answer = direction ? arr.slice(l, r + 1).reverse() : arr.slice(l, r + 1)

    console.log("[" + answer.join(",") + "]");
}

for (let i = 0; i < T; i++) {
    sol(i);
}