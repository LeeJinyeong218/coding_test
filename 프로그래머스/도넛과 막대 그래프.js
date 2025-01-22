// 검색 풀이
function solution(edges) {
    let answer = [0, 0, 0, 0];
    let inout = {};
    
    edges.forEach(([a, b]) => {
        if (!inout[a]) inout[a] = {
            in: 0,
            out: 0,
        }
        
        if (!inout[b]) inout[b] = {
            in: 0,
            out: 0,
        }
        
        inout[a].out++;
        inout[b].in++;
    })
    
    for (let [num, obj] of Object.entries(inout)) {
        if (obj.out > 1 && obj.in === 0) {
            answer[0] = +num;
        } else if (obj.out === 2 && obj.in >= 2) {
            answer[3]++;
        } else if (obj.out === 0) {
            answer[2]++;
        }
    }
    
    answer[1] = inout[answer[0]].out - answer[2] - answer[3];
    
    return answer;
}