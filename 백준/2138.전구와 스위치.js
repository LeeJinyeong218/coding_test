// 검색 풀이
const [N, initial, target] = require('fs')
    .readFileSync('dev/stdin')
    .toString()
    .trim()
    .split("\n");

// 토글 선언
const toggle = (state, idx) => {
    state[idx] ^= 1;
    if (idx > 0) state[idx - 1] ^= 1;
    if (idx < N - 1) state[idx + 1] ^= 1;
};

const target_arr = target.split("").map(Number);
let notInitialToggle = initial.split("").map(Number); // 첫 스위치를 안눌렀을 때
let initialToggle = initial.split("").map(Number); // 첫 스위치를 눌렀을 때
toggle(initialToggle, 0);

let count_not = 0;
let count = 1;

for (let i = 1; i < N; i++) {
    // 그 전의 전구를 비교하면서 진행
    if (target_arr[i - 1] !== notInitialToggle[i - 1]) {
        toggle(notInitialToggle, i);
        count_not++;
    }
    if (target_arr[i - 1] !== initialToggle[i - 1]) {
        toggle(initialToggle, i);
        count++;
    }
}

// 만들어지지 않는 경우 Inifinty 설정
if (target_arr[N - 1] !== notInitialToggle[N - 1]) count_not = Infinity;
if (target_arr[N - 1] !== initialToggle[N - 1]) count = Infinity;
const answer = Math.min(count_not, count);
console.log(answer < Infinity ? answer : -1);
