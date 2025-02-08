/**
 * @param {number} limit
 * @param {number[][]} queries
 * @return {number[]}
 */
var queryResults = function(limit, queries) {
    let balls = new Map();
    let counts = new Map();

    let count = 0;
    let answer = [];

    for (let [ball, color] of queries) {
        const prev_color = balls.get(ball);
        if (prev_color) {
            counts.set(prev_color, counts.get(prev_color) - 1);
            if (counts.get(prev_color) === 0) {
                counts.delete(prev_color)
                count--;
            }
        }
        balls.set(ball, color);
        if (counts.get(color) === undefined) {
            counts.set(color, 1);
            count++;
        }
        else counts.set(color, counts.get(color) + 1);

        answer.push(count);
    }

    return answer;
};