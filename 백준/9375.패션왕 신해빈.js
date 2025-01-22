let input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

let T = +input.shift();

while (T) {
    const N = +input.shift();
    let map = new Map();

    for (let i = 0; i < N; i++) {
        const [_, category] = input.shift().split(" ");
        if (!map.has(category)) {
            map.set(category, 0);
        }
        map.set(category, map.get(category) + 1);
    }

    let answer = 1;
    for (let value of map.values()) {
        answer *= value + 1;
    }
    console.log(answer - 1);
    T--;
}