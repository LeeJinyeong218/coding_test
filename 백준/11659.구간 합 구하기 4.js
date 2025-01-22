let [[N, M], nums, ...sections] 
    = require('fs').readFileSync('dev/stdin').toString().trim().split("\n").map(v => v.split(" ").map(Number));

let sum = [...nums];

for(let i = 1; i < N; i++) {
    sum[i] += sum[i - 1];
}

const getSectionSum = section => {
    const [s, e] = section;
    if (s === e) return nums[s - 1];
    else if (s === 1) return sum[e - 1];
    else return sum[e - 1] - sum[s - 2];
}

console.log(sections.map(section => getSectionSum(section)).join("\n"));