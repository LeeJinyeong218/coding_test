function solution(s) {
    let min_length = s.length;
    
    for (let i = 1; i < s.length; i++) { // 크기 1부터 문자열 길이 - 1까지
        min_length = Math.min(min_length, press(s, i).length);
    }
    
    return min_length;
}

// 압축 함수
const press = (str, n) => {
    const slice = Math.ceil(str.length / n); // 이터레이션 횟수
    let pressed = "" // 반환할 압축한 문자열
    let prev = ""; // 전 문자열 확인
    let count = 0 // 갯수 확인
    
    for (let i = 0; i < slice; i++) {
        const part = str.slice(i * n, n * (i + 1));
        if (prev === part) {
            count++;
            continue;
        }
        
        if (prev) {
            pressed += count === 1 ? prev : count.toString() + prev;
        }
        
        prev = part;
        count = 1;
    }
    
    pressed += count === 1 ? prev : count.toString() + prev; // 마지막 처리
    
    return pressed;
}