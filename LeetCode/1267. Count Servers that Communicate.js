/**
 * @param {number[][]} grid
 * @return {number}
 */
var countServers = function(grid) {
    const [m, n] = [grid.length, grid[0].length];
    let visited = Array.from(Array(m), () => Array(n).fill(false));
    let answer = 0;

    for (let i = 0; i < m; i++) {
        let idxs = [];
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) idxs.push(j);
        }
        if (idxs.length > 1) {
            answer += idxs.length;
            idxs.forEach(idx => {
                visited[i][idx] = true;
            })
        }
    }

    for (let i = 0; i < n; i++) {
        let idxs = [];
        for (let j = 0; j < m; j++) {
            if (grid[j][i] === 1) idxs.push(j);
        }

        if (idxs.length > 1) {
            idxs.forEach(idx => {
                if (!visited[idx][i]) answer++;
            })
        }
    }

    return answer;
};