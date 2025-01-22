function solution(rows, columns, queries) {
    // board
    let board = Array.from(Array(rows), () => Array(columns).fill(0));
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            board[i][j] = i * columns + j + 1;
        }
    }
    
    // rotate
    const rotate = (query) => {
        const [r1, c1, r2, c2] = query.map(i => i - 1);
        
        let tmp = board[r1 + 1][c1];
        let min = tmp;
        
        // 위쪽
        for (let i = c1; i < c2; i++) {
            [board[r1][i], tmp] = [tmp, board[r1][i]];
            min = Math.min(tmp, min);
        }
        // 오른쪽
        for (let i = r1; i < r2; i++) {
            [board[i][c2], tmp] = [tmp, board[i][c2]];
            min = Math.min(tmp, min);
        }
        // 아래쪽
        for (let i = c2; i > c1; i--) {
            [board[r2][i], tmp] = [tmp, board[r2][i]];
            min = Math.min(tmp, min);
        }
        // 왼쪽
        for (let i = r2; i > r1; i--) {
            [board[i][c1], tmp] = [tmp, board[i][c1]];
            min = Math.min(tmp, min);
        }
        
        return min;
    }
    
    // execute queries
    let answer = [];
    queries.forEach((query) => {
        answer.push(rotate(query));
    })
    
    return answer;
}