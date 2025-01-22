/**
 * @param {number[][]} isWater
 * @return {number[][]}
 */
var highestPeak = function(isWater) {
    const [r, c] = [isWater.length, isWater[0].length];
    const d = [[0, 1], [1, 0], [-1, 0], [0, -1]];
    const map = Array.from(Array(r), () => Array(c).fill(0));
    let q = [];

    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            if (isWater[i][j]) {
                q.push([i, j, 0]);
            }
        }
    }
    let head = 0;

    while (head < q.length) {
        const [x, y, height] = q[head++];

        for (let [dx, dy] of d) {
            const [nx, ny] = [x + dx, y + dy];

            if (nx >= 0 && nx < r && ny >= 0 && ny < c && !isWater[nx][ny] && !map[nx][ny]) {
                map[nx][ny] = height + 1;
                q.push([nx, ny, height + 1]);
            }
        }
    }

    return map;
};