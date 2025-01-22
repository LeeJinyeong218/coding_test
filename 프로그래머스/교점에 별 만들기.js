function solution(lines) {
    const MAX = 100000
    // 교점 구하기
    let set = new Set();
    
    for (let i = 0; i < lines.length; i++) {
        const [a, b, e] = lines[i];
        for (let j = i + 1; j < lines.length; j++) {
            const [c, d, f] = lines[j];
            
            const x = (b * f - e * d) / (a * d - b * c)
            const y = (e * c - a * f) / (a * d - b * c)
            
            if (x % 1 === 0 && y % 1 === 0) {
                set.add(x + " " + y);
            }
        }
    }
    
    // 교점 그리기
    const meets = [...set].map(v => v.split(" ").map(Number));
    const xs = meets.map(v => v[0]);
    const ys = meets.map(v => v[1]);
    
    const [maxX, minX, maxY, minY] = 
          [Math.max(...xs), Math.min(...xs), Math.max(...ys), Math.min(...ys)];
    
    let answer = Array.from(Array(maxY - minY + 1), () => Array(maxX - minX + 1).fill("."));
    
    meets.forEach(([x, y]) => {
        answer[maxY - y][x - minX] = "*";
    })
    return answer.map(v => v.join(""));
}