const [N, ...nums] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n").map(Number);

let map = new Map();
nums.forEach((num, idx) => {
    map.set(idx + 1, num);
})

let answer = [];

let i = 1;
while (i <= N) {
    if (!answer.includes(i)) {
        let start = i;
        let list = [start];
        let visited = Array(N + 1).fill(false);
        visited[start] = true;

        while (true) {
            const next = map.get(list[list.length - 1]);

            if (next === start) {
                answer = [...answer, ...list];
                break;
            }

            if (visited[next]) {
                break;
            }

            list.push(next);
            visited[next] = true;
        }
    }

    i++;
}

console.log(answer.length + "\n" + answer.sort((a, b) => a - b).join("\n"));