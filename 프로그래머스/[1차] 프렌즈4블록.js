function solution(m, n, board) {
    // 밀기 쉽게 tranpose
    board = board.reduce(
        (p, n) => n.split("").map((_, i) => [...(p[i] || []), n[i]])
        , []);
    
    let count = 0;
    
    while (true) {
        let subCount = 0;
        let boom = Array.from(Array(n), () => Array(m).fill(false));
        
        // 블록 지우기
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < m - 1; j++) {
                const block = board[i][j];
                if (block === null) continue;
                
                if (
                    board[i + 1][j] === block &&
                    board[i + 1][j + 1] === block &&
                    board[i][j + 1] === block
                ) {
                    if (!boom[i][j]) {
                        boom[i][j] = true;
                        subCount++;
                    }

                    if (!boom[i + 1][j]) {
                        boom[i + 1][j] = true;
                        subCount++;
                    }

                    if (!boom[i + 1][j + 1]) {
                        boom[i + 1][j + 1] = true;
                        subCount++;
                    }

                    if (!boom[i][j + 1]) {
                        boom[i][j + 1] = true;
                        subCount++;
                    }
                }
            }
        }
        
        if (subCount === 0) {
            break;
        }
        
        count += subCount;
        
        // 블록 내려가기(오른쪽으로 밀기)
        for (let i = 0; i < n; i++) {
            const noBoom = board[i].filter((_, j) => !boom[i][j]);
            board[i] = [...Array(m - noBoom.length).fill(null), ...noBoom];
        }
    }
    
    return count;
}