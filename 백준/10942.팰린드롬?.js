var reader = require('readline').Interface({
    input: require('fs').createReadStream('dev/stdin'),
    output: undefined
});

var N, M, nums;
var table;
var answer = [];
reader.on('line', function(line) {
    if (!N) {
        N = +line.trim();
    } else if (!nums) {
        nums = line.trim().split(" ").map(Number);
        table = Array.from({ length: N }, () => Array(N).fill(false));
        
        for (let i = 0; i < N; i++) {
            table[i][i] = true;
        }
        for (let i = 0; i < N - 1; i++) {
            table[i][i + 1] = nums[i] === nums[i + 1];
        }
        for (let size = 3; size <= N; size++) {
            for (let i = 0; i < N - size + 1; i++) {
                let j = i + size - 1;
                table[i][j] = table[i + 1][j - 1] && nums[i] === nums[j];
            }
        }
        
    } else if (!M) {
        M = +line.trim();
    } else {
        var [s, e] = line.trim().split(" ").map(Number);

        answer.push(table[s - 1][e - 1] ? 1 : 0);
    }
})

reader.on('close', function() {
    console.log(answer.join("\n"));
})