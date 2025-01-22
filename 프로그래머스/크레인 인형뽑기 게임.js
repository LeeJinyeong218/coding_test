function solution(board, moves) {
    let answer = 0;
    let st = [];
    
    const n = board.length;
    
    let game = {};
    for (let i = 1; i <= n; i++) {
        game[i] = [];
        for (let j = n - 1; j >= 0; j--) {
            if (board[j][i-1]) game[i].push(board[j][i - 1]);
        }
    }
    
    moves.forEach(move => {
        const cur = game[move].pop();
        
        if (cur) {
            if (st[st.length - 1] === cur) {
                st.pop();
                answer += 2;
            } else {
                st.push(cur);
            }
        }
    })
    
    return answer;
}