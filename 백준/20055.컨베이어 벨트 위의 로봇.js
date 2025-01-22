const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const [N, K] = input[0].trim().split(" ").map(Number);
const dur = input[1].trim().split(" ").map(Number);
const isRobot = Array(2 * N).fill(false);

// 오른쪽으로 이동하므로 idx는 왼쪽으로 이동한다.
// 현재 idx의 왼쪽(0이라면 마지막 idx)
const rotateIdx = idx => (idx + 2 * N - 1) % (2 * N);

// 올리는 위치 / 내리는 위치
let up = 0, down = N - 1;

const rotateBelt = () => {
    up = rotateIdx(up);
    down = rotateIdx(down);
}

// 올리거나 옮기면 내구도 1 소모

let zero_count = dur.reduce((p, n) => n === 0 ? p + 1 : p, 0);
let phase = 0;

while (zero_count < K) {
    // 회전
    rotateBelt();
    phase++;

    // 벨트 이동 후 down에 로봇 있으면 내림
    if (isRobot[down]) {
        isRobot[down] = false;
    }
    
    // 내리는 위치 바로 전꺼 이동
    const prev_down = rotateIdx(down);
    if (dur[down] > 0 && isRobot[prev_down]) {
        dur[down]--;
        isRobot[prev_down] = false;
        if (dur[down] === 0) zero_count++;
    }

    // 그 다음부터 쭉 이동
    let idx = prev_down
    while (idx !== up) {
        const prev_idx = rotateIdx(idx);
        if (!isRobot[idx] && isRobot[prev_idx] && dur[idx] > 0) {
            isRobot[prev_idx] = false;
            isRobot[idx] = true;
            dur[idx]--;
            if (dur[idx] === 0) zero_count++;
        }

        idx = rotateIdx(idx);
    }

    // 올리는 위치에 로봇 없고 내구도 있으면 올림
    if (!isRobot[up] && dur[up] > 0) {
        isRobot[up] = true;
        dur[up]--;
        if (dur[up] === 0) zero_count++;
    }
}

console.log(phase);
