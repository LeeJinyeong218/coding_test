const [[N, M, B], ...field] = require('fs').readFileSync('dev/stdin').toString().trim()
    .split("\n").map(line => line.trim().split(" ").map(Number));

const TIME_REMOVE = 2;
const TIME_PLACE = 1;
const MAX_HEIGHT = 256;

const sol = () => {
    const flatField = field.flat();
    const minHeight = Math.min(...flatField);
    const maxHeight = Math.min(Math.max(...flatField), MAX_HEIGHT); // 필드 내 최대 높이를 제한

    let bestTime = Infinity;
    let bestHeight = 0;

    // 높이 h를 기준으로 작업
    const calculateTime = (h) => {
        let blocks = B;
        let time = 0;

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                const diff = field[i][j] - h;

                if (diff > 0) {
                    // 블록 제거
                    time += diff * TIME_REMOVE;
                    blocks += diff;
                } else if (diff < 0) {
                    // 블록 쌓기
                    const needed = -diff;
                    time += needed * TIME_PLACE;
                    blocks -= needed;
                }
            }
        }

        if (blocks < 0) return Infinity;
        return time;
    };

    for (let h = minHeight; h <= maxHeight; h++) {
        const time = calculateTime(h);

        if (time < bestTime || (time === bestTime && h > bestHeight)) {
            bestTime = time;
            bestHeight = h;
        }
    }

    console.log(bestTime, bestHeight);
};

sol();