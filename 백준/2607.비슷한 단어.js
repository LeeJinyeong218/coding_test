const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const n = +input[0].trim();
let strs = input.slice(1).map(i => i.trim());

// 검색 풀이
const target = strs.shift();
let answer = 0;

for (let str of strs) {
  if (
    Math.abs(target.length - str.length) > 1 ||
    Math.abs(new Set(target).size - new Set(str).size) > 1
  )
    continue;

  for (const char of target) str = str.replace(char, ''); // 같은 글자를 하나씩 지움
  if (str.length < 2) answer++;
}

console.log(answer);