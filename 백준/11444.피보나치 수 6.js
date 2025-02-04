const input = BigInt(require('fs').readFileSync('dev/stdin').toString().trim());
const MODULAR = 1000000007n;

const map = new Map();
map.set(0n, 0n);
map.set(1n, 1n);

const fib = (n) => {
    const stack = [n]; // 스택으로 순회

    while (stack.length) {
        const current = stack[stack.length - 1];

        if (map.has(current)) {
            stack.pop();
            continue;
        }

        const k = current / 2n;

        if (current % 2n === 0n) {
            if (!map.has(k)) stack.push(k);
            if (!map.has(k - 1n)) stack.push(k - 1n);
        } else {
            if (!map.has(k)) stack.push(k);
            if (!map.has(k + 1n)) stack.push(k + 1n);
        }

        if (current % 2n === 0n && map.has(k) && map.has(k - 1n)) {
            map.set(current, (map.get(k) * ((2n * map.get(k - 1n) + map.get(k))) % MODULAR) % MODULAR);
            stack.pop();
        } 
        else if (current % 2n !== 0n && map.has(k) && map.has(k + 1n)) {
            map.set(current, (map.get(k) ** 2n + map.get(k + 1n) ** 2n) % MODULAR);
            stack.pop();
        }
    }

    return map.get(n);
};

console.log(Number(fib(input)));
