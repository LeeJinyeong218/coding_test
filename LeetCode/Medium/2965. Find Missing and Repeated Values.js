/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findMissingAndRepeatedValues = function(grid) {
    var n = grid.length;
    var visited = Array(n ** 2 + 1).fill(false);
    var a, b;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const num = grid[i][j];
            if (visited[num]) b = num;
            visited[num] = true;
        }
    }

    for (let i = 1; i < n ** 2 + 1; i++) {
        if (!visited[i]) {
            a = i;
            break;
        }
    }

    return [b, a]
};