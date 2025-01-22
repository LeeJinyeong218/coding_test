function solution(n) {
    let result = [];
    
    const hanoi = (from, to, count) => {
        if (count === 0) return;
        
        const mid = 6 - from - to;
        
        hanoi(from, mid, count - 1);
        result.push([from, to]);
        hanoi(mid, to, count - 1);
    }      
    
    hanoi(1, 3, n);
    return result;  
}