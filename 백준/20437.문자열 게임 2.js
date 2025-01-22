const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const T = +input[0].trim();

for (let t = 0; t < T; t++) {
    const W = input[1 + t * 2].trim(); // 문자열
    const K = +input[2 + t * 2].trim(); // 정수

    let min = Infinity;
    let max = 0;

    let map = new Map(); // 인덱스 저장

    for (let i = 0; i < W.length; i++) {
        const char = W.charAt(i); 

        if (!map.has(char)) {
            map.set(char, []);
        }

        map.get(char).push(i); // 해당 문자에 인덱스 저장

        if (map.get(char).length >= K) {
            const len = i - map.get(char)[map.get(char).length - K] + 1; // K개 되면 길이 구해서 계산

            max = Math.max(max, len);
            min = Math.min(min, len);
        }
    }

    if (min > max) { // min은 infinity, max는 0일때 해당
        console.log(-1);
    } else {
        console.log(min + " " + max);
    }
}