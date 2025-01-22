const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const START = 1;
const END = 100;
const DICE_MAX = 6;

const [N, _] = input[0].trim().split(" ").map(Number);

// 사다리, 뱀 맵으로 선언
const ladders = input.slice(1, 1 + N).map(v => v.trim().split(" ").map(Number))
                    .reduce((map, next) => {
                        map.set(next[0], next[1])
                        return map;
                    }, new Map());
const snakes = input.slice(1 + N).map(v => v.trim().split(" ").map(Number))
                    .reduce((map, next) => {
                        map.set(next[0], next[1])
                        return map;
                    }, new Map());

// 해당 칸 까지 다이스 굴림 카운트 저장
let roll_count = Array(END + 1).fill(Infinity);
roll_count[START] = 0;

// queue로 bfs 접근
let q = [[START, roll_count[START]]];

while (q.length) {
    const [block, count] = q.shift();

    // 끝 이상으로 도달하면 끝에 더 작은 값 저장
    if (block >= END) {
        roll_count[END] = Math.min(roll_count[END], count);
        continue;
    }

    // 1 ~ 6 순회하면서 q에 push
    // 이미 더 작은 카운트라면 접근 X
    for (let i = 1; i <= DICE_MAX; i++) {
        const next =  block + i;
        if (snakes.has(next) && roll_count[next] > count + 1) {
            roll_count[next] = count + 1;
            q.push([snakes.get(next), count + 1])
        } else if (ladders.has(next) && roll_count[next] > count + 1) {
            roll_count[next] = count + 1;
            q.push([ladders.get(next), count + 1]);
        } else if (block < END && roll_count[next] > count + 1){
            roll_count[next] = count + 1;
            q.push([next, count + 1]);
        }
    }
}

console.log(roll_count[END]);