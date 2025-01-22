const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const N = +input[0];
const fruits = input[1].split(" ").map(Number);
const MAX_FRUIT_KIND = 2;

const sol = () => {
    let l = 0;
    let r = l;

    let max = 0;

    let fruits_count = Array(10).fill(0);
    let kinds = new Set();

    while (r < N) {
        if (!kinds.has(fruits[r])) kinds.add(fruits[r]);
        fruits_count[fruits[r]]++;

        while (kinds.size > MAX_FRUIT_KIND) {
            fruits_count[fruits[l]]--;
            if (fruits_count[fruits[l]] === 0) kinds.delete(fruits[l]);
            l++;
        }

        max = Math.max(max, r - l + 1);

        r++;
    }

    console.log(max);
}

sol();