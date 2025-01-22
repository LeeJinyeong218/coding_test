function solution(n, t, m, p) {
    let answer = [];
    let next = 0; // 배열로 만들 번호
    const idx = p - 1;
    let q = [];
    
    while (true) {
        q = [...q, ...numToArr(next, n)];
        if (q[idx]) {
            // 존재하면 answer에 추가
            answer.push(q[idx]);
            // answer이 길이를 채우면 반환
            if (answer.length >= t) {
                return answer.join("");
            }
            
            // m개를 삭제하기 위해 m보다 큰 길이의 배열로 만들고 슬라이싱
            while (q.length < m) {
                next++;
                q = [...q, ...numToArr(next, n)];
            }
            q = q.slice(m);
        }
        // 다음 번호로 넘어감
        next++;
    }
}

// base 진수로 바꾼 후에 분할하여 배열 반환
const numToArr = (n, base) => {
    return n.toString(base).toUpperCase().split("");
}