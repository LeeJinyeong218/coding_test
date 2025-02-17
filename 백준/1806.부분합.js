const [[N, S], arr] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n").map(v => v.trim().split(" ").map(Number));

let answer = Infinity;

let l = 0;
let r = 0;
let sum = arr[r];

while (l < N && r < N) { 
  while (sum < S) {
    r++;
    sum += arr[r];
  }

  if (r >= N) break;

  while (sum - arr[l] >= S) {
    sum -= arr[l];
    l++;
  }

  answer = Math.min(answer, r - l + 1);
  sum -= arr[l];
  l++;
}

console.log(answer === Infinity ? 0 : answer);