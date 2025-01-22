const [A, B] = require('fs').readFileSync('dev/stdin').toString().trim().split(" ").map(Number);

let map = new Map();
map.set(A, 0);

let answer = -1;
let q = [A];

while (q.length) {
    const cur = q.shift();
    const count = map.get(cur);

    const new1 = cur * 10 + 1;
    if (new1 <= B && !map.has(new1)) {
        if (new1 === B) {
            answer = count + 2;
            break;
        }

        map.set(new1, count + 1);
        q.push(new1);
    }

    const new2 = cur * 2;
    if (new2 <= B && !map.has(new2)) {
        if (new2 === B) {
            answer = count + 2;
            break;
        }

        map.set(new2, count + 1);
        q.push(new2);
    }
}

console.log(answer);