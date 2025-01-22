// 검색 풀이
function solution(n, info) {
    const MAX_SCORE = 10;
    let answer = Array(MAX_SCORE + 1).fill(0);
    
    let maxDiff = 0;
    
    // 점수를 1 -> 10 증가시키면서 탐색
    const getMaxDiff = (score, used, apeach_score, lion_score, lion_info) => {
        if (n < used) return; // 사용 화살 갯수 초과
        
        if (score > 10) { // 탐색 완료
            const diff = lion_score - apeach_score;
            if (diff > maxDiff) {
                lion_info[10] = n - used;
                maxDiff = diff;
                answer = lion_info;
            }
            return;
        }
        
        if (n > used) { // 초과 상관없이 라이언이 이긴 경우
            let current = [...lion_info];
            current[10 - score] = info[10 - score] + 1;
            getMaxDiff(
                score + 1, 
                used + info[10 - score] + 1, 
                apeach_score, 
                lion_score + score, 
                current)
        }
        
        if (info[10 - score] > 0) {
            // 어피치가 이기는 경우
            getMaxDiff(
                score + 1,
                used,
                apeach_score + score,
                lion_score,
                lion_info
            )
        } else {
            getMaxDiff(
                score + 1,
                used,
                apeach_score,
                lion_score,
                lion_info
            )
        }
    }
    
    getMaxDiff(0, 0, 0, 0, answer);
    
    return maxDiff === 0 ? [-1] : answer;
}